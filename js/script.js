window.onload = function() {
	var index = 0; //索引歌单目录关键的index
	var oAu = document.getElementById("music");
	var lyricArray = new Array(); //歌词数组
	var playMethod = "sequence"; //默认播放方式

	//全局变量H,W窗口改变时重新获取
	var H = window.innerHeight;
	var W = window.innerWidth;
	window.onresize = function() {
		H = innerHeight;
		W = innerWidth;
	}


	$(document).ready(function() {
		//动态调整
		window.addEventListener("resize", resizeAll);
		resizeAll(); //首次打开自动设置
		function resizeAll() {
			$("#main_interface").css("height", H - 150);
			$("#playListPart").css("height", H - 50)
			$("#playList").css("height", H - 50);
			$("#uesrList").css("height", H - 130);

		}



		oAu.oncanplaythrough = function() {
			allMusicTime(); //获取&设置歌曲总时长
			musiclCover(index); //传入index获取封面
			musicComments(musicJson.musicDATA[index].id); //传入id获取评论
			/* musicMv(musicJson.musicDATA[index].id); */ //传入id获取MV(砍了)
			musiclyric(musicJson.musicDATA[index].id); //传入id获取歌词
			setplaying(); //设置列表中正在播放的动画


		}


		nowMusicTime(); //实时更新当前歌曲播放时间
		updateProgress(); //实时更新进度条

		//播放_暂停
		$("#play_pause").click(function() {
			/* play_pause_animation(); //播放暂停效果动画 */
			play_pause(); //判断暂停和播放音乐 
		});

		//上一首
		$("#before").click(function() {
			$("#play_pause").attr("src", "img/icon/play.png");
			changeMusic(-1); //切歌下一首
			/* allMusicTime(); //设置歌曲总时长 */
			click_animation("#before"); //点击效果
			animation_replay(); //动画从新开始


		});

		//下一首
		var oNext = document.getElementById("next");
		oNext.onclick = function() {
			$("#play_pause").attr("src", "img/icon/play.png");
			changeMusic(1); //切歌下一首
			click_animation("#next"); //点击效果
			animation_replay(); //动画从新开始
		}
		/* 		
		$("#next").click(function() {
					$("#play_pause").attr("src", "img/icon/play.png");
					changeMusic(1); //切歌下一首
					click_animation("#next"); //点击效果
					animation_replay(); //动画从新开始
				}); */

		/*
		var oNext = document.getElementById("next");
		oNext.onclick = function(){
			$("#play_pause").attr("src", "img/icon/play.png");
			changeMusic(1); //切歌下一首
			click_animation("#next"); //点击效果
			animation_replay(); //动画从新开始
		} */

		//键盘控制
		$(document).keyup(function() {
			if (event.keyCode == 32) {
				/* play_pause_animation(); //播放暂停效果动画 */
				play_pause(); //判断暂停和播放音乐
			}
			if (event.keyCode == 37) {
				$("#play_pause").attr("src", "img/icon/play.png");
				click_animation("#before"); //点击效果
				animation_replay(); //动画从新开始
				changeMusic(-1); //切歌下一首
			}
			if (event.keyCode == 39) {
				$("#play_pause").attr("src", "img/icon/play.png");
				click_animation("#next"); //点击效果
				animation_replay(); //动画从新开始
				changeMusic(1); //切歌下一首
			}
		})
		
		

		
		
		
		
		$("#LoginButton").click(function() {
			if ($("#loginPart").css("display") == "none") {
				$("#loginPart").css(
					"display", "block"
				)
			} else {
				$("#loginPart").fadeOut(200)
			}










		})











		//进度条
		//进度条点击控制音乐进度
		$("#progress").mousedown(function() {
			controlMusic(); //点击的时候调整进度
			$("#progressNow").css("transition", "null"); //把进度条动画去掉确保拖动流畅
			$("#progressPoint").css("transition", "null"); //把进度点动画去掉确保拖动流畅
			$("#play_pause").slideUp(100).attr("src", "img/icon/play.png").slideDown(100) //bug
			var oProg = document.getElementById("progress");
			$("#progress").on("mousemove", controlMusic); //添加鼠标移动事件
			oAu.pause();
			$("#progress").on("mouseup", function() {
				$("#progress").off("mousemove", controlMusic); //鼠标放开时删除鼠标移动事件
				$("#progressNow").css("transition", "0.15s"); //把进度条动画时间恢复
				$("#progressPoint").css("tran ition", "0.15s");
				oAu.play();
			});
			$("#progress").mouseleave(function() {
				$("#progress").off("mousemove", controlMusic) //鼠标移开时删除鼠标移动事件
				oAu.play();
			})
		});
		//获取鼠标坐标设置进度条长度
		function controlMusic() {
			var x1 = event.clientX;
			$("#progressNow").css("width", x1 - 100);
			$("#progressPoint").css("left", x1 - 100);
			oAu.currentTime = (x1 - 100) / 600 * oAu.duration;
		}

		//进度条progressPoint增加交互
		$("#progress").hover(function() {
			$("#progressPoint").css({
				"-webkit-filter": "drop-shadow(0 0 3px #fbfbfb)",
				"-moz-filter": "drop-shadow(0 0 3px #fbfbfb)"
			})
		}, function() {
			$("#progressPoint").css({
				"-webkit-filter": "drop-shadow(0 0 8px #fbfbfb)",
				"-moz-filter": "drop-shadow(0 0 8px #fbfbfb)"
			})
		})

		//点击拖动控制音乐音量
		$("#volumeBar").mousedown(function() {
			controlVolume();
			$("#volumeBar").on("mousemove", controlVolume);
			$("#volumeBar").on("mouseup", function() {
				$("#volumeBar").off("mousemove", controlVolume); //鼠标放开时删除鼠标移动事件

			});
			$("#volumeParts").mouseleave(function() {
				$("#volumeBar").off("mousemove", controlVolume); //鼠标放开时删除鼠标移动事件
			})
		});
		//获取鼠标Y位置设置音量大小
		function controlVolume() {
			var y1 = event.clientY;
			var t = y1 - $("#volumeBarParts").offset().top;
			$("#volumeNow").css("top", 75 - t); //嗯嗯嗯~~~好玩
			var top = parseInt($("#volumeNow").css("top"));
			oAu.volume = 1 - top / 75;
		}








		//进度部件playMethod
		$("#playMethod").click(function() {
			var oImg = $("#playMethod").children("img");
			for (var i = 0; i < oImg.length; i++) {
				if ($("#playMethod img:eq(" + i + ")").css("display") == "block") {
					i == oImg.length - 1 ? i = 0 : i++;
					$("#playMethod img").css("display", "none");
					$("#playMethod img:eq(" + i + ")").css("display", "block");
					if (i == 1) {
						playMethod = "random";
						oNext.onclick = function() {
							$("#play_pause").attr("src", "img/icon/play.png");
							changeMusic(0); //切歌随机
							click_animation("#next"); //点击效果
							animation_replay(); //动画从新开始
						}
					} else if (i == 2) {
						playMethod = "single";
					} else if (i == 0) {
						playMethod = "sequence";
						oNext.onclick = function() {
							$("#play_pause").attr("src", "img/icon/play.png");
							changeMusic(1); //切歌下一首
							click_animation("#next"); //点击效果
							animation_replay(); //动画从新开始
						}
					}
				}
			}
		});



		//定时时器检查歌曲是否播放结束
		setInterval(function() {
			if (oAu.ended) {
				var oPlaying = $(".playing").parent();
				index = $(".list").index(oPlaying);
				$(".playing").remove();
				if (playMethod == "sequence") {
					changeMusic(1); //切歌下一首
				} else if (playMethod == "random") {
					changeMusic(0);
				} else if (playMethod == "single") {
					play();
				}

			}
		}, 3000)



		//HitokotoAPI调用 间隔:30s
		setInterval(function() {
			$("#hitokotoAPI").css("top", -100); //过度动画
			setTimeout(function() {
				$("#hitokotoAPI").css("top", 10);
			}, 500)
			fetch("https://v1.hitokoto.cn/?c=a&encode=json") //HitokotoAPI请求
				.then(function(response) {
					return response.json(); //返回json格式
				})
				.then(function(data) {
					$("#hitokoto").text(data.hitokoto);
					$("#hitokotoAuthor").text("「" + data.creator + "」");
					create("#HistoryContent", "p", 1);
					var i = $("#HistoryContent").children("p").length - 1;
					$("#HistoryContent>p:eq(" + i + ")").text(data.hitokoto + "「" + data.creator + "」");
				});
			//为每一句一言添加点击事件
			$("#HistoryContent p").dblclick(function() {
				var text = $(this).text();
				$("#hitokotoCopy").attr("value", text);
				$("#hitokotoCopy").select();
				document.execCommand('copy');
				$("#hitokotoCopyTips").fadeIn(200).css({
					"display": "block",
					"transform": "scale(1.5)",
				});
				setTimeout(function() {
					$("#hitokotoCopyTips").fadeOut(500);
					setTimeout(function() {
						$("#hitokotoCopyTips").css("transform", "scale(1)");
					}, 700);
				}, 100)
			});
		}, 30000)





		//获取歌曲封面图片 获取歌曲名
		function musiclCover(index) {
			$("#album img:lt(2)").attr("src", musicJson.musicDATA[index].picUrl + "?param=400y400"); //加一个尾巴获取指定尺寸封面避免浪费带宽了
			$("#music_name").attr("style", "transform: scale(0.01);");
			setTimeout(function() { //歌曲名过度过度动画
				$("#music_name").attr("style", "transform: scale(1);");
				$("#music_name span:eq(0)").text(musicJson.musicDATA[index].name);
				$("#music_name span:eq(1)").text(musicJson.musicDATA[index].artists);
				musicNameSroll() //判断当前歌曲名是否过长而设置滚动动画
			}, 150)

		}


		//获取评论
		function musicComments(id) {
			fetch("https://api.imjad.cn/cloudmusic/?type=comments&id=" + id + "&br=128000")
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					$("#comments").empty(); //清空所有标签
					for (var i = 0; i < data.hotComments.length; i++) {
						$("#comments").append(
							"<div><div><img></div><div><span></span><span></span><span><img src='img/icon/like.png'></span><span></span></div><div><span></span></div></div>"
						); //为了略显美观...
						$("#comments>div:eq(" + i + ")>div:eq(0)>img").attr("src", data.hotComments[i].user.avatarUrl); //评论用户头像
						$("#comments>div:eq(" + i + ")>div:eq(1)>span:eq(0)").text(data.hotComments[i].user.nickname); //评论用户昵称
						$("#comments>div:eq(" + i + ")>div:eq(1)>span:eq(1)").text(timeStamp(data.hotComments[i].time)); //评论时间
						$("#comments>div:eq(" + i + ")>div:eq(1)>span:eq(3)").text(data.hotComments[i].likedCount); //评论点赞统计
						$("#comments>div:eq(" + i + ")>div:eq(2)>span").text(data.hotComments[i].content); //评论内容
						//安慰式点赞
						$("#comments>div:eq(" + i + ")>div:eq(1)>span:eq(2)>img").click(function() {
							var count = $(this).parent().next().text();
							if ($(this).attr("src") == "img/icon/like.png") {
								$(this).attr("src", "img/icon/liked.png");
								$(this).parent().next().text(parseInt(count) + 1);
							} else {
								$(this).attr("src", "img/icon/like.png");
								$(this).parent().next().text(parseInt(count) - 1);
							}
						})
					}
				});
		}


		//获取歌词
		function musiclyric(id) {
			lyricArray = [];
			fetch("https://api.imjad.cn/cloudmusic/?type=lyric&id=" + id)
				.then(function(response) {
					return response.json();
				})
				.then(function(data) {
					$("#lyric").empty(); //清空所有标签
					if (data.nolyric == true) {
						$("#lyric").append("<p class='lyricContent'></p>"); //为不存在歌词的歌曲添加一个p标签
						$("#lyric>p:eq(0)").text("哎呀!这首歌曲没有歌词"); //输出无歌词提示
						$("#lyric>p:eq(0)").css({
							"font-size": "30px",
							"font-weight": "100",
							"opacity": "0.5"
						})
					} else {
						a = data.lrc.lyric.split("\n"); //分割歌词
						for (var i = 0; i < a.length; i++) { //去除类似[ti:][ar:]的空白歌词
							if (swithLyricTime(a[i].substr(0, 10)) == 0) {
								a.splice(i, 1);
								i--;
							}
						}
						for (var i = 0; i < a.length; i++) {
							var time = a[i].substr(0, 10); //分离歌词时间
							var surplus = a[i].substr(10).indexOf("]");
							var content = surplus != -1 ? a[i].substr(10 + surplus + 1) : a[i].substr(10);
							$("#lyric").append("<p class='lyricContent'></p>"); //为每一句歌词添加一个p标签
							$("#lyric>p:eq(" + i + ")").text(content); //输出歌词
							if (parseInt(time.substr(1, 2)) >= 0) { //排除非歌词时间的字符串
								lyricArray.push(swithLyricTime(time)); //将歌词时间转换成秒数后加进数组
							}
						}
					}
				});

			var j = 0;
			setTimeout(function() {
				setInterval(function() {
					for (var i = 0; i < lyricArray.length; i++) {
						if (oAu.currentTime <= lyricArray[i]) {
							j = i;
							break;
						}
					}
				}, 2000);
				setInterval(function() {
					if (oAu.currentTime >= lyricArray[j]) {
						$("#lyric p").attr("class", "lyricContent"); //所有歌词恢复默认状态
						$("#lyric p").css("top", 250 - 50 * j);
						$("#lyric p:eq(" + j + ")").attr("class", "nowLyric"); //设置当前高亮歌词
						j++;
					}
				}, 100);
			}, 1000);
		}


		getPlayList(3228473368)
		//获取歌单
		function getPlayList(PlayListId) {
			fetch("https://v1.itooi.cn/netease/songList?id=" + PlayListId)
				.then(function(response) {
					return response.json()
				})
				.then(function(Rdata) {
					musicJson.musicDATA.splice(0, musicJson.musicDATA.length) //获取前清空json
					var allsongs = Rdata.data.tracks; //歌单里面的歌曲
					for (var i = 0; i < allsongs.length; i++) {
						var len = musicJson.musicDATA.length;
						var ar;
						var srcPart = "http://music.163.com/song/media/outer/url?id=";
						if (allsongs[i].artists.length <= 1) {
							ar = allsongs[i].artists[0].name;
						} else {
							ar = allsongs[i].artists[0].name
							for (var j = 1; j < allsongs[i].artists.length; j++) {
								ar = ar + "/" + allsongs[i].artists[j].name;
							}
						}
						musicJson.musicDATA[len] = {
							"index": len,
							"id": allsongs[i].id,
							"name": allsongs[i].name,
							"artists": ar,
							"src": srcPart + allsongs[i].id + ".mp3",
							"picUrl": allsongs[i].album.picUrl
						};
					}
				})
			setTimeout(function() {
				setPlayList();
			}, 1000);
		}


		//设置右边歌单列表
		function setPlayList() {
			$("#playList").empty();
			for (var i = 0; i < musicJson.musicDATA.length; i++) {
				$("#playList").append(
					"<div class='list'><img class='listCover'><p class='listName'></p><p class='listArtist'></p><div class='listAdd'></div></div>"
				)

				$(".listCover:eq(" + i + ")").attr("src", musicJson.musicDATA[i].picUrl + "?param=80y80")
				$(".listName:eq(" + i + ")").text(musicJson.musicDATA[i].name);
				$(".listArtist:eq(" + i + ")").text(musicJson.musicDATA[i].artists);
				//双击播放
				$(".list:eq(" + i + ")").dblclick(function() {
					var j = $(".list").index(this);
					index = j;
					$("#music").attr("src", musicJson.musicDATA[j].src);
					animation_replay(); //动画从新开始播放
					play_pause();

				})
			}

		}


		getUserList(406450519);
		//获取用户公开的歌单
		function getUserList(uid) {
			fetch("https://v1.itooi.cn/netease/songList/user?uid=" + uid)
				.then(function(response) {
					return response.json()
				})
				.then(function(Rdata) {
					$("#uesrList").empty();
					var allList = Rdata.data;
					for (var i = 0; i < allList.length; i++) {
						$("#uesrList").append(
							"<div class='uesrList'><div class='uesrListCover'><img></div><div class='uesrListName'><p class='uesrListName_n'></p><p class='uesrListName_d'></p></div></div>"
						);
						$(".uesrList:eq(" + i + ")").children(".uesrListCover").children("img").attr("src", allList[i].coverImgUrl); //歌单背景图
						$(".uesrList:eq(" + i + ")").children(".uesrListName").children(".uesrListName_n").text(allList[i].name); //歌单名
						$(".uesrList:eq(" + i + ")").children(".uesrListName").children(".uesrListName_d").text(allList[i].description); //歌单描述详情
					}


					$(".uesrList").dblclick(function() {
						var j = $(".uesrList").index(this);
						getPlayList(allList[j].id)
					})

					$(".uesrList").hover(function() {
						var length = $(this).find(".uesrListName_n").text().length;
						if (5 < length && length <= 10) {
							$(this).find(".uesrListName_n").css("animation", "ListName_220 4s linear infinite");
						} else if (10 < length && length <= 20) {
							$(this).find(".uesrListName_n").css("animation", "ListName_420 8s linear infinite");
						} else if (20 < length && length <= 30) {
							$(this).find(".uesrListName_n").css("animation", "ListName_620 12s linear infinite");
						}
						$(this).children(".uesrListCover").children("img").css({
							"transform": "scale(1.3)",
							"-webkit-filter": "blur(5px)"
						});
						$(this).find(".uesrListName_n").css({
							"color": "#1f3134",
							"background": "rgba(0,0,0,0)",
							"font-size": "18px"
						})
						$(this).find(".uesrListName").css("height", "96px");
					}, function() {
						$(this).children(".uesrListCover").children("img").css({
							"transform": "scale(1)",
							"-webkit-filter": "blur(0)"
						});
						$(this).find(".uesrListName_n").css({
							"color": "#e7e7eb",
							"background": "rgba(0,0,0,0.2)",
							"font-size": "15px",
							"animation": ""
						})
						$(this).find(".uesrListName_d").scrollTop(0);
						$(this).children(".uesrListName").css("height", "20px");
					})
				})
		}


		var tag = {
			"language": ["华语", "欧美", "日语", "韩语", "粤语"],
			"style": ["流行", "摇滚", "民谣", "电子", "舞曲", "说唱", "轻音乐", "爵士", "乡村", "古典", "民族", "英伦", "金属", "朋克", "蓝调", "雷鬼",
				"世界音乐", "拉丁", "New Age", "古风", "后摇", "Bossa Nova"
			],
			"scene": ["清晨", "夜晚", "学习", "工作", "午休", "下午茶", "地铁", "驾车", "运动", "旅行", "散步", "酒吧"],
			"emotion": ["怀旧", "清新", "浪漫", "伤感", "兴奋", "快乐", "安静", "思念"],
			"theme": ["影视原声", "ACG", "儿童", "校园", "游戏", "70后", "80后", "90后", "网络歌曲", "KTV", "经典", "翻唱", "吉他", "钢琴", "器乐",
				"榜单", "00后"
			],
		}


		getTaglist(tag.style[6]);

		function getTaglist(tag, orderType, pageSize, page) {
			orderType == undefined ? orderType = "hot" : ""; //参数默认值
			pageSize == undefined ? pageSize = "15" : "";
			page == undefined ? page = "0" : "";
			fetch("https://v1.itooi.cn/netease/songList/hot?&orderType=" + orderType + "&pageSize=" + pageSize + "&page=" +
					page + "&categoryType=" + tag)
				.then(function(response) {
					return response.json()
				})
				.then(function(Rdata) {
					$("#CloudList").empty();
					var allList = Rdata.data;
					for (var i = 0; i < allList.length; i++) {
						$("#CloudList").append(
							"<div class='CloudList'><div class='CloudListCover'><img></div><div class='CloudListName'><p class='CloudListName_n'></p><p class='CloudListName_d'></p></div></div>"
						);
						$(".CloudList:eq(" + i + ")").children(".CloudListCover").children("img").attr("src", allList[i].coverImgUrl); //歌单背景图
						$(".CloudList:eq(" + i + ")").children(".CloudListName").children(".CloudListName_n").text(allList[i].name); //歌单名
						$(".CloudList:eq(" + i + ")").children(".CloudListName").children(".CloudListName_d").text(allList[i].description); //歌单描述详情
					}
					$(".CloudList").dblclick(function() {
						var j = $(".CloudList").index(this);
						getPlayList(allList[j].id)
					})
					$(".CloudList").hover(function() {
						var length = $(this).find(".CloudListName_n").text().length;
						if (5 < length && length <= 10) {
							$(this).find(".CloudListName_n").css("animation", "ListName_220 4s linear infinite");
						} else if (10 < length && length <= 20) {
							$(this).find(".CloudListName_n").css("animation", "ListName_420 8s linear infinite");
						} else if (20 < length && length <= 30) {
							$(this).find(".CloudListName_n").css("animation", "ListName_620 12s linear infinite");
						}
						$(this).children(".CloudListCover").children("img").css({
							"transform": "scale(1.3)",
							"-webkit-filter": "blur(5px)"
						});
						$(this).find(".CloudListName_n").css({
							"color": "#1f3134",
							"background": "rgba(0,0,0,0)",
							"font-size": "18px"
						})
						$(this).find(".CloudListName").css("height", "96px");
					}, function() {
						$(this).children(".CloudListCover").children("img").css({
							"transform": "scale(1)",
							"-webkit-filter": "blur(0)"
						});
						$(this).find(".CloudListName_n").css({
							"color": "#e7e7eb",
							"background": "rgba(0,0,0,0.2)",
							"font-size": "15px",
							"animation": ""
						})
						$(this).find(".CloudListName_d").scrollTop(0);
						$(this).children(".CloudListName").css("height", "20px");
					})
				})

			var text = $("#CloudListTipName").text();
			$("#CloudListTipName").text(text + "(" + tag + ")");
		}


		var date = new Date;
		console.log(date.getUTCDay())






































	});






	//存储歌曲url
	var musicJson = {
		"musicDATA": [{
			"index": "0",
			"id": "1346104327",
			"name": "多想在平庸的生活拥抱你",
			"artists": "隔壁老樊",
			"src": "http://music.163.com/song/media/outer/url?id=1346104327.mp3",
			"picUrl": "http://p2.music.126.net/gNbAlXamNjhR2j3aOukNhg==/109951164232796511.jpg"
		}],
	};



	/* 
	["华语","欧美","日语","韩语","粤语",
	"流行","摇滚","民谣","电子","舞曲","说唱","轻音乐","爵士","乡村","古典","民族","英伦","金属","朋克","蓝调","雷鬼","世界音乐","拉丁","New Age","古风","后摇","Bossa Nova",
	"清晨","夜晚","学习","工作","午休","下午茶","地铁","驾车","运动","旅行","散步","酒吧",
	"怀旧","清新","浪漫","伤感","兴奋","快乐","安静","思念",
	"影视原声","ACG","儿童","校园","游戏","70后","80后","90后","网络歌曲","KTV","经典","翻唱","吉他","钢琴","器乐","榜单","00后"]
	 */



	/* 
	ID获取歌词
	http://music.163.com/api/song/media?id=567656528 
	http://music.163.com/api/song/lyric?id=567656528&lv=-1&kv=-1
	https://api.imjad.cn/cloudmusic/?type=lyric&id=401249702
	https://v1.itooi.cn/netease/lrc?id=37239038
	*/

	/* 
	获取音乐详细详细
    http://music.163.com/api/song/detail/?id=539108613&ids=%5B539108613%5D 
	*/

	/* 
	歌曲直链url
	http://music.163.com/song/media/outer/url?id=519286594.mp3 
	*/

	/* 歌曲评论
	 https://api.imjad.cn/cloudmusic/?type=comments&id=1376854985&br=128000
	 */






	//函数封装

	//专辑图复原动画
	function animation_replay() {
		$("#album").attr("style", "animation:null");
		$("#album img:last").attr("style", "animation:null");
		setTimeout(function() {
			$("#album").attr("style", "animation:albumRotatr 20s linear infinite;");
			$("#album img:last").attr("style", "animation:recordRotatr 20s linear infinite;");
		}, 10);
	}


	//播放控制区图标点击效果
	function click_animation(node) {
		$(node).attr("style", "animation: click 0.2s ease-in-out ;");
		setTimeout(function() {
			$(node).attr("style", "");
		}, 500);

	}

	//播放暂停
	function play_pause() {
		if (oAu.paused) {
			oAu.play();
			//播放图标动画
			$("#play_pause").slideUp(100).attr("src", "img/icon/play.png").slideDown(100);
			$("#album").css("animation-play-state", "running");
			$("#album img:last").css("animation-play-state", "running");
			$(".playing div").css("animation-play-state", "running");
		} else {
			oAu.pause();
			//暂停图标动画
			$("#play_pause").slideUp(100).attr("src", "img/icon/pause.png").slideDown(100);
			$("#album").css("animation-play-state", "paused");
			$("#album img:last").css("animation-play-state", "paused");
			$(".playing div").css("animation-play-state", "paused");
		}


	}

	//更改audio的src并播放
	function play() {
		oAu.setAttribute("src", musicJson.musicDATA[index].src);
		oAu.play();

	}

	//切歌 传入值大于0则下一首否则上一首
	function changeMusic(param) {
		var maxIndex = musicJson.musicDATA.length - 1;
		if (param == -1) {
			index--;
			index = index < 0 ? maxIndex : index
			play();
		} else if (param == 0) {
			(function randomMusic() {
				var random = randomNumber(0, maxIndex);
				if (index != random) {
					index = randomNumber(0, maxIndex);
				} else {
					return randomMusic();
				}
			})();
			play();
		} else if (param == 1) {
			index++;
			index = index > maxIndex - 1 ? 0 : index,
				play();
		}
	}

	//格式化时分秒时间
	function formatTime(time) {
		var time = parseInt(time * 1000);
		var date = new Date(time);
		var minute = date.getMinutes();
		var second = date.getSeconds();
		if (minute < 10) {
			minute = ("0" + minute).toString(); //不知道为什么感觉应该用这个
		}
		if (second < 10) {
			second = ("0" + second).toString(); //同上
		}
		if (minute != NaN && second != NaN) {
			return (minute + ":" + second)
		}
	}

	//设置歌曲总时长
	function allMusicTime() {
		var allTime = formatTime(oAu.duration);
		$("#allTime").text(allTime);
	}

	//设置当前歌曲播放时间
	function nowMusicTime() {
		setInterval(function() {
			var nowTime = formatTime(oAu.currentTime);
			$("#nowTime").text(nowTime);
		}, 1000)

	}
	//实时更新进度条
	function updateProgress() {
		setInterval(function() {
			var nowTime = oAu.currentTime;
			var allTime = oAu.duration;
			var percent = nowTime / allTime;
			var width = 600 * percent;
			$("#progressNow").css("width", width);
			$("#progressPoint").css("left", width);

		}, 1000)
	}



	//Create创建函数 parent:父节点 node:节点名称 number:数量
	function create(parent, node, number) {
		if (node != "meta" && node != "br" && node != "hr" && node != "img" && node != "input" && node != "param" && node !=
			"link") {
			for (var i = 0; i < number; i++) {
				$(parent).append("<" + node + "></" + node + ">");
			}
		} else {
			for (var i = 0; i < number; i++) {
				$(parent).append("<" + node + ">");
			}
		}
	}

	//时间戳转换日期函数
	function timeStamp(date) {
		var date = new Date(date);
		var y = date.getFullYear();
		var M = date.getMonth() + 1;
		var d = date.getDate() + 1;
		var h = date.getHours() + 1;
		var m = date.getMinutes() + 1;
		var s = date.getSeconds() + 1;
		return y + "年" + M + "月" + d + "日" + h + "时" + m + "分" + s + "秒";

	}
	//转换歌词时间[00:00.00]
	function swithLyricTime(lyricTime) {
		var m = lyricTime.substr(1, 2);
		var s = lyricTime.substr(4, 2);
		var ms = lyricTime.substr(7);
		var time = parseInt(m) * 60 + parseInt(s) + parseInt(ms) * 0.001;
		if (parseInt(time) >= 0) {
			return time;
		} else {
			return 0;
		}
	}

	//设置列表中正在播放的动画
	function setplaying() {
		for (var i = 0; i < musicJson.musicDATA.length; i++) {
			$(".list:eq(" + i + ")").css({
				"background": "",
			});
		}
		$(".playing").remove();
		$(".list:eq(" + index + ")").css("background", "rgba(105,105,105,0.5)");
		$(".list:eq(" + index + ")").append(
			"<div class='playing'><div><div></div><div></div><div></div><div></div></div></div>");
		oAu.paused == true ? $(".playing div").css("animation-play-state", "paused") : $(".playing div").css(
			"animation-play-state", "running"); //减少代码行数U•ェ•*U
	}

	//随机数
	function randomNumber(min, max) {
		Rnum = parseInt(Math.random() * (max - min + 1) + min) //精华
		return Rnum;
	}


	//当前歌曲名字滚动动画
	function musicNameSroll() {
		var len = $("#music_nameSroll span").text().length + 1;
		if (len < 20) {
			$("#music_nameSroll").css({
				"animation": ""
			})
		} else if (20 < len && len <= 34) {
			$("#music_nameSroll").css({
				"animation": "music_nameSroll_20 15s 5s linear infinite running"
			});
		} else if (34 < len && len <= 51) {
			$("#music_nameSroll").css({
				"animation": "music_nameSroll_34 20s 5s linear infinite running"
			});
		} else if (51 < len && len <= 65) {
			$("#music_nameSroll").css({
				"animation": "music_nameSroll_51 30s 5s linear infinite running"
			});
		} else if (len >= 65) {
			$("#music_nameSroll").css({
				"animation": "music_nameSroll_hentai 60s 5s linear infinite running"
			});
		}
	}



















}
