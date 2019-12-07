import pandas as pd
import random
import re
import requests
import time
import os
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from KeyMouseCtrl import goToWebPage, saveWebPageToFile

BASE_oaAPP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_oaAPP_Utilities_DIR  = os.path.join(BASE_oaAPP_DIR, 'cadus_utilities')

def utilsPathFileName(fileName):
    return os.path.join(BASE_oaAPP_Utilities_DIR, fileName)


# ********************************************


class AMZSoupObject(object):

    ''' Doc String

        Creates soup object from Amazon Listing
        for parameters use:
            itemNumber => ISBN number for book
            dotCAordotCOM =>
                = 'ca' to get the Canadian Prices
                = 'com' to get the Americian Prices filtered by Prime Eligible

            [readFromFile] => option parameter, put File Name of the html document instad of fetching from web
                            if has value then read from a file instead of going to actual site

    sample: myAmazonObj = AMZSoupObject('007738248X', 'com', 'testUS.html') N.B. Reads from file because of file name 'testUS.html'
    sample: myAmazonObj = AMZSoupObject('007738248X', 'com') NOT reading from file, instead going to web to fetch data

    '''

    # constant for all classes

    # num_of_AMZ_objects = 0 # counter

    userAgents = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0',
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362',
                  'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
                  'Opera/9.80 (Macintosh; Intel Mac OS X 10.14.1) Presto/2.12.388 Version/12.16',
                  'Mozilla/5.0 (Windows NT 6.0; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 12.14',
                  'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
                  'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57',
                  'Mozilla/5.0 (Linux; Android 9; Pixel 2 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36',
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36']

    # Adding Random headers to avoid throttling from Amazon
    HEADERS = {
        'User-Agent': random.choice(userAgents)}

    CHROME_HEADER = random.choice(userAgents)

    def __init__(self, itemNumber, dotCAordotCOM, readFromFile=None, isTest=None):
        self.itemNumber = itemNumber
        self.dotCAordotCOM = dotCAordotCOM
        self.readFromFile = readFromFile
        self.isTest = isTest
        # AMZSoupObject.num_of_AMZ_objects += 1

    def urlType(self):
        if self.dotCAordotCOM.upper() == 'CA':
            return 'https://www.amazon.ca/gp/offer-listing/{}'.format(self.itemNumber)
        elif self.dotCAordotCOM.upper() == 'COM':
            return 'https://www.amazon.com/gp/offer-listing/{}/ref=olp_f_primeEligible?f_primeEligible=true'.format(self.itemNumber)
            # return 'https://www.amazon.com/gp/offer-listing/{}'.format(self.itemNumber)

    def saveToFile(self, FileName, url):


        # Local Machine i7
        goToWebPage(785, 49, url)
        saveWebPageToFile(871 , 437,'', FileName)
        # Local Machine i7

        # remote Server #
        # goToWebPage(423, 56, url)
        # saveWebPageToFile(319, 434,'', FileName)
        # remote Server #

# run locally
        # self.options.add_argument('--disable-gpu')  # Last I checked this was necessary for Windows.
        # self.options.add_argument('--ignore-certificate-errors')
        # self.options.add_argument('--incognito')

        # self.options = webdriver.ChromeOptions()
        # # self.options.add_argument("--headless")
        # # self.options.add_argument(f'user-agent={self.CHROME_HEADER}')
        # chrome_path = utilsPathFileName('chromedriver.exe')
        # self.driver = webdriver.Chrome(chrome_path, options=self.options)
# run locally

# *************************************************************

# for heroku

        # self.chrome_options = webdriver.ChromeOptions()
        # self.chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
        # self.chrome_options.add_argument("--no-sandbox")
        # self.chrome_options.add_argument("--headless")
        # # self.chrome_options.add_argument(f'user-agent={self.CHROME_HEADER}')
        # self.chrome_options.add_argument("--disable-dev-shm-usage")
        # self.driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=self.chrome_options)

# for heroku


        print(f'\n{url}   urLLLLLLLLLL  for item: {self.itemNumber} \n')
        # print(f'number of total Objects created is : {AMZSoupObject.num_of_AMZ_objects}')
        
        # self.driver.get(url)
        # time.sleep(5)

        # with open(FileName, 'w', encoding="utf-8") as f:
        #     f.write(self.driver.page_source)

        # self.driver.close()
