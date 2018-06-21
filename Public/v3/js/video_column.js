$(function(){
	$(".gold_change_btn i").each(function(index){
		var cleartime2 = null;
		$(this).hover(function(){
			cleartime2=setTimeout(function(){
				$(".gold_change_btn i").removeClass("cur");
				$(".gold_change_btn i").eq(index).addClass("cur");
				$(".gold_price_cgchange").css("display","none");
				$(".gold_price_cgchange").eq(index).css("display","block");
			},280);
		},function(){
			clearTimeout(cleartime2);
		});
	});
	//轮播图
	new Visual();
})
//轮播图构造函数
function Visual(){
	this.now = 0;
	this.oBox = $('.main_visual');
	this.aLi1 = $('.main_visual').find('li');
	this.aLi2 = $('.child_visual').find('li');
	this.init();
	this.AutoVisual();
	this.fnBtn();
}

//轮播图初始化
Visual.prototype.init = function(){
	this.oBox.width(this.aLi1.width()*this.aLi1.length);
	this.aLi2.eq(this.now).addClass('cur').siblings().removeClass('cur');
}

//定时自动轮播图
Visual.prototype.AutoVisual = function(){
	var _this = this;
	var timer = setInterval(function(){
		_this.fnChange();
	},5000)

	//鼠标移上关闭自动轮播&&鼠标移出开启自动轮播
	$('.main_visual_wrap').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			_this.fnChange();
		},5000)
	})

}

//按钮及小图控制切换
Visual.prototype.fnBtn = function(){
	var _this = this;
	//小图标控制
	this.aLi2.mouseenter(function(){
		_this.now = $(this).index();
		_this.oBox.stop().animate({
			left:-_this.aLi1.width()*_this.now + 'px'
		})
		_this.aLi2.eq(_this.now).addClass('cur').siblings().removeClass('cur');
	})

	//左按钮
	$('.v_btn_left').click(function(){
		if(_this.now > 0){
			_this.now--;
		}else{
			_this.now = _this.aLi1.length-1;
		}
		_this.oBox.stop().animate({
			left:-_this.aLi1.width()*_this.now + 'px'
		})
		_this.aLi2.eq(_this.now).addClass('cur').siblings().removeClass('cur');
	})

	//右按钮
	$('.v_btn_right').click(function(){
		_this.fnChange();
	})
}

//轮播图转换
Visual.prototype.fnChange = function(){
	if(this.now < this.aLi1.length-1){
		this.now++;
	}else{
		this.now = 0;
	}
	this.oBox.stop().animate({
		left:-this.aLi1.width()*this.now + 'px'
	})
	this.aLi2.eq(this.now).addClass('cur').siblings().removeClass('cur');
}
