// set underline widths, dynamic content appears
document.addEventListener("scroll", function() {
    var elements = document.getElementsByClassName("scroll underline");
    for (var i=0; i<elements.length; i++) {
        var parentStyle = getComputedStyle(elements[i].parentElement);
        var topBuffer = 100;
        var underlineLoadRange = 300;
        var loadEndPos = parseInt(parentStyle.top)-(parseInt(parentStyle.height)+topBuffer);
        var loadStartPos = loadEndPos - underlineLoadRange;
        if ((window.scrollY-loadStartPos) > 0) {
            elements[i].style.width = (100*((window.scrollY-loadStartPos)/underlineLoadRange).toString() + "%");
            if (!elements[i].parentElement.classList.contains("full-bar") && (window.scrollY-loadStartPos) > underlineLoadRange) {
                elements[i].parentElement.className += " full-bar";
                var typeText = elements[i].parentElement.nextElementSibling;
                typeText = findClass(typeText, "content-head");
                if (typeText !== null) setTimeout(function() {
                    writeText(typeText, typeText.id);
                }, 1000);
            }
        }
        else elements[i].style.width = 0;
    }
});

function findClass(typeText, classTarget) {
    if (typeText.classList.contains(classTarget)) return typeText;
    if (typeText.children.length>0) return findClass(typeText.children[0], classTarget);
    if (typeText.nextElementSibling !== null) return findClass(typeText.nextElementSibling, classTarget);
    return null;
}

function writeText(typeText, textStore) {
    setTimeout(function() {
        typeText.innerHTML = typeText.innerHTML.substring(0,typeText.innerHTML.length-1);
        typeText.innerHTML += textStore[0] + "|";
        if (textStore.length>1) writeText(typeText, textStore.substring(1));
        else {
            setTimeout(function() {
                typeText.innerHTML = typeText.innerHTML.substring(0,typeText.innerHTML.length-1);
            }, 500);
        }
    }, Math.random()*130);
}
