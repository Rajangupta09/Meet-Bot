import datetime #for reading present date
import time 
from plyer import notification

#repeating the loop for multiple times
while(True):
    notification.notify(
        #title of the notification,
        title = "COVID19 Stats on {}".format(datetime.date.today()),
        #the body of the notification
        message = "Total cases : {totalcases}\nToday cases : {todaycases}\nToday deaths :{todaydeaths}\nTotal active :{active}".format(
                    totalcases = 'cases',
                    todaycases = 'todayCases',
                    todaydeaths = 'todayDeaths',
                    active = "active"),  
        #creating icon for the notification
        #we need to download a icon of ico file format
        app_icon = "Paomedia-Small-N-Flat-Bell.ico",
        # the notification stays for 50sec
        timeout  = 50
    )
    #sleep for 4 hrs => 60*60*4 sec
    #notification repeats after every 4hrs
    time.sleep(60*60*4)