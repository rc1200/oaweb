from pynput.mouse import Button, Controller as mController
from pynput.keyboard import Key, Controller as kController
import time

mouse = mController()                                                
keyboard = kController()
LOAD_PAGE_SLEEP_TIME = 3


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

def saveFile(mX, mY, filePath, fileName):

    with keyboard.pressed(Key.ctrl):
        keyboard.press('s')
        keyboard.release('s')

    time.sleep(1)
    singleLeftClick(mX, mY)

    selectAll()
    keyboard.type(f'{filePath}\{fileName}')
    keyboard.press(Key.enter)
    keyboard.press('y')


# getPos()
goToWebPage(785, 49, 'https://www.rexegg.com/regex-quickstart.html')
path = "C:\\github\\oa2\\mysite\\oaweb\\cadus_utilities\\temp"
saveFile(871 , 437,path, 'blah.html')
