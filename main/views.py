from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def about(request):
    return render(request, 'about.html', {})


def terms(request):
    return render(request, 'terms.html', {})

@login_required(login_url='/accounts/login/')
def home(request):
    return render(request, 'home.html', {})