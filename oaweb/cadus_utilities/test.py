import selenium.webdriver as webdriver
import selenium.webdriver.support.ui as ui
from selenium.webdriver.common.keys import Keys
from time import sleep
import os

from oaUtilities import randomSleep, splitIntoListArray, getBothCAN_US, dictToDF, saveToFile, combineCsvToOneFile, utilsPathFileName, utilsPathTempFileName, deleteAllFilesInFolder, createTempFile, getListOfFileNames

# tempDirectory = utilsPathTempFileName('')


# print(utilsPathFileName('oaList'))

# def runCleanupOf_oaList_Folder():
#     dirPath = utilsPathFileName('oaList')
#     deleteAllFilesInFolder(dirPath)



oaFileDirPath = utilsPathFileName('oaList')
fileName = getListOfFileNames(oaFileDirPath)
print(fileName)

