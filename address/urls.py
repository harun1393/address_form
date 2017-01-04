from django.conf.urls import url, include
from . import views

# TODO set default error pages

urlpatterns = [
    url(r'^$', views.get_address, name='get-address'),


]