// 'use strict';

var trad = document.getElementById('trad');
var slider = document.getElementById('slider');
window.onload = () => {
    // FIXME Temporarily duplicate nodes
    duplicateNodes();

    changeHeight();
    setSourceBlockHeight();
}

slider.addEventListener('mousedown', sliderListener);
window.addEventListener('scroll', (e) => {
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
    function uniformHeigth(base, adapt) {
        // Adapt each given elements height to its base clone
        for (let i = 0, b, a; b = base[i], a = adapt[i]; i++) {
            let height = b.getBoundingClientRect().height;
            a.style.height = height + 'px';
        }
    }

    const titles = document.getElementsByClassName('title');
    uniformHeigth(titles[1].children, titles[0].children)

    const source = document.getElementById('source')
    const tags = ['P', 'H2', 'H3', 'H4', 'H5', 'UL']
    tags.forEach(tag => {
        let tradTags = trad.getElementsByTagName(tag);
        let sourceTags = source.getElementsByTagName(tag);
        uniformHeigth(tradTags, sourceTags)
    });
}

function duplicateNodes() {
    var main = document.getElementsByClassName('main')[0].cloneNode(true);
    var source = document.getElementById('source');
    source.appendChild(main);
}
