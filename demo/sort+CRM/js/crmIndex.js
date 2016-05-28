var boxList = document.getElementById("boxList"), oLis = boxList.getElementsByTagName("tr");
var select=document.getElementsByName("select")[0];
var up=document.getElementById("up");
var down=document.getElementById("down");

var oTab = document.getElementById("box");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;

var tBody = oTab.tBodies[0];
var oRows = tBody.rows;


//->实现隔行变色&&鼠标滑过变色的效果
function changeBg() {
    for (var i = 0, len = oLis.length; i < len; i++) {
        var curLi = oLis[i];
        curLi.className = i % 2 === 1 ? "bg" : null;

        curLi.oldClass = curLi.className;
        curLi.onmouseenter = function () {
            this.className = "hov";
        };
        curLi.onmouseleave = function () {
            this.className = this.oldClass;
        };
    }
}

//->实现首页的数据绑定
ajax("/getInfo", function (data) {
    //->data:就是我们通过Ajax获取的数据
    var str = '';
    if (data) {
        for (var i = 0, len = data.length; i < len; i++) {
            var cur = data[i];
            str += '<tr>';
            str += '<td class="w60">' + cur["id"] + '</td>';
            str += '<td>' + cur["name"] + '</td>';
            str += '<td class="w60">' + cur["age"] + '</td>';
            str += '<td>' + cur["tel"] + '</td>';
            str += '<td class="w280">' + cur["address"] + '</td>';
            str += '<td class="w100" curId="' + cur["id"] + '">';//->把当前用户的ID存储到自定义属性上,以后点击修改或者删除的时候我们只需要找到这个ID就知道操作的是那一条信息了
            str += '<a href="customerAdd.html?id=' + cur["id"] + '">修改</a>';
            str += '<a href="javascript:;" btnType="delete">删除</a>';
            str += '</td>';
            str += '</tr>';
        }
    }
    boxList.innerHTML = str;

    //->我们本次AJAX是异步请求的,所以需要等数据绑定完成后在执行我们的隔行变色
    changeBg();
});

//->实现我们的删除操作:用事件委托处理,如果事件源的自定义属性btnType===delete说明当前点击的是我们的删除按钮
boxList.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.getAttribute("btnType") === "delete") {
        var customerID = tar.parentNode.getAttribute("curId");
        var flag = window.confirm("您确定要删除编号为 [ " + customerID + " ] 的这一条信息吗?");
        if (flag) {
            //->确定要删除了
            var parameter = "id=" + customerID;
            parameter = encodeURIComponent(parameter);
            ajax("/deleteInfo?" + parameter, function (data) {
                if (data && data["code"] == 0) {
                    boxList.removeChild(tar.parentNode.parentNode);
                    changeBg();
                }
            });
        }
    }
};

//获取要排序的项目
var value=select.value;
console.log(value)
select.onchange=function(){
    value=select.value;
}
for(var i=0;i<oThs.length;i++){
    if(oThs[i].innerHTML==value){
        var curTh=oThs[i];
        curTh.flag = -1;
        curTh.index=i;
        up.onclick=function(){
            console.log("up");
            console.log(curTh.index)
            var up = 1;
            sortTab.call(oThs[curTh.index],up, curTh.index);
        }
        down.onclick=function(){
            console.log("down")
            var down = (-1);
            sortTab.call(oThs[curTh.index],down, curTh.index);
        }
    }
}
function sortTab(xiang,n) {
    console.log(curTh.flag)
    console.log(this);
    var ary = Array.prototype.slice.call(oRows, 0);
    ary.sort(function (a, b) {
        var curInn = a.cells[n].innerHTML;
        var nexInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(curInn);
        var nexInnNum = parseFloat(nexInn);
        if (isNaN(curInnNum) || isNaN(nexInnNum)) {
            return (curInn.localeCompare(nexInn)) * xiang;
        }
        return (curInnNum - nexInnNum) * xiang;
    });

    var frg = document.createDocumentFragment();
    for (var i = 0, len = ary.length; i < len; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    changeBg();
}
