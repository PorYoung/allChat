//Github: https://github.com/PorYoung/javascript/blob/master/myalert/myalert.js

//修改代码 -> myLoading
//增加传入插入容器参数
function myLoading(titleString,textString,container) {
    //如果已存在id myLoadingWrap
    // var wrap = document.getElementById('myLoadingWrap');
    // if(wrap){
    //     var title = document.getElementById('myLoadingTitle'),
    //         text = document.getElementById('myLoadingText');
    //     title.innerHTML = textString;
    //     text.innerHTML = textString;
    //     return fun;
    // }else {
    //设置body为模糊
    document.body.style.filter = "blur(2px)";
    //创建一个div作为遮罩层
    var wrap = document.createElement('div');
    //设置wrap样式
    wrap.style.position = "fixed";
    wrap.style.left = 0;
    wrap.style.right = 0;
    wrap.style.top = 0;
    wrap.style.bottom = 0;
    wrap.style.zIndex = "9999";
    wrap.style.backgroundColor = "#fff";
    wrap.style.opacity = ".7";
    wrap.id = "myLoadingWrap";
    //禁用右键菜单
    wrap.oncontextmenu = function() { return false; };
    if(!!container && !!document.querySelector(container)) document.querySelector(container).appendChild(wrap)
    else document.documentElement.appendChild(wrap);
    //创建一个div作为loading窗口
    var DIV = document.createElement('div');
    DIV.innerHTML = "<div></div><p></p><i></i>";
    var title = DIV.getElementsByTagName("div")[0],
        text = DIV.getElementsByTagName('p')[0];

    //截取title长度 不超过12个字符
    if(titleString.length >= 12) titleString = titleString.substr(0,12);
    var arr = titleString.split("");
    titleString = "";
    for(var i in arr){
        titleString += '<span id="loadingTitleLetter'+i+'">'+arr[i]+'</span>';
    }
    title.innerHTML = titleString;
    //为title每个span添加动画
    var letters = title.getElementsByTagName('span');
    //添加loading 动画样式至样式表顶部
    var animation = "@keyframes loading {50%{transform: translate3d(5px,-10px,5px) rotate3d(1,0,1,45deg);-webkit-transform: translate3d(5px,-10px,5px) rotate3d(1,0,1,45deg);-o-transform: translate3d(5px,-10px,5px) rotate3d(1,0,1,45deg);-moz-transform: translate3d(5px,-10px,5px) rotate3d(1,0,1,45deg);-ms-transform: translate3d(5px,-10px,5px) rotate3d(1,0,1,45deg);} 100%{transform: translate3d(0,0,0) rotate3d(0,0,0,0);-webkit-transform: translate3d(0,0,0) rotate3d(0,0,0,0);-o-transform: translate3d(0,0,0) rotate3d(0,0,0,0);-moz-transform: translate3d(0,0,0) rotate3d(0,0,0,0)-ms-transform: translate3d(0,0,0) rotate3d(0,0,0,0))}}";
    document.styleSheets[0].insertRule(animation,0);
    var timeDelay = 0;
    for(var j = 0;j < letters.length;j++){
        letters[j].style.position = "absolute";
        letters[j].style.animation = "loading 2s infinite alternate";
        letters[j].style.marginLeft = -parseInt(letters.length/2)+0.5+timeDelay*2 + "em";
        letters[j].style.animationDelay = timeDelay + "s";
        timeDelay += 0.5;
    }
    text.innerHTML = textString;
    //设置title样式
    title.style.display = "block";
    title.style.textAlign = "center";
    title.style.fontSize = "30px";
    title.style.height = "40px";
    title.style.lineHeight = "40px";
    title.style.color = "#000";
    title.id = "myLoadingTitle";
    //设置文本样式
    text.style.fontSize = "25px";
    text.style.marginBottom = "40px";
    text.style.marginTop = 0;
    text.style.padding = "30px 10px";
    text.style.wordBreak = "break-all";
    text.id = "myLoadingText";
    // text.style.textIndent = "20px";
    text.style.color = "#333";
    text.style.textAlign = "center";
    text.style.textShadow = "1px 1px 3px #fff";
    //设置alert窗口位置、大小和样式
    DIV.style.width = "300px";
    DIV.style.maxHeight = "250px";
    // DIV.style.backgroundColor = "rgba(199,179,229,.9)";
    DIV.style.position = "absolute";
    DIV.style.left = "50%";
    DIV.style.top = "50%";
    DIV.style.borderRadius = "5px";
    //将该div添加到wrap结点下
    wrap.appendChild(DIV);
    var wid = DIV.offsetWidth, hei = DIV.offsetHeight;
    DIV.style.marginLeft = 0 - wid/2 + 'px';
    DIV.style.marginTop = 0 - hei/2 + 'px';
    function fun() {
        var wrapDiv = document.getElementById('myLoadingWrap');
        wrapDiv.style.transition = "opacity 1s";
        wrapDiv.style.opacity = "0";
        setTimeout(function () {
            wrapDiv.style.display = "none";
            wrapDiv.parentNode.removeChild(wrapDiv);
            document.body.style.filter = "";
        },1200);
    }
    return fun;
}