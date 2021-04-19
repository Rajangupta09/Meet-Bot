chrome.storage.onChanged.addListener(function(changes, namespace){
    
    var val = changes.objectMeet.newValue;
    var dt = new Date();
    
    
    for(let i in val){
        var dt = new Date()
        t= dt.valueOf()
        dt.setHours(parseInt(val[i]["starth"]));
        dt.setMinutes(parseInt(val[i]["startm"]));
        var alarmInfo = {
            when: dt.valueOf()
        };
        console.log(t - dt.valueOf())
        var temp = val[i]["name"] + "^" + val[i]["length"];
        chrome.alarms.create(temp, alarmInfo);
        }
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
    if(Number.isInteger(alarm["name"])){
        chrome.tabs.remove(alarm["name"]);
    }
    else{
        let url = alarm["name"].substring(0,alarm["name"].indexOf("^"));
        let duration = parseInt(alarm["name"].substring(alarm["name"].indexOf("^")+1));
        console.log(duration);

        chrome.tabs.create({'url' :url, 'active' : false}, function(tab){

            console.log(tab);
            setTimeout(() => {
                var xPathRes = document.evaluate('//*[@id="yDmH0d"]/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[2]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                console.log(xPathRes)
xPathRes.singleNodeValue.click();
            }, 10000);
            var alarmInfo = {delayInMinutes: duration}
            chrome.alarms.create(tab.id, alarmInfo);
        });
        console.log("Got an alarm!", alarm);
    }
    
  });

