/***************
*1.0 说明
*传入参数为二维数组，[
* ['Hover绑定的标签id','与Hover时间相关的标签id(可省略)','绑定元素中需要修改类的子元素(缺省为 i:first-child)','原来的类名','后来的类名']
* ]
*函数执行会在id对应标签中寻找需要修改的子元素并在id标签最后插入子标签span,该标签为'←'图标
*
* 待完善(是否要插入span标签，传入参数为对象等)
 *
 * 2.0说明
 * 传入参数为对象
 * 属性:
 * activeMenu   活动组，如果您在html初始化一个id为active类，应当传入它相关的参数
 * idActiveClass    绑定事件的元素上应用的类
 * id_linkActiveClass   绑定事件的元素相关联的元素
 * arr          需要绑定事件的元素组
 *      arr中的数组为['Hover绑定的标签id','与Hover时间相关的标签id(可省略)','绑定元素中需要修改类的子元素(缺省为 i:first-child)','原来的类名','后来的类名']
 * iconHoverBindInsertBoll  是否在绑定事件的元素中的最后插入子标签span,该标签为'←'图标
 *iconEventBan  (禁用后会保存在activeMenu等待其他元素事件触发后重新绑定事件，即使设置为false也建议您在extraEvent中手动禁止，避免重复触发事件)
 *如果不需要为某组元素绑定事件请将第二个参数设为空字符串
 ***************/


    var iconEvent = function (options) {
    this.settings = {
        activeMenu: undefined,
        idActiveClass: undefined,
        id_linkActiveClass: undefined,
        arr: undefined,
        iconHoverBindInsertBool: true,
        iconEvenBan: true,
        extraEventAdd: undefined,
        extraEventRemove: undefined
    }
    Object.assign(this.settings,options)

    this.iconClickBind = function () {
        var that = this
        this.settings.arr.forEach(function(item){
            var newItem = item,
                id = item[0],
                id_link = item[1],
                childTag = item[2],
                class_1 = item[3],
                class_2 = item[4]
            if(!!id_link){
                $(id).click(function () {
                    if(!!that.settings.activeMenu){
                        if(that.settings.activeMenu.length < 5 && that.settings.activeMenu.length > 2){
                            that.settings.activeMenu[4] = that.settings.activeMenu[3]
                            that.settings.activeMenu[3] = that.settings.activeMenu[2]
                            that.settings.activeMenu[2] = 'i:first'
                        }
                        if(that.settings.idActiveClass) $(that.settings.activeMenu[0]).removeClass(that.settings.idActiveClass)
                        $(that.settings.activeMenu[0] + ' ' + childTag).removeClass(that.settings.activeMenu[4]).addClass(that.settings.activeMenu[3])
                        if(that.settings.iconHoverBindInsertBool) $(that.settings.activeMenu[0] + ' span:last-child').remove()
                        if(that.settings.id_linkActiveClass) $(that.settings.activeMenu[1]).removeClass(that.settings.id_linkActiveClass)

                        if(!!that.settings.extraEventRemove) that.settings.extraEventRemove(that.settings.activeMenu[0],that.settings.activeMenu[1])

                        that.settings.arr = []
                        that.settings.arr.push(that.settings.activeMenu)
                        that.iconHoverBind()
                        that.iconClickBind()
                    }
                    if(!!that.settings.idActiveClass) $(this).addClass(that.settings.idActiveClass)
                    if(!!that.settings.id_linkActiveClass) $(id_link).addClass(that.settings.id_linkActiveClass)
                    $(id + ' ' + childTag).removeClass(class_1).addClass(class_2)
                    //鼠标尚未移出已删除事件，因此mouseleave未被触发
                    if(that.settings.iconEvenBan){
                        $(id).off()
                        that.settings.activeMenu = newItem
                    }
                    if(!!that.settings.extraEvent) that.settings.extraEvent(id,id_link,that)
                })
            }
        })
        return that
    }
    this.iconHoverBind = function () {
        var that = this
        this.settings.arr.forEach(function(item){
            if(item.length < 5 && item.length > 2){
                item[4] = item[3]
                item[3] = item[2]
                item[2] = 'i:first'
            }
            if(!!item[3] && !!item[4]){
                var id =item[0],
                    childTag=item[2],
                    class_1=item[3],
                    class_2=item[4]
                $(id).mouseenter(function(){
                    $(id+' '+ childTag).removeClass(class_1).addClass(class_2)
                    if(that.settings.iconHoverBindInsertBool) $(id).append('<span><i></i><i class="fa fa-caret-left"></i></span>')
                }).mouseleave(function(){
                    $(id+' '+ childTag).removeClass(class_2).addClass(class_1)
                    if(that.settings.iconHoverBindInsertBool) $(id + ' span:last-child').remove()
                })
            }
        })
        return that
    }
}

    //定义函数：使用消息模板
    var messageBoxCompiled = function messageBoxCompiled(msg,position){
        position = position?position:"left";
        var messageBox = !!msg.MsgType&&msg.MsgType=="image"?'<div class="message-list message-list-left"><img src="<{= msg.headimgurl }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from }></em> <div class="list-group-item"> <i style="position: absolute" class="glyphicon glyphicon-menu-left"></i><p class="list-group-item-text"><img src="<{= msg.mediaId }>" data-imgurl="<{= msg.mediaId }>" class="weixinServerImage weixinServerImageActive"></p></div></div>':'<div class="message-list message-list-left"><img src="<{= msg.headimgurl }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from }></em> <div class="list-group-item"> <i style="position: absolute" class="glyphicon glyphicon-menu-left"></i> <p class="list-group-item-text"><{= msg.content }></p></div></div>'
        if(position === "right"){
            //右
            messageBox = messageBox.replace(/left/g,"right").replace(/(<img.+\/>)(<em.+<\/em>)/,"$2$1")   
        }
        var compiled = _.template(messageBox);
        return compiled({msg});
    }
    //定义函数：显示通知框
    var showNotification = function showNotification(text){
        $("#notification").html(text).show("fast");
                setTimeout(function () {
                    $("#notification").html("").hide("fast");
                },3000);
    }

    var imageHandle = {
        getDataURL: function (width,height,image)
        {
            var width = width,
                height = height,
                canvas = document.createElement("canvas")
            canvas.width = width
            canvas.height = height
            var context = canvas.getContext("2d");
            context.drawImage(image,0,0,width,height)
            document.documentElement.appendChild(canvas)
            var imageData = canvas.toDataURL('image/png');
            return imageData;
        },
        getBlob: function(imageData)
        {
            if(!imageData) var imageData = this.getDataURL();
            var b64 = imageData.replace('data:image/png;base64,','');
            var binary = atob(b64);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return  new Blob([new Uint8Array(array)], {type: 'image/png'});
        }
    }


    //将逐帧图片以动画连续显示
    var picToAnimate = function (options){
        var config = {
            picWrap : "#picWrap",
            _length : 192,
            _height : 192,
            ratio : 1,
            reverse: true,
            loop: true,
            src : "/static/image/Animation3.png"
        }
        Object.assign(config,options)
        config.picWrap = document.querySelector(config.picWrap)
        var image = new Image(),
            _x = 0,
            _y = 0,
            _timer = null
        image.src = config.src
        var wn = parseInt(image.width) / 192,
            hn = parseInt(image.height) / 192
        config.picWrap.style.backgroundSize = config.ratio * config._length * wn + "px " + config.ratio * config._height * hn + "px"
        config.picWrap.style.width = config.ratio * config._length + "px"
        config.picWrap.style.height = config.ratio * config._height + "px"
        function animate(){
            config.picWrap.style.backgroundPosition = _x + "px " + _y + "px"
            _x -= config.ratio * config._length
            if(_x <= -config.ratio * config._length * wn){
                _x = 0
                _y -= config.ratio * config._height
                if(_y <= -config.ratio * config._height * hn){
                    clearInterval(_timer)
                    _x = -config.ratio * config._length * (wn-1)
                    _y = -config.ratio * config._height * (hn-1)
                    if(!!config.reverse){
                        _timer = setInterval(animateReverse,120)
                    }
                }
            }
        }
        function animateReverse(){
            config.picWrap.style.backgroundPosition = _x + "px " + _y + "px"
            _x += config.ratio * config._length
            if(_x > 0){
                _x = -config.ratio * config._length * (wn-1)
                _y += config.ratio * config._height
                if(_y > 0){
                    clearInterval(_timer)
                    _x =_y = 0
                    if(!!config.loop){
                        _timer = setInterval(animate,120)
                    }
                }
            }

        }
        this.startAnimate = function(){
            _timer = setInterval(animate,120)
        }
        this.stopAnimate = function(){
            clearInterval(_timer)
        }
    }