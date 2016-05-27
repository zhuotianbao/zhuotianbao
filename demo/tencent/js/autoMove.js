~function () {
    function autoBanner(container, interval) {
        var bannerInner = utils.firstChild(container),
            aLis = utils.children(bannerInner, "a"),
            bannerImgs = bannerInner.getElementsByTagName("img");
        var bannerTip = utils.children(container, "ul")[0],
            oLis = utils.children(bannerTip);

        aLis[0].style.zIndex = 1;
        animate(aLis[0], {opacity: 1}, 200);

        var step = 0, autoTimer = null;
        autoTimer = window.setInterval(autoMove, interval);
        function autoMove() {
            setBanner();
            if (step === (bannerImgs.length - 1)) {
                step = -1;
            }
            step++;
        }

        function setBanner() {
            for (var i = 0; i < aLis.length; i++) {
                var curDiv = aLis[i];
                if (i === step) {
                    utils.css(curDiv, "zIndex", 1);
                    animate(curDiv, {opacity: 1}, 200, function () {
                        var curDivDib = utils.siblings(this);
                        for (var k = 0; k < curDivDib.length; k++) {
                            utils.css(curDivDib[k], "opacity", 0);
                        }
                    })
                } else {
                    utils.css(curDiv, "zIndex", 0);
                }
                changTip();
            }
        }

        function changTip() {
            for (var i = 0; i < oLis.length; i++) {
                var curLi = oLis[i];
                i === step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
            }
        }

        container.onmouseover = function () {
            window.clearInterval(autoTimer);
        };
        container.onmouseout = function () {
            autoTimer = window.setInterval(autoMove, interval);
        };

        ~function () {
            for (var i = 0, len = oLis.length; i < len; i++) {
                var curLi = oLis[i];
                curLi.index = i;
                curLi.onmouseover = function () {
                    step = this.index;
                    setBanner();
                    changTip();
                }
            }
        }();

    }

    window.autoBanner = autoBanner;
}();

~function () {
    var siteFocus = document.getElementById("site-focus");
    var siteFocusInner = siteFocus.getElementsByClassName("site-focus-inner")[0];
    var bannerImgs = siteFocusInner.getElementsByTagName("img");
    var aLis = siteFocusInner.getElementsByTagName("a");
    var siteFocusTip = siteFocus.getElementsByClassName("site-focus-tip")[0];
    var bannerTip = siteFocusTip.getElementsByTagName("ul")[0];
    var oLis = bannerTip.getElementsByTagName("li");
    var focusLeft = siteFocusTip.getElementsByClassName("site-focus-left")[0];
    var focusRight = siteFocusTip.getElementsByClassName("site-focus-right")[0];

    for (var n = 0; n < 7; n++) {
        oLis[n].style.display = "block";
    }

    aLis[0].style.zIndex = 1;
    animate(aLis[0], {opacity: 1}, 200);

    var interval = 5000, step = 0, autoTimer = null;
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        setBanner();
        if (step === (bannerImgs.length - 1)) {
            step = -1;
        }
        step++;
    }

    function setBanner() {
        for (var i = 0; i < aLis.length; i++) {
            var curDiv = aLis[i];
            if (i === step) {
                utils.css(curDiv, "zIndex", 1);
                animate(curDiv, {opacity: 1}, 200, function () {
                    var curDivDib = utils.siblings(this);
                    for (var k = 0; k < curDivDib.length; k++) {
                        utils.css(curDivDib[k], "opacity", 0);
                    }
                })
            } else {
                utils.css(curDiv, "zIndex", 0);
            }
            if (step === 0) {
                for (var m = 0; m < 7; m++) {
                    oLis[m].style.display = "block";
                    oLis[m + 7].style.display = "none";
                }
            }
            if (step === 7) {
                for (var n = 0; n < 7; n++) {
                    oLis[n].style.display = "none";
                    oLis[n + 7].style.display = "block";
                }
            }
            changTip();
        }
    }

    function changTip() {
        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            i === step ? utils.addClass(utils.firstChild(curLi), "bg") : utils.removeClass(utils.firstChild(curLi), "bg");
        }
    }

    siteFocus.onmouseover = function () {
        window.clearInterval(autoTimer);
    };
    siteFocus.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
    };

    ~function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onmouseover = function () {
                step = this.index;
                setBanner();
                changTip();
            }
        }
    }();

    focusRight.onclick = function () {
        for (var i = 0; i < oLis.length; i++) {
            if (utils.css(oLis[i], "display") === "block") {
                utils.css(oLis[i], "display", "none");
            } else {
                utils.css(oLis[i], "display", "block");
            }
        }
    };
    focusLeft.onclick = function () {
        for (var i = 0; i < oLis.length; i++) {
            if (utils.css(oLis[i], "display") === "block") {
                utils.css(oLis[i], "display", "none");
            } else {
                utils.css(oLis[i], "display", "block");
            }
        }
    };
}();

~function () {
    function adMove(container, interval) {
        var adList=utils.firstChild(container);
        var listItems=utils.children(adList);
        for(var i=0;i<listItems.length;i++){
            var curItem=listItems[i];
            curItem.index = i;
            curItem.onmouseover=function(){
                animate(listItems[this.index],{width:992},interval);
                if(this.index===4){
                    animate(adList,{left:(-(this.index-1)*248)},interval);
                }else{
                    animate(adList,{left:(-this.index*248)},interval);
                }
            };
            curItem.onmouseout= function () {
                animate(this,{width:248},interval);
                animate(adList,{left:0},interval);
            }
        }
    }
    window.adMove = adMove;
}();