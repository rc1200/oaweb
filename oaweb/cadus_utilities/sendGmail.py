import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from oaUtilities import utilsPathFileName, utilsPathTempFileName


def sendViaGmail(fromaddr, eml_pswrd, toaddr, filename, filePath):

    attachment = open(os.path.join(filePath, filename), "rb")

    #Setup the MIME
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = "Results of sending"
    email_body = '''Hello,
    This is an automated mail.
    Scan Complete

    Enjoy
    '''

    payload = MIMEBase('application', 'octet-stream')
    payload.set_payload((attachment).read())
    encoders.encode_base64(payload) #encode the attachment
    #add payload header with filename
    payload.add_header('Content-Disposition', f"attachment; filename={filename}")

    msg.attach(MIMEText(email_body, 'plain'))
    msg.attach(payload)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, eml_pswrd)
    text = msg.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()
    print('Mail Sent')






# fromaddr = "bootstrapu@gmail.com"
# eml_pswrd = os.environ.get('BOOTSTRAP_PASSWORD', 'Not Set')
# toaddr = "ron.calibuso@gmail.com"
# filename = "asin2.csv"
# filePath = utilsPathFileName('')

# sendViaGmail(fromaddr, eml_pswrd, toaddr, filename, filePath)