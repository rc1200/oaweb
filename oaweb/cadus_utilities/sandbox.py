import csv
from oaUtilities import utilsPathFileName


with open(utilsPathFileName('combinedCSV.csv'), 'r') as f:
    reader = csv.reader(f)
    your_list = list(reader)

    print (your_list)