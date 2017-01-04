from django.db import models


class District(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Thana(models.Model):
    name = models.CharField(max_length=50)
    district = models.ForeignKey(District, related_name='thana')

    def __str__(self):
        return self.name


class PostOffice(models.Model):
    name = models.CharField(max_length=50)
    thana = models.ForeignKey(Thana, related_name='postoffice')

    def __str__(self):
        return self.name
