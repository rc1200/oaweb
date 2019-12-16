from pynput.mouse import Button, Controller as mController
from pynput.keyboard import Key, Controller as kController
import time
import os

mouse = mController()                                                
keyboard = kController()
LOAD_PAGE_SLEEP_TIME = 5


def getPos():
    print(mouse.position)

def singleLeftClick(mX, mY):
    
    mouse.position = (mX, mY)
    mouse.click(Button.left, 1)

def selectAll():
    with keyboard.pressed(Key.ctrl):
        keyboard.press('a')
        keyboard.release('a')


def goToWebPage(mX, mY, newURL):
    
    singleLeftClick(mX, mY)

    selectAll()

    keyboard.type(newURL)
    keyboard.press(Key.enter)

    # allow some time for page to load
    time.sleep(LOAD_PAGE_SLEEP_TIME)

def saveWebPageToFile(mX, mY, filePath, fileName):

    with keyboard.pressed(Key.ctrl):
        keyboard.press('s')
        keyboard.release('s')

    time.sleep(1)
    singleLeftClick(mX, mY)

    selectAll()
    keyboard.type(os.path.join(filePath, fileName))
    time.sleep(1)
    keyboard.press(Key.enter)
    time.sleep(0.5)
    keyboard.press('y')
    time.sleep(0.5)
    time.sleep(LOAD_PAGE_SLEEP_TIME)



def moveMouseWake(mXstart, mYstart, mXend, mYend):
        mouse.position = (mXstart, mYstart)
        for i in range(mXend):
                time.sleep(0.1)
                print(i)
                mouse.move(i, 0)
    
        for i in range(mYend):
                time.sleep(0.1)
                print(i)
                mouse.move(0, i)
   



# getPos()
# goToWebPage(785, 49, 'https://www.rexegg.com/regex-quickstart.html')
# path = "C:\\github\\oa2\\mysite\\oaweb\\cadus_utilities\\temp"
# saveWebPageToFile(871 , 437,path, 'blah.html')
