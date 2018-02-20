var top = document.getElementById('source');
var slider = document.getElementById('slider');

function sliderListerner(e, action) {
    function removeListeners(e) {
        action(e, true);
        window.removeEventListener("mousemove", action);
        window.removeEventListener("mouseup", removeListeners);
    }
    e.preventDefault();
    action(e);

    window.addEventListener("mousemove", action);
    window.addEventListener("mouseup", removeListeners);
}

function changeHeight(e, update) {
    var y = e.clientY;
    if (y >= 0) {
        slider.style.top = y + 'px';
        source.style.height = y + 'px';
    } else {
        slider.style.top = '0px';
    }

    console.log(y);
    // var trackWidth = this.trackBar.getBoundingClientRect().width;
    //
    // var currentTime;
    // if (x >= trackWidth) currentTime = this.audio.duration;
    // else if (x <= 0) currentTime = 0;
    // else currentTime = (x / trackWidth) * this.audio.duration;
    //
    if (update === true) {
        // _this.updateLoading();
    }
    // this.updateTrackGraphic(currentTime);
}

// init track slider listener
slider.onmousedown = function(e) {
    sliderListerner(e, changeHeight);
}
