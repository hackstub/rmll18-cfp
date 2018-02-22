
'use strict';

var trans = document.getElementById('trans');
var slider = document.getElementById('slider');
setSourceBlockHeight();

slider.addEventListener('mousedown', sliderListener);
window.addEventListener('scroll', (e) => {
    trans.scrollTop = e.pageY != undefined ? e.pageY : document.body.scrollTop;
});
window.addEventListener('resize', (e) => {
    changeHeight();
    setSourceBlockHeight();
});

function sliderListener(e) {
    function removeListeners(event) {
        changeHeight(event);
        window.removeEventListener("mousemove", changeHeight);
        window.removeEventListener("mouseup", removeListeners);
    }
    e.preventDefault();
    changeHeight(e);

    window.addEventListener("mousemove", changeHeight);
    window.addEventListener("mouseup", removeListeners);
}

function changeHeight(e) {
    var y = e != undefined ? e.clientY : window.innerHeight - 50;
    if (y >= 0) {
        slider.style.bottom = window.innerHeight - y + 'px';
        trans.style.height = y + 'px';
    }
}

function setSourceBlockHeight() {
    var ps = document.getElementById('source').getElementsByTagName('P');
    var pt = trans.getElementsByTagName('P');

    for (var i = 0; i < ps.length; i++) {
        var height = pt[i].offsetHeight;
        ps[i].style.height = height - 2 + 'px';
    }
}
