function myTouchEvent(id){
    var swip_time = 300,
    swip_dis = 30,
    point_start,
    point_end,
    time_start,
    time_end,
    //1 上 2 右 3 下 4左
    result;

    if("ontouchstart" in window){
        var startEvt = "touchstart",
        moveEvt = "touchmove",
        endEvt = "touchend";
    }else{
        var startEvt = "mousedown",
        moveEvt = "mousemove",
        endEvt = "mouseup";
    }
    var getPos = function(e){
        var touches = e.touches;
        if(touches && touches[0]) {
            return { x : touches[0].clientX ,
                    y : touches[0].clientY };
        }
        return { x : e.clientX , y: e.clientY };
    }
    var getDistance = function(p1,p2){
        return parseInt(Math.sqrt(Math.pow(Math.abs(p1.x - p2.x),2)+Math.pow(Math.abs(p1.y - p2.y),2)));
    }
    var getDirection = function(p1,p2){
        var angle = Math.atan2(p1.y-p2.y,p2.x-p1.x)*180/Math.PI;
        if(angle<=45&&angle>=-45) return "right";
        if(angle>=45&&angle<=135) return "up";
        if(angle>=135 || angle<=-135) return "left";
        if(angle<=-45&&angle>=-135) return "down";
    }
    var startEvtHandle = function(e){
        var pos = getPos(e);
        var touches = e.touches;
        if(!touches || touches.length == 1){
            point_start = getPos(e);
            time_start = new Date().getTime();
        }
        //显示刷新图标
        $("#notification").css({height:0}).html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>释放加载更多</span>").show();
    }
    var transformYPre = 0;
    var moveEvtHandle = function(e){
        point_end = getPos(e);
        var y = point_end.y - point_start.y;      
        if(y>0&&y>100){
            y = 100;
        }else if(y<0){
            y = 0;
        }
        transformYPre += y - transformYPre;
        $("#listPanel").css({
            transition: "all 1s",
            transform: "translate3d(0,"+transformYPre+"px,0)"
        })
        $("#notification").css({
            transition: "all 1s",
            height: transformYPre+"px",
            lineHeight: transformYPre+"px"
        })
        e.preventDefault();
    }
    var endEvtHandle = function(e){
        time_end = new Date().getTime();
        var dis = getDistance(point_start,point_end);
        var time = time_end - time_start;
        if(dis >= swip_dis && time >= swip_time){
            var dir = getDirection(point_start,point_end),
                disY = point_end.y - point_start.y,
                disX = point_end.x - point_start.x;
            if(disY>50&&dir=="down"){
                result = 3;
            }else if(disX>50&&dir=="right"){
                result = 2;
            }else if(disX<-30&&dir=="left"){
                result = 4;
            }else if(disY<-30&&dir=="up"){
                result = 1;
            }
        }
        $("#listPanel").css({
            transition: "all 1s",
            transform: "translate3d(0,0,0)"
        })
        $("#notification").css({height:"30px"}).html("").hide();
    }
    // $("#container").on(startEvt,startEvtHandle).on(moveEvt,moveEvtHandle).on(endEvt,endEvtHandle);  
    $("#listPanel").on(startEvt,function(e){
        startEvtHandle(e);
        $(this).on(moveEvt,moveEvtHandle);
        $(this).on(endEvt,function(e){
            endEvtHandle(e);
            $(this).off(moveEvt).off(endEvt);
            return result;
        });
    })
}