from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    url('^api$', views.api),
    url('^search$', views.search),
    url("^$", views.index),
    url("^index.html$", views.index),
    url("^author_result.html$", views.author_result),
    url("^author_info.html$", views.author_info),
    url("^topic_info.html$", views.my_topic_info),
]