// 'use strict';

var trad = document.getElementById('trad');
console.log(trad);
var slider = document.getElementById('slider');
window.onload = () => {
    changeHeight();
    setSourceBlockHeight();
}

slider.addEventListener('mousedown', sliderListener);
window.addEventListener('scroll', (e) => {
    console.log(trad);
    trad.scrollTop = e.pageY != undefined ? e.pageY : document.body.scrollTop;
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
    var y = e != undefined ? e.clientY : window.innerHeight / 2;
    if (y >= 0) {
        slider.style.bottom = window.innerHeight - y - 5 + 'px';
        trad.style.height = y - 5 + 'px';
    }
}

function setSourceBlockHeight() {
    var ps = document.getElementById('source').getElementsByTagName('P');
    var pt = trad.getElementsByTagName('P');

    for (var i = 0; i < ps.length; i++) {
        var height = pt[i].getBoundingClientRect().height;
        ps[i].style.height = height - 2 + 'px';
    }
}
