import csv
import pandas as pd
import random
import re
# import threading
import logging
from multiprocessing import Process, Pool
from datetime import datetime
from time import sleep
from sendGmail import sendViaGmail
import os
# sys.path.append(os.path.join(os.path.dirname(__file__), "cadus_utilities"))

from oaUtilities import randomSleep, splitIntoListArray, getBothCAN_US, dictToDF, saveToFile, combineCsvToOneFile, utilsPathFileName, utilsPathTempFileName, deleteAllFilesInFolder, createTempFile, getListOfFileNames, setFocusWindowsApplication
from KeyMouseCtrl import moveMouseWake

def sendEmail(y_or_n, filenameCSV,sendToEmailAddress):
    '''
        >>> y or Y,... will send email
        else no email sent
    '''
    if y_or_n.upper() == 'Y':
        fromaddr = "bootstrapu@gmail.com"
        eml_pswrd = os.environ.get('BOOTSTRAP_PASSWORD', 'Not Set')
        toaddr = sendToEmailAddress              
        filename = filenameCSV
        filePath = utilsPathFileName('')

        sendViaGmail(fromaddr, eml_pswrd, toaddr, filename, filePath)

def runCleanupOfTempFolder():
    dirPath = utilsPathTempFileName('')
    deleteAllFilesInFolder(dirPath)
    createTempFile(dirPath, 'tempCan0.html')
    createTempFile(dirPath, 'tempUS0.html')

def runCleanupOf_oaList_Folder():
    dirPath = utilsPathFileName('oaList')
    deleteAllFilesInFolder(dirPath)


def runSuperCode():

    if __name__ == "__main__":  # confirms that the code is under main function
        
        logging.basicConfig(filemode= utilsPathTempFileName('myLog.log'))
        logger = logging.getLogger()

        # ********************************************

        # Roadmap - fetch file from google drive
        runCleanupOfTempFolder()
        oaFileDirPath = utilsPathFileName('oaList')
        fileName = getListOfFileNames(oaFileDirPath)
        if fileName == 'NoFile':
            return None
        
        fileNameCSV = f'{fileName}.csv'
        df_asin = pd.read_excel(utilsPathFileName(f'oaList\{fileName}'), converters={'ASIN': lambda x: str(x)})
        print(df_asin)
        
        myFullASINList = df_asin['ASIN'].drop_duplicates().values.tolist()
        print(myFullASINList)

        numOfLists = 1
        STARTNUM = 0  #  must be 0 to get first value
        recordsPerList = 2000

        # initalize empty lists
    # asinSubList = [[] for _ in range(numOfLists)]  -- dont need, moved to function and return that list
    # thread = [[] for _ in range(numOfLists)]  -- might not need this
    # dfList = [pd.DataFrame() for _ in range(n)]  # May not need as we are appendint o csv file

        # ********************************************


        # creaet an array of List to store the ASIN numbers
        asinSubList = splitIntoListArray(myFullASINList, numOfLists, STARTNUM, recordsPerList)
        # Need to change numOfLists if the is less items
        numOfLists = len(asinSubList)


        # *******************  set focus to browser for automation  *****************
        setFocusWindowsApplication('\w','Chrome_WidgetWin_1')


        # *******************  Multi Process  *****************
        # Create new procs and append to list
        procs = []
        for i in range(numOfLists):

            proc = Process(target=saveToFile, args=(asinSubList[i], i, today, f'_Result{i}.csv', False))
                # def saveToFile(myASINList, threadNum, todaysDate, fileNameExtensionName='_Result.csv', isTest):
                # -> see oaUtilities.py for details
            procs.append(proc)

        # Start all procs stored in list
        [proc.start() for proc in procs]
        # # wait for all procs before proceeding
        [proc.join() for proc in procs]

        # *******************  Multi Process  *****************





        # ***********************   combine all csv files  **********************************

        allCsvFiles = ['{}_Result{}.csv'.format(today,i) for i in range(numOfLists)]
        print(allCsvFiles)
        HEADERS =  ['ASIN', 'Seller_canada','priceTotal_canada', 'Condition_canada','Seller_usa', 'priceTotal_usa', 'Condition_usa',
            'is_FBA_usa','lowestPriceFloorusa','US_ConvertedPriceTo_CAD','ProfitFactor','PF_10pctBelow','PF_15pctBelow']

        combineCsvToOneFile(allCsvFiles, HEADERS, utilsPathFileName(f'results\{fileNameCSV}'))


        with open(utilsPathFileName(f'results\{fileNameCSV}'), 'r', encoding="utf-8") as f:
            reader = csv.reader(f)
            your_list = list(reader)

        # ***********************   combine all csv files  **********************************
        
        runCleanupOf_oaList_Folder() # cleanup filder so it can read from clean folder
        runCleanupOfTempFolder()

        yes_or_no_input = 'y'
        # sendEmail(yes_or_no_input, f'results\{fileNameCSV}', "warrenv@gmail.com" )
        sendEmail(yes_or_no_input, f'results\{fileNameCSV}', "ron.calibuso@gmail.com" )

        return your_list

# uncomment for testing


today = datetime.today().strftime('%Y-%m-%d')
timeStart = datetime.now()

# ***************************
# yes_or_no_input = input("do you want to send email? y or n ??: ") 
# yes_or_no_input = 'y'
# fileName = '2019 11 27 SEARCH 1-4 V4 PART 1.xlsx'
moveMouseWake(0,0,30,30)
runSuperCode()  
# ***************************

timeEnd = datetime.now()
totalMin = timeEnd - timeStart
print('Start Time:  {}'.format(timeStart))
print('End Time:  {}'.format(timeEnd))
print('Total Time:  {}'.format(totalMin))




# asd
