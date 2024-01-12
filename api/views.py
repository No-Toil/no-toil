from django.shortcuts import render
from rest_framework import viewsets, permissions

from . import serializers
from . import models

class Todo(viewsets.ModelViewSet):
    serializer_class = serializers.Todo
    queryset = models.Todo.objects.all()
    permission_classes = (permissions.AllowAny, )

class FilterBible(viewsets.ModelViewSet):
    serializer_class = serializers.FilterBible
    queryset = models.FilterBible.objects.all()
    permission_classes = (permissions.AllowAny, )