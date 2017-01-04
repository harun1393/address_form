from address.models import District, Thana, PostOffice
from rest_framework import serializers


class DistrictSerializer(serializers.ModelSerializer):
    thana = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = District
        fields = ('pk', 'name', 'thana')


class ThanaListSerializer(serializers.ModelSerializer):
    postoffice = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Thana
        fields = ('pk', 'name', 'postoffice')


