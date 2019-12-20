import pandas as pd
import random
import os, shutil
import pywinauto

from oaSscrape import AMZSoupObject, AllOffersObject
from os import listdir
from os.path import isfile, join
from time import sleep



BASE_oaAPP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_oaAPP_Utilities_DIR  = os.path.join(BASE_oaAPP_DIR, 'cadus_utilities')
BASE_oaAPP_Utilities_temp_DIR  = os.path.join(BASE_oaAPP_Utilities_DIR, 'temp')

def utilsPathFileName(fileName):
    return os.path.join(BASE_oaAPP_Utilities_DIR, fileName)

def utilsPathTempFileName(fileName):
    return os.path.join(BASE_oaAPP_Utilities_temp_DIR, fileName)


def randomSleep(myList=None):
    ''' random sleep function
        
        randomSleep() -> use default sleep seconds to choose from
        randomSleep([3,5,6]) -> define your own list
        randomSleep([2]) -> define your own list single value
        randomSleep(2) -> define your own list (converts to list)

    '''
    sleepTimesSeconds = [5,12,17,24]

    if myList:
        if isinstance(myList, list):
            sleepTimesSeconds = myList
        else:
            sleepTimesSeconds = [myList]

    sleep(random.choice(sleepTimesSeconds))  # sleep rando seconds seconds



def splitIntoListArray (sourceList, rangeVal, start, recordsPerList):
    '''
        get initial CSV list, then breaks them down to individual List array
        based on the recordsPerList
        end result is a list array with different ASIN numbers to be used for MultiThreading
    '''

    splitListArray = [[] for _ in range(rangeVal)]
    startNum = start
    endNum = startNum + recordsPerList 
    for i in range(rangeVal):
        splitListArray[i] = sourceList[ startNum : endNum]
        startNum = endNum 
        endNum = startNum + recordsPerList 

    # remove any list that is empty then ruturns true list based on items
    splitListArray = list(filter(None, splitListArray))
    return splitListArray


def getBothCAN_US(itemNum, threadNum, isTest):
    
    loopDict = {'canada': ['ca', f'tempCan{threadNum}.html', None],
                'usa': ['com', f'tempUS{threadNum}.html', 'ApplyUSFilter']
                }

    compareDict = {}

    for k, v in loopDict.items():
        print('{}: reading dict {},{} {}'.format(itemNum, k, v[0], v[1]))

        # stores each Item into an amazon Object, first do Canada, then US based on Dict
        myAmazonObj = AMZSoupObject(itemNum, v[0], utilsPathTempFileName(v[1]), isTest) 
        soup = myAmazonObj.soupObj()

        # stores the ENTIRE soup object to a Class to be further filtered
        alloffersObj = AllOffersObject(soup, v[2])
        # extracts only the Offers div tags baed on attrs={'class': 'olpOffer'}
        alloffersDivTxt = alloffersObj.getAllDataFromAttrib(
            'class', 'olpOffer')
        combinedDict = alloffersObj.getAllSellerDict(alloffersDivTxt)
        lowestDict = alloffersObj.getLowestPricedObjectBasedOnCriteria(
            combinedDict)

        if k == 'canada':
            compareDict[itemNum] = {'Seller_{}'.format(k): lowestDict['sellerName'],
                                    'priceTotal_{}'.format(k): lowestDict['priceTotal'],
                                    'Condition_{}'.format(k): lowestDict['condition']}
        else:
            compareDict[itemNum].update({'Seller_{}'.format(k): lowestDict['sellerName'],
                                         'priceTotal_{}'.format(k): lowestDict['priceTotal'],
                                         'Condition_{}'.format(k): lowestDict['condition'],
                                         'is_FBA_{}'.format(k): lowestDict['isFBA'],
                                         'lowestPriceFloor{}'.format(k): lowestDict['lowestPriceFloor']})

        # randomSleep([3,5,6])
        # randomSleep([2])

    print('********************************* Final combinedDict below will be printed')
    print(compareDict)
    return compareDict





