function setAlarms(changes){
    var val = changes;
    console.log(val);
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
}
chrome.runtime.onStartup.addListener(function(){
    chrome.storage.sync.get(['objectMeet'], function(result) {
        setAlarms(result["objectMeet"]);
    })
})
chrome.storage.onChanged.addListener(function(changes, namespace){
    chrome.storage.sync.get(['objectMeet'], function(result) {
    console.log(result["objectMeet"]);
    });
    setAlarms(changes.objectMeet.newValue);
   
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
    if(alarm["name"].substring(0,6) == "remove"){
        chrome.tabs.remove(parseInt(alarm["name"].substring(6)));
    }
    else{
        let url = alarm["name"].substring(0,alarm["name"].indexOf("^"));
        let duration = parseInt(alarm["name"].substring(alarm["name"].indexOf("^")+1));

        chrome.tabs.create({'url' :url, 'active' : false}, function(tab){
            chrome.tabs.executeScript(tab.id, {
                file: 'js/contentScript.js'
            })
            var alarmInfo = {delayInMinutes: duration}
            let t = "remove" + tab.id
            chrome.alarms.create(t, alarmInfo);
        });
    }
    
  });

