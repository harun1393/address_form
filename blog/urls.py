from django.conf.urls import url, include
from . import views

# TODO set default error pages

urlpatterns = [
    url(r'^student/$', views.student_list, name='student_list'),
    url(r'^std/$', views.StudentList.as_view(), name='student_list'),
    #url(r'^std/(?P<pk>[0-9]+)/$', views.student_detail, name='student_detail'),
    url(r'^users/$', views.UserList.as_view(), name='user_list'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail, name='user_detail'),

]