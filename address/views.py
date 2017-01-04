from django.shortcuts import render
from .forms import AddressFrom


def get_address(request):

    context = {'form': AddressFrom()}
    return render(request, 'address/address.html', context)