def dictToDF(myDict):

    def pct_gain(CAD_Price, US_Price, USpctReduction=None): return (
        (US_Price*(100-USpctReduction)/100) - CAD_Price) / CAD_Price

    def getUSConversion(x):
        return x * 1.33

    dfTemp = pd.DataFrame.from_dict(myDict, orient='index')
    dfTemp["US_ConvertedPriceTo_CAD"] = dfTemp.priceTotal_usa.apply(
        getUSConversion)
    dfTemp["ProfitFactor"] = pct_gain(
        dfTemp.priceTotal_canada, dfTemp.priceTotal_usa, 0).round(2)
    dfTemp["PF_10pctBelow"] = pct_gain(
        dfTemp.priceTotal_canada, dfTemp.priceTotal_usa, 10).round(2)
    dfTemp["PF_15pctBelow"] = pct_gain(
        dfTemp.priceTotal_canada, dfTemp.priceTotal_usa, 15).round(2)
    return dfTemp



def saveToFile(myASINList, threadNum, todaysDate, fileNameExtensionName='_Result.csv', isTest=False):

    for index, i in enumerate(myASINList):

        print(f'\nthread {threadNum} running item {index} in a list of list {len(myASINList)}\n')
        tempDF = dictToDF(getBothCAN_US(i, threadNum, isTest))

        print (f' xxxxxxxxxxxxxxxxxxxxxxxxxxxxx      process id: is {os.getpid()}' )
        print(f'\nthread {threadNum} running item {index} in a list of list {len(myASINList)}')
        print(tempDF)
        

        tempDF.to_csv(utilsPathTempFileName(todaysDate + fileNameExtensionName), mode='a', header=False) 

        # No need anymore as we are append to file now so DF is technically not needed
        # myDf = myDf.append(x)
        # myDf.to_csv(today + fileNameExtensionName)
        # randomSleep()

    print(' ****************** Non filtered DF ***************')



def combineCsvToOneFile (allCsvFiles, headers, NewFileName):
    
    combined_csv_to_Pandas = pd.concat([pd.read_csv(utilsPathTempFileName(f),names=headers) for f in allCsvFiles ])
    print('combinging csv and writing to new file')
    print(combined_csv_to_Pandas.head())
    combined_csv_to_Pandas.to_csv( NewFileName, index=False, encoding='utf-8-sig')


def deleteAllFilesInFolder(filePath):
    print (f'deleting all files/folders in {filePath}')
    folder = filePath

    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))


def createTempFile(filePath, fileName):
    print (f'creating file {fileName} in {filePath}')

    with open(os.path.join(filePath, fileName), "w") as f:   # Opens file and casts as f 
        f.write("Hello World form " + f.name)      


def getListOfFileNames(dirPath):
    onlyfiles = [f for f in listdir(dirPath) if isfile(join(dirPath, f))]
    print(f'list of files are : {onlyfiles}')

    if len(onlyfiles) > 0:
        return onlyfiles[0]
    else:
        return 'NoFile'
    # get the one with latest date???
    # no file logic


def setFocusWindowsApplication(titleName, ClassName):

    '''
    Function to set focus on a windows application
    sample:     setFocusWindowsApplication('\w','Chrome_WidgetWin_1')
        in this case we are using a regex expresstion to exxentially get anything with '\w'
        Chrome_WidgetWin_1 is the Class name

        NOTE: you can get the class name using an app called swapy https://github.com/pywinauto/SWAPY
        where you can spy on programs, even get the Handle ID instead if you choose
    '''

    # SWAPY will record the title and class of the window you want activated
    app = pywinauto.application.Application()
    # SWAPY_List = [u'Notepad', u'*Untitled - Notepad', u'*Untitled - NotepadNotepad']
    # c, t = SWAPY_List[0], SWAPY_List[1]
    # print(f'class is {c}')
    # print(f'title is {t}')
    # using best match
        # print(pywinauto.findwindows.find_windows(best_match=titleName, class_name=ClassName)) 
    # using reg expression    
        # print(pywinauto.findwindows.find_windows(title_re=u'\w', class_name=u'Chrome_WidgetWin_1'))

    handle_List =pywinauto.findwindows.find_windows(title_re=titleName, class_name=ClassName)
    handle = handle_List[-1]
    window = app.connect(handle=handle).window(handle=handle)
    window.set_focus()