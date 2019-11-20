import csv
import pandas as pd
import random
import re
import os
import threading
from datetime import datetime
from time import sleep
from oaUtilities import randomSleep, splitIntoListArray, getBothCAN_US, dictToDF, saveToFile, combineCsvToOneFile, utilsPathFileName, utilsPathTempFileName
from sendGmail import sendViaGmail


# df_asin = pd.read_csv(utilsPathFileName('asin2.csv'))
# myFullASINList = df_asin['ASIN'].drop_duplicates().values.tolist()
# numOfLists = 6
# STARTNUM = 0  #  must be 0 to get first value
# recordsPerList = 300
# # creaet an array of List to store the ASIN numbers
# asinSubList = splitIntoListArray(myFullASINList, numOfLists, STARTNUM, recordsPerList)
# print(asinSubList[-1])




# df_asin = pd.read_csv(utilsPathFileName('asin2.csv'))
# df_restlts = pd.read_csv(utilsPathTempFileName('combinedCSV.csv'))
# df_restlts_asin = df_restlts['ASIN']
# df_all = df_asin.merge(df_restlts_asin, on=['ASIN'], how='left', indicator=True)
# df_all.to_csv(utilsPathTempFileName('Left_only.csv'), mode='a', header=False) 





def sendEmail(y_or_n, filenameCSV):
    '''
        >>> y or Y,... will send email
        else no email sent
    '''
    if y_or_n.upper() == 'Y':
        fromaddr = "bootstrapu@gmail.com"
        eml_pswrd = os.environ.get('BOOTSTRAP_PASSWORD', 'Not Set')
        toaddr = "ron.calibuso@gmail.com"
        filename = filenameCSV
        filePath = utilsPathTempFileName('')

        sendViaGmail(fromaddr, eml_pswrd, toaddr, filename, filePath)


fileName = '2019 11 19 400K ALL SET 1.xlsx'
fileNameCSV = f'{fileName}.csv'
yes_or_no_input = 'y'
sendEmail(yes_or_no_input, fileNameCSV)