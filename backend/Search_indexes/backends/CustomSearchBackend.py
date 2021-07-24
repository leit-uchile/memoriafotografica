from django_elasticsearch_dsl_drf.filter_backends import SearchFilterBackend

class CustomSearchBackend(SearchFilterBackend):
    def filter_queryset(self, request, queryset, view):
        """Filter the queryset.
        :param request: Django REST framework request.
        :param queryset: Base queryset.
        :param view: View.
        :type request: rest_framework.request.Request
        :type queryset: elasticsearch_dsl.search.Search
        :type view: rest_framework.viewsets.ReadOnlyModelViewSet
        :return: Updated queryset.
        :rtype: elasticsearch_dsl.search.Search
        """

        __queries = self.construct_search(request, view) + \
            self.construct_nested_search(request, view)

        terms_dict = queryset.to_dict().get('query').get('bool').get('filter')
        if terms_dict is None:
            queryset = queryset.query('bool', should=__queries)
        else:
            includesWord = terms_dict[0].get('terms').get('searchIncludes.raw')[0]
            if includesWord == "allWords":
                queryset = queryset.query('bool', must=__queries)
            else: 
                queryset = queryset.query('bool', should=__queries)
        return queryset