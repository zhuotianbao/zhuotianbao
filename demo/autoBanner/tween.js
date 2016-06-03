~function () {
    var effect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };
    function move(curEle, target, duration, callBack) {
        window.clearInterval(curEle.zhufengTimer);
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.zhufengTimer = window.setInterval(function () {
            time += 10;
            if (time >= duration) {
                utils.css(curEle, target);
                window.clearInterval(curEle.zhufengTimer);
                callBack && callBack.call(curEle);
                return;
            }
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = zhufengEffect.Linear(time, begin[key], change[key], duration);
                    utils.css(curEle, key, curPos);
                }
            }
        }, 10);
    }

    window.animate = move;
}();