# *************************************************************
        

    def soupObj(self):
        if self.readFromFile is not None:
            if self.isTest:
                print('Reading test File file {}'.format(self.readFromFile))
                return BeautifulSoup(open(self.readFromFile, encoding="utf-8"), 'lxml')
            else:        
                self.saveToFile(self.readFromFile, self.urlType())
                # soup = BeautifulSoup(open('test.html'), 'lxml')  # note for some reason html.parser was not getting all the data
                # soup = BeautifulSoup(open('testUS.html'), 'lxml')  # note for some reason html.parser was not getting all the data
                print(f'Reading from file {self.readFromFile} for Item: {self.itemNumber}')
                # note for some reason html.parser was not getting all the data
                return BeautifulSoup(open(self.readFromFile, encoding="utf-8"), 'lxml')
        else:
            response = requests.get(self.urlType(), headers=self.HEADERS)

            try:
                response.raise_for_status()
            except requests.exceptions.HTTPError as e:
                print(e)

            return BeautifulSoup(response.content, 'lxml')


class AllOffersObject(object):
    """docstring for Alloffers
        all the offers for each ROW is stored in this Div class
        creates a list of ojects which we will further parse out

        getAllDataFromAttrib: stores HTML doc for all the offers



    """
    # Class Variables, use Setters to change default values
    __PriceMustBeGreaterThan = 1
    __PositiveFeedbackPctMustBeGreaterThan = 87
    __SellerRatingMustBeGreaterThan = 34

    num_of_AMZ_objects = 0 # counter

    def __init__(self, offersSoup, USFilter=None):
        self.offersSoup = offersSoup
        self.USFilter = USFilter

        # Private Varables N.B. Keep hard coded, add methon to update later
        # INCLUDE List for Condition
        self.__conditionTextExcludeList = 'used - acceptable, collectible - acceptable, Rental'
        # Exclude List for Seller info
        self.__sellerTextExcludeList = 'Just Launched'
        # Exclude List for Delivery
        self.__deliveryTextExcludeList = 'India'

        self.setUsFilters(self.USFilter)
        AllOffersObject.num_of_AMZ_objects += 1
        print(f'\nnumber of total Objects created is : {AllOffersObject.num_of_AMZ_objects}\n')

    # change Values if US Prices
    def setUsFilters(self, v):
        if v is not None:
            self.__PriceMustBeGreaterThan = 1
            self.__PositiveFeedbackPctMustBeGreaterThan = -99
            self.__SellerRatingMustBeGreaterThan = -99
            self.__conditionTextExcludeList = 'Rental'
            self.__sellerTextExcludeList = 'xazxx'
            self.__deliveryTextExcludeList = 'xazxx'

        return None

    # Setters for Class Variables

    def setPriceMustBeGreaterThan(self, v):
        self.__PriceMustBeGreaterThan = v

    def setPositiveFeedbackPctMustBeGreaterThan(self, v):
        self.__PositiveFeedbackPctMustBeGreaterThan = v

    def setSellerRatingMustBeGreaterThan(self, v):
        self.__SellerRatingMustBeGreaterThan = v

    # Option 1 for getter and setter, use variable to call the getter and setter methods and use as a property
    def get_conditionTextIncludeList(self):
        return self.__conditionTextExcludeList

    def set_conditionTextIncludeList(self, setter_value):
        self.__conditionTextExcludeList = setter_value

    conditionTextIncludeListProperty = property(
        get_conditionTextIncludeList, set_conditionTextIncludeList)

    # Option 2, explictly using decorators
    @property
    def deliveryTextExcludeList(self):
        return self.__deliveryTextExcludeList

    # @deliveryTextExcludeList.setter
    # instead use a method instead to explictly define it is a method
    def setDeliveryTextExcludeList(self, setter_value):
        self.__deliveryTextExcludeList = setter_value

    def getAllDataFromAttrib(self, htmlType=None, attribName=None):
        htmlTypeVal = htmlType if htmlType else 'class'
        attribNameVal = attribName if attribName else 'olpOffer'
        return self.offersSoup.find_all(attrs={htmlTypeVal: attribNameVal})

    # safeguad when fetching data if type is NONE ie. there is no text (ie. Shipping olpShippingPrice class)
    def getText(self, sellerDivSoupObj, className):
        if sellerDivSoupObj.find(attrs={'class': className}) is not None:
            return sellerDivSoupObj.find(attrs={'class': className}).text.strip()
        else:
            return '0'

    def getPriceOnly(self, priceString):
        return(float(re.sub('[^0-9.]', "", priceString)))

    def extractViaRegex(self, strSample, regExPattern, groupNumber, NoneReplacementVal):
        returnRegEx = re.search(regExPattern, strSample)
        if returnRegEx is None:
            returnRegEx = NoneReplacementVal
        else:
            returnRegEx = returnRegEx.group(groupNumber).strip()

        return returnRegEx

    def getCategoryDataForOneSeller(self, offer_list_index):

        price = self.getPriceOnly(self.getText(
            offer_list_index, 'olpOfferPrice'))
        # price = float(extractViaRegex(getText(offer_list_index, 'olpOfferPrice'), '(\d+\.?\d+)', '0'))
        priceShipping = self.getPriceOnly(
            self.getText(offer_list_index, 'olpShippingPrice'))
        allSellerInfo = self.getText(offer_list_index, 'olpSellerColumn')
        sellerName = self.extractViaRegex(
            allSellerInfo, '^(.*)\n.*', 1, 'Amazon')
        sellerPositive = int(self.extractViaRegex(
            allSellerInfo, '(\d+)%', 1, '0'))
        # sellerRating = extractViaRegex(allSellerInfo, '(\d+,?\d+)\stotal ratings', 1, '0')
        sellerRating = int(self.extractViaRegex(
            allSellerInfo, '(\d?,?\d+)\stotal ratings', 1, '0').replace(',', ''))
        delivery = self.getText(offer_list_index, 'olpDeliveryColumn')
        isFBA = False
        if 'Fulfillment by Amazon' in delivery:
            isFBA = True

        sellerData = {
            'price': self.getPriceOnly(self.getText(offer_list_index, 'olpOfferPrice')),
            'priceShipping': self.getPriceOnly(self.getText(offer_list_index, 'olpShippingPrice')),
            'priceTotal': price + priceShipping,
            'condition': re.sub(r'([^a-zA-Z0-9\-]+|(\n))', ' ', self.getText(offer_list_index, 'olpCondition').strip()),
            'sellerName': sellerName,
            'sellerPositive': sellerPositive,
            'sellerRating': sellerRating,
            'seller': allSellerInfo,
            'delivery': delivery,
            'isFBA': isFBA
        }

        return sellerData

    def storeAllOffersToPandas(self, allOffers):
        tempPandas = pd.DataFrame()
        for i in allOffers:
            if self.getCategoryDataForOneSeller(i):
                tempPandas = tempPandas.append(
                    self.getCategoryDataForOneSeller(i), ignore_index=True)

        # export the data into a csv file
        tempPandas.to_csv('exported_to_csv.csv')
        return tempPandas


    def filterCriteria(self, dict):

        boolCriteria = True

        # INCLUDE List for Condition (see private variables)
        conditoinExcludeSet = set(
            [x.strip().upper() for x in self.__conditionTextExcludeList.split(',')])

        # Exclude List for Seller info  (see private variables)
        sellerExcludeSet = set(
            [x.strip().upper() for x in self.__sellerTextExcludeList.split(',')])

        # Exclude List for Delivery  (see private variables)
        deliveryExcludeSet = set(
            [x.strip().upper() for x in self.__deliveryTextExcludeList.split(',')])

        currentConditon = dict['condition'].upper()

        if dict['priceTotal'] < self.__PriceMustBeGreaterThan:
            boolCriteria = False

        if dict['sellerPositive'] < self.__PositiveFeedbackPctMustBeGreaterThan:
            boolCriteria = False

        if dict['sellerRating'] < self.__SellerRatingMustBeGreaterThan:
            boolCriteria = False

        # Allows Amazon sellers to show up since they don't have any rating, but could still be filtered via conditon ie. Rental etc..
        if dict['sellerName'].upper() == 'AMAZON':
            boolCriteria = True

        if currentConditon in conditoinExcludeSet:
            boolCriteria = False

        deliveryText = dict['delivery'].upper()
        for stringMatch in deliveryExcludeSet:
            if stringMatch in deliveryText:
                boolCriteria = False

        sellerText = dict['seller'].upper()
        for stringMatch in sellerExcludeSet:
            if stringMatch in sellerText:
                boolCriteria = False

        return(boolCriteria)

    def storeToNestedDict(self, sellerObject):
        nestedDict = {}
        occDictCnt = {}

        for i in sellerObject:
            sellerName = self.getCategoryDataForOneSeller(i)['sellerName']
            
            # Need to put provisions for names with special characters ie "*House of Treasures*"
            # sellerName = sellerName.replace("*", "x")
            sellerName = re.sub(r'\W+', 'x', sellerName)
            
            sellerList = [k for k, v in nestedDict.items()]
            occurance = sellerList.count(sellerName)
            if occurance > 0:
                # ??? why am I doing .compile?
                r = re.compile(sellerName)
                

                sellerNameOccurance = len(list(filter(r.match, sellerList)))
                nestedDict[sellerName + str(sellerNameOccurance)
                           ] = self.getCategoryDataForOneSeller(i)
            else:
                nestedDict[sellerName] = self.getCategoryDataForOneSeller(i)

        return(nestedDict)

    def getAllSellerDict(self, alloffersDivTxt):
        return self.storeToNestedDict(alloffersDivTxt)

    def getLowestPricedObjectBasedOnCriteria(self, myDict):

        # Gets lowest Price whth overide on FBA, FBA typically American only
        lowestPrice = 999999999999999
        lowestPriceFloor = 999999999999999
        lowestKey = ''
        boolFBAExists = False

        # fake dictionary to ensure something is passed if no matching criteria or issues with Amazon
        fakeDict = {'fakeDict': {
            'price': -99,
            'priceShipping': 0.0,
            'priceTotal': -99,
            'condition': 'something wrong happened',
            'sellerName': 'fakeDict',
            'sellerPositive': -99,
            'sellerRating': -99,
            'seller': 'something wrong happened',
            'delivery': '',
            'isFBA': False,
            'lowestPriceFloor': 999,
        }}

        for k, v in myDict.items():

            # bug for lowest floor as it doesn't include any filters
            if v['priceTotal'] < lowestPriceFloor and v['condition'].upper() != 'RENTAL':
                lowestPriceFloor = v['priceTotal']

            # Amazon Seller Hidden Gem - normally gets filtered out due to no ratings
            # Special conditon for Rental as we want to ensure we filter that out
            if self.filterCriteria(v):

                if (v['priceTotal'] < lowestPrice):
                    if v['isFBA']:
                        boolFBAExists = True
                        lowestPrice = v['priceTotal']
                        lowestKey = k
                        print('current lowest key is {}'.format(lowestKey))

                    if not boolFBAExists:
                        lowestPrice = v['priceTotal']
                        lowestKey = k
                        print('current lowest key is {}'.format(lowestKey))

        if myDict and lowestKey != '':
            myDict[lowestKey]['lowestPriceFloor'] = lowestPriceFloor
            return myDict[lowestKey]
        else:
            print('ffffffffffffffff             fakeDict           fffffffffff')
            print(fakeDict['fakeDict'])
            return fakeDict['fakeDict']

    def sandbox(self, singleObj):
        print(self.getText(self.offersSoup, 'olpOfferPrice'))
        print(self.getCategoryDataForOneSeller(self.offersSoup))
        print('ass')


class ObjByClassAttrib(AllOffersObject):

    ''' inherit from AllOffersObject so we can reuse methods to grab data'''

    # def __init__(self, classAttrib):
    def __init__(self, offersSoup, classAttrib):
        super().__init__(offersSoup)
        self.classAttrib = classAttrib

    def test(self):
        print('this is a test : pass parameter {}'.format(self.classAttrib))
