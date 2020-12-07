from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from Gallery.models import Photo, Album, Comment, Reporte, Category
from Users.models import User
from rest_framework.mixins import UpdateModelMixin
from rest_framework.exceptions import NotFound
from MetaData.models import *
from Users.permissions import *
from django.http import Http404, QueryDict
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_condition import ConditionalPermission, C, And, Or, Not
from rest_framework.documentation import include_docs_urls
from django.db.models import Count

#
def add_field(dictionary,field_name, val):
    dictionary[field_name] = val
    return dictionary


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class GeneralKPIs(generics.GenericAPIView):

    permission_classes = [IsAuthenticated|ReadOnly,]
    def get(self, request, *args, **kwargs):

        output = {}
        kpilist = list()
        kpilist.append(("count_photo",Photo.objects.all().count()))
        kpilist.append(("count_total_users",User.objects.all().count()))
        kpilist.append(("count_photo_approved",Photo.objects.values('approved').annotate(total=Count('approved')).order_by()))
        kpilist.append(("count_user_type",User.objects.values('user_type').annotate(total=Count('user_type')).order_by()))
        kpilist.append(("count_user_role",User.objects.values('rol_type').annotate(total=Count('rol_type')).order_by()))
        kpilist.append(("count_reports_resolved", Reporte.objects.values('resolved').annotate(total=Count('resolved')).order_by()))
        kpilist.append(("count_photos_by_date", Photo.objects.extra({'date_created' : "date(created_at)"}).values('date_created').annotate(created_count=Count('id')).order_by("date_created")))
        kpilist.append(("count_comments_by_date", Comment.objects.extra({'date_created' : "date(created_at)"}).values('date_created').annotate(created_count=Count('id')).order_by("date_created")))
        kpilist.append(("count_total_reports", Reporte.objects.all().count()))
        # NOTE: We had to add manually as_dict as method for categories
        kpilist.append(("count_popular_categories", [ add_field(obj.as_dict(),"num_photos",obj.num_photos) for obj in  Category.objects.annotate(num_photos=Count('photo')).order_by()][:10] ))
        kpilist.append(('count_popular_metadata', [ add_field(obj.as_dict(), "num_photos", obj.num_photos) for obj in Metadata.objects.annotate(num_photos=Count('photo')).order_by()][:10] ))
        #kpilist.append(("count_popular_categories", Category.objects.annotate(num_photos=Count('photo')).order_by('num_photos')[:5]))
        #kpilist.append(("count_popular_metadata", Metadata.objects.annotate(num_photos=Count('photo')).order_by('num_photos')[:5]))

        for pair in kpilist:
            output[pair[0]] = pair[1]
        return Response(output)
