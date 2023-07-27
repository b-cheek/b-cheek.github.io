document.getElementById("die-btn").addEventListener("click", function(event) {
    let dieElement = event.currentTarget.firstChild;
    if (dieElement.classList.contains("animate")) return;
    dieElement.classList.add("animate");
    setTimeout(function() {
        dieElement.classList.remove("animate");
    }
    , 500);
});