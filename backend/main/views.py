import os

from django.views.generic import View

from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render

# Create your views here.

class IndexView(View):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        abspath = open(os.path.join(settings.BASE_DIR, './static/dist/index.html'), 'r')
        return HttpResponse(content=abspath.read())