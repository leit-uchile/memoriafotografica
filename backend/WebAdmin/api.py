from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from .models import *
from Gallery.models import Photo, Comment, Reporte
from Users.models import User
from .serializers import *
from Gallery.serializers import PhotoAdminSerializer, CommentAdminSerializer, ReportSerializer
from Users.serializers import UserSerializer, ReCaptchaSerializer
from django.http import Http404
from WebAdmin.views import sendEmail
from datetime import date
from django.db.models import Q
from Users.task import create_notification


def sort_by_field(element_list, request):
    sort_type = {"asc": "", "desc": "-"}
    if "sort" in request.query_params:
        splitted_param = request.query_params["sort"].split("-")
        query = sort_type[splitted_param[1]] + splitted_param[0]
        element_list = element_list.order_by(query)
    else:  # Default to sorting by asc creation
        element_list = element_list.order_by("created_at")
    return element_list


def filter_elements(elements, request):
    try:
        if "created_at" in request.query_params:
            elements = elements.filter(created_at__gte=date.fromisoformat(
                request.query_params["created_at"]))
        if "created_at_until" in request.query_params:
            elements = elements.filter(created_at__lte=date.fromisoformat(
                request.query_params["created_at_until"]))
        if "resolved" in request.query_params:
            resolved = True
            if request.query_params["resolved"] == "false":
                resolved = False
            elements = elements.filter(resolved=resolved)
        if "approved" in request.query_params:
            approved = True
            if request.query_params["approved"] == "false":
                approved = False
            elements = elements.filter(approved=approved)
        if "email_sent" in request.query_params:
            email_sent = True
            if request.query_params["email_sent"] == "false":
                email_sent = False
            elements = elements.filter(email_sent=email_sent)
        if "search" in request.query_params:
            elements = elements.filter(
                Q(first_name__icontains=request.query_params["search"]) |
                Q(last_name__icontains=request.query_params["search"])
            )
        if "limit" in request.query_params:
            elements = elements[0:int(request.query_params["limit"])]
    except Exception as e:
        print("Error filtering", e)
        pass
    return elements


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class NewsListAPI(generics.GenericAPIView):

    permission_classes = [ReadOnly, ]
    serializer_class = NewsSerializer

    def get(self, request, *args, **kwargs):
        news = News.objects.all()
        news = filter_elements(news, request)
        news = sort_by_field(news, request)
        serializer = NewsSerializer(news, many=True)
        serialized_data = serializer.data
        return self.get_paginated_response(
            self.paginate_queryset(serialized_data))


class NewsDetailAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk):
        try:
            return News.objects.get(pk=pk)
        except News.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            news = self.get_object(pk)
            serializer = NewsSerializer(news, data=request.data)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            news = self.get_object(pk)
            serializer = NewsSerializer(news, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            news = self.get_object(pk)
            news.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class LandingCarousselAPI(generics.GenericAPIView):

    permission_classes = [ReadOnly, ]

    def get(self, request, *args, **kwargs):
        caroussel = LandingCaroussel.objects.all()
        serializer = LandingCarousselSerializer(caroussel, many=True)
        return Response(serializer.data)


class PhotoRequestDetailAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk):
        try:
            return PhotoRequest.objects.get(pk=pk)
        except News.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            photo_request = self.get_object(pk)
            serializer = PhotoRequestSerializer(photo_request)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            photo_request = self.get_object(pk)
            serializer = PhotoRequestSerializer(
                photo_request, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                if request.data['approved']:
                    print(request.data['attached'])
                    sendEmail(emailto=photo_request.email, case="photo_request_success",
                              subject='Hemos resuelto su solicitud', attached=request.data['attached'])
                else:
                    sendEmail(emailto=photo_request.email, case="photo_request_failure",
                              subject='Hemos resuelto su solicitud', attached=[])
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type == 3:
            photo_request = self.get_object(pk)
            photo_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class PhotoRequestAPI(generics.GenericAPIView):

    serializer_class = PhotoRequestNewSerializer
    permission_classes = [
        IsAuthenticated | ReadOnly,
    ]

    def post(self, request, *args, **kwargs):
        formData = request.data
        if "recaptchaToken" in formData.keys():
            tokenRecaptcha = {"recaptcha": formData.pop("recaptchaToken")}
        else:
            tokenRecaptcha = {"recaptcha": ""}
        serializer = self.serializer_class(data=formData,
                                           context={'request': request})
        recaptchaSer = ReCaptchaSerializer(data=tokenRecaptcha)
        if recaptchaSer.is_valid():
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(recaptchaSer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class PhotoRequestListAPI(generics.GenericAPIView):
    """
    Give curators a list of ALL requests
    Permits search queries using the search and limit parameter
    Permits pagination if page_size and page are on the query parameters

    """
    serializer_class = PhotoRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get(self, request, *args, **kwargs):
        if request.user:
            if request.user.user_type > 1:
                photorequests = PhotoRequest.objects.all()
                photorequests = filter_elements(photorequests, request)
                photorequests = sort_by_field(photorequests, request)
                serializer = self.serializer_class(photorequests, many=True)
                if "page" in request.query_params and "page_size" in request.query_params:
                    return self.get_paginated_response(self.paginate_queryset(serializer.data))
                return Response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class ContactRequestListAPI(generics.GenericAPIView):
    """
    get:
    Get a list of ALL messages.
    Permits search queries using the search and limit parameter
    Permits pagination if page_size and page are on the query parameters

    """
    serializer_class = ContactRequestSerializer

    def get(self, request, *args, **kwargs):
        if request.user:
            if request.user.user_type > 1:
                contactrequests = ContactRequest.objects.all()
                contactrequests = filter_elements(contactrequests, request)
                contactrequests = sort_by_field(contactrequests, request)
                serializer = self.serializer_class(contactrequests, many=True)
                if "page" in request.query_params and "page_size" in request.query_params:
                    return self.get_paginated_response(
                        self.paginate_queryset(serializer.data))
                return Response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        formData = request.data
        if "recaptchaToken" in formData.keys():
            tokenRecaptcha = {"recaptcha": formData.pop("recaptchaToken")}
        else:
            tokenRecaptcha = {"recaptcha": ""}
        serializer = self.serializer_class(data=formData,
                                           context={'request': request})
        recaptchaSer = ReCaptchaSerializer(data=tokenRecaptcha)
        if recaptchaSer.is_valid():
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(recaptchaSer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class ContactRequestDetailAPI(generics.GenericAPIView):

    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_object(self, pk):
        try:
            return ContactRequest.objects.get(pk=pk)
        except ContactRequest.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        contactrequest = self.get_object(pk)
        serializer = ContactRequestSerializer(contactrequest)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type > 1:
            contactrequest = self.get_object(pk)
            serializer = ContactRequestSerializer(contactrequest,
                                                  data=request.data,
                                                  partial=True)
            if serializer.is_valid():
                serializer.save()
                sendEmail(emailto=contactrequest.email,
                          case="contact_us",
                          subject=request.data['subject'],
                          attached=request.data['reply'])
                return Response(serializer.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        if request.user.user_type > 1:
            contactrequest = self.get_object(pk)
            contactrequest.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class CensureAPI(generics.GenericAPIView):

    model_dict = {
        1: User,
        2: Photo,
        3: Comment
    }

    serializer_dict = {
        1: UserSerializer,
        2: PhotoAdminSerializer,
        3: CommentAdminSerializer
    }

    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_content(self, id, content_type):
        try:
            return self.model_dict[content_type].objects.get(pk=id)
        except self.model_dict[content_type].DoesNotExist:
            return Http404

    def get_report(self, id):
        try:
            return Reporte.objects.get(pk=id)
        except Reporte.DoesNotExist:
            raise Http404

    def post(self, request, *args, **kwargs):
        print(request.data)
        content_type = request.data['type']
        to_censure = self.get_content(request.data['content_id']['id'],
                                      content_type)
        serializer = self.serializer_dict[content_type](to_censure,
                                                        data={
                                                            'censure': True,
                                                            'is_active': False
                                                        },
                                                        partial=True)
        report_serializer = ReportSerializer(self.get_report(
            request.data['id']),
            data={
            'resolved':
            True,
            'resolution_details':
            "Contenido Censurado"
        },
            partial=True)
        if serializer.is_valid() and report_serializer.is_valid():
            serializer.save()
            create_notification.delay(content_pk=request.data["content_id"]["id"], type=3, content=content_type)
            report_serializer.save()
            return Response(report_serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ReportEditAPI(generics.GenericAPIView):

    model_dict = {
        1: User,
        2: Photo,
        3: Comment
    }

    serializer_dict = {
        1: UserSerializer,
        2: PhotoAdminSerializer,
        3: CommentAdminSerializer
    }

    permission_classes = [IsAuthenticated | ReadOnly, ]

    def get_content(self, id, content_type):
        try:
            return self.model_dict[content_type].objects.get(pk=id)
        except self.model_dict[content_type].DoesNotExist:
            return Http404

    def get_report(self, id):
        try:
            return Reporte.objects.get(pk=id)
        except Reporte.DoesNotExist:
            raise Http404

    def post(self, request, *args, **kwargs):
        print(request.data['newContent'])
        if (request.data['newContent']['upload_date']):
            request.data['newContent']['upload_date'] = request.data[
                'newContent']['upload_date'][0:10] + "T00:00:00-03:00"
        content_type = request.data['report']['type']
        print(request.data['newContent'])
        to_edit = self.get_content(
            request.data['report']['content_id']['id'], content_type)
        serializer = self.serializer_dict[content_type](
            to_edit, data=request.data['newContent'], partial=True)
        report_serializer = ReportSerializer(self.get_report(request.data['report']['id']), data={
                                             'resolved': True, 'resolution_details': "Contenido Modificado"}, partial=True)
        print(report_serializer.is_valid())
        print(serializer.is_valid())
        if serializer.is_valid() and report_serializer.is_valid():
            serializer.save()
            create_notification.delay(content_pk=request.data['report']['content_id']['id'], type=2, content=content_type)
            report_serializer.save()
            return Response(report_serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class TicketListAPI(generics.GenericAPIView):
    """
    List all tickets
    Permits search queries using the search and limit parameter
    Permits pagination if page_size and page are on the query parameters
    """
    def get(self, request, *args, **kwargs):
        if request.user:
            if request.user.user_type > 1:
                ticket = Ticket.objects.all()
                ticket = filter_elements(ticket, request)
                ticket = sort_by_field(ticket, request)
                serializer = TicketSerializer(ticket, many=True)
                if "page" in request.query_params and "page_size" in request.query_params:
                    return self.get_paginated_response(self.paginate_queryset(serializer.data))
                return Response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class TicketDetailAPI(generics.GenericAPIView):
    """
    Retrieve or update ticket instance.
    """

    def get_object(self, pk):
        try:
            return Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            ticket = self.get_object(pk)
            serializer = TicketSerializer(ticket)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self, request, pk, *args, **kwargs):
        if request.user.user_type >= 2:
            ticket = self.get_object(pk)
            serializer = TicketSerializer(ticket, data=request.data, partial=True)
            if serializer.is_valid():
                t = serializer.save()
                if not ticket.curator:
                    curator = User.objects.get(pk=request.user.id)
                    ticket.curator = curator
                    ticket.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
