from django.db import models


class StudentInfo(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    roll = models.IntegerField()
    #guardian = models.ForeignKey('auth.User',)

    def __str__(self):
        return self.name


