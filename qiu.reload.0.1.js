/*
 * from qiu 
 * transform = fn_transform（） 兼容所有h5的浏览器的transform
 */
//transform
function fn_transform(){
	var transforms = [
		"-webkit-transform",
		"transform",
		"-o-transform",
		"-moz-transform",
		"-ms-transform",
	];
	for(var i=0;i<transforms.length;i++)
	{
		if(transforms[i] in document.documentElement.style)
		{
			return transforms[i];
		}
	}
};
var transform = fn_transform();
;(function($) {
	$.qiu_reload = function(id, arr) {
			var $obj = $(id),
				$top = '',
				$bottom = '',
				starty = 0, //初始位置
				move = 0, //移动距离
				fx = false, //方向
				init = {
					top: "reload_up",//上方状态对象
					up1: "下拉刷新",//上方原始状态
					up2: "释放立即刷新",//上方可触发状态
					up3: "加载中",//上方触发状态
					bottom: "reload_down",
					down1: "上拉加载更多",
					down2: "释放加载更多",
					down3: "加载中",
					distence: 45,//触发距离					
					up:function(){},//上方触发事件
					down:function(){}
				}; //预设属性
			//初始化
			if (arr) $.extend(init, arr);
			//init dom...
			var top_h = init.top_height,
				bottom_h = init.bottom_height;
			var 
				top_html = "<div class='" + init.top + "'style='display:none;'>" + init.up1 + "</div>";
			var 
				bottom_html = "<div class='" + init.bottom + "'style='display:none;'>" + init.down1 + "</div>";
			//初始化对象
			this.apphtml = function() {
				$obj.children().eq(0).before(top_html);
				$obj.append(bottom_html);
				$top = $('.' + init.top);
				$bottom = $('.' + init.bottom);
			}
			this.apphtml();
			//添加结束时的过渡
			transfun("transition-property",'all');
			transfun("transiton-timing-function","linear");
			transfun("transition-duration",'0ms');		
			//1,start 
			$obj.on("touchstart mousedown",startfun);
			function startfun(e){
				starty = positionY(e);
				fx = false;				
				transfun('transition-duration','0ms');
				
				$obj.on("mousemove touchmove", movefun);
				//touchend 注册
				$(document).on("mouseup touchend",endfun);
				if (!("ontouchend" in document)) e.preventDefault(); //是否支持touch
			}
			//2,moveing
			function movefun(e) {
					move = positionY(e) - starty;
					//方向判断
					if (arr.up&&move > 0 && !fx && $(window).scrollTop() <= 0) {
						fx = 'down';
						e.preventDefault()
						//anmate
					} else if (arr.down&&move < 0 && !fx && $(window).scrollTop() >= ($("html,body").height() - $(window).height())) {
						fx = 'up';
						e.preventDefault()
					}
					//超过时处理
					if (fx === 'down' && move < 0 || fx === 'up' && move > 0) {
						move = 0;
					}
					//动画执行
					if(fx)animate();
				//moveing...
			}
			//动画效果
			function animate() {
				var mo = Math.max(move, (move * -1));
				$obj.css(
						transform,'translate(0,'+move+'px)'
						);
				if (fx === 'down') {					
					$top.show();	
					if (mo > init.distence) {
						$top.html(init.up2);
					} else {
						$top.html(init.up1);
					} //string

				} else if (fx === 'up') {
					$bottom.show();
					if (mo > init.distence) {
						$bottom.html(init.down2);
					} else {
						$bottom.html(init.down1);
					} //string	
				}
			}
			//3,结束动画
			function endfun() {
				$obj.off("mousemove touchmove", movefun);
				$(document).off("mouseup touchend",endfun);
				var m = move < 0 ? (move * -1) : move,
				bool = m>init.distence?true:false;
				//启用过渡动画
				transfun('transition-duration','300ms');
				if (fx === 'down') {
					
					if(bool)$top.html(init.up3)
					init.up({'obj':$top,'bool':bool})
				} else
				if (fx === 'up') {
					if(bool)$bottom.html(init.down3);		
					//输出
					init.down({'obj':$bottom,'bool':bool});
					
				}
				return $obj.css(transform,"translate(0,0)");
			}
			//if webkittransform or transform
			function transfun(str,value){
				var trans = '';
				
				if(transform.match(/webkit/i)){
					trans = '-webkit-'+str;
				}else{
					trans = str;
				}
				return $obj.css(trans,value);
			}
			//position page y
			function positionY(e) {
				var y = e.pageY;
				if (e.targetTouches) {
					y = e.targetTouches[0].screenY; //zepto
				} else if (e.originalEvent&&"ontouchend" in document) {
					y = e.originalEvent.touches[0].pageY; //jquery
				}
				
				return y;
			}	
		} //$
})(window.jQuery || window.Zepto);
	