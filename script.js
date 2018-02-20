var trans = document.getElementById('trans');
var slider = document.getElementById('slider');

slider.addEventListener('mousedown', sliderListener);

function sliderListener(e) {
    function removeListeners(e) {
        changeHeight(e);
        window.removeEventListener("mousemove", changeHeight);
        window.removeEventListener("mouseup", removeListeners);
    }
    e.preventDefault();
    changeHeight(e);

    window.addEventListener("mousemove", changeHeight);
    window.addEventListener("mouseup", removeListeners);
}

function changeHeight(e) {
    var y = e.clientY;
    if (y >= 0) {
        slider.style.bottom = window.innerHeight - y + 'px';
        trans.style.height = y + 'px';
    }
}
