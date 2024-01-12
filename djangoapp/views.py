from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from rest_framework import viewsets

# Create your views here.
class Index(View):
   def get(self, request):
      return render(request, "djangoapp/index.html", context={
         # context information to be passed from django backend on page load
      })
