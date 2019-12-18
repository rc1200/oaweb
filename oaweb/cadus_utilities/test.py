import selenium.webdriver as webdriver
import selenium.webdriver.support.ui as ui
from selenium.webdriver.common.keys import Keys
from time import sleep
import os
import sys

from oaUtilities import randomSleep, splitIntoListArray, getBothCAN_US, dictToDF, saveToFile, combineCsvToOneFile, utilsPathFileName, utilsPathTempFileName, deleteAllFilesInFolder, createTempFile, getListOfFileNames, setFocusWindowsApplication

# tempDirectory = utilsPathTempFileName('')


# print(utilsPathFileName('oaList'))

# def runCleanupOf_oaList_Folder():
#     dirPath = utilsPathFileName('oaList')
#     deleteAllFilesInFolder(dirPath)


# print(os.path.join('', 'cadus_utilities'))
# from pywinauto.application import Application

# app = Application().start(cmd_line=u'"C:\\WINDOWS\\system32\\notepad.exe" ')
# notepad = app.Notepad
# notepad.wait('ready')
# notepad.setFocus()

# app.Kill_()



setFocusWindowsApplication('\w','Chrome_WidgetWin_1')
