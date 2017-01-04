from django.shortcuts import render
from rest_framework import generics
from address.models import District, Thana, PostOffice
from .serializers import DistrictSerializer, ThanaListSerializer


class DistictList(generics.ListAPIView):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = District.objects.all()
        pk = self.request.query_params.get('pk', None)
        if pk is not None:
            queryset = queryset.filter(pk=pk)
            return queryset
        return queryset


class ThanaList(generics.ListAPIView):

    serializer_class = ThanaListSerializer

    def get_queryset(self):
        queryset = Thana.objects.all()
        thana = self.request.query_params.get('thana', None)
        if thana is not None:
            queryset = queryset.filter(name=thana)
            return queryset
        return queryset
