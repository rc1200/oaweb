from django.shortcuts import render, redirect
from . cadus_utilities.test import runSuperCode

import webbrowser



def home(request):
    return render(request,'home.html',{})



def super(request):
    runSuperCode()
    return render(request,'super.html',{})


def open(request):

    print('hi2')
    from selenium import webdriver
    import os

    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument("--no-sandbox")
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    driver.get('https://www.google.com')

    return render(request,'home.html',{})