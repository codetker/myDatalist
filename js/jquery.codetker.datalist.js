/*
    datalist 0.1 
    自定义datalist插件，实现html5中input元素datalist的效果
    兼容IE8+,Firefox,Chrome等常见浏览器
*/

;
(function($, window, document, undefined) { //undefinde是真实的undefined，并非参数
	//将可选择的变量传递给方法

	//定义构造函数
	var Datalist = function(ele, opt) {
			this.$element = ele;
			this.defaults = {
					'bgcolor': '#eee',
					'bgcolorHover': '#ccc',
					'fixKeyboard': true
				},
				this.options = $.extend({}, this.defaults, opt);
		}
		//定义方法
	Datalist.prototype = {
			showList: function() {
				var
					bgcolor = this.options.bgcolor,
					bgcolorHover = this.options.bgcolorHover,
					fixkeyboard = this.options.fixKeyboard,
					obj = this.$element, //obj为最外层包裹的div之类的元素，应该拥有positive：relative属性,方便datalist定位。
					input = $(obj).children().eq(0), //input元素
					inputUl = $(obj).children().eq(1), //datalist元素
					n = -1; //记录鼠标位置,-1表示未选中。当n=-1时直接按enter浏览器默认为倒数第一个

				function setCss() {
					//设置弹出datalist的大小和样式
					$(inputUl).css({
						"top": $(input).outerHeight() + "px",
						"width": $(input).outerWidth() + "px"
					});
					$(inputUl).children().css({
						"width": $(input).outerWidth() + "px",
						"height": $(input).outerHeight() + "px",
						"background-color": bgcolor
					});

					$(inputUl).children('li').mouseover(function() {
						n = $(this).index();
						$(this).css("background-color", bgcolorHover);
						$(this).siblings().css("background-color", bgcolor);
					});
					$(inputUl).children('li').mouseout(function() {
						$(this).css("background-color", bgcolor);
					});
				}

				function fixKeyBoard() {
					if (fixkeyboard) {
						$(document).keydown(function(event) {
							/* 点击键盘上下键，datalist变化 */
							stopDefaultAndBubble(event);

							switch (event.keyCode) {
								case 38: //向上
									if (n == 0 || n == -1) {
										n = 4;
									} else {
										n--;
									}
									$(inputUl).children('li').eq(n).siblings().mouseout();
									$(inputUl).children('li').eq(n).mouseover();
									break;
								case 40: //向下
									if (n == 4) {
										n = 0;
									} else {
										n++;
									}
									$(inputUl).children('li').eq(n).siblings().mouseout();
									$(inputUl).children('li').eq(n).mouseover();
									break;
								case 13: //enter
									$(inputUl).children('li').eq(n).mouseout();
									$(input).val($(inputUl).children('li').eq(n).text());
									n = -1;
									break;
								default:
									break;
							}

						});
					}
				}

				function stopDefaultAndBubble(e) {
					e = e || window.event;
					//阻止默认行为
					if (e.preventDefault) {
						e.preventDefault();
					}
					e.returnValue = false;

					//阻止冒泡
					if (e.stopPropagation) {
						e.stopPropagation();
					}
					e.cancelBubble = true;
				}

				setCss();
				//再次focus变为空，也可以改为某个默认值
				//datalist的显示和隐藏
				$(input).focus(function() {
					if ($(this).val() != '') {
						$(this).val('');
					}
					$(inputUl).slideDown(500);
					fixKeyBoard();
				});
				$(input).blur(function() {
					$(inputUl).slideUp(500);
				});
				$(inputUl).delegate('li', 'click', function() {
					$(input).val($(this).text());
				});

				return this;
			}
		}
		//在插件中使用Datalist对象
	$.fn.myDatalist = function(options) {
		//创建实体
		var datalist = new Datalist(this, options);
		//调用其方法
		return datalist.showList();
	}

})(jQuery, window, document);