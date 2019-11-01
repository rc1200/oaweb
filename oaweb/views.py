from django.shortcuts import render, redirect
from . cadus_utilities.test import runSuperCode

import webbrowser



def home(request):
    return render(request,'home.html',{})



def super(request):
    runSuperCode()
    return render(request,'super.html',{})


def open(request):
    webbrowser.open('http://google.com')  # Go to example.com
    return render(request,'home.html',{})
