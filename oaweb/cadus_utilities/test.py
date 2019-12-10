import selenium.webdriver as webdriver
import selenium.webdriver.support.ui as ui
from selenium.webdriver.common.keys import Keys
from time import sleep
import os
import sys

from oaUtilities import randomSleep, splitIntoListArray, getBothCAN_US, dictToDF, saveToFile, combineCsvToOneFile, utilsPathFileName, utilsPathTempFileName, deleteAllFilesInFolder, createTempFile, getListOfFileNames

# tempDirectory = utilsPathTempFileName('')


# print(utilsPathFileName('oaList'))

# def runCleanupOf_oaList_Folder():
#     dirPath = utilsPathFileName('oaList')
#     deleteAllFilesInFolder(dirPath)


# print(os.path.join('', 'cadus_utilities'))
print(sys.executable)