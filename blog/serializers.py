from rest_framework import serializers
from .models import StudentInfo
from django.contrib.auth.models import User


class StudentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    age = serializers.IntegerField()
    roll = serializers.IntegerField()

    def create(self, validated_data):
        return StudentInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.title)
        instance.age = validated_data.get('age', instance.age)
        instance.roll = validated_data.get('roll', instance.roll)

        instance.save()
        return instance


class StudentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentInfo
        fields = ('name','age', 'roll')


class UserSerializer(serializers.ModelSerializer):
    studentinfo = serializers.PrimaryKeyRelatedField(many=True, queryset=StudentInfo.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'studentinfo')

