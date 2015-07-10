/*
    datalist 0.1 
    自定义datalist插件，实现html5中input元素datalist的效果
    兼容IE8+,Firefox,Chrome等常见浏览器
*/

;(function($,window,document,undefined){ //undefinde是真实的undefined，并非参数
    //将可选择的变量传递给方法

    //定义构造函数
    var Datalist=function(ele,opt){
        this.$element=ele;
        this.defaults={
            'bgcolor':'green',
            'widths':1,
            'heights':1
        },
        this.options=$.extend({}, this.defaults, opt);
    }
    //定义方法
    Datalist.prototype={
        showList:function(){
            var color=this.options.bgcolor;
            var width=this.options.widths;
            var height=this.options.heights; //属性值

            var obj=this.$element; //obj为最外层包裹的div之类的元素，应该拥有positive：relative属性,方便datalist定位。
            var input=$(obj).children().eq(0); //input元素
            var inputUl=$(obj).children().eq(1); //datalist元素
            $(inputUl).css({
                "top":$(input).outerHeight()+"px",
                "width":$(input).outerWidth()*width+"px"
            });
            $(inputUl).children().css({
                "width":$(input).outerWidth()*width+"px",
                "height":$(input).outerHeight()*height+"px"
            });
            $(inputUl).children('li').hover(function() {
                $(this).css("background-color",color);
            }, function() {
                $(this).css("background-color","#fff");
            });
            $(input).focus(function() {
                if($(this).val()!=""){
                    $(this).val("");
                }
                $(inputUl).slideDown(500);
            });
            $(input).blur(function() {
                $(inputUl).slideUp(500);
            });
            $(inputUl).delegate('li', 'click', function() {
                    $(input).val( $(this).text() );
            });
            return this;
        }
    }
    //在插件中使用Datalist对象
    $.fn.myDatalist=function(options){
        //创建实体
        var datalist=new Datalist(this,options);
        //调用其方法
        return datalist.showList();
    }
    /*$.fn.myDatalist=function(options){
        //设置默认值
        var defaults={
            "color":"red",
            "width":1,   //表示相对于上面输入框对应值的倍数，默认相等
            "height":1
        };
        var settings=$.extend({},defaults,options);
        //没有定义则用默认值，定义了则用定义后的值,加上一个空对象对对象进行修改，防止重写了默认值导致后面使用时用的是之前修改了的属性(保护默认值)
        return this.each(function(){
            var o=settings;
            var color=o.color;
            var width=o.width;
            var height=o.height; //属性值

            var obj=$(this); //obj为最外层包裹的div之类的元素，应该拥有positive：relative属性,方便datalist定位。
            var input=$(obj).children().eq(0); //input元素
            var inputUl=$(obj).children().eq(1); //datalist元素
            $(inputUl).css({
                "top":$(input).outerHeight()*height+"px",
                "width":$(input).outerWidth()*width+"px"
            });
            $(inputUl).children().css({
                "width":$(input).outerWidth()*width+"px"
            });
            $(inputUl).children('li').hover(function() {
                $(this).css("background-color",color);
            }, function() {
                $(this).css("background-color","#fff");
            });
            $(input).focus(function() {
                if($(this).val()!=""){
                    $(this).val("");
                }
                $(inputUl).slideDown(500);
            });
            $(input).blur(function() {
                $(inputUl).slideUp(500);
            });
            $(inputUl).delegate('li', 'click', function() {
                    $(input).val( $(this).text() );
            });
        });
    }*/
})(jQuery,window,document);


// $(".input_wrap").myDatalist();
// $(function(){
//     $(".input_wrap").myDatalist();
// })