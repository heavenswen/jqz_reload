# qiu_reload.js
<p>//基于jquery or zepto js框架</p>
<p>支持webkit浏览器和主流的pc浏览器</p>
<p>自定义触发距离</p>
<p>自定义三段式显示效果</p>
<p>支持自定义下拉上拉事件</p>

<p><span style = 'color:#f00'>*</span>因为之前有遇到项目是需要显示下拉提示栏，因此我设计成当拉到完返回一个对象的方法，进行自定义</p>

<strong>可以用animationEnd或transitionEndl来监控动画结束！</strong>
<code>
object.on("webkitAnimationEnd animationEnd",function(){
			//动画对象结束后执行
		})
</code>
<ul>
<strong>自定义属性</strong>

		<li>top: "reload_up",//上方状态对象class</li>
		<li>up1: "下拉刷新",//上方原始状态</li>
		<li>up2: "释放立即刷新",//上方可触发状态</li>
		<li>up3: "加载中...!",//上方触发状态</li>
		<li>bottom: "reload_down",class</li>
		<li>down1: "上拉加载更多",</li>
		<li>down2: "释放加载更多",</li>
		<li>down3: "加载中...",</li>
		<li>distence: 45,//触发距离	</li>				
		<li>up:function(){},//上方触发事件</li>
		<li>down:function(){}</li>
	<li>//触发事件时返回一个状态栏对象和布尔值（当大于设置的距离时为true）</li>
	<li>//down或up触发事件不存在时不执行该事件</li>
</ul>
<p style='color:#666'>不断改进中，若有什么好的想法和意见请与我联系，谢谢</p>	