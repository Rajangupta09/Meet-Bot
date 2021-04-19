chrome.tabs.update({ url: "https://meet.google.com" });
var count = 0;
$('#add').on('click', function(){
    $(".update").append($('#form').html());
})


var objectMeet = {};

function setData(n,name,starth, startm, lengthOfClass){
    var key = "meet"+n; 
    objectMeet[key] =  {
        name: name,
        starth:starth,
        startm:startm,
        length:lengthOfClass
    }
}
$('#submitbtn').on('click', function(e){
    e.preventDefault();
    let n=0;
    var meets = $('.meetgroup');
    meets.each(function(){
        setData(n, $(this).find('#url').val(), $(this).find('#start-hour').val(), $(this).find('#start-minute').val(), $(this).find('#duration').val());
        n+=1;
    })
    chrome.storage.sync.set({objectMeet});
});




chrome.storage.sync.get(['objectMeet'], function(result) {
    console.log(result);
    tTable = result['objectMeet'];
    if(tTable){
        var table = document.createElement('div');
        temp = "<h4>Recorded Time Table</h4>"
        temp += `<table class="centered"><thead><tr><th>Id</th><th>URL</th><th>Start</th><th>Duration</th></tr></thead><tbody>`;
        let n =1;
        for(team in tTable){
            temp += '<tr> <th>' + n + '</th><td>' + tTable[team].name + '</td><td>' + tTable[team].starth + ':' + tTable[team].startm + '</td><td>' + tTable[team].length + ' mins</td></tr>';
            n=n+1
        }
        temp+=`</tbody></table>`;

        table.innerHTML=temp
        document.querySelector('.data').appendChild(table);
    }
})