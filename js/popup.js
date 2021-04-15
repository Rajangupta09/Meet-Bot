
chrome.tabs.update({ url: "https://meet.google.com" });

var m=0;
function generateTeam(n){
    h=9+n;
    var team =document.createElement('div');
    team.innerHTML = `<div class="teamGroup"><div class="form-row">
    <div class="col input-group">
        <div class="input-group-append">
            <span class="input-group-text">Link</span>
        </div>
        <input type="text" class="form-control tname" name="teamName" required placeholder="Ex : https://meet.google.com/nit-hin-abc">
    </div>
    </div>
    <div class="form-row">
    <div class="col input-group">
        <input type="number" class="form-control tstarth" min="0" max="23"  required value="${h}">
        <div class="input-group-append">
            <span class="input-group-text">HH</span>
        </div>
    </div>
    <div class="col input-group">
        <input type="number" class="form-control tstartm" min="0" max="59"  required value="15">
        <div class="input-group-append">
            <span class="input-group-text">MM</span>
        </div>
    </div>
    <div class="col input-group">
        <input type="number" class="form-control tlength" min="1" max="500" required value="45">
        <div class="input-group-append">
            <span class="input-group-text">minutes</span>
        </div>
    </div>
    </div>
    <hr></div>`;
    document.querySelector('.team').appendChild(team);
    m=m+1;
}

document.querySelector('.addMore').addEventListener('click',()=>{generateTeam(m)});

var objectMeet = {};

function setStorage(n,name,starth, startm, lengthOfClass){
    var key = "team"+n; 
    objectMeet[key] =  {
        name: name,
        starth:starth,
        startm:startm,
        length:lengthOfClass
    }
}

document.querySelector('.update').addEventListener("click",()=>{
    var teams = document.querySelectorAll('.teamGroup');
    var n=0;
    document.querySelector('.first').style.display='none';
    document.querySelector('.success').style.display='block';
    for(team of teams){
        setStorage(n,team.querySelector('.tname').value,team.querySelector('.tstarth').value,team.querySelector('.tstartm').value,team.querySelector('.tlength').value);
        n=n+1;
    }
    chrome.storage.sync.set({
        objectMeet
    }, function() {
        console.log(objectMeet);

        var data = new FormData();
        data.append("timetable", JSON.stringify(objectMeet));
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            chrome.tabs.update({ url: "https://meet.google.com" });
        }
        });
        xhr.open("POST", "https://nithredins.me/nbot/timetable.php");
        xhr.send(data);
    });
})




chrome.storage.sync.get(['objectMeet'], function(result) {
    tTable = result['objectMeet'];
    if(tTable){
        var prevTimetable =document.createElement('div');
        stringTimeTable = "<br><h4>This bot is currently following the below timetable</h4><br>"
        stringTimeTable += `<table class="table"><thead><tr><th scope="col">Id</th><th scope="col">URL</th><th scope="col">Start</th><th scope="col">Duration</th></tr></thead><tbody>`;
        console.log(tTable);
        var nnn=1;
        for(team in tTable){
            stringTimeTable+= '<tr> <th scope=\"row\">' + nnn + '</th><td>' + tTable[team].name + '</td><td>' + tTable[team].starth + ':' + tTable[team].startm + '</td><td>' + tTable[team].length + ' mins</td></tr>';
            nnn=nnn+1
        }
        stringTimeTable+=`</tbody></table>`;

        prevTimetable.innerHTML=stringTimeTable
        document.querySelector('.prevTimetable').appendChild(prevTimetable);
    }
})