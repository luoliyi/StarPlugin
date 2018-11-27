;
(function(factory) {
	factory(window, jQuery, document);
})(function(win, $, doc) {
	/*
	 * 一星评论
	 */
	$.fn.setOneStar = function(userSetting) {
		/*
		 默认配置
		* */
		var defaultSetting = {
			num: 1,
			width: 32,
			height: 21,
			callback: null,
			obj: null,
			objcounter: null
		}

		$.extend(defaultSetting, userSetting);
		var o = defaultSetting.obj;
		var count = defaultSetting.objcounter;

		for(var i = 0; i < defaultSetting.num; i++) {
			$("<img src='img/stark2.png' />").css({
					"width": defaultSetting.width + "px",
					"height": defaultSetting.height + "px"
				})
				.appendTo($(o));
		}

		$(o).find("img").css("cursor", "pointer").mouseenter(function() {
			for(var j = $(this).index(); j >= 0; j--) {
				$(o).find("img:eq(" + j + ")").attr("src", "img/stars2.png");
			}
			$(count).html($(this).index() + 1);
		}).mouseout(function() {
			for(var j = $(this).index(); j >= 1; j--) {
				$(o).find("img:eq(" + j + ")").attr("src", "img/stark2.png");
			}
			$(count).html("1");

		}).click(function() {
			if(defaultSetting.callback) {
				defaultSetting.callback("感谢你,打分成功,你打的分数是：" + ($(this).index() + 1) + "分");
			}
		});
	}

	/*
	 半星评论
	 *
	 */
	$.fn.setHalfStar = function(userSetting) {
		/*
		 默认配置
		* */
		var defaultSetting = {
			num: 1,
			width: 32,
			height: 21,
			callback: null,
			obj: null,
			objcounter: null
		}

		$.extend(defaultSetting, userSetting);

		var o = defaultSetting.obj;
		var count = defaultSetting.objcounter;
		//星星总数
		var starNum = defaultSetting.num * 2;

		//index背景判断
		var sindex = null;

		$(o).width((starNum * 16) + "px");

		/*半个星的分数*/
		var eScoure = 0.5;
		for(var j = 1; j <= starNum; j++) {
			$("<a/>").css({
				"left": "0px",
				"width": (j * 16) + "px",
				"z-index": (starNum - j)
			}).data("score", eScoure).appendTo($(o));
			eScoure += 0.5;
		};
		$(o).find("a").mouseover(function() {
			/*
			 * 取消设定的背景图片
			 * 
			 * 这个给 background：null 与 ""的区别：null 是赋值了一个空置， ""是指未设置该属性
			 */
			if(sindex > 0) {
				$(o).find("a:eq(" + sindex + ")").css("background", "");
			}
			var val = ($(this).data("score"));
			$(count).html(val);

		});
		/*
		 回调
		 * */
		$(o).find("a").click(function() {
			sindex = $(this).index();
			var val = ($(this).data("score"));
			if(defaultSetting.callback) {
				defaultSetting.callback("感谢你,打分成功,你打的分数是：" + val + "分");
			}
			$(this).css("background", "url(img/stars2.png)");
		});
	}

});