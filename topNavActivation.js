var btnList = document.getElementById("topnav");
var btns = btnList.getElementsByTagName("a");
for (var i=0; i<btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var cur = document.getElementsByClassName("active");
        if (cur.length>0) cur[0].className = cur[0].className.replace("active", "");
        this.className += "active";
    })
}