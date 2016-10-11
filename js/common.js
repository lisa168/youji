// 初始化设置
var h=$(window).height(),//屏幕宽
	w=$(window).width(),//屏幕高
	aPages=$('.page'),	//获取所有子页面
	musicao = $('.musicaudio')[0], //获取音乐图标
	musicbtn =$('.musicbtn')[0],  //获取音乐按钮
	u=window.navigator.userAgent,//获取浏览器版本
	pageMove=true,
	hashal,
	ios_show = false,
	isMeiZu = u.indexOf('; zh-cn; M')>-1;//判断是否为魅族手机
        
$(function (){
	window.onresize=function (){
		w=$(window).width();
		h=$(window).height();
		Scale(w,h);//背景图片自适应
		weixin();//微信图片自适应
	}
	// 设置屏幕最大宽度
	if(w>640){
		w=640;//设置最大宽度
	}
	var page2_timer=null;
	$('#pages,.box').height(h);
	//背景音乐
	$(document).on('touchend',function (event){
		if(musicao){
			musicao.play();
		}else{
			return;	
		}
		if(!isMeiZu){
			$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
		}
		$(document).off('touchend');
	});
	if(musicbtn){
		musicbtn.onclick= function(event){
			if( musicao.paused){
				musicao.play();
				if(!isMeiZu){
					$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
				}else{
					$('.musicbtn').removeClass('musicStoping').addClass('musicPlaying');
				}
			}else{
				musicao.pause();
				if(!isMeiZu){
					$('.musicbtn').removeClass('musicBounce').addClass('musicStop');
				}else{
					$('.musicbtn').removeClass('musicPlaying').addClass('musicStoping');
				}
			};
		};	
	}
	if(musicao){
		musicao.play();
		if(!isMeiZu){
			$('.musicbtn').removeClass('musicStop').addClass('musicBounce');
		}else{
			$('.musicbtn').removeClass('musicStoping').addClass('musicPlaying');
		}
	}
	//loading
	maodian();
	// 微信提示图片控制宽度
	weixin();
	// 背景图片控制大小
	Scale(w,h);
	//返回首页
	window.gyreturntop=function (){                
		myswipe.slide(0);
	};
	// 左右滑动效果
	if(Number(hashal)||hashal==0){
		var myswipe=Swipe($('#pages')[0], {
			startSlide:Number(hashal),
			continuous:true,
			disableScroll:false,
			stopPropation:true,
			callback:function(index,element){
				$('.xzfdtopbigbox').hide();//下载应用条隐藏
				window.location.hash=index;
				is_weixin();
				aPages.removeClass('active');      //给当前页添加类
				aPages.eq(index).addClass('active');
				topbtn();
				pagemakr(index);
				if($('.active .userImg img').length>0){
					tabPic();
				}else{
					clearInterval(page2_timer);
				}
			}
		});
	};
	$('.page').eq(Number(hashal)).addClass('active');
	// 闪图初始化
	if($('.active .userImg img').length>0){
		tabPic();
	}else{
		clearInterval(page2_timer);
	}
	//图片放大效果
	$('.scaleImg li').off('click').on('click',function (ev){
		$('.showBigPic ul').html('');
		$('.scaleImg').removeClass('showImg');
		$(this).parent().addClass('showImg');
		$('.active .showImg li').each(function (){
			var str='<img src='+$(this).find('img').attr('src')+'>';
			var oLi=$('<li></li>');
			oLi.html(str);
			oLi.appendTo($('.showBigPic ul'));
		});
		$('.showBigPic').css({'opacity':0,'display':'block'});
		var showBig=Swipe($('.showBigPic')[0], {
			startSlide:$(this).index(),
			continuous:true,
			disableScroll:false,
			stopPropation:true
		});
		$('.showBigPic').css({'opacity':1,'display':'block'});
		// 大图尺寸控制
		$('.showBigPic ul li img').each(function (){
			if($(this).height()>h){
				$(this).height(h);
			}
		});
		$('.musicbtn').hide();
		return false;
	});
	// 点击放大图片，大图消失
	$('.showBigPic').off().on('click',function (){
		$(this).hide();
		$('.musicbtn').show();
	});
	pdAndiPhone();
	is_weixin();
	now =Number(hashal);
	pagemakrnum = now;
	pagemakr(now);

	// 第二页闪图尺寸控制
	$('.userImg').width(w);
	$('.userImg').height(h);
	controlSize($('.userImg img'),w,h);
	// 第四页控制头图片大小
	var titleImgW=$('.titleImg').width();
	$('.titleImg').height(w*0.9);
	var titleImgH=$('.titleImg').height();
	controlSize($('.titleImg img'),titleImgW,titleImgH);
	// 第四页可以放大的图片控制尺寸
	var liW=$('.page05List li').width();
	$('.page05List li').height(liW);
	var liH=$('.page05List li').height();
	controlSize($('.page05List li img'),liW,liH);
	// 第五页控制图片大小  添加
	var page05ddW=$('.page05_add .page05pic').width();
	$('.page05_add .page05pic').height(page05ddW*0.68);
	var page05ddH=$('.page05_add .page05pic').height();
	controlSize($('.page05_add .page05pic img'),page05ddW,page05ddH);
	// 第七页图片控制尺寸  添加
	// ****三个图的
	var listLiW=$('.listPic li').width();
	$('.listPic li').height(listLiW*0.7);
	var listLiH=$('.listPic li').height();
	$('.page07cont').each(function (){
		$(this).find('ol').css('maxHeight',listLiH);
	});
	controlSize($('.listPic li img'),listLiW,listLiH);
	//**** 一个图的
	var pageImgW=$('.listImg li').width();
	$('.listImg li').height(pageImgW*0.7);
	var pageImgH=$('.listImg li').height();
	controlSize($('.listImg li img'),pageImgW,pageImgH);
	// 第7页弹出层
	$('.pop').width(w-16);
	$('.pop').height(h-20); 
	$('.pop').css('marginLeft',-$('#pages').width()/2+'px');
	$('.page07_add>ul>li').on('touchstart',function (){})
	$('.page07_add>ul>li').off('click').on('click',function (ev){
		$('.popcont').height(h-60);
		$('.pop .popcont .mywebsit font,.pop .popcont .mywebsit span,.pop .popcont h2,.pop .popcont .mywebsite span,.pop .popcont .article,.pop .popcont .poplist').html('');
		$('.pop .popcont h2').html($(this).find('.page07cont h2').html());
		$('.pop .popcont .mywebsit font').html($(this).find('i').html());
		$('.pop .popcont .mywebsit span').html($(this).find('font').html())
		$('.pop .popcont .article').html($(this).find('.page07cont .intro').html());
		$('.pop .popcont .poplist').html($(this).find('.page07cont .popimg').html());
		$('.pop').css({'opacity':0,'display':'block'})
	// 第7页弹出层图片控制
		var popLiW=$('.poplist li').width();
		$('.poplist li').height(popLiW*0.7);
		var popLiH=$('.poplist li').height();
		controlSize($('.poplist li img'),popLiW,popLiH);
		$('.pop').css({'opacity':1,'display':'none'})
		$('.prevBtn,.nextBtn').hide();
		$('.pop').fadeIn();
		return false;
	});
	// 关闭弹出层
	$('.pop').off('click').on('click',function (ev){
		$('.pop').fadeOut();
		$('.prevBtn,.nextBtn').show();
		ev.stopPropagation();
	});
	// 控制文章显示样式
	$('.page07cont').each(function (){
		if($(this).find('ol li').length==1){
			$(this).addClass('page07item');
			$(this).find('.popimg').addClass('listImg');
			$(this).find('.popimg').removeClass('listPic');
			$(this).find('.titletxt').addClass('listtxt');
			$(this).find('.titletxt>div').addClass('listtxtcont');
		}
	});
	
	// 第八页图片大小控制
	var xxlImgW=$('.page06 ul li .xxlImg').width();
	$('.page06 ul li .xxlImg').height(xxlImgW*0.48);
	var xxlImgH=$('.page06 ul li .xxlImg').height();
	controlSize($('.page06 ul li .xxlImg img'),xxlImgW,xxlImgH);
	// 第九页
	$('.articlePage ul .articleList').off('click').on('click',function (){
		var self=$(this);
		if($(this).hasClass('opened')){
			$(this).find('.art_detail').css('height','80px');
			$(this).find('.art_detail').on('transitionend webkitTransitionEnd',function (){
				self.removeClass('opened');
				$(this).off('transitionend webkitTransitionEnd');
			});
		}else{
			var contH=$(this).find('.art_detail')[0].scrollHeight;
			$(this).find('.art_detail').css('height',contH);
			$(this).find('.art_detail').on('transitionend webkitTransitionEnd',function (){
				self.addClass('opened');

				$(this).off('transitionend webkitTransitionEnd');
			});

		}
	});
	// 第九页控制图片大小
	size($('.page09showImg'));
	// 第十页
	$('.page10_add ul li p').each(function (){
		if($(this).height()<=20){
			$(this).css('textAlign','center');
		}
		var page10pH=$(this).height();
		$(this).css('marginTop',-page10pH/2+'px')
	});
	// 第十页控制图片大小
	var page10ImgW=$('.page10_add ul li .page10xxl').width();
	$('.page10_add ul li .page10xxl').height(page10ImgW*0.66);
	var page10ImgH=$('.page10_add ul li .page10xxl').height();
	controlSize($('.page10_add ul li .page10xxl img'),page10ImgW,page10ImgH);
	// 第十一页可以放大的图片控制尺寸
	$('.page08List').show();
	var li07W=$('.pageList .scaleImg li').width();
	$('.page08List').hide();
	$('.pageList .scaleImg li').height(li07W);
	var li07H=$('.pageList .scaleImg li').height();
	controlSize($('.pageList .scaleImg img'),li07W,li07H);
	// 第十一页控制头图图片大小
	var page07ImgW=$('.page07Img').width();
	$('.page07Img').height(w*0.6);
	var page07ImgH=$('.page07Img').height();
	controlSize($('.page07Img img'),page07ImgW,page07ImgH);
	//第十一页点击内容页面展开收缩
	$('.page08_cont').off().on('click',function (){
		if($(this).children('.page05Text').hasClass('page08Text')){
			$(this).children('.page05Text').height('auto');
			$(this).children('.page08List').show();
			$(this).children('.page05Text').removeClass('page08Text');
			$(this).find('.page08Btn').css('transform','rotate(180deg)');
		}else{
			$(this).children('.page08List').hide();
			$(this).children('.page05Text').addClass('page08Text');
			$(this).find('.page08Btn').css('transform','rotate(0deg)');
		}
	});
	// 第十三页
	var page10ulH=$('.page10 ul').height();
	$('.page10 ul').css({'marginTop':'-'+page10ulH/2+'px'});
	// 左按钮
	$('.prevBtn').off('click').on('click',function (){
		myswipe.prev();
	})
	// 右按钮
	$('.nextBtn').off('click').on('click',function (){
		myswipe.next();
	});
	// 控制尺寸
	function size(obj){
		obj.each(function (){
			var len=$(this).children().length;
			var listW=$(this).width();
			if(len==1){
				$(this).children().width('100%');
			}else if(len%2){
				$(this).children().width('33.3333%');
			}else{
				$(this).children().width('50%');
			}
			var listLiW=$(this).children().width();
			$(this).children().height(listLiW);
			var listLiH=$(this).children().height();
			var Img=$(this).find('img');
			controlSize(Img,listLiW,listLiH);
		});
	}
	// 第二页图片切换
	function tabPic(){
		var aUserImg=$('.active .userImg img');
		if(aUserImg.length>0){
			if(aUserImg.length==1){
				$('.active .userImgShow').html(aUserImg.eq(0).clone());
			}else{
				clearInterval(page2_timer);
				var n=0;
				page2_timer=setInterval(function (){
					n++;
					$('.active .userImgShow').html(aUserImg.eq(n%aUserImg.length).clone());
				},500);
			}
		}
	}
	// 背景图控制尺寸
	function Scale(w,h){
	  ws = w/320.0;
	  hs = h/548.0;
	  $('.pageImg').each(function() {
		$(this).css( { scale : hs < ws ? ws : hs } );
	  });	
	  $('.userImg').css({scale:hs<ws?ws:hs});
	}
	// 微信图控制尺寸
	function weixin(){
		var winW=$(window).width();
		if(winW<320){
			$('.weixinfcbox .weixinfctext').width(280*winW/320);
		}else{
			$('.weixinfcbox .weixinfctext').width(280);
		}
	}
	// 页面图片控制尺寸
	function controlSize(obj,parentW,parentH){
		var oldImgW;
		var oldImgH;
		obj.each(function (){
			var _this=$(this);
			var tmpImg=new Image();
			tmpImg.src=_this.attr('src');
			tmpImg.onload=function(){
				oldImgW=this.width;
				oldImgH=this.height;
				var ratio=oldImgW/oldImgH;
				if(parentW/parentH>oldImgW/oldImgH){
					_this.width(parentW);
					var newImgH=_this.width()/ratio;
					_this.height(newImgH);
					_this.css({'marginTop':-(newImgH-parentH)/2+'px'});
				}else{
					_this.height(parentH);
					var newImgW=_this.height()*ratio;
					_this.width(newImgW);
					_this.css({'marginLeft':-(newImgW-parentW)/2+'px'});
				}
			};
		});
	}
});
