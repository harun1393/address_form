from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from blog.models import StudentInfo
from blog.pagination import StudentLimitPageNumber
from blog.serializers import StudentSerializer, UserSerializer, StudentModelSerializer
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination



class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@api_view(['GET', 'POST'])
def student_list(request):
    '''
    List all student or create new student
    '''
    if request.method == 'GET':
        #pagination_class = LimitOffsetPagination
        student = StudentInfo.objects.all()
        serializer = StudentSerializer(student, many=True)
        pagination_class = StudentLimitPageNumber
        return Response(serializer.data)

    if request.method=='POST':
        data = JSONParser().parse(request)
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# model serializer view
class StudentList(APIView):
    def get(self, request):
        student = StudentInfo.objects.all()
        serializers = StudentModelSerializer(student, many=True)
        #pagination_class = StudentLimitPageNumber
        #print (pagination_class)
        return Response(serializers.data)

    def post(self, request):
        serializer = StudentModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def student_detail(request, pk):
    '''
    Retrive, update and delete student
    :param request:
    :param pk:
    :return:
    '''
    try:
        student = StudentInfo.objects.get(pk=pk)
    except StudentInfo.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return JSONResponse(serializer.data)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = StudentSerializer(student, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        student.delete()
        return HttpResponse(status=204)

class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer