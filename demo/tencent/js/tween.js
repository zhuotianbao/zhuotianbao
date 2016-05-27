~function () {
    function leaner(t, b, c, d) {
        return c * t / d + b;
    }

    function move(curEle, target, duration, callback) {
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = null, interval = 10;
        window.clearInterval(curEle.moveTimer);
        curEle.moveTimer = window.setInterval(function () {
            time += interval;
            if (time >= duration) {
                for (var key in target) {
                    if (target.hasOwnProperty(key)) {
                        utils.css(curEle, key, target[key]);
                    }
                }
                window.clearInterval(curEle.moveTimer);
                callback && callback.call(curEle);
            }
            for (key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = leaner(time, begin[key], change[key], duration);
                    utils.css(curEle, key, curPos);
                }
            }
        }, interval);
    }

    window.animate = move;
}();
