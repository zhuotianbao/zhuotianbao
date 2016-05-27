$(function(){
    $("#header").find("div").hover(function(){
        $("#p1").empty().append("Resume");
        $("#p2").empty().append("前端工程师");
    },function(){
        $("#p1").empty().append("FE");
        $("#p2").empty().append("个人简历");
    });
    $p2span=$(".section2>span");
    $p2span.on("click",function(){
        $(".section2").attr({id:"section2"});
    });
    $(".demo").on("mouseenter",function(){
        console.log("ok")
        $(this).children().last().animate({top:0},500);
        $(this).find(".detail-title").css({top:"40%"});

    })
    $(".demo").on("mouseleave",function(){
        $(this).children().last().animate({top:"75%"},500);
        $(this).find(".detail-title").css({top:"0"});
    })
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
        easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        anchors: ['page1', 'page2', 'page3', 'page4','page5'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['pageOne', 'pageTwo', 'pageThree', 'pageFour','pageFive'],
        controlArrowColor:'lightblue',
        onLeave:function(index,nextIndex,direction){
            if(index==2){
                $(".sectionSkill>img").eq(0).removeClass("animated bounceInRight");
                $(".sectionSkill>img").eq(1).removeClass("animated bounceInLeft");
                $(".sectionSkill>span").eq(0).removeClass("animated zoomIn");
                $(".sectionSkill>div").removeClass("animated bounceInDown");
                $(".processBox").removeClass(" animated fadeIn");
                $(".process").css("width","0%");
            }
            if (index==3) {
                $(".section2").css({"transform":"scale(0.2) rotateX(0deg) rotateY(0deg)"});
               $(".section2").attr({id:""}); 
               $(".text").css({height:0});
               $(".line").css({width:0});
            }
            if(index==4){
                $(".slide-cpntain>div").attr({id:""});
                $(".line-red").css({width:"0"});
                $(".title-english").css({height:"0"});
                $(".slide-cpntain").animate({opacity:"0"});
            }
            if(index==5){
                $(".section4").attr({id:""});
            }

        },
        afterLoad: function(anchorLink, index){
            if(index == 1){
                $(".text1").delay(1000).animate({height:"35 "},1000,function() {
                    $(".text2").animate({height: "35 "}, 800, function () {
                        $(".text3").animate({height: "35 "}, 800, function () {
                            $(".line").animate({width: "500"}, 800, function () {
                                $(".text4").animate({height: "35 "}, 800, function () {
                                    $(".text5").animate({height: "35 "}, 800, function () {
                                        $(".text6").animate({height: "35 "}, 800, function () {
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
            if(index==2){
                $(".sectionSkill>img").eq(0).addClass("animated bounceInRight");
                $(".sectionSkill>img").eq(1).addClass("animated bounceInLeft");
                $(".sectionSkill>span").eq(0).addClass("animated zoomIn");
                $(".sectionSkill>div").addClass("animated bounceInDown");
                $(".processBox").addClass(" animated fadeIn");
                $(".process").eq(3).css("width","90%");
                $(".process").eq(0).css("width","85%");
                $(".process").eq(1).css("width","75%");
                $(".process").eq(2).css("width","65%");
            }
            if(index == 3){
                $(".section2").css({"transform":"scale(0.7) rotateX(360deg) rotateY(360deg)"});
            }
            if(index == 4){
                $(".title").addClass("animated fadeInLeft");
                $(".title").css({
                    width:"200",
                    height:"35"
                });
                $(".line-red").animate({
                    width:"200"
                },1000,function(){
                    $(".title-english").animate({
                        height:"25"
                    },1000,function(){
                        $(".slide-cpntain").animate({
                            opacity:"1"
                        },1000);
                        window.setTimeout(function(){
                            $(".slide-cpntain>div").attr({id:"demo"});
                        },1500);
                    });
                });
            }
            if(index==5){
                $(".section4").attr({id:"section4"});
            }
        }
        
    })

})
