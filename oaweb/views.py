from django.shortcuts import render

def home(request):
    return render(request,'home.html',{})



def super(request):
    return render(request,'super.html',{})
