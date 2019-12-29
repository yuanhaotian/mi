/*header start*/
(function(){
	var obuy = $("#header .h_m_buy"),
		opt = $("#header .h_m_buy .pt"),
		ostip = $("#header .h_m_buy .stip");//隐藏部分
	obuy.hover(function(){
		opt.addClass('hover');
		ostip.stop().slideDown(300);
	},function(){
		ostip.stop().slideUp(200,function(){
				opt.removeClass('hover');
			})
	});
})();
/*header end*/
/*nav start*/
(function(){
	var olif = $("#nav .n_m_sn .lif:nth-child(-n+2)"),//小于2
		ohid = $("#nav .n_m_sn .hid"),
		ouls = $("#nav .n_m_sn .hid ul"),
		$input = $("#nav .n_m_search input"),
		$a = $("#nav .n_m_search a");

	olif.hover(function(){
		ohid.stop().slideDown(300);
		ouls.eq($(this).index()).show().siblings().hide();
		//所有显示的去掉？
	},function(){
		ohid.stop().slideUp(300);
		//ouls.eq($(this).index()).hide();
	});

	ohid.hover(function(){   //移动到ohid区域，不变化
		$(this).stop().slideDown(300);
	},function(){
		$(this).stop().slideUp(300);//$(this),想当原生this
	});

	$input.focus(function(){
		$a.addClass('on');
	}).blur(function(){
		$a.removeClass('on');
	});
})();
/*nav end*/
/*banner start*/
(function(){
	var omain = $("#banner .b_main"),
		olif = $("#banner .b_m_nav .lif:nth-child(-n+2)"),
		ohid = $("#banner .b_m_nav .hid"),
		ouls = $("#banner .b_m_nav .hid ul"),
		ocircle = $("#banner .b_m_circle li"),
		oimg = $("#banner .b_m_imgs a"),
		oarr = $("#banner .b_m_arrow i"),
		iLength =oimg.length,
		iIndex = 0,//图片
		nowTime = 0;
	olif.hover(function(){
		ohid.addClass('on');
		ouls.eq($(this).index()).show().siblings().hide();
	},function(){
		ohid.removeClass('on');
	})

	ohid.hover(function(){
		ohid.addClass('on');
	},function(){
		ohid.removeClass('on');
	})

	ocircle.click(function(){
		if(new Date() - nowTime >800 && iIndex != $(this).index()){
			nowTime = new Date();
			anim(function(){
				iIndex = $(this).index(); 
			}.bind(this));
		}
	}) //两个匿名函数怎么传？

	oarr.click(function(){
		if(new Date() - nowTime >800){
			nowTime = new Date();
			var i = $(this).index();
			anim(function(){
				if(i){
					iIndex++;
					iIndex %= iLength;
				}else{
					iIndex--;
					if(iIndex<0) iIndex = iLength-1;
				}
			});
		}
	})

	omain.hover(function(){clearInterval(timer)},auto);//auto移出继续轮播

	function auto(){
		timer = setInterval(function(){
			/*ocircle.eq(iIndex).removeClass('on');
			oimg.eq(iIndex).fadeOut(500);*/
			anim(function(){
				iIndex++;
				if(iIndex===iLength) iIndex=0;
			});
			/*ocircle.eq(iIndex).addClass('on');
			oimg.eq(iIndex).fadeIn(800);*/
		},8000); 
	}
	auto();
	function anim(fn){
		ocircle.eq(iIndex).removeClass('on');
		oimg.eq(iIndex).fadeOut(500);
		fn();
		ocircle.eq(iIndex).addClass('on');
		oimg.eq(iIndex).fadeIn(800);
	}
})();

/*banner end*/
/*single start*/
(function(){
	var $span = $("#single .s_m_title span"),
		$ul = $("#single .s_m_pic"),
		$width = $("#single .s_main").width(),
		ulL = 0,
		index = 0,
		timer = null,
		i = 0;

	$span.click(function(){
		i = $span.index(this);
		// if(i){
		// 	if(ulL === 0) return;
		// 	ulL += $width;  //可能以后不只两个ul宽
		// }else{
		// 	if(ulL === -($span.length-1)*$width) return;
		// 	ulL -= $width;
		// }
		// $(this).addClass("on").siblings().removeClass('on');
		// $ul.animate({
		// 	marginLeft:ulL+"px",
		// },500);
		
		if(i != index){ 
			clearInterval(timer);
			index = i; 
			$(this).addClass("on").siblings().removeClass('on');
			$ul.stop().animate({
				marginLeft: -i*$width+'px',
			},500); //stop()停止所有动画
			auto();
		}
	})

	function auto(){
		timer = setInterval(function(){
			index = !index; 
			var i = index;
			$span.eq(i).addClass("on").siblings().removeClass('on');
			$ul.stop().animate({
				marginLeft: -i*$width+'px',
			},500);
		},5000);
	}
	auto();
})();
/*single end*/
/*match start*/
(function(){
	var $li = $('#match .m_m_title li'),
		$ul = $('#match .picr ul');

	$li.click(function(){
		var i = $(this).index();
		$(this)
			.addClass('on')
			.siblings()
			.removeClass('on');
		$ul.eq(i)
			.addClass('on')
			.siblings()
			.removeClass('on');
	});
})();
/*match end*/
/*content start*/
(function(){
	var $box = $("#content .c_m_pic .box"),
		W = $box.find(".liBox .mesage").eq(0).width(),
		index=0;
	$box.each(function(){
		var $ul = $(this).find(".liBox"),
			$arrow = $(this).find(".arrow i"),
			$tab = $(this).find(".tab li"),
			len = $ul.find(".mesage").length,
			index = 0;

		var clkTime  = 0;

		function moveUl(index){
			if(new Date()-clkTime > 500){
				clkTime = new Date();
				$ul.stop().animate({
					marginLeft: -index*W+"px"
				},500);
			}
			$tab.eq(index)
				.addClass("on")
				.siblings().removeClass('on');
		}

		$arrow.click(function(){
			var time = new Date();
			$(this).index() ? index++ : index--;
			index = Math.max(0,index);
			index = Math.min(len-1,index);

			moveUl(index);	
		});

		$tab.click(function(){
			index = $(this).index();
			moveUl(index);	
		});
	});	
})();
/*content end*/
/*video start*/
(function(){
	var $play = $("#video .v_m_ul i.icon-video"),
		$cover = $("#video .v_m_cover"),
		$c_main = $cover.find(".c_main"),
		$wrong = $cover.find(".title .icon-wrong"),
		$h2 = $cover.find(".title h2");

	$play.click(function(){
		var $text = $(this).parent().find("a.title").html();
		$cover.addClass("vidHid");
		$c_main.animate({
			marginTop : 5+"px"
		},800);
		$h2.html($text);
	});

	$wrong.click(function(){
		$c_main.animate({
			marginTop : -605+"px"
		},800,function(){
			$cover.removeClass("vidHid");
		});
	});
})();
/*video end*/
