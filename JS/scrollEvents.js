// set underline widths, dynamic content appears
document.addEventListener("scroll", function() {
    var elements = document.getElementsByClassName("scroll underline");
    for (var i=0; i<elements.length; i++) {
        var parentStyle = getComputedStyle(elements[i].parentElement);
        var grandParentStyle = getComputedStyle(elements[i].parentElement.parentElement);
        var topBuffer = 100;
        var underlineLoadRange = 300;
        var n = 0;
        var loadEndPos = parseInt(grandParentStyle.top)-(parseInt(parentStyle.height)+topBuffer);
        var loadStartPos = loadEndPos - underlineLoadRange;
        if ((window.scrollY-loadStartPos) > 0) {
            elements[i].style.width = (100*((window.scrollY-loadStartPos)/underlineLoadRange).toString() + "%");
            if (!elements[i].parentElement.classList.contains("full-bar") && (window.scrollY-loadStartPos) > underlineLoadRange) {
                elements[i].parentElement.className += " full-bar";
                var section = elements[i].parentElement.nextElementSibling;
                if (section !== null) {
                    var typeText = findClass(section, "type-text", []);
                    // console.log(typeText);
                    let wait = 1;
                    for (let i of typeText) {
                        setTimeout(function() {
                            writeText(i, i.id);
                        }, wait * 1000);
                        wait+=5;
                    }
                    //     while (n<10) {//(typeText !== null) {
                    //     console.log("TYPETEXT BEFORE: ", typeText);
                    //     setTimeout(function() {
                    //         writeText(typeText, typeText.id);
                    //     }, 1000);
                    //     typeText.classList.remove("type-text");
                    //     typeText = findClass(section, "type-text");
                    //     console.log("TYPETEXT AFTER: ", typeText);
                    //     n++;
                    // }
                }
                // console.log(document.getElementsByClassName("type-text"));
                // Array.from(document.getElementsByClassName("type-text")).forEach(tt => {
                //     console.log(tt);
                //     setTimeout(function() {
                //         writeText(tt, tt.id);
                //     }, 1000);
                // });
            }
        }
        else elements[i].style.width = 0;
    }
});

function findClass(typeText, classTarget, elements) {
    console.log(typeText);
    if (typeText.classList.contains(classTarget)) elements.push(typeText);
    if (typeText.nextElementSibling !== null) return findClass(typeText.nextElementSibling, classTarget, elements);
    if (typeText.children.length>0) return findClass(typeText.children[0], classTarget, elements);
    if (typeText.nextElementSibling !== null) return findClass(typeText.nextElementSibling, classTarget, elements);
    return elements;
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
