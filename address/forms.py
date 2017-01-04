from django import forms
from .models import District


class AddressFrom(forms.Form):
    district = forms.ModelChoiceField(queryset=District.objects.all())
    thana = forms.ChoiceField()
    post = forms.ChoiceField()