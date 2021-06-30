
function themeSwitch() {
    if (document.body.className==="dark-mode") {
        document.getElementById("theme-switch").innerHTML="dark_mode";
        var elements = document.getElementsByClassName("dark-mode");
        var len = elements.length;
        for (var i=0; i<len; i++) {
            elements[0].className = elements[0].className.replace("dark", "light")
        }
    }
    else if (document.body.className==="light-mode") {
        document.getElementById("theme-switch").innerHTML="light_mode";
        var elements = document.getElementsByClassName("light-mode");
        var len = elements.length;
        for (var i=0; i<len; i++) {
            elements[0].className = elements[0].className.replace("light", "dark");
        }
    }
    document.getElementById("theme-btn").classList.toggle("disabled");
    setTimeout(function() {
        document.getElementById("theme-btn").classList.toggle("disabled");
    }, 1000);
}