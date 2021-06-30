function randRangeInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

class cirObj {
    constructor(width, height, top, right, xSpeed, ySpeed) {
        cirObj.numInstances = (cirObj.numInstances || 0) + 1;
        var el = document.createElement("div");
        el.id = "cir" + (cirObj.numInstances-1);
        el.className = "cir dark-mode";
        this.dvdColor = randRangeInt(0,7);
        el.innerHTML += "<img src=dvd" + this.dvdColor + ".svg>";
        document.getElementsByClassName("sect-content")[0].appendChild(el);
        this.me = document.getElementById("cir" + (cirObj.numInstances-1));
        this.myParent = this.me.parentElement;
        this.myStyle = getComputedStyle(this.me);
        this.r = width;
        this.ySpeed = ySpeed;
        this.xSpeed = xSpeed;
        this.xBumpDepth = 1/(4*Math.abs(xSpeed)) + 0.55;
        this.yBumpDepth = 1/(4*Math.abs(ySpeed)) + 0.55;
        this.bumpRY = Math.round((this.yBumpDepth*this.r)/this.ySpeed)*this.ySpeed;
        this.bumpRX = Math.round((this.xBumpDepth*this.r)/this.xSpeed)*this.xSpeed;
        this.UBumpIn = false;
        this.UBumpOut = false;
        this.DBumpIn = false;
        this.DBumpOut = false;
        this.LBumpIn = false;
        this.LBumpOut = false;
        this.RBumpIn = false;
        this.RBumpOut = false;
        this.moveY = true;
        this.moveX = true;
        this.bumpTimerY = 0;
        this.bumpTimerX = 0;
        this.easeY = 1;
        this.easeX = 1;
        this.corner = false;

        this.me.style.width = width + "px";
        this.me.style.height = height + "px";
        this.me.style.top = top + "px";
        this.me.style.right = right + "px";
        this.me.style.borderTopLeftRadius = 0.5*this.r + "px";
        this.me.style.borderTopRightRadius = 0.5*this.r + "px";
        this.me.style.borderBottomRightRadius = 0.5*this.r + "px";
        this.me.style.borderBottomLeftRadius = 0.5*this.r + "px";
        this.me.style.filter = "blur(" + (this.r/10) + "px)";
    }
    changeColor() {
        var newColor;
        do {
            newColor = randRangeInt(0,7);
        } while (newColor==this.dvdColor);
        this.dvdColor = newColor;
        this.me.firstChild.src = "dvd" + newColor + ".svg";
    }
}

var cirList = [];

function addRandCir(parent) {
    var con = getComputedStyle(parent);
    var r = randRangeInt(parseInt(con.width)*0.001, parseInt(con.width)*0.1);
    var top = randRangeInt(0, parseInt(con.height)-r);
    var right = randRangeInt(0, parseInt(con.width)-r);
    var xSpeed = Math.sign(Math.random()-0.5) * randRangeInt(1, 4);
    var ySpeed = Math.sign(Math.random()-0.5) * randRangeInt(1, 4);
    return new cirObj(r, r, top, right, xSpeed, ySpeed);
}

// var imageAddr = "me.jpg"; 
// var downloadSize = 4995374; //bytes

// function ShowProgressMessage(msg) {
//     if (console) {
//         if (typeof msg == "string") {
//             console.log(msg);
//         } else {
//             for (var i = 0; i < msg.length; i++) {
//                 console.log(msg[i]);
//             }
//         }
//     }
    
//     var oProgress = document.getElementById("progress");
//     if (oProgress) {
//         var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
//         oProgress.innerHTML = actualHTML;
//     }
// }

// function InitiateSpeedDetection() {
//     ShowProgressMessage("Loading the image, please wait...");
//     window.setTimeout(MeasureConnectionSpeed, 1);
// };    

// if (window.addEventListener) {
//     window.addEventListener('load', InitiateSpeedDetection, false);
// } else if (window.attachEvent) {
//     window.attachEvent('onload', InitiateSpeedDetection);
// }

// function MeasureConnectionSpeed() {
//     var startTime, endTime;
//     var download = new Image();
//     download.onload = function () {
//         endTime = (new Date()).getTime();
//         return showResults();
//     }

    
//     download.onerror = function (err, msg) {
//         ShowProgressMessage("Invalid image, or error downloading");
//     }
    
//     startTime = (new Date()).getTime();
//     var cacheBuster = "?nnn=" + startTime;
//     download.src = imageAddr + cacheBuster;
    
