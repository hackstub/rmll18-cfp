'use strict';

var trad = document.getElementById('trad');
var source = document.getElementById('source');
var slider = document.getElementById('slider');
var rmllMention = document.getElementById('rmll');
var h, w, portrait;

window.onload = init;
window.addEventListener('resize', update);

document.getElementById('button').onclick = displayMenu;

slider.addEventListener('mousedown', sliderListener);
slider.addEventListener('touchstart', sliderTouchListener);

window.addEventListener('scroll', adaptScroll, { passive: true });

// 'Read only' button, totally hide the source
document.getElementById('read').onclick = function () {
    slider.style.bottom = '-5px';
    trad.style.height = '100%';
}

function init() {
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
    portrait = h > w;

    if (portrait) {
        changeHeight(h / 1.15);
    } else {
        changeHeight(h / 1.4);
    }
    setSourceBlockHeight();
}

function displayMenu() {
    function hideMenu() {
        menu.style.display = 'none';
        if (portrait) {
            setTimeout(function () {
                window.scrollBy(0, -80)
            }, 10);
        }
        menu.removeEventListener('click', hideMenu);
    }

    var menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        hideMenu();
    }
    else {
        menu.style.display = 'block';
        rmllMention.style.display = 'block';
        menu.addEventListener('click', hideMenu);
    }
}

function sliderListener(e) {
    function getY(event) {
        changeHeight(event.clientY)
    }
    function removeListeners(event) {
        getY(event);
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

function adaptScroll(e) {
    var scroll = e.pageY || document.body.scrollTop || window.scrollY;
    // Adapt scroll value changes to the fixed 'trad' div
    trad.scrollTop = scroll;

    // Hide the rmll mention for small screens after scrolling the splash screen
    var rmllDisplay = rmllMention.style.display;
    var smallScreen = portrait && w < 768 && scroll > h;
    if (smallScreen && (rmllDisplay === 'block' || rmllDisplay === '')) {
        rmllMention.style.display = 'none';
    }
    else if (rmllDisplay === 'none' && scroll <= h) {
        rmllMention.style.display = 'block';
    }
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
    var main = document.getElementsByTagName('SECTION')[2].cloneNode(true);
    source.appendChild(main);
}
