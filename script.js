// 'use strict';

var trad = document.getElementById('trad');
var source = document.getElementById('source')
var slider = document.getElementById('slider');
window.onload = init;

slider.addEventListener('mousedown', sliderListener);
window.addEventListener('scroll', function (e) {
    trad.scrollTop = e.pageY != undefined ? e.pageY : document.body.scrollTop;
});
window.addEventListener('resize', function (e) {
    changeHeight();
    setSourceBlockHeight();
});

document.getElementById('button').onclick = function () {
    document.getElementById('menu').style.display = "block";
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


    changeHeight();
    setSourceBlockHeight();
}

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
    var windowHeight = window.innerHeight;
    var y = e != undefined ? e.clientY : windowHeight / 1.8;
    if (y >= windowHeight) {
        slider.style.bottom = '-5px';
        trad.style.height = '100%';
    }
    else if (y > 0) {
        slider.style.bottom = windowHeight - y - 5 + 'px';
        trad.style.height = y + 'px';
    }
    else {
        slider.style.bottom = windowHeight - 5 + 'px';
        trad.style.height = 0;
    }
}

function setSourceBlockHeight() {
    function uniformHeigth(base, adapt, orientation) {
        // Adapt each given elements height to its base clone
        for (var i = 0, b, a; b = base[i], a = adapt[i]; i++) {
            if (orientation <= 1 || orientation == undefined) {
                a.style.height = b.getBoundingClientRect().height + 'px';
            }
            else {
                a.style.height = b.getBoundingClientRect().width + 'px';;
            }
        }
    }

    var titles = document.getElementsByTagName('HEADER');
    var orientation = window.innerHeight / window.innerWidth;
    uniformHeigth(titles[1].children, titles[0].children, orientation)

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