//     function showResults() {
//         var duration = (endTime - startTime) / 1000;
//         var bitsLoaded = downloadSize * 8;
//         var speedBps = (bitsLoaded / duration).toFixed(2);
//         // var speedKbps = (speedBps / 1024).toFixed(2);
//         // var speedMbps = (speedKbps / 1024).toFixed(2);
//         console.log(speedBps);
//         return speedBps;
//     }
// }

var connSpeed = navigator.connection.downlink;
console.log(connSpeed);
for (var i=0; i<Math.floor(connSpeed*3); i++) {
    cirList.push(addRandCir(document.getElementsByClassName("sect-content")[0]));
}

var active = false;
var runner = 0;
var moveSpeed = 30; //ms per pixel shift
var friction = [true, false, false];
document.addEventListener("scroll", function() {
    if (!active) {
        if (window.scrollY>400 && window.scrollY<2000) {
            active = true;
            runner = setInterval(function() {
                // cirList.forEach(cir => {
                for (var i=0; i<cirList.length; i++) {
                    var cir = cirList[i];
                    if (cir.bumpTimerY>0) {
                        if (cir.bumpTimerX>0) {
                            cir.corner = true;
                            console.log("DVD!");
                            if (cir.UBumpIn || cir.UBumpOut) cir.me.style.top = "1px";
                            else if (cir.DBumpIn || cir.DBumpOut) cir.me.style.top = (parseInt(getComputedStyle(cir.myParent).height) - cir.r-1).toString() + "px";
                            if (cir.RBumpIn || cir.RBumpOut) cir.me.style.right = "1px";
                            else if (cir.LBumpIn || cir.LBumpOut) cir.me.style.right = (parseInt(getComputedStyle(cir.myParent).width) - cir.r-1).toString() + "px";
                            cir.xSpeed*=-1;
                            cir.ySpeed*=-1;
                            cir.bumpTimerX = -10;
                            cir.bumpTimerY = -10;
                            cir.UBumpIn = cir.UBumpOut = cir.DBumpIn = cir.DBumpOut = cir.LBumpIn = cir.LBumpOut = cir.RBumpIn = cir.RBumpOut = false;
                            cir.me.classList.toggle("dvd");
                            cir.me.firstChild.style.width = (cir.r) + "px";
                            cir.me.style.width = (cir.r) + "px";
                            cir.me.style.height = cir.me.firstChild.style.height;
                            cir.me.style.backgroundColor = "transparent";
                            break;
                        }
                        else if (cir.bumpTimerY%Math.floor(cir.easeY)==0) {
                            if (!(cir.UBumpIn || cir.UBumpOut)) {
                                cir.me.style.top = (parseInt(cir.myStyle.top) + cir.ySpeed).toString() + "px";
                            }
                            cir.moveY = true;
                        }
                        else {
                            cir.moveY = false;
                        }
                    }
                    else if (cir.bumpTimerX>0) {
                        if (cir.bumpTimerX%Math.floor(cir.easeX)==0) {
                            if (!(cir.RBumpIn || cir.RBumpOut)) {
                                cir.me.style.right = (parseInt(cir.myStyle.right) + cir.xSpeed).toString() + "px";
                            }
                            cir.moveX = true;
                        }
                        else {
                            cir.moveX = false;
                        }
                    }
                    else {
                        cir.me.style.top = (parseInt(cir.myStyle.top) + cir.ySpeed).toString() + "px";
                        cir.me.style.right = (parseInt(cir.myStyle.right) + cir.xSpeed).toString() + "px";
                    }
                    if (cir.DBumpIn || cir.DBumpOut || parseInt(cir.myStyle.top) >= parseInt(getComputedStyle(cir.myParent).height)-parseInt(cir.myStyle.height)) {
                        if (cir.me.classList.contains("dvd")) {
                            cir.ySpeed*=-1;
                            cir.changeColor();
                            break;
                        }
                        cir.bumpTimerY++;
                        if (!(cir.DBumpIn || cir.DBumpOut)) cir.DBumpIn = true;
                        else if (cir.moveY) cir.me.style.right = (parseInt(cir.myStyle.right) + cir.xSpeed).toString() + "px";
                        else if (friction[cir.bumpTimerY%friction.length]) cir.me.style.right = (parseInt(cir.myStyle.right) + cir.xSpeed).toString() + "px";
                        if (cir.DBumpIn && cir.moveY) {
                            cir.me.style.height = (parseInt(cir.myStyle.height) - cir.ySpeed).toString() + "px";
                            if (!cir.corner) cir.me.style.width = (parseInt(cir.myStyle.width) + cir.ySpeed).toString() + "px";
                            cir.me.style.borderBottomRightRadius = (parseInt(cir.myStyle.borderBottomRightRadius) - cir.ySpeed).toString() + "px";
                            cir.me.style.borderBottomLeftRadius = (parseInt(cir.myStyle.borderBottomLeftRadius) - cir.ySpeed).toString() + "px";
                            cir.easeY += 0.25;
                            if (parseInt(cir.myStyle.height) <= cir.bumpRY) {
                                cir.DBumpIn = false;
                                cir.DBumpOut = true;
                                cir.ySpeed*=-1;
                            }
                        }
                        else if (cir.DBumpOut && cir.moveY) {
                            cir.me.style.height = (parseInt(cir.myStyle.height) - cir.ySpeed).toString() + "px";
                            if (!cir.corner) cir.me.style.width = (parseInt(cir.myStyle.width) + cir.ySpeed).toString() + "px";
                            cir.me.style.borderBottomRightRadius = (parseInt(cir.myStyle.borderBottomRightRadius) - cir.ySpeed).toString() + "px";
                            cir.me.style.borderBottomLeftRadius = (parseInt(cir.myStyle.borderBottomLeftRadius) - cir.ySpeed).toString() + "px";
                            cir.easeY -= 0.25;
                            if (parseInt(cir.myStyle.height) >= cir.r) {
                                cir.DBumpOut = false;
                                cir.bumpTimerY = 0;
                            }
                        }
                    }
                    else if (cir.UBumpIn || cir.UBumpOut || parseInt(cir.myStyle.top)<=0) {
                        if (cir.me.classList.contains("dvd")) {
                            cir.ySpeed*=-1;
                            cir.changeColor();
                            break;
                        }
                        cir.bumpTimerY++;
                        if (!(cir.UBumpIn || cir.UBumpOut)) cir.UBumpIn = true;
                        else if (cir.moveY) cir.me.style.right = (parseInt(cir.myStyle.right) + cir.xSpeed).toString() + "px";
                        else if (friction[cir.bumpTimerY%friction.length]) cir.me.style.right = (parseInt(cir.myStyle.right) + cir.xSpeed).toString() + "px";
                        if (cir.UBumpIn && cir.moveY) {
                            cir.me.style.height = (parseInt(cir.myStyle.height) + cir.ySpeed).toString() + "px";
                            if (!cir.corner) cir.me.style.width = (parseInt(cir.myStyle.width) - cir.ySpeed).toString() + "px";
                            cir.me.style.borderTopRightRadius = (parseInt(cir.myStyle.borderTopRightRadius) + cir.ySpeed).toString() + "px";
                            cir.me.style.borderTopLeftRadius = (parseInt(cir.myStyle.borderTopLeftRadius) + cir.ySpeed).toString() + "px";
                            cir.easeY += 0.25;
                            if (parseInt(cir.myStyle.height) <= cir.bumpRY) {
                                cir.UBumpIn = false;
                                cir.UBumpOut = true;
                                cir.ySpeed*=-1;
                            }
                        }
                        else if (cir.UBumpOut && cir.moveY) {
                            cir.me.style.height = (parseInt(cir.myStyle.height) + cir.ySpeed).toString() + "px";
                            if (!cir.corner) cir.me.style.width = (parseInt(cir.myStyle.width) - cir.ySpeed).toString() + "px";
                            cir.me.style.borderTopRightRadius = (parseInt(cir.myStyle.borderTopRightRadius) + cir.ySpeed).toString() + "px";
                            cir.me.style.borderTopLeftRadius = (parseInt(cir.myStyle.borderTopLeftRadius) + cir.ySpeed).toString() + "px";
                            cir.easeY -= 0.25;
                            if (parseInt(cir.myStyle.height) >= cir.r) {
                                cir.UBumpOut = false;
                                cir.bumpTimerY = 0;
                            }
                        }
                    }
                    if (cir.LBumpIn || cir.LBumpOut || parseInt(cir.myStyle.right) >= parseInt(getComputedStyle(cir.myParent).width)-parseInt(cir.myStyle.width)) {
                        if (cir.me.classList.contains("dvd")) {
                            cir.xSpeed*=-1;
                            cir.changeColor();
                            break;
                        }
                        cir.bumpTimerX++;
                        if (!(cir.LBumpIn || cir.LBumpOut)) cir.LBumpIn = true;
                        else if (cir.moveX) cir.me.style.top = (parseInt(cir.myStyle.top) + cir.ySpeed).toString() + "px";
                        else if (friction[cir.bumpTimerX%friction.length]) cir.me.style.top = (parseInt(cir.myStyle.top) + cir.ySpeed).toString() + "px";
                        if (cir.LBumpIn && cir.moveX) {
                            if (!cir.corner) cir.me.style.height = (parseInt(cir.myStyle.height) + cir.xSpeed).toString() + "px";
                            cir.me.style.width = (parseInt(cir.myStyle.width) - cir.xSpeed).toString() + "px";
                            cir.me.style.borderTopLeftRadius = (parseInt(cir.myStyle.borderTopLeftRadius) - cir.xSpeed).toString() + "px";
                            cir.me.style.borderBottomLeftRadius = (parseInt(cir.myStyle.borderBottomLeftRadius) - cir.xSpeed).toString() + "px";
                            cir.easeX += 0.25;
                            if (parseInt(cir.myStyle.width) <= cir.bumpRX) {
                                cir.LBumpIn = false;
                                cir.LBumpOut = true;
                                cir.xSpeed*=-1;
                            }
                        }
                        else if (cir.LBumpOut && cir.moveX) {
                            if (!cir.corner) cir.me.style.height = (parseInt(cir.myStyle.height) + cir.xSpeed).toString() + "px";
                            cir.me.style.width = (parseInt(cir.myStyle.width) - cir.xSpeed).toString() + "px";
                            cir.me.style.borderTopLeftRadius = (parseInt(cir.myStyle.borderTopLeftRadius) - cir.xSpeed).toString() + "px";
                            cir.me.style.borderBottomLeftRadius = (parseInt(cir.myStyle.borderBottomLeftRadius) - cir.xSpeed).toString() + "px";
                            cir.easeX -= 0.25;
                            if (parseInt(cir.myStyle.width) >= cir.r) {
                                cir.LBumpOut = false;
                                cir.bumpTimerX = 0;
                            }
                        }
                    }
                    else if (cir.RBumpIn || cir.RBumpOut || parseInt(cir.myStyle.right)<=0) {
                        if (cir.me.classList.contains("dvd")) {
                            cir.xSpeed*=-1;
                            cir.changeColor();
                            break;
                        }
                        cir.bumpTimerX++;
                        if (!(cir.RBumpIn || cir.RBumpOut)) cir.RBumpIn = true;
                        else if (cir.moveX) cir.me.style.top = (parseInt(cir.myStyle.top) + cir.ySpeed).toString() + "px";
                        else if (friction[cir.bumpTimerX%friction.length]) cir.me.style.top = (parseInt(cir.myStyle.top) + cir.ySpeed).toString() + "px";
                        if (cir.RBumpIn && cir.moveX) {
                            if (!cir.corner) cir.me.style.height = (parseInt(cir.myStyle.height) - cir.xSpeed).toString() + "px";
                            cir.me.style.width = (parseInt(cir.myStyle.width) + cir.xSpeed).toString() + "px";
                            cir.me.style.borderTopRightRadius = (parseInt(cir.myStyle.borderTopRightRadius) + cir.xSpeed).toString() + "px";
                            cir.me.style.borderBottomRightRadius = (parseInt(cir.myStyle.borderBottomRightRadius) + cir.xSpeed).toString() + "px";
                            cir.easeX += 0.25;
                            if (parseInt(cir.myStyle.width) <= cir.bumpRY) {
                                cir.RBumpIn = false;
                                cir.RBumpOut = true;
                                cir.xSpeed*=-1;
                            }
                        }
                        else if (cir.RBumpOut && cir.moveX) {
                            if (!cir.corner) cir.me.style.height = (parseInt(cir.myStyle.height) - cir.xSpeed).toString() + "px";
                            cir.me.style.width = (parseInt(cir.myStyle.width) + cir.xSpeed).toString() + "px";
                            cir.me.style.borderTopRightRadius = (parseInt(cir.myStyle.borderTopRightRadius) + cir.xSpeed).toString() + "px";
                            cir.me.style.borderBottomRightRadius = (parseInt(cir.myStyle.borderBottomRightRadius) + cir.xSpeed).toString() + "px";
                            cir.easeX -= 0.25;
                            if (parseInt(cir.myStyle.width) >= cir.r) {
                                cir.RBumpOut = false;
                                cir.bumpTimerX = 0;
                            }
                        }
                    }
                // });
                }
            }, moveSpeed);
        }
    }
    else if (window.scrollY<400 || window.scrollY>2000) {
        clearInterval(runner);
        active = false;
    }
});