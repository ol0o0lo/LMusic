$(document).ready(function() {
	var H = window.innerHeight;
	var W = window.innerWidth;
	window.onresize = function() {
		H = innerHeight;
		W = innerWidth;
	}

	//侧边栏点击
	$("#more").click(function() {
		x = $("#sidebar").offset().left;
		if (x < 0) {
			$("#sidebar").css("left", 0);
			$("#sidebarCover").fadeIn(1000);

		} else {
			$("#sidebar").css("left", -500);
			$("#sidebarCover").fadeOut(500);
		}
	});
	$("#sidebarCover").click(function() {
		x = $("#sidebar").offset().left;
		if (x >= 0) {
			$("#sidebar").css("left", -500);
			$("#sidebarCover").fadeOut(500);

		}
	})



	//侧边栏:一言历史记录
	$("#hitokotoHistory").hover(function() {
		$("#hitokotoHistory img").css({
			"transform": "scale(1.5)",
			"bottom": "0"
		});
	}, function() {
		$("#hitokotoHistory img").css({
			"transform": "",
			"bottom": ""
		});
	});
	//每次点开展开的高度 原因每30s会更新一次添加一条记录
	$("#hitokotoHistory").click(function() {
		var h = document.getElementById("HistoryContent").offsetHeight;
		if (h > 0) {
			$("#HistoryContent").css({
				"height": "0",
				"overflow": "hidden"
			});
			$("#hitokotoHistory img").css("transform", "rotate(0deg)");
		} else {
			var i = $("#HistoryContent").children("p").length;
			if (i * 90 <= H) {
				$("#HistoryContent").css({
					"height": i * 90
				});
			} else {
				$("#HistoryContent").css({
					"height": H - 200
				});
			}
			$("#hitokotoHistory img").css("transform", "rotate(180deg)");
			setTimeout(function() {
				$("#HistoryContent").css("overflow-y", "scroll");
			}, 500)
		}
	});



	//侧边栏:功能列表
	$("#a").hover(function() {
		$("#a img").css({
			"transform": "scale(1.5)",
			"bottom": "0"
		});
	}, function() {
		$("#a img").css({
			"transform": "",
			"bottom": ""
		});
	});
	$("#a").click(function() {
		var h = document.getElementById("aa").offsetHeight;
		if (h > 0) {
			$("#aa").css({
				"height": "0",
				"overflow": "hidden"
			});
			$("#a img").css("transform", "rotate(0deg)");
		} else {
			$("#aa").css({
				"height": "800px"
			});
			$("#a img").css("transform", "rotate(180deg)");
			setTimeout(function() {
				$("#aa").css("overflow", "inherit");
			}, 500)
		}
	});


	///侧边栏:二言
	$("#b").hover(function() {
		$("#b img").css({
			"transform": "scale(1.5)",
			"bottom": "0"
		});
	}, function() {
		$("#b img").css({
			"transform": "",
			"bottom": ""
		});
	});
	$("#b").click(function() {
		var h = document.getElementById("bb").offsetHeight;
		if (h > 0) {
			$("#bb").css({
				"height": "0",
				"overflow": "hidden"
			});
			$("#b img").css("transform", "rotate(0deg)");
		} else {
			$("#bb").css({
				"height": "800px"
			});
			$("#b img").css("transform", "rotate(180deg)");
			setTimeout(function() {
				$("#bb").css("overflow", "inherit");
			}, 500)
		}
	});
	//














	//maincoltrol按钮控制
	$("#main_control span:eq(0)").click(function() {
		$("#main_control_border").css("left","0%");
		$("#main_interface>div:gt()").css("display", "none");
		$("#lyric").fadeIn(500);

	})
	$("#main_control span:eq(1)").click(function() {
		$("#main_control_border").css("left","50%")
		$("#main_interface>div:gt(0)").css("display", "none");
		$("#comments").fadeIn(500);
	})


	//右边歌单Tip按钮
	$("#playListTip").click(function() {
		var right = parseInt($("#playListPart").css("right"));
		if (right < 0) {
			$("#playListPart").css("right", 0);
			$("#playListTip").css("transform", "rotate(180deg)");
			$("#musicListTip").css("top", "100px");
		} else {
			$("#playListPart").css("right", "-400px");
			$("#playListTip").css("transform", "rotate(0deg)");
			$("#musicListTip").css("top", 0);
		}
		$("#musicListTip").click(function() {
			var left = $("#CloudPlayList").css("left");
			if (parseInt(left) >= 0) {
				$("#CloudPlayList").css("left", "-400px");
				$("#musicListTip").css({
					"left": "-400px",
					"transform": "rotate(180deg)",
					"top": "10px"
				});
			} else {
				$("#CloudPlayList").css("left", 0);
				$("#musicListTip").css({
					"left": 0,
					"transform": "rotate(0deg)",
					"top": "100px"
				});
			}
		})
	})


	$("#userListTip").click(function() {
		var height = $("#uesrList").css("height");
		if (parseInt(height) <= 0) {
			$("#userListTip > img").css({
				"transform":"rotate(180deg)",
			})
			$("#uesrList").css("height", H-130);
			
			
			/* var h = $(".uesrList").length;
			if (h / 3 == parseInt(h / 3)) {
				$("#uesrList").css("height", h / 3 * 140);
			} else {
				$("#uesrList").css("height", parseInt(h / 3 + 1) * 140);
			}
			 */
			
		} else {
			$("#uesrList").css("height", "0px");
			$("#userListTip > img").css({
				"transform":"rotate(0deg)",
			})
		}
	})


	$("#CloudListTip").click(function() {
		var height = $("#CloudList").css("height");
		if (parseInt(height) <= 0) {
			$("#CloudListTip > img").css({
				"transform":"rotate(180deg)",
			})  
			$("#CloudList").css("height", H-130)
		} else {
			$("#CloudListTip > img").css({
				"transform":"rotate(0deg)",
			})
			$("#CloudList").css("height", "0px")
		}
	})
	
	
	
	$("#mute").click(function(){
		var oAu = document.getElementById("music");
		if(oAu.muted){
			if(oAu.volume<=0.5){
				oAu.muted=false;
				$("#mute").find("img").attr("src","img/icon/volume50.png")
			}
			else{
				oAu.muted=false;
				$("#mute").find("img").attr("src","img/icon/volume100.png")
			}
		}else{
			$("#mute").find("img").attr("src","img/icon/muted.png")
			oAu.muted=true;
			oAu.volume=1;
		}
	})
	$("#volumeParts").hover(function(){
		$("#volumeBar").css({"top":"0px"});
		/* $("#volumeBar").animate({top:"0px"},250,"swing"); */
	},function(){
		$("#volumeBar").css({"top":"80px"});
		/* $("#volumeBar").animate({top:"80px"},500); */
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
