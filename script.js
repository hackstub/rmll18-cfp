// 'use strict';

var trad = document.getElementById('trad');
var source = document.getElementById('source')
var slider = document.getElementById('slider');
var littleTitle = document.getElementsByTagName('NAV')[0];
var h, w, portrait;
window.onload = init;

slider.addEventListener('mousedown', sliderListener);
slider.addEventListener('touchstart', sliderTouchListener);

window.addEventListener('scroll', function (e) {
    trad.scrollTop = e.pageY || document.body.scrollTop || window.scrollY;
}, { passive: true });

window.addEventListener('resize', update);
document.getElementById('button').onclick = displayMenu;

// 'Read only' button, totally hide the source
document.getElementById('read').onclick = function () {
    slider.style.bottom = '-5px';
    trad.style.height = '100%';
}

function init() {
    // FIXME Temporarily duplicate nodes
    duplicateNodes();
    // setup the needed css to display the source here in case of disabled js
    // or for very old browsers
    trad.style.overflow = 'hidden';
    trad.style.position = 'fixed';
    trad.style.top = 0;
    source.style.display = 'block';
    if (window.scrollY != 0) {
        trad.scrollTop = window.scrollY;
    }
    update();
}

function update() {
    h = window.innerHeight;
    w = window.innerWidth;
    portrait = (h / w) > 1;

    if (portrait) {
        changeHeight(h / 1.3);
    } else {
        changeHeight(h / 1.8);
    }
    setSourceBlockHeight();
}

function displayMenu() {
    function hideMenu() {
        menu.style.display = 'none';
        littleTitle.children[2].style.display = 'none';
        if (portrait || w <= 1024) {
            setTimeout(function () {
                window.scrollBy(0, -100)
            }, 10);
        }
        menu.removeEventListener('click', hideMenu);
    }

    var menu = document.getElementById('menu');
    if (menu.style.display == 'block') {
        hideMenu();
    }
    else {
        menu.style.display = "block";
        littleTitle.children[2].style.display = 'block';
        menu.addEventListener('click', hideMenu);
    }
}

function sliderListener(e) {
    function getY(event) {
        changeHeight(event.clientY)
    }
    function removeListeners(event) {
        changeHeight(event.clientY);
        window.removeEventListener("mousemove", getY);
        window.removeEventListener("mouseup", removeListeners);
    }
    e.preventDefault();
    getY(e);
    window.addEventListener("mousemove", getY);
    window.addEventListener("mouseup", removeListeners);
}

function sliderTouchListener(e) {
    function getY(event) {
        changeHeight(event.changedTouches[0].clientY)
    }
    function removeListeners(event) {
        getY(event);
        window.removeEventListener("touchmove", getY);
        window.removeEventListener("touchend", removeListeners);
    }
    e.preventDefault();
    getY(e);
    window.addEventListener("touchmove", getY);
    window.addEventListener("touchend", removeListeners);
}

function changeHeight(y) {
    if (y >= h) {
        slider.style.bottom = '-5px';
        trad.style.height = '100%';
    }
    else if (y > 0) {
        slider.style.bottom = h - y - 5 + 'px';
        trad.style.height = y + 'px';
    }
    else {
        slider.style.bottom = h - 5 + 'px';
        trad.style.height = 0;
    }
}

function setSourceBlockHeight() {
    function uniformHeigth(base, adapt, orientation) {
        // Adapt each given elements height to its base clone
        for (var i = 0, b, a; b = base[i], a = adapt[i]; i++) {
            if (orientation) {
                a.style.height = b.getBoundingClientRect().width + 'px';
            }
            else {
                a.style.height = b.getBoundingClientRect().height + 'px';
            }
        }
    }

    var titles = document.getElementsByTagName('HEADER');
    uniformHeigth(titles[1].children, titles[0].children, portrait)

    var tags = ['P', 'H2', 'H3', 'H4', 'H5', 'UL']
    tags.forEach(function (tag) {
        var tradTags = trad.getElementsByTagName(tag);
        var sourceTags = source.getElementsByTagName(tag);
        uniformHeigth(tradTags, sourceTags)
    });
}

function duplicateNodes() {
    var main = document.getElementsByTagName('SECTION')[0].cloneNode(true);
    var source = document.getElementById('source');
    source.appendChild(main);
}
