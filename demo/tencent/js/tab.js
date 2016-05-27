/*ad轮播图*/
var adAutoMove = document.getElementById("ad-autoMove");
autoBanner(adAutoMove, 2000);

/*一键回顶*/
~function () {
    var backTop = document.getElementById("backTop");
    var header = document.getElementById("header");
    var headerHeight = utils.css(header, "height");
    var clientH = utils.win("clientHeight");

    function windowScroll() {
        var curTop = utils.win("scrollTop");
        backTop.style.display = curTop >= (clientH / 2) ? "block" : "none";
        if (this.prevScrollTop) {
            var changeTop = curTop - this.prevScrollTop;
            this.prevScrollTop = curTop;
        } else {
            this.prevScrollTop = curTop;
        }
        if (changeTop > 0) {
            animate(header, {height: 0}, 80);
            header.style.overflow= "hidden";
        } else if (changeTop < 0) {
            animate(header, {height: headerHeight}, 80,function(){header.style.overflow="visible";});
        } else {

        }

        /*延迟加载*/
        var imgList = document.getElementsByTagName("img");
        console.log(imgList[50]);

        function lazyImg(curImg) {
            var oImg = new Image;
            oImg.src = curImg.getAttribute("trueImg");
            oImg.onload = function () {
                curImg.src = this.src;
                curImg.style.display = "inline-block";
                oImg = null;
                fadeIn(curImg);
            };
            curImg.isLoad = true;
        }
        function fadeIn(curImg) {
            var duration = 500, interval = 10, target = 1;
            var step = (target / duration) * interval;
            var timer = window.setInterval(function () {
                var curOp = utils.css(curImg, "opacity");
                if (curOp >= 1) {
                    curImg.style.opacity = 1;
                    window.clearInterval(timer);
                    return;
                }
                curOp += step;
                curImg.style.opacity = curOp;
            }, interval);
        }

            for (var i = 0, len = imgList.length; i < len; i++) {
                var curImg = imgList[i];
                if (curImg.isLoad) {
                    continue;
                }
                var curImgPar = curImg.parentNode;
                var A = utils.offset(curImgPar).top + curImgPar.offsetHeight, B = utils.win("clientHeight") + utils.win("scrollTop");
                console.log(A,B);
                if (A <= B) {
                    lazyImg(curImg);
                }
            }


    }
    window.setTimeout(windowScroll, 500);
    window.onscroll = windowScroll;
    backTop.onclick = function () {
        this.style.display = "none";
        window.onscroll = null;
        var target = utils.win("scrollTop"), duration = 500, interval = 10, step = (target / duration) * interval;
        var timer = window.setInterval(function () {
            var nowTop = utils.win("scrollTop");
            if (nowTop <= 0) {
                window.clearInterval(timer);
                window.onscroll = windowScroll;
                header.style.display = "block";
                utils.css(header,"height",headerHeight);
                return;
            }
            utils.win("scrollTop", nowTop - step);
        }, interval);
    }
}();

/*ad*/
~function () {
    var modAd = document.getElementsByClassName("mod-ad");
    for (var i = 0; i < modAd.length; i++) {
        var curAd = modAd[i];
        adMove(curAd, 200);
    }
}();

/*登录提示*/
~function () {
    var headerRightUser = document.getElementsByClassName("header-right-user")[0];
    var userInfo = utils.children(headerRightUser, "div")[0];
    var markLayer = document.getElementById("mark-layer");
    var signIn = document.getElementsByClassName("signIn")[0];
    var btnClose = signIn.getElementsByClassName("btn-close")[0];
    var headerItem = document.getElementsByClassName("header-item");
    var container = document.getElementsByClassName("signIn-container")[0];
    var divLis = utils.children(container, "div");

    headerRightUser.onmouseover = function (e) {
        utils.css(userInfo, "display", "block");
    };
    headerRightUser.onmouseover = function (e) {
        utils.css(userInfo, "display", "none");
    };

    headerRightUser.onclick = function () {
        utils.css(markLayer, "display", "block");
        utils.css(signIn, "display", "block");
    };
    btnClose.onclick = function () {
        utils.css(markLayer, "display", "none");
        utils.css(signIn, "display", "none");
    };
    for (var i = 0; i < headerItem.length; i++) {
        var cur = headerItem[i];
        cur.onclick = function () {
            utils.addClass(this,"current");
            var curSiblings = utils.siblings(this);
            for (var i = 0; i < curSiblings.length; i++) {
                utils.removeClass(curSiblings[i], "current");
            }
            var index = utils.index(this);
            for (i = 0; i < divLis.length; i++) {
                i === index ? utils.css(divLis[i], "display","block") : utils.css(divLis[i], "display","none");
            }
        }
    }
}();
/*看过/看单*/
~function(){
    var headerRightCommons=document.getElementsByClassName("header-right-common");
    var modQuickPop = document.getElementsByClassName("mod-quick-pop");
    var btnInner=document.getElementsByClassName("btn-inner");
    var markLayer = document.getElementById("mark-layer");
    var signIn = document.getElementsByClassName("signIn")[0];

    for(var i=0;i<headerRightCommons.length-1;i++){
        var cur=headerRightCommons[i];
        cur.index=i;
        cur.onmouseover=function(){
            utils.css(modQuickPop[this.index],"display","block");
        };
        cur.onmouseout=function(){
            utils.css(modQuickPop[this.index],"display","none");
        };
        btnInner[i].onclick=function(){
            utils.css(markLayer, "display", "block");
            utils.css(signIn, "display", "block");
        };
    }
}();

/*菜单下拉详细列表*/

~function(){
    var listItem=document.getElementsByClassName("list_item");
    var navigationSub=document.getElementsByClassName("navigation-sub");
    var navSign=document.getElementsByClassName("nav_sign");


    for(var i=0;i<listItem.length;i++){
        var curItem=listItem[i];
        curItem.index=i;
        curItem.onmouseover=function(){
            utils.css(navSign[this.index],{display:"block"});
            animate(navigationSub[this.index],{height:44},100);
        };
        curItem.onmouseout=function(){
            utils.css(navSign[this.index],{display:"none"});
            animate(navigationSub[this.index],{height:0},100);
        };
    }
}();



