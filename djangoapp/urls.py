from django.urls import path, re_path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

from . import views

urlpatterns = [
   # render views (rely on react router to render)
   re_path(r".*", views.Index.as_view()),
]