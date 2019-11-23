import selenium.webdriver as webdriver
import selenium.webdriver.support.ui as ui
from selenium.webdriver.common.keys import Keys
from time import sleep
import os


# BASE_oaAPP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# BASE_oaAPP_Utilities_DIR  = os.path.join(BASE_oaAPP_DIR, 'cadus_utilities')

# def utilsPathFileName(fileName):
#     return os.path.join(BASE_oaAPP_Utilities_DIR, fileName)


# options = webdriver.ChromeOptions()
# chrome_path = utilsPathFileName('chromedriver.exe')
# browser = webdriver.Chrome(chrome_path, options=options)

# browser.get('https://www.google.com?q=python#q=python')
# first_result = ui.WebDriverWait(browser, 15).until(lambda browser: browser.find_element_by_class_name('rc'))
# first_link = first_result.find_element_by_tag_name('a')

# main_window = browser.current_window_handle
# first_link.send_keys(Keys.CONTROL + Keys.RETURN)

# browser.find_element_by_tag_name('body').send_keys(Keys.CONTROL + Keys.TAB)
# browser.switch_to_window(main_window)

# sleep(90)

# browser.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 'w')
# browser.switch_to_window(main_window)


