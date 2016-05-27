$(document).on('touchmove',function(ev){
    ev.preventDefault();
});
$(function(){
    var $main = $('#main');
    var $li=$('#list').children('li');
    var viewHeight=$(window).height();
    $main.css({'height':viewHeight,'width':'100%'});
    //划动页面;
    slidePage();
    function slidePage(){
        var startY = 0;
        var step = 1/4;
        var nowIndex = 0;
        var nextorprevIndex = 0;
        var bBtn = true;
        $li.on('touchstart',function(ev){
            if(bBtn){
                bBtn = false;
                var touch = ev.originalEvent.changedTouches[0];
                startY = touch.pageY;
                nowIndex = $(this).index();
                $li.on('touchmove.move',function(ev){
                    var touch = ev.originalEvent.changedTouches[0];
                    $(this).siblings().hide();
                    if( touch.pageY < startY ){   //↑
                        nextorprevIndex = nowIndex == $li.length-1 ? 0 : nowIndex + 1;
                        $li.eq(nextorprevIndex).css('transform','translate(0,'+( viewHeight + touch.pageY - startY )+'px)');
                    }
                    else{   //↓
                        nextorprevIndex = nowIndex == 0 ? $li.length-1 : nowIndex - 1;
                        $li.eq(nextorprevIndex).css('transform','translate(0,'+( -viewHeight + touch.pageY - startY )+'px)');
                    
                    }
                    $li.eq(nextorprevIndex).show().addClass('zIndex');
                    
                    $(this).css('transform','translate(0,'+ (touch.pageY - startY)*step +'px) scale('+(1 - Math.abs((touch.pageY - startY))*step/viewHeight )+')');
                    
                });     
                $li.on('touchend.move',function(ev){
                    var touch = ev.originalEvent.changedTouches[0];
                    if( touch.pageY < startY ){   //↑
                        $li.eq(nowIndex).css('transform','translate(0,'+(-viewHeight * step)+'px) scale('+(1 - step)+')');
                    }
                    else{  //↓
                        $li.eq(nowIndex).css('transform','translate(0,'+(viewHeight * step)+'px) scale('+(1 - step)+')');
                    }
                    $li.eq(nowIndex).css('transition','.3s');
                    $li.eq(nextorprevIndex).css('transform','translate(0,0)');
                    $li.eq(nextorprevIndex).css('transition','.3s');
                    $li.off('.move');
                });
            }
        });
        $li.on('transitionEnd webkitTransitionEnd',function(ev){
            if(!$li.is(ev.target)){
                return;
            }
            
            resetFn();
        });
        function resetFn(){
            $li.css('transform','');
            $li.css('transition','');
            $li.eq(nextorprevIndex).removeClass('zIndex').siblings().hide();
            bBtn = true;
        }
    }
    
    function nowViewWidth(){
        var w = 640 * viewHeight / 960;
        w = w > 640 ? w : 640;
        return w;
    }
    
    var cjAnimate=[
        {
            inAn:function(){
                var $img=$('.li1Child').find('>img');
                
                setTimeout(function(){
                    $img.eq(1).attr('class','active');
                    $('.li1_txt').animate({
                        'opacity':1
                    });
                    
                },100)
            },
            outAn:function(){
                var $img=$('.li1Child').find('>img');
                var $ballImg=$('#li1_ballImg img:gt(0)');
                $img.eq(1).attr('class','');
                $('.li1_txt').animate({
                        'opacity':0
                    },function(){
                        $('.p1_num1').addClass('animated bounceIn');
                });
                
            }
        },
    ];
    cjAnimate[0].outAn();
    cjAnimate[0].inAn();
});

~function () {
    var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");
    console.log(music,audioFir)
    //->给页面的加载缓冲500MS时间
    window.setTimeout(function () {
        audioFir.play();

        //->当音频文件可以播放(出声了)的时候:canplay/canplaythrough
        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        }, false);
    }, 500);

    //->移动端使用CLICK存在300MS的延迟
    music.addEventListener("click", function () {
        //->当前是暂停的
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        //->当前是播放的
        audioFir.pause();
        music.className = "music";
    }, false);
}();