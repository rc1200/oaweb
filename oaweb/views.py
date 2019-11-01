from django.shortcuts import render, redirect
from . cadus_utilities.test import runSuperCode


def home(request):
    return render(request,'home.html',{})



def super(request):
    runSuperCode()
    return render(request,'super.html',{})
