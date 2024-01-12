from rest_framework import serializers, status
from rest_framework.response import Response

from . import models

class Todo(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = "__all__"

class FilterBible(serializers.ModelSerializer):
    class Meta:
        model = models.FilterBible
        fields = "__all__"
