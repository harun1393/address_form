from django.conf.urls import url, include
from . import views

# TODO set default error pages

urlpatterns = [
    url(r'^districts/', views.DistictList.as_view(), name='district_list'),
    url(r'^thanas/$', views.ThanaList.as_view(), name='thana_list'),


]