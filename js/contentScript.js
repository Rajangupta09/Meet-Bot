window.addEventListener("load", function(){
    console.log(document);
    setTimeout(() => {
        let mic = document.evaluate('/html/body/div[1]/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[1]/div/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let cam = document.evaluate('/html/body/div[1]/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[2]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let m = mic.getAttribute("data-is-muted");
    console.log("Hola");
    if(m == "false")
        mic.click()
    if(cam.getAttribute("data-is-muted") == "false")
        cam.click()
    document.evaluate('/html/body/div[1]/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[2]/div/div[2]/div/div[1]/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        
    }, 7000);
    
});