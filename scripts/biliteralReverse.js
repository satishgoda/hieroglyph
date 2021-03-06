function biliteralReversesThatArentLike(chars){
    var allBiliteralsWithChars = [];

    //multiliteralSigns.filter(function(item){ return item.desc != correctItem.desc && item.chars != correctItem.chars; })

    for(var i = 0; i < multiliteralSigns.length; i++){
        if(multiliteralSigns[i].chars == chars){
            allBiliteralsWithChars.push(multiliteralSigns[i]);
        }
    }

    var validIncorrects = [];

    for(var i = 0; i < multiliteralSigns.length; i++){
        if(allBiliteralsWithChars.every(function(item){ return item.pic != multiliteralSigns[i].pic })){
            validIncorrects.push(multiliteralSigns[i]);
        }
    }

    return validIncorrects;
}

function runBiliteralReverseTest(){
    var testPage = getCleanTestPage();
    var allowedBiliterals = getStatus().biliteralReverses;

    var itemToTest = Math.floor(Math.random() * allowedBiliterals);
    
    if(allowedBiliterals > 20 && Math.random() > 0.8 && itemToTest != (allowedBiliterals - 1)){
    	itemToTest = Math.floor(allowedBiliterals - Math.random() * 20);
    }

    var testText = document.createElement("h2");
    testText.className = "testText";
    testText.textContent = "which character can these symbols represent?";
    testPage.appendChild(testText);

    var testChar = document.createElement("span");
    testChar.className = "testPic";

    var char = multiliteralSigns[itemToTest];

    for(var i = 0; i < char.chars.length; i++){
        var charItem = getChar(char.chars[i]);

        var imgs = charItem.pic.split(" ");
        loopThroughImgsAndAddTo(imgs, testChar);
    }
    
    var charSpan = document.createElement("span");
    charSpan.textContent = " (" + char.chars + ")";
    testChar.appendChild(charSpan);

    testPage.appendChild(testChar);

    var correctItem = multiliteralSigns[itemToTest];
    var otherItems = biliteralReversesThatArentLike(correctItem.chars);
    var incorrect3 = selectRandom3(otherItems);
    var latestItem = multiliteralSigns[allowedBiliterals - 1];

    incorrect3.push(correctItem);
    var allItems = shuffle(incorrect3);

    for(var i = 0; i < allItems.length; i++){
        var button = document.createElement("button");
        button.setAttribute("isCorrect", allItems[i].desc == correctItem.desc);
        button.setAttribute("isLatestItem", (allItems[i].pic == latestItem.pic) && (allItems[i].chars == latestItem.chars));
        button.onclick = function(e){
            var target = e.target;
            if(target.tagName == "IMG" || target.tagName == "SPAN"){
            	target = target.parentElement;
            }
            var isCorrect = JSON.parse(target.getAttribute("isCorrect"));
            var isLatestItem = JSON.parse(target.getAttribute("isLatestItem"));
            if(isCorrect){
                if(isLatestItem){
                    increaseDifficulty();
                }
                main();
                return;
            }
            else{
                target.style.background = "red";
            }
        }

        var imgs = allItems[i].pic.split(" ");
        loopThroughImgsAndAddTo(imgs, button);

        testPage.appendChild(button);
    }
}
