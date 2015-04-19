/**
 *微信js接口调用
 */
;(function(win,$){
    // 自定义分享功能  分享给朋友 和 分享到朋友圈 分享内容一致
    $.dzwx = {};
    $.dzwx.statusMessage = ["请使用微信","请升级微信版本到6.0.2.58以上版本"];
    var wechatInfo = win.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) ;
    if( !wechatInfo ) {
        $.dzwx.status = 0;
    } else if ( wechatInfo[1] < "6.0.2.58" ) {
        $.dzwx.status = 1;

    } else {
        $.dzwx.status = 3;
        function dzWeixinJSBridge(data){
            wx.ready(function () {
                wx.onMenuShareAppMessage(data);
                wx.onMenuShareTimeline(data);
            });
        }
    }

    // 默认分享文案
    win.shareFriend = function(data){
        if($.dzwx.status === 3){
            var dData ={
                  title: '点妆•为您提供最高端的化妆服务',
                  desc: '',
                  link: location.href,
                  imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo.png',
                  trigger: function (res) {
                  },
                  success: function (res) {
                    alert('已分享');
                  },
                  cancel: function (res) {
                    alert('已取消');
                  },
                  fail: function (res) {
                  }
                };
            var mData = $.extend({},dData,data);
            dzWeixinJSBridge(mData);
        } else {
            // alert( $.dzwx.statusMessage[$.dzwx.status] );
        }
    }

    // shareFriend({});
    // shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});

    //  预约成功界面1-8，定制分享图片为点妆logo图片，分享文字描述为：“点妆我已经成功预约化妆师上门服务”
    win.shareFriend1 = function(data){
        if($.dzwx.status === 3){
            var dData ={
                  title: '点妆•我已经成功预约化妆师上门服务',
                  desc: '',
                  link: location.href,
                  imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo.png',
                  trigger: function (res) {
                  },
                  success: function (res) {
                    alert('已分享');
                  },
                  cancel: function (res) {
                    alert('已取消');
                  },
                  fail: function (res) {
                  }
                };
            var mData = $.extend({},dData,data);
            dzWeixinJSBridge(mData);
        } else {
            // alert( $.dzwx.statusMessage[$.dzwx.status] );
        }
    }

    // shareFriend1({});

    //  化妆师作品界面1-6，定制分享图片为某个妆容图片，分享文字描述为：“点妆化妆师作品介绍”
    win.shareFriend2 = function(data){
        if($.dzwx.status === 3){
            var dData ={
                  title: '点妆•化妆师作品介绍',
                  desc: '',
                  link: location.href,
                  imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo.png',
                  trigger: function (res) {
                  },
                  success: function (res) {
                    alert('已分享');
                  },
                  cancel: function (res) {
                    alert('已取消');
                  },
                  fail: function (res) {
                  }
                };
            var mData = $.extend({},dData,data);
            dzWeixinJSBridge(mData);
        } else {
            // alert( $.dzwx.statusMessage[$.dzwx.status] );
        }
    }

    // shareFriend2({imgUrl: 'http://i3.sinaimg.cn/home/2014/0108/U4167P30DT20140108175729.png'});

    //  化妆师个人主页界面1-14，定制分享图片为化妆师图片，分享文字描述为：“点妆化妆师个人主页”
    win.shareFriend3 = function(data){
        if($.dzwx.status === 3){
            var dData ={
                  title: '点妆•化妆师个人主页',
                  desc: '',
                  link: location.href,
                  imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo.png',
                  trigger: function (res) {
                  },
                  success: function (res) {
                    alert('已分享');
                  },
                  cancel: function (res) {
                    alert('已取消');
                  },
                  fail: function (res) {
                  }
                };
            var mData = $.extend({},dData,data);
            dzWeixinJSBridge(mData);
        } else {
            // alert( $.dzwx.statusMessage[$.dzwx.status] );
        }
    }

    // shareFriend3({imgUrl: 'http://i3.sinaimg.cn/home/2014/0108/U4167P30DT20140108175729.png'});
})(window,Zepto)




/**
 *弹出层$.popUp
 *$.popUp.messages( {"innerHTML":'设置成功'} );
 */
;(function($) {
    if ($.popUp) return;

    $.popUp = function(options) {
        var opts = $.extend({}, $.popUp.defaults, options);
        $.popUp.opts = opts;
    };
    $.popUp.messages = function(options) {
        var $window = $(window),
            $body = $(document.body),
            $this = $(this),
            $mask, $popUp;
        var opts = options;
        if (!this.states.enabled) return;
        this._init();
        $popUp = $.popUp.popUp;
        if (opts.innerHTML) {
            $popUp.html(opts.innerHTML);
        } else if (opts.htmlWrap) {
            $popUp.html($(opts.htmlWrap).html());
        } else if (opts.popEle) {
            $popUp.append(opts.popEle);
        }


        if (!opts.autoSize) {
            $popUp.css({
                'visibility':'hidden',
                'display':'block'
            });
            var height = $popUp.height();
            $popUp.css({
                'visibility':'visible',
                'display':'none'
            });
            var top = (Math.max(document.body.scrollTop, document.documentElement.scrollTop) + $(window).height() / 2 - height / 2)/50;
            $popUp.css({
                'top':  top + 'rem'
            });
        }

        $popUp.fadeIn();
        this.states.showing = true;
        var messageTime;
        clearTimeout(messageTime);
        messageTime = setTimeout(function(){
            $popUp.fadeOut();
        },3000);
        opts && opts.callBack && opts.callBack();
    };
    $.popUp._init = function() {
        var $body;
        if (this.states.inited) {
            return
        } else {
            $body = $(document.body);
            this.popUp = $('<div id="popup" style="display : none;"></div>').appendTo($body);
            this.states.inited = true;
        }
    };
    $.popUp.states = {
        inited: false,
        showing: false,
        loading: false,
        enabled: true
    };
    $.popUp.defaults = {
    };
})(Zepto);

/**
 *tap 有点透问题 用fastClick
 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}



/**
 * chenyan.js
 */
;(function(win,doc,$){

	/**
	 * 全局变量
	 */
	// win.CLICK_EVENT = 'ontouchstart' in window ? 'tap' : 'click';
	win.CLICK_EVENT = 'click';
	win.PORT_URL = 'http://side.video.sina.com.cn/weixin/api/';
	win.VALIDATE_MOBILE = /^(((1(3|4|5|7|8)[0-9]{1}))+\d{8})$/;


	/**
	 * 基础库
	 */
	win.CyUtil = {
		type: function(obj) {
			return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
		}
		, isArray: function(obj) {
			return this.type(obj) === 'array';
		}
		, isFunction: function(obj) {
			return this.type(obj) === 'function';
		}
		, extend: function(tar,src){
			for(var i in src){
				tar[i] = src[i];
			}
			return tar;
		}
		, twoFix: function(n){
			return n > 9 ? n : ('0' + n);
		}
	}


	/**
	 * 选项卡
	 */
	function SwitchOption(opt) {
		this.menus = opt.menus;
		this.conts = opt.conts;
		this.event = opt.event || CLICK_EVENT;
		this.activeClass = opt.activeClass || 'active';
		this.callFn = opt.callFn || function(){};
		this.curNum = opt.initNum || 0;
		this.init();
	}
	SwitchOption.prototype = {
		init: function(){
			var that = this;
			var menus = that.menus;
			var conts = that.conts;
			var len = menus.length;
			that.switchOpt(this.curNum);
			menus.each(function(i) {
				var o = $(this);
				o.bind(that.event, function() {
					if(!$(this).hasClass(that.activeClass)){
						that.switchOpt(o.index());
					}
				});
			});

		},
		switchOpt: function(index){
			var that = this;
			var menus = that.menus;
			var conts = that.conts;
			var active = that.activeClass;
			var callFn = that.callFn;
			var cb = CyUtil.isArray(callFn) ? callFn[index] : callFn;
			menus.each(function (i) {
				var curMenu = $(this);
				var curCont = conts.eq(i);
				if(index == i){
					curMenu.addClass(active);
					curCont.show();
					that.curNum = i;
					CyUtil.isFunction(cb) && cb(i, curMenu, curCont);
				}else{
					curMenu.removeClass('active');
					curCont.hide();
				}
			});
		}
	};


	/**
	 * 加载更多
	 */
	function LoadMore(opt){
		this.btn = opt.btn;
		this.url = opt.url;
		this.pidName = opt.pidName || 'nextid';
		this.numName = opt.numName || 'num';
		this.pid = opt.pid || 0;
		this.num = opt.num || 16;
		this.data = opt.data || {};
		this.callFn = opt.callFn;
		this.isFirst = true;
		this.init();
	}
	LoadMore.prototype = {
		init: function(){
			var that = this;
			that.pid = 0;
			that.isFinish = true;
			that.load();
			that.btn.bind(CLICK_EVENT, function(){
				that.isFinish && that.load();
			});
		},
		load: function(){
			var that = this;
			var data = {};
			data[that.pidName] = that.pid;
			data[that.numName] = that.num;
			CyUtil.extend(data, that.data);
			that.loadding(true);
			$.ajax({
				url: that.url,
				data: data,
				dataType: 'jsonp',
				success: function(rs){
					that.finish(true, rs);
				},
				error: function(rs){
					that.finish(true, rs);
				}
			});
		},
		loadding: function(flag,pid){
			if(flag){
				this.isFinish = false;
				this.btn.addClass('load_more_disable');
			}else{
				if(pid){
					this.pid = pid;
				}
				this.isFinish = true;
				this.btn.removeClass('load_more_disable');
			}
		},
		finish: function(flag,rs){
			var that = this;
			var fn = that.callFn;
			CyUtil.isFunction(fn) && fn.call(that, rs, function(pid,len){
				that.loadding(false,pid);
				if((arguments.length>1 && len<that.num) || !rs.nextid){
					if(that.isFirst){
						that.btn.hide();
					} else {
						that.btn.addClass('load_more_disable').html('没数据了亲~');
					}
					that.isFirst = false;
				}
			}, flag);
		}
	};

	
	/**
	 * 时间格式化
	 */
	function dateFormat(d, n){
		var twoFix = CyUtil.twoFix;
		var dt = new Date(win.parseInt(d, 10) * 1000);
		var year = dt.getFullYear();
		var dbMonth = twoFix(dt.getMonth() + 1);
		var dbDay = twoFix(dt.getDate());
		var dbHours = twoFix(dt.getHours());
		var dbMinutes = twoFix(dt.getMinutes());
		var arr1 = [year, dbMonth, dbDay];
		var arr2 = [dbHours, dbMinutes];
		var rs = arr1.join('-'); // 2015-01-01
		if(n == 1){	// 01-01 00:00
			rs = dbMonth + '-' + dbDay + ' ' + arr2.join(':');
		}if(n == 2){	// 2015-01-01 00:00
			rs = year + '-' + dbMonth + '-' + dbDay + ' ' + arr2.join(':');
		}else if(n == 3){ // 2015.01.01
			rs = arr1.join('.');
		}
		return rs;
	}

	
	/**
	 * 字数统计
	 */
	function countTit(obj, form, target) {
		obj.bind('keydown keyup', function () {
			var n = parseInt(form.html());
			var v = $.trim($(this).val());
			var vc = v.length;
			if (vc > n) {
				$(this).val(v.substring(0, n));
				vc = n;
			};
			target.html(vc);
		});
	}

	
	/**
	 * 防止JS脚本植入
	 */
	function stopScriptInner(str){
		if (!str) return '';
		return str.replace(new RegExp('<|>', 'g'),function(s){
			return s == '<' ? '《' : '》';
		});
	}
	
	
	/**
	 * 提交loading
	 */
	function CyLoading(opt){
		this.btn = opt.btn;
		this.btnState = opt.btnState;
		this.flag = opt.flag;
		this.oldName = opt.oldName || (this.btnState ? this.btn.val() : this.btn.html());
		this.newName = opt.newName;
		this.lc = opt.lc || 'h_loading_opc';
	}
	CyLoading.prototype = {
		loading: function(flag){
			this.flag = flag;
			var btn = this.btn;
			var className = this.lc;
			var name = '';
			if(flag){
				name = this.newName;
				btn.addClass(className);
			}else{
				name = this.oldName;;
				btn.removeClass(className);
			}
			this.btnState ? btn.val(name) : btn.html(name);
		}
	};
	
	
	/**
	 * exports
	 */
	win.SwitchOption = SwitchOption;
	win.LoadMore = LoadMore;
	win.dateFormat = dateFormat;
	win.countTit = countTit;
	win.stopScriptInner = stopScriptInner;
	win.CyLoading = CyLoading;
	
	
	/**
	 * 2_5.html
	 */
	win.fn_2_5 = function(){
		var menus = $('#option_card .menu');	// 菜单
		var conts = $('#option_cont .list')		// 内容
		var boxs = $('.list_box', conts);		// 容器
		var btns = $('.load_more', conts);		// 更多
		var len = conts.length;

		function imgLoad(url) {
		    var img = new Image();
		    img.src = url;
		    if (img.complete) {
		        callback(img.width, img.height);
		    } else {
		        img.onload = function () {
		            callback(img.width, img.height);
		            img.onload = null;
		        };
		    };
		};

		function AutoResizeImage(maxWidth,maxHeight,objImg){
			var img = new Image();
			img.src = objImg.src;
			var hRatio;
			var wRatio;
			var Ratio = 1;
			var w = img.width;
			var h = img.height;
			wRatio = maxWidth / w;
			hRatio = maxHeight / h;
			if (maxWidth ==0 && maxHeight==0){
				Ratio = 1;
			}else if (maxWidth==0){
				if (hRatio<1) Ratio = hRatio;
			}else if (maxHeight==0){
				if (wRatio<1) Ratio = wRatio;
			}else if (wRatio<1 || hRatio<1){
				Ratio = (wRatio<=hRatio?wRatio:hRatio);
			}
			if (Ratio<1){
				w = w * Ratio;
				h = h * Ratio;
			}
			objImg.height = h;
			objImg.width = w;
		}

		var createHtml = function(arr, index, baseurl){
			var rs = '';
			if(arr){
				for(var i=0;i<arr.length;i++){
					var o = arr[i];
					if(index == 0){
						imgLoad(o.portrait);
						rs += '<a href="'+ baseurl+o.goods_id +'" class="item">'+
							'<span class="imgBox"><img src="'+ o.portrait +'" alt="'+ o.fullname +'" class="img"/></span>'+
							'<div class="msg"><p class="name top">'+ o.fullname +'</p><p class="cnt bot">'+ o.level +'</p></div>'+
							'<div class="txt"><p class="money top">￥'+ o.price +'</p><p class="cont bot">接单'+ o.service_num +'</p></div>'+
						'</a>';
					}else{
						imgLoad(o.pic);
						rs += '<li><a href="'+ baseurl+o.id +'" class="item2">'+
							'<img src="'+ o.pic +'" alt="" class="img"/>'+
							'<div class="txt h_clear"><p class="money">￥'+ o.price +'</p><p class="cont">'+ o.order_num +'人做过</p></div>'+
						'</a></li>';
					}
				}
			}
			return rs;
		}
		conts.each(function(i){
			new LoadMore({
				'btn': btns.eq(i),
				'url': PORT_URL + (i==0 ? 'getDresserList.php' : 'getWorksList.php'),
				'num': 16,
				'callFn': function(rs,cb){
					var that = this;
					if(rs.code==1){
						var data = rs.data;
						if(data){
							var str = createHtml(data, i, rs.baseurl);
							boxs.eq(i).append(str);
							cb(rs.nextid, data.length);
						}
					}
				}
			});
		});
		new SwitchOption({
			menus: menus,
			conts: conts
		});

		shareFriend({});
	}


	/**
	 * 4.html
	 */
	win.fn_4 = function(){
		var menus = $('#option_card .menu');	// 菜单
		var conts = $('#option_cont .list')		// 内容
		var boxs = $('.list_box', conts);		// 容器
		var btns = $('.load_more', conts);		// 更多
		var len = conts.length;
		var createHtml = function(arr, index){
			var rs = '';
			if(arr){
				for(var i=0;i<arr.length;i++){
					var o = arr[i];
					var sum = parseInt(o.pro) + parseInt(o.service) + parseInt(o.time);
					var cont = '好评';
					if(o.type==2){
						cont = '中评';
					}else if(o.type==3){
						cont = '差评';
					}
					rs += '<a href="javascript:;" class="item">'+
						'<img src="'+ o.userportrait +'" alt="" class="img"/>'+
						'<div class="msg"><p class="name top">'+ o.username +'</p><p class="cnt bot">'+ o.content +'</p></div>'+
						'<div class="txt"><p class="money top">'+ cont +'</p><p class="cont bot">'+ dateFormat(o.ctime, 3) +'</p></div>'+
					'</a>';
				}
			}
			return rs;
		}
		conts.each(function(i){
			var type = 'all';
			if(i==1){
				type = 'best';
			}else if(i==2){
				type = 'middle';
			}else if(i==3){
				type = 'low';
			}
			new LoadMore({
				'btn': btns.eq(i),
				'url': PORT_URL + 'getComment.php?t=' +  $('#hiddenInfor').data('type') +'&exid=' +  $('#hiddenInfor').data('exid') +'&type=' + type,
				'num': 16,
				'callFn': function(rs,cb){
					var that = this;
					if(rs.code==1){
						var data = rs.data;
						if(data){
							var str = createHtml(data, i);
							boxs.eq(i).append(str);
							cb(rs.pid, data.length);
						}
					}
				}
			});
		});
		new SwitchOption({
			menus: menus,
			conts: conts
		});

		shareFriend({});
	}


	/**
	 * 11.html
	 */
	win.fn_11 = function(){
	
		// 内容
		var par = $('#cont_txt')
		// countTit($('textarea',par),$('.sp2',par),$('.sp1',par));
		
		// 评分
		$('#praise .sp').bind(CLICK_EVENT, function(ev){
			var that = $(this);
			var tar = $(ev.target);
			if(tar.is('i')){
				var n = tar.index();
				var os = that.find('i');
				os.each(function(i){
					if(i<=n){
						$(this).addClass('i');
					}else{
						$(this).removeClass('i');
					}
				});
			}
		});
		
		// 提交
		var oBtn = $('#sub_btn');
		var oLoad = new CyLoading({
			'btn': oBtn,
			'flag': false,
			'newName': '提交中...'
		});
		oBtn.bind(CLICK_EVENT, function(){
			var that = $(this);
			if(oLoad.flag){
				oLoad.loading(false); return;
			}else{
				oLoad.loading(true);
			}
			var data = {};
			var sps = $('#praise .sp');
			var txt = $('#cont_txt textarea');
			data.id = $('#hiddenInfor').data('id');
			data.pro = sps.eq(0).find('.i').length;			// 专业评分
			data.service = sps.eq(1).find('.i').length;		// 沟通评分
			data.time = sps.eq(2).find('.i').length;		// 守时评分
			data.content = stopScriptInner(txt.val());		// 评论
			$.post(PORT_URL + 'addComment.php', data,
				function(rs){
					if(rs.code == 1){
						window.location = rs.redirect_uri;
					}else{
						$.popUp.messages({"innerHTML":rs.desc});
						oLoad.loading(false);
					}
				}
			, "json");
		});	
		

		shareFriend({});
	}


	/**
	 * 12.html
	 */
	win.fn_12 = function(){
		shareFriend({});
	}


	/**
	 * 13.html
	 */
	win.fn_13 = function(){
	
		var menus = $('#option_card .menu');	// 菜单
		var bFlag = true;
		var oBtn = $('#search span');
		var oCont = $('#content');
		var sLoad = 'h_loading_opc';
		var noData = '<div class="h_nodata">没有检索到相关信息</div>';
		// 生成html
		var createHtml = function(arr, baseurl){
			var rs = '';
			if(arr){
				for(var i=0;i<arr.length;i++){
					var o = arr[i];
					rs += '<a href="'+ baseurl+o.uid +'" class="item">'+
						'<img src="'+ o.portrait +'" alt="" class="img"/>'+
						'<div class="msg"><p class="name top">'+ o.fullname +'</p><p class="cnt bot">'+ o.desc +'</p></div>'+
						'<div class="txt"><p class="money top">￥'+ o.price +'</p><p class="cont bot">接单'+ o.service_num +'</p></div>'+
					'</a>';
				}
			}
			return rs;
		};
		// 开始检索
		var searchStart = function(){
			bFlag = false;
			oBtn.addClass(sLoad);
			oCont.addClass(sLoad);
		}
		// 结束检索
		var searchFinish = function(flag){
			bFlag = true;
			oBtn.removeClass(sLoad);
			oCont.removeClass(sLoad);
		}
		var searchInitFirst = true;
		var num = 100;
		var nextid = 0;
		// 检索数据
		$('#search span').bind(CLICK_EVENT, function(){
			if(bFlag){
				var key = $.trim($('#search input').val());
				if(!key && !searchInitFirst){
					$.popUp.messages({"innerHTML":'请输入关键词！'});
					return false;
				}
				searchInitFirst = false;
				searchStart();
				$.ajax({
					url: PORT_URL + 'searchDresser.php?key=' + key +'&num='+num+'&nextid='+nextid,
					dataType: 'jsonp',
					success: function(rs){
						var that = this;
						if(rs.code==1){
							var data = rs.data;
							if( Object.prototype.toString.call(data) == "[object Array]" && data.length){
								var str = createHtml(data, rs.baseurl);
								oCont.html(str);
							}else{
								oCont.html(noData);
							}
						}else{
							$.popUp.messages({"innerHTML":rs.desc});
						}
						searchFinish();
					},
					error: function(rs){
						searchFinish();
					}
				});
			}
		}).trigger(CLICK_EVENT);

		shareFriend({});
	}


	/**
	 * 16_17.html
	 */
	win.fn_16_17 = function(){
		new SwitchOption({
			menus:  $('#option_card .menu'),
			conts: $('#option_cont .list'),
			initNum: 2
		});

		shareFriend({});
	}


	/**
	 * 20.html
	 */
	win.fn_20 = function(){
		shareFriend({});
	}


	/**
	 * 21_22.html
	 */
	win.fn_21_22 = function(){
		var menus = $('#option_card .menu');	// 菜单
		var conts = $('#option_cont .list')		// 内容
		var boxs = $('.list_box', conts);		// 容器
		var btns = $('.load_more', conts);		// 更多
		var len = conts.length;
		var createHtml = function(arr, index, baseurl){
			var rs = '';
			if(arr){
				for(var i=0;i<arr.length;i++){
					var o = arr[i];
					if(index == 0){
						rs += '<a href="'+ (baseurl ? baseurl + o.exid : 'javascript:;') +'" class="item">'+
							'<img src="'+ o.portrait +'" alt="" class="img"/>'+
							'<div class="msg"><p class="name top">'+ o.fullname +'</p><p class="cnt bot">'+ o.desc +'</p></div>'+
							'<div class="txt"><p class="money top">￥'+ o.price +'</p><p class="cont bot">接单'+ o.service_num +'</p></div>'+
						'</a>';
					}else{
						rs += '<li><a href="'+ (baseurl ? baseurl + o.exid : 'javascript:;') +'" class="item2">'+
							'<img src="'+ o.pic +'" alt="" class="img"/>'+
							'<div class="txt h_clear"><p class="money">￥'+ o.price +'</p><p class="cont">'+ o.order_num +'做过</p></div>'+
						'</a></li>';
					}
				}
			}
			return rs;
		}
		conts.each(function(i){
			new LoadMore({
				'btn': btns.eq(i),
				'url': PORT_URL + 'getCollectList.php?type=' + (i==0 ? 'dresser' : 'works'),
				'num': 16,
				'callFn': function(rs,cb){
					var that = this;
					if(rs.code==1){
						var data = rs.data;
						if(data){
							var str = createHtml(data, i, rs.baseurl);
							boxs.eq(i).append(str);
							cb(rs.nextid, data.length);
						}
					}
				}
			});
		});
		new SwitchOption({
			menus: menus,
			conts: conts
		});

		shareFriend({});
	}
	
	
	/**
	 * h_1.html
	 */
	win.fn_h_1 = function(){
		var oBtn = $('#login_btn');
		var oLoad = new CyLoading({
			'btn': oBtn,
			'flag': false,
			'btnState': true,
			'newName': '正在登录...'
		});
		oBtn.bind(CLICK_EVENT, function(ev){
			var that = this;
			var data = {};
			data.username = $.trim($('#user_name').val());
			data.passwd = $('#user_pwsd').val();
			if(!data.username){
				$.popUp.messages({"innerHTML":'请填写手机号！'});
				return;
			}else if(!VALIDATE_MOBILE.test(data.username)){
				$.popUp.messages({"innerHTML":'手机号码格式不正确！'});
				return;
			}
			if(!data.passwd){
				$.popUp.messages({"innerHTML":'请填写密码！'});
				return;
			}

			if(oLoad.flag){
				oLoad.loading(false); return;
			}else{
				oLoad.loading(true);
			}
			
			$.post(PORT_URL + 'dresser/login.php', data, function(rs){
				if(rs.code == 1){
					window.location = rs.redirect_uri;
				}else{
					$.popUp.messages({"innerHTML":rs.desc});
					oLoad.loading(false);
				}
			},'json');
		});

		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});

	}
	
	/**
	 * h_4.html
	 */
	win.fn_h_4 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	
	/**
	 * h_5.html
	 */
	win.fn_h_5 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	
	/**
	 * h_6.html
	 */
	win.fn_h_6 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	
	/**
	 * h_7.html
	 */
	win.fn_h_7 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	
	/**
	 * h_8.html
	 */
	win.fn_h_8 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	
	/**
	 * h_8-1.html
	 */
	win.fn_h_8_1 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	
	/**
	 * h_4.html
	 */
	win.fn_h_9 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	 
	/**
	 * h_17.html
	 */
	win.fn_h_17 = function(){
		var images = {
			localId: [],
			serverId: []
		};
		var picUpTag = true;
		$('#chooseImage').bind(CLICK_EVENT, function () {
			if(picUpTag){
				picUpTag = false;
				wx.chooseImage({
					success: function (rs) {
						images.localId = rs.localIds;
						wx.uploadImage({
							localId: rs.localIds[0],
							success : function(res){
	                           //images.localId = rs.localIds;
								var data = {pic : res.serverId};
								//$.popUp.messages({"innerHTML":'已选择 ' + res.localIds.length + ' 张图片'});
							    $.ajax({
							    	url : PORT_URL + 'dresser/userportrait.php',
							    	type : "post",
							    	data : data,
					                dataType:"json",
							    	success : function(res2){
			                           if(res2.code == 1){
			                           	  picUpTag = true;
			                           	  $("#chooseImage .img").attr("src",images.localId[0]);
			                           }
							    	},
							    	fail:function(){
					                   picUpTag = true;
									 	alert("上传失败");
					                }
							    });
							},
							fail:function(){
			                   picUpTag = true;
							   alert("上传失败");
			                }
						});

					},
					 fail:function(){
	                   picUpTag = true;
					   alert("上传失败");
	                },
	                cancel:function(){
	                    picUpTag = true;
	                }
				});
		    }
		});
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
})(window,document,Zepto)





/**
 * jianyin.js
 */
;(function(win,doc,$){
	/**
	 * 1.html
	 */
	win.fn_1 = function(){
	    // 高度设置
	    // var dd = document.documentElement;
	    // var db = document.body;
	    // var wh = Math.max(dd.scrollHeight,db.scrollHeight);

	    // var $nBox = $("#n_box");
	    // var nbh = $nBox.outerHeight();
	    // var fh = Math.max(wh-96,nbh);
	    // $nBox.height(fh);
 
	    var now = new Date();
	    function init() {
	        // dom容器
	        // 妆容选择
	        var $select = $("#n_selectMakeup");
	        var $name = $('#n_guestname');
	        var $tel = $("#n_telphone");
	        var $datetime = $("#n_serverdate");
	        var $address = $("#n_address");
	        var $sd = $("#n_sd");
	        // 服务时间控件绑定
	        $sd.mobiscroll().datetime({
	            theme: 'ios',
	            mode: 'scroller',
	            display: 'bottom',
	            lang: 'zh',
	            minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
	            maxDate: new Date(now.getFullYear()+1,7,30,15,44),
	            stepMinute: 60,
	            onSelect: function (valueText, inst) {
		            // var selectedDate = inst.getVal(); // Call the getVal method
		            $sd.removeClass("n_a9a9a9");
		            $sd.html(valueText);
		            $datetime.val(valueText);
		        }
	        });
	        // 表单值
	        var selectVal,nameVal,telVal,datetimeVal,addressVal;
	        // 获取表单值
	        function getFormVal(){
	            selectVal = $select.val().trim();
	            nameVal = $name.val().trim();
	            telVal = $tel.val().trim();
	            datetimeVal = $datetime.val().trim();
	            addressVal = $address.val().trim();
	        }

	        // 验证手机号码
	        function validateTel(obj,val){
	            var tips = '';
	            val = val.replace(/-/g,"");
	            if( !val ){
	                tips = obj.data("tips");
	            } else if( !(/^((\+?86)|(\+86))?1[3|4|5|8][0-9]\d{8}$/.test(val)) ){
	                tips = obj.data("tips1");
	            }
	            return tips;
	        }

	        // 验证其他
	        function validate(obj,val){
	            var tips = '';
	            if( !val ){
	                tips = obj.data("tips");
	            }
	            return tips;
	        }

	        // 设为常用联系人
	        $("#n_setContactTxt").on(CLICK_EVENT,function(){
	            getFormVal();
	            var tips = '';
                tips += validate($name,nameVal);
                tips += validateTel($tel,telVal);
                tips += validate($datetime,datetimeVal);

                var url = PORT_URL + 'addOftenAddr.php';
                var data = {
                	"uname" : nameVal,
                	"mobile" : telVal,
                	"addr" : addressVal
                };

                $.ajax({
		            type:"post",
		            url:url,
		            data:data,
		            dataType:"json",
		            beforeSend: function(){},
					success: function(data){
						if(data.code == 1){
							$.popUp.messages( {"innerHTML":'设置成功'} );
						} else {
							$.popUp.messages( {"innerHTML":'设置失败'} );
						}
					},
					complete: function(){},
					error: function(){$.popUp.messages( {"innerHTML":'设置失败'} );}
		        });
	        });

	        // 预约
	        $("#n_order").on(CLICK_EVENT,function(){
	            var $that = $(this);
	            if( !$that.hasClass("noTap") ){
	                $that.addClass("noTap");
	                getFormVal();
	                var tips = '';
	                tips += validate($select,selectVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validate($name,nameVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validateTel($tel,telVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };

	                tips += validate($address,addressVal);

	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                
	                tips += validate($datetime,datetimeVal);

	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };

	                // if( /!/.test(tips) ){
	                //     tips = tips.replace(/!/g,"!<br/>");
	                //     $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                //         setTimeout(function(){
	                //             $that.removeClass("noTap");
	                //         },3000);
	                //     }} );
	                //     return;
	                // };

	                

	                var url = PORT_URL + 'addOrder.php';
	                var data = {
	                	"type" : selectVal,
	                	"uname" : nameVal,
	                	"mobile" : telVal,
	                	"ordertime" : datetimeVal,
	                	"addr" : addressVal
	                };

	                $.ajax({
			            type:"post",
			            url:url,
			            data:data,
			            dataType:"json",
			            beforeSend: function(){},
						success: function(data){
							if(data.code == 1){
								$that.removeClass("noTap");
								location.href = data.redirect_uri;
							} else {
								$.popUp.messages( {"innerHTML":'提交失败',"callBack":function(){
			                        setTimeout(function(){
			                            $that.removeClass("noTap");
			                        },3000);
			                    }} );
							}
						},
						complete: function(){},
						error: function(){
							$.popUp.messages( {"innerHTML":'提交失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						}
			        });
	            }
	        });

	        // 获取常用联系方式
	        (function(){
	        	var $storage = $("#hiddenInfor");

	            selectVal = $storage.data('select');
	            nameVal = $storage.data('uname');
	            telVal = $storage.data('mobile');
	            datetimeVal = $storage.data('time');
	            addressVal = $storage.data('addr');

	            $select.val(selectVal);
	            $name.val(nameVal);
	            $tel.val(telVal);
	            if(!!datetimeVal){
	            	$sd.removeClass("n_a9a9a9");
	            	$datetime.val(datetimeVal);
	            	$sd.html(datetimeVal);
	            }

	            $address.val(addressVal);
	        })();
	    };

	    init();

	    shareFriend({});
	};

	/**
	 * 8.html
	 */
	win.fn_8 = function(){
		var $btn_cancel = $("#n_btn_cancel");
		var $infor = $("#hiddenInfor")
		var url = PORT_URL + 'delOrder.php';
        var data = {
        	"uid" : $infor.data("uid"),
        	"exid" : $infor.data("exid")
        };

        $btn_cancel.on(CLICK_EVENT,function(){
        	var $that = $(this);
	        if( !$that.hasClass("n_btn_gray") ){
	        	$that.addClass("n_btn_gray");
	        	$.ajax({
		            type:"post",
		            url:url,
		            data:data,
		            dataType:"json",
		            beforeSend: function(){},
					success: function(data){
						if(data.code == 1){
							$that.removeClass("n_btn_gray");
							location.href = data.redirect_uri;
						} else {
							$.popUp.messages( {"innerHTML":'取消订单失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("n_btn_gray");
		                        },3000);
		                    }} );
						}
					},
					complete: function(){},
					error: function(){
						$.popUp.messages( {"innerHTML":'取消订单失败',"callBack":function(){
		                    setTimeout(function(){
	                            $that.removeClass("n_btn_gray");
	                        },3000);
		                }} );
					}
		        });
        	}
        });
        
        shareFriend1({});
	};

	/**
	 * 8-1.html
	 */
	win.fn_8_1 = function(){
		shareFriend({});
	};

	/**
	 * 9.html
	 */
	win.fn_9 = function(){
		shareFriend({});
	};

	/**
	 * 10.html
	 */
	win.fn_10 = function(){
		shareFriend({});
	};

	/**
	 * 10-1.html
	 */
	win.fn_10_1 = function(){
		shareFriend({});
	};


	/**
	 * h_2.html
	 */
	win.fn_h_2 = function(){
	    function init() {
	        // dom容器
	        var $city = $('#n2_city');
	        var $name = $('#n2_name');
	        var $tel = $("#n2_tel");
	        var $workYear = $("#n2_workYear");
	        var $company = $("#n2_selectCompany");
	        var $sexBox = $("#n2_box_sex");
	        var $sex = $sexBox.find(".n2_sex_selected");
	        var $sexRadio = $sexBox.find(".n2_sex");
	        var $description = $("#n2_bd");

	        $sexRadio.on(CLICK_EVENT,function(){
	        	var $that = $(this);
	        	if( !$that.hasClass("n2_sex_selected") ){
	        		$sexRadio.removeClass("n2_sex_selected");
	        		$that.addClass("n2_sex_selected");
	        		$sex = $that;
	        	}
	        });

	        // 表单值
	        var cityVal,nameVal,telVal,workYearVal,companyVal,sexVal,descriptionVal;
	        // 获取表单值
	        function getFormVal(){
	            cityVal = $city.val().trim();
	            nameVal = $name.val().trim();
	            telVal = $tel.val().trim();
	            workYearVal = parseInt( $workYear.val().trim() );
	            companyVal = $company.val().trim();
	            sexVal = $sex.data("radio");
	            descriptionVal = $description.val().trim();
	        }

	        // 验证联系电话
	        function validateTel(obj,val){
	            var tips = '';
	            if( !val ){
	                tips = obj.data("tips") + "不能为空!";
	            } else if( !(/^((\+?86)|(\+86))?\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(val)) && !(/^((\+?86)|(\+86))?1\d{10}$/.test(val)) ){
	                tips = obj.data("tips") + "不存在!";
	            }
	            return tips;
	        }

	        // 验证其他
	        function validate(obj,val){
	            var tips = '';
	            if( !val ){
	                tips = obj.data("tips") + "不能为空!";
	            }
	            return tips;
	        }

			// 注册
	        $("#n2_register").on(CLICK_EVENT,function(){
	            var $that = $(this);
	            if( !$that.hasClass("noTap") ){
	                $that.addClass("noTap");
	                getFormVal();
	                var tips = '';
	                tips += validate($name,nameVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validateTel($tel,telVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validate($workYear,workYearVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };

	                var url = PORT_URL + 'dresser/register.php';
	                var data = {
	                	"fullname" : nameVal,
	                	"phone" : telVal,
	                	"worklife" : workYearVal,
	                	"gender" : sexVal,
	                	"company" : companyVal,
	                	"supplier_desc": descriptionVal
	                };

	                $.ajax({
			            type:"post",
			            url:url,
			            data:data,
			            dataType:"json",
			            beforeSend: function(){},
						success: function(data){
							if(data.code == 1){
								$that.removeClass("noTap");
								location.href = data.redirect_uri;
							} else {
								$.popUp.messages( {"innerHTML":'注册失败',"callBack":function(){
			                        setTimeout(function(){
			                            $that.removeClass("noTap");
			                        },3000);
			                    }} );
							}
						},
						complete: function(){},
						error: function(){
							$.popUp.messages( {"innerHTML":'注册失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						}
			        });
	            }
	        });
	    };

	    init();
	    shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	};

	/**
	 * h_3.html
	 */
	win.fn_h_3 = function(){
	    function init() {
	        // dom容器
			var conts = $('#option_cont .list')		// 内容
			var boxs = $('.list_box', conts);		// 容器
			var btns = $('.load_more', conts);		// 更多
			var len = conts.length;
			var baseurl = '';
			var createHtml = function(arr, index){
				var rs = '';
				if(arr&&arr.list){
					for(var i=0;i<arr.list.length;i++){
						var o = arr.list[i];
						rs += '<div class="h_btm">'+
	                        '<a href="'+baseurl+o.id+'" class="n2_lb_box">'+
	                            '<span class="n2_order_infor">'+
	                                '<span class="n2_oi">订单号：'+ o.orderId +'</span>'+
	                                '<span class="n2_oi_date">下单时间：'+ dateFormat(o.ctime, 2) +'</span>'+
	                            '</span>'+
	                            '<span class="user_info">'+
	                                '<img class="img" src="'+o.head_img+'"/>'+
	                                '<span class="info">'+
	                                    '<p class="info_name">'+o.contacts+'</p>'+
	                                    '<span class="info_cnt h_clear"><p class="p">'+o.goodstitle+'</p><p class="p">￥'+o.total+'</p></span>'+
	                                    '<span class="info_data h_clear"><i></i><p class="p">'+dateFormat(o.ordertime, 2)+'</p></span>'+
	                                    '<span class="info_address h_clear"><i></i><p class="p">'+o.addr+'</p></span>'+
	                                '</span>'+
	                            '</span>'+
	                        '</a>'+
	                        '<a href="tel:'+o.telephone+'" class="tel"><span></span></a>'+
	                    '</div>';
					}
				}
				return rs;
			}
			new LoadMore({
				'btn': btns,
				'url': PORT_URL+'dresser/neworder.php',
				'num': 16,
				'callFn': function(rs,cb){
					var that = this;
					if(rs.code==1){
						var data = rs.data;
						baseurl = rs.baseurl;
						if(data){
							var str = createHtml(data, 0);
							boxs.append(str);
							cb(rs.nextid, data.list.length);
						}
					}
				}
			});
	    };

	    init();
	    shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	};
	
	/**
	 * h_10.html
	 */
	win.fn_h_10 = function(){
	    function init() {
	        
	    };

	    init();
	    shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	};
	
	/**
	 * h_12.html
	 */
	win.fn_h_12 = function(){

	    function init() {
	        // dom容器
			var conts = $('#option_cont .list')		// 内容
			var boxs = $('.list_box', conts);		// 容器
			var btns = $('.load_more', conts);		// 更多
			var len = conts.length;
			var createHtml = function(arr, index, baseurl){
				var rs = '';
				if(arr&&arr.list){
					for(var i=0;i<arr.list.length;i++){
						var o = arr.list[i];
						rs += '<div class="h_btm">'+
	                        '<a href="'+baseurl+o.id+'" class="n2_order_infor">'+
	                            '<span class="n2_oi">订单号：'+ o.orderId+'</span>'+
	                            '<span class="n2_oi_date">下单时间：'+ dateFormat(o.ctime, 2) +'</span>'+
	                        '</a>'+
	                        '<a href="'+baseurl+o.id+'" class="n2_item">'+
	                            '<img src="'+o.head_img+'" alt="" class="img"/>'+
	                            '<span class="n2_item_h">'+
	                                '<span class="n2_ih_name">联系人：'+o.contacts+'</span>'+
	                                '<span class="n2_ih_mu">'+o.goodstitle+'</span>'+
	                            '</span>'+
	                            '<span class="n2_item_rule">'+
	                                '<span class="n2_ir">专业：<em class="n2_ir_color">'+o.pro+'</em></span>'+
	                                '<span class="n2_ir_line"></span>'+
	                                '<span class="n2_ir">沟通：<em class="n2_ir_color">'+o.service+'</em></span>'+
	                                '<span class="n2_ir_line"></span>'+
	                                '<span class="n2_ir">守时：<em class="n2_ir_color">'+o.time+'</em></span>'+
	                            '</span>'+
	                            '<span class="n2_item_p">'+o.content+'</span>'+
	                        '</a>'+
	                        '<a href="'+baseurl+o.id+'" class="n2_order_bottom">'+
	                            '<span class="n2_ob_a">附加费：<em class="n2_ff3376">￥'+o.extra_costs+'</em></span>'+
	                            '<span class="n2_ob_total">合计：<em class="n2_ff3376">￥'+o.total+'</em></span>'+
	                        '</a>'+
	                    '</div>';
					}
				}
				return rs;
			}
			new LoadMore({
				'btn': btns,
				'url': PORT_URL+'dresser/finishorder.php',
				'num': 16,
				'callFn': function(rs,cb){
					var that = this;
					if(rs.code==1){
						var data = rs.data;
						if(data){
							var str = createHtml(data, 0,rs.baseurl);
							boxs.append(str);
							cb(rs.nextid, data.list.length);
						}
					}
				}
			});
	    };

	    init();
	    shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	};

	/**
	 * h_13.html
	 */
	win.fn_h_13 = function(){
	    function init() {
	    	var now = new Date();
	    	var $datetime = $("#n2_datepicker");
	        var $sd = $("#n2_dpr");
	        // 服务时间控件绑定
	        $sd.mobiscroll().date({
	            theme: 'ios',
	            mode: 'scroller',
	            display: 'bottom',
	            lang: 'zh',
	            minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
	            maxDate: new Date(now.getFullYear()+1,7,30,15,44),
	            stepMinute: 60,
	            onSelect: function (valueText, inst) {
		            $sd.html(valueText);
		            $datetime.val(valueText);
		        }
	        });

	        // dom容器
	        var $btns = $('#n2_ordersBtn');
	        var $time = $('#n2_orderTime');
	        var $timeItems = $time.find("span");
	        var $area = $("#n2_orderArea");
	        var $areaItems = $area.find("span");
	        var $btnSave = $("#n2_saveSetUp");
	        var $btnCommonTime = $("#n2_setContactTxt");
	        var $btnCommonArea = $("#n2_setContactArea");

	        // 全选可接单  全选不可接单
	        $btns.on(CLICK_EVENT,"span",function(event){
	        	var $that = $(this);
	        	if($that.hasClass("n2_nb_0")){
	        		$timeItems.addClass("n2_ot");
	        	} else {
	        		$timeItems.removeClass("n2_ot");
	        	}
	        	return false;
	        });

	        // 选择接单时间
	        $time.on(CLICK_EVENT,"span",function(event){
	        	var $that = $(this);
	        	if($that.hasClass("n2_ot")){
	        		$that.removeClass("n2_ot");
	        	} else {
	        		$that.addClass("n2_ot");
	        	}
	        	return false;
	        });

	        // 选择接单范围
	        // $area.on(CLICK_EVENT,"span",function(event){
	        // 	var $that = $(this);
	        // 	if($that.hasClass("n2_oa")){
	        // 		$that.removeClass("n2_oa");
	        // 	} else {
	        // 		$that.addClass("n2_oa");
	        // 	}
	        // 	return false;
	        // });

	        // 设为常用接单时间
	        $btnCommonTime.on(CLICK_EVENT,function(event){
	        	var $that = $(this);
	        	// 接单时间
                var orderTiems = [];
                $.each($timeItems.filter(".n2_ot"),function(i,val){
                	orderTiems.push( $(val).data('value') );
                });

                var url = PORT_URL + 'dresser/settime.php';
                var data = {
                	"timer" : orderTiems.join(",")
                };

                $.ajax({
		            type:"post",
		            url:url,
		            data:data,
		            dataType:"json",
		            beforeSend: function(){},
					success: function(data){
						if(data.code == 1){
							$.popUp.messages( {"innerHTML":'设置成功',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						} else {
							$.popUp.messages( {"innerHTML":'设置失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						}
					},
					complete: function(){},
					error: function(){
						$.popUp.messages( {"innerHTML":'设置失败',"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
					}
		        });
	        	return false;
	        });

	        // 设为常用接单范围
	        $btnCommonArea.on(CLICK_EVENT,function(event){
	        	var $that = $(this);
	        	// 接单范围
                var orderAreas = [];
                $.each($areaItems.filter(".n2_oa"),function(i,val){
                	orderAreas.push( $(val).data('value') );
                });

                var url = PORT_URL + 'dresser/setzone.php';
                var data = {
                	"zone" : orderAreas.join(",")
                };

                $.ajax({
		            type:"post",
		            url:url,
		            data:data,
		            dataType:"json",
		            beforeSend: function(){},
					success: function(data){
						if(data.code == 1){
							$.popUp.messages( {"innerHTML":'设置成功',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						} else {
							$.popUp.messages( {"innerHTML":'设置失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						}
					},
					complete: function(){},
					error: function(){
						$.popUp.messages( {"innerHTML":'设置失败',"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
					}
		        });
	        	return false;
	        });

	        // 保存设置
	        $btnSave.on(CLICK_EVENT,function(){
	            var $that = $(this);
	            if( !$that.hasClass("noTap") ){
	                $that.addClass("noTap");

	                // 接单时间
	                var orderTiems = [];
	                $.each($timeItems.filter(".n2_ot"),function(i,val){
	                	orderTiems.push( $(val).data('value') );
	                });
	                // 接单范围
	                 var orderAreas = [];
	                $.each($areaItems.filter(".n2_oa"),function(i,val){
	                	orderAreas.push( $(val).data('value') );
	                });

	                var datetimeVal = $datetime.val();
	                if(!datetimeVal){
	                	$.popUp.messages( {"innerHTML":"请设置日期","callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                }
	                
	                if( orderAreas.length === 0 ){
	                    $.popUp.messages( {"innerHTML":"请先选择接单范围","callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                }
	                var url = PORT_URL + 'dresser/settimeandzone.php';
	                var data = {
	                	"zone" : orderAreas.join(","),
	                	"times" : orderTiems.join(","),
	                	"date" : datetimeVal
	                };

	                $.ajax({
			            type:"post",
			            url:url,
			            data:data,
			            dataType:"json",
			            beforeSend: function(){},
						success: function(data){
							if(data.code == 1){
								$.popUp.messages( {"innerHTML":'设置成功',"callBack":function(){
			                        setTimeout(function(){
			                            $that.removeClass("noTap");
			                        },3000);
			                    }} );
							} else {
								$.popUp.messages( {"innerHTML":'设置失败',"callBack":function(){
			                        setTimeout(function(){
			                            $that.removeClass("noTap");
			                        },3000);
			                    }} );
							}
						},
						complete: function(){},
						error: function(){
							$.popUp.messages( {"innerHTML":'设置失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						}
			        });
	            }
	        });
	    };

	    init();
	    shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	};


	/**
	 * h_22.html
	 */
	win.fn_h_22 = function(){
	    function init() {
	        // dom容器
	        var menus = $('#option_card .menu');	// 菜单
			var conts = $('#option_cont .list')		// 内容
			var boxs = $('.list_box', conts);		// 容器
			var btns = $('.load_more', conts);		// 更多
			var len = conts.length;
			var createHtml = function(arr, index){
				var rs = '';
				if(arr&&arr.list){
					for(var i=0;i<arr.list.length;i++){
						var o = arr.list[i];
						rs += '<a href="javascript:;" class="n2_item">'+
                        '<img src="'+ o.portrait +'" alt="" class="img"/>'+
                        '<span class="n2_item_h">'+
                            '<span class="n2_ih_name">'+ o.uname +'</span>'+
                            '<span class="n2_ih_date">'+ dateFormat(o.ctime, 2) +'</span>'+
                        '</span>'+
                        '<span class="n2_item_rule">'+
                            '<span class="n2_ir">专业：<em class="n2_ir_color">'+o.pro+'</em></span>'+
                            '<span class="n2_ir_line"></span>'+
                            '<span class="n2_ir">沟通：<em class="n2_ir_color">'+o.service+'</em></span>'+
                            '<span class="n2_ir_line"></span>'+
                            '<span class="n2_ir">守时：<em class="n2_ir_color">'+o.time+'</em></span>'+
                        '</span>'+
                        '<span class="n2_item_p">'+o.content+'</span>'+
                    	'</a>';
					}
				}
				return rs;
			}
			conts.each(function(i){
				var type = '';
				if(i==1){
					type = 1;
				}else if(i==2){
					type = 2;
				}else if(i==3){
					type = 3;
				}
				new LoadMore({
					'btn': btns.eq(i),
					'url': PORT_URL+'dresser/getcomments.php?type=' + type,
					'num': 16,
					'callFn': function(rs,cb){
						var that = this;
						if(rs.code==1){
							var data = rs.data;
							if(data){
								var str = createHtml(data, i);
								boxs.eq(i).append(str);
								cb(rs.nextid, data.list.length);
							}
						}
					}
				});
			});
			new SwitchOption({
				menus: menus,
				conts: conts
			});
	    };

	    init();
	    shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	};

	/**
	 * h_2_24.html
	 */
	win.fn_h_2_24 = function(){

	}

})(window,document,Zepto)




/**
 * lidan.js
 */
;(function(win,doc,$){
	//code
	function setCollect(objId){
		objId = "#"+objId;
		var obj = $(objId),
		    uid = obj.data("uid"),
		    exid = obj.data("exid"),
			type = obj.data("type");
		obj.bind(CLICK_EVENT,function(){
			var objClass = obj.attr('class'),
				op = objClass == "select" ? "del" : "add";
			$.ajax({
					url: PORT_URL+'setCollect.php',
					data: {'uid':uid,'exid':exid,'op':op,'type':type},
					dataType: 'jsonp',
					success: function(msg){
						if(msg.code==1){
							var className = objClass == "select" ? "" : "select";
							obj.attr('class',className);
						}
					}
				});
			
		});
	}
	function getCollect(objId){
		objId = "#"+objId;
		var obj = $(objId),
		    uid = obj.data("uid"),
		    exid = obj.data("exid"),
			type = obj.data("type");
		$(win).bind("load",function(){
			$.ajax({
					url: PORT_URL+'getCollect.php',
					data: {'uid':uid,'exid':exid,'type':type},
					dataType: 'jsonp',
					success: function(msg){
						if(msg.code==1){obj.addClass("select");}
						else{obj.removeClass("select");}
					},
					error:function(msg){
						return;
					}
				});
			
		});
	}
	win.fn_3 = function(){
		getCollect("c_shou");
		setCollect("c_shou");
		shareFriend({});
	}
	win.fn_6 = function(){
		getCollect("c_shou");
		setCollect("c_shou");

		var imgurl = $(".c_show").find('img').attr('src');
		shareFriend2({imgUrl: imgurl});
	}
	win.fn_7 = function(){}
	win.fn_14 = function(){
		getCollect("c_shou");
		setCollect("c_shou");
		var imgurl = $(".person").find('img').attr('src');
		shareFriend3({imgUrl: imgurl});
	}
	win.fn_15 = function(){
		getCollect("c_shou");
		setCollect("c_shou");
		shareFriend({});
	}
	
	/**
	* 18.html
	*/
	win.fn_18 = function(){
	    function init() {
	    	// 收藏
	    	getCollect("c_shou");
			setCollect("c_shou");


	    	var now = new Date();
	        // dom容器
	        var $name = $("#n_sb_name");
	        var $tel = $("#n_sb_telphone");
	        var $datetime = $("#n_serverdate");
	        var $address = $("#n_address");
	        var $numVal = $("#n_selectNum1");
	        var $sd = $("#n_sd");

	        // 服务时间控件绑定
	        $sd.mobiscroll().datetime({
	            theme: 'ios',
	            mode: 'scroller',
	            display: 'bottom',
	            lang: 'zh',
	            minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
	            maxDate: new Date(now.getFullYear()+1,7,30,15,44),
	            stepMinute: 60,
	            onSelect: function (valueText, inst) {
		            // var selectedDate = inst.getVal(); // Call the getVal method
		            $sd.removeClass("n_a9a9a9");
		            $sd.html(valueText);
		            $datetime.val(valueText);
		        }
	        });
	        // 表单值
	        var uidVal,pidVal,nameVal,telVal,datetimeVal,addressVal,numVal;
	        // 获取表单值
	        function getFormVal(){
	        	nameVal = $name.val().trim();
	            telVal = $tel.val().trim();
	            datetimeVal = $datetime.val().trim();
	            addressVal = $address.val().trim();
	            numVal = $numVal.val().trim();
	        }

	        // 验证手机号码
	        function validateTel(obj,val){
	            var tips = '';
	            val = val.replace(/-/g,"");
	            if( !val ){
	                tips = obj.data("tips");
	            } else if( !(/^((\+?86)|(\+86))?1[3|4|5|8][0-9]\d{8}$/.test(val)) ){
	                tips = obj.data("tips1");
	            }
	            return tips;
	        }

	        // 验证其他
	        function validate(obj,val){
	            var tips = '';
	            if( !val ){
	                tips = obj.data("tips");
	            }
	            return tips;
	        }

	        // 选中该作品
	        $("#n_btn_works").on(CLICK_EVENT,function(){
	            var $that = $(this);
	            if( !$that.hasClass("noTap") ){
	                $that.addClass("noTap");
	                getFormVal();
	                var tips = '';
	                tips += validate($name,nameVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validateTel($tel,telVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validate($datetime,datetimeVal);
	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };
	                tips += validate($address,addressVal);

	                if( /!/.test(tips) ){
	                    $.popUp.messages( {"innerHTML":tips,"callBack":function(){
	                        setTimeout(function(){
	                            $that.removeClass("noTap");
	                        },3000);
	                    }} );
	                    return;
	                };

	                var url = PORT_URL+'chosenWorks.php';
	                var data = {
	                	"uid" : uidVal,
	                	"pid" : pidVal,
	                	"uname" : nameVal,
	                	"num" : numVal,
	                	"mobile" : telVal,
	                	"ordertime" : datetimeVal,
	                	"addr" : addressVal
	                };

	                $.ajax({
			            type:"post",
			            url:url,
			            data:data,
			            dataType:"json",
			            beforeSend: function(){},
						success: function(data){
							if(data.code == 1){
								$that.removeClass("noTap");
								location.href = data.redirect_uri;
							} else {
								$.popUp.messages( {"innerHTML":'提交失败',"callBack":function(){
			                        setTimeout(function(){
			                            $that.removeClass("noTap");
			                        },3000);
			                    }} );
							}
						},
						complete: function(){},
						error: function(){
							$.popUp.messages( {"innerHTML":'提交失败',"callBack":function(){
		                        setTimeout(function(){
		                            $that.removeClass("noTap");
		                        },3000);
		                    }} );
						}
			        });
			        return false;
	            }
	        });

	        // 获取常用联系方式
	        (function(){
	        	var $storage = $("#hiddenInfor");

	            uidVal = $storage.data('uid');
	            pidVal = $storage.data('pid');
	            nameVal = $storage.data('uname');
	            telVal = $storage.data('mobile');
	            datetimeVal = $storage.data('time');
	            addressVal = $storage.data('addr');

	            $name.val(nameVal);
	            $tel.val(telVal);
	            if(!!datetimeVal){
	            	$sd.removeClass("n_a9a9a9");
	            	$datetime.val(datetimeVal);
	            	$sd.html(datetimeVal);
	            }
	            $address.val(addressVal);
	        })();
	    };

	    init();
	    shareFriend({});
	};

	win.fn_h_14 = function(){
		// html拼装
		var createHtml = function(arr, index){
			var rs = '';
			if(arr){
				for(var i=0;i<arr.length;i++){
					rs += '<li class="c_mpli" data-goodsId="'+arr[i].goods_id+'"><div class="clearfix"><div class="c_cl"><img src="'+arr[i].goods_pic+'" /></div>'+
                          '<div class="c_cl c_pinfo"><h2>'+arr[i].goods_title+'</h2>' +
                          '<p>'+arr[i].goods_desc+'</p></div></div>'+
                          '<div class="c_mask"></div><div class="c_delete">删除</div></li>';						//
				}
			}
			return rs;
		}
		//删除
		function pdelete(o){
			var teo = o,
			    gid = teo.data('goodsid');
			$.ajax({
					url: PORT_URL+'dresser/delgoods.php?goods_id='+gid,
					success: function(msg){
						if(msg.code==1){
							teo.find('.c_delete').hide();
							teo.animate({opacity: 0},500,'ease-out');
							setTimeout(function(){teo.remove()},500);
						}
						else{
							teo.find('.c_mask').hide();
							teo.find('.c_delete').hide();
						}
					},
					fail:function(msg){
						    teo.find('.c_mask').hide();
							teo.find('.c_delete').hide();
					}
				});			
		}
		// 数据初始及更多
		var oBtn = $('.load_more'),
		    oBox = $('#c_mpl');
		new LoadMore({
			'btn': oBtn,
			'url': PORT_URL+'dresser/getgoodslist.php', 	 //
			'num': 16,									 //
			'callFn': function(rs,cb){
				var that = this;
				if(rs.code==1){
					var data = rs.data;
					if(data.list.length>0){
							var str = createHtml(data.list);
							oBox.append(str);
							cb(rs.nextid, data.list.length);
						}
						else{
							oBox.html('<p class="add">请上传个人作品</p>');
							oBtn.hide();
						}
					}
				}
		});
		//上传个人作品
		var picUpTag = true;
		$('#c_product').bind(CLICK_EVENT, function () {
			if(picUpTag){
			   $(this).addClass("noTap");
			   picUpTag = false;
               wx.chooseImage({
				success: function (rs) {
					//images.localId = rs.localIds;
					//location.href = 'http://side.video.sina.com.cn/weixin/weixin_h/upgoods.php?local_pic='+rs.localIds[0];
					picUpTag = true;
                    $('#c_product').removeClass("noTap");
					location.href = 'http://side.video.sina.com.cn/weixin/weixin_h/upgoods.php?local_pic='+rs.localIds[0];
				 },
				 fail:function(){
                   picUpTag = true;
                   $('#c_product').removeClass("noTap"); 
                   alert("上传失败");
                },
                cancel:function(){
                    picUpTag = true;
                   $('#c_product').removeClass("noTap");                    
                }
			  });
			}
		});
		//长按删除
		oBox.bind("longTap", function(ev){
			var ev = ev || window.event,
			    node = ev.srcElement || ev.target;
			ev.preventDefault();
			var tar = $(node),
			    oLi = tar.closest('.c_mpli');
			var olilen = oLi.parent().children().length,
			    oLoad = $(".load_more");
			/*if(olilen < 2 && !oLoad.hasClass("load_more_disable")){
			    //location.reload();
			    oLoad.click();
			}else{*/
				if(oLi){
					$('.c_delete').hide();
					$('.c_mask').hide();
					oLi.find('.c_mask').show();
					oLi.find('.c_delete').show();
					oLi.find('.c_mask').bind(CLICK_EVENT,function(){
						oLi.find('.c_mask').hide();
					    oLi.find('.c_delete').hide();
					})
					oLi.find('.c_delete').bind(CLICK_EVENT,function(){
						pdelete(oLi);
					})
		        }
			//}
				/*if(oLi){
				$('.c_delete').hide();
				oLi.find('.c_delete').show();
				oLi.find('.c_delete').bind(CLICK_EVENT,function(){
					pdelete(oLi);
				})
		    }*/
		})

		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
   		
	}
	win.fn_h_15 = function(){
		$("#c_pmain").bind(CLICK_EVENT,function(){
        var isMain = $(this).attr("class") == "checked" ? 1 : 0;
			if(isMain){$(this).attr('class', '');}
			else{$(this).attr('class', 'checked');}            
		});
		/*var pTag = true;
		$("#c_pimg").bind(CLICK_EVENT,function(){
			//上传作品图片
			var images = {
				localId: [],
				serverId: []
			};
			if(pTag){
				pTag = false;
	               wx.chooseImage({
					success: function (rs) {
						//images.localId = rs.localIds;
						wx.uploadImage({
	                    localId:rs.localIds[0],
	                    success:function(res){
						      $(this).attr("src",rs.localIds[0]);
						      images.serverId.push(res.serverId);
	                        }
	                  })
					}
				  });
	            setTimeout(function(){
	            	pTag = true;
	            },1000); 
            }  
		})*/
        var images = {
			localId: [],
			serverId: []
		};
		images.localId.push($('#c_pimg').attr("src"));
		var picUpTag = true;
		$('#c_pimg').bind(CLICK_EVENT, function () {
			if(picUpTag){
			   picUpTag = false;
               wx.chooseImage({
				success: function (rs) {
					images.localId = rs.localIds;
					picUpTag = true;
					$('#c_pimg').attr("src",rs.localIds[0]);
				 },
				 fail:function(){
                   picUpTag = true;
                   alert("上传失败");
                },
                cancel:function(){
                    picUpTag = true;
                }
			  });
			}
		});
        $("#n_order").bind(CLICK_EVENT,function(){
        	var isMain = $("#c_pmain").attr("class") == "checked" ? 1 : 0,
			    picDesc = $("#picDesc").val().trim(),
			    type = $('#n_selectPro').val();
            if(isMain && picDesc === ""){ alert("请输入作品描述"); return;}
            else if(type == ""){ alert("请选择妆容"); return;}
            else{
             wx.uploadImage({
                 localId : images.localId[0],
                 success : function(res){
                       images.serverId.push(res.serverId);
						var pic = images.serverId[0],
						    data = {
						    	 'type' : type,
				                 'pic_desc' : picDesc,
				                 'is_master' : isMain,
				                 'pic' : pic
						    }
						    $.ajax({
						    	url : PORT_URL+'dresser/upgoods.php',
						    	data : data,
							    dataType:"json",
							    success : function(data){
				                     if(data.code == 1){
												location.href = data.redirect_uri;
										}
							    },
							    fail:function(){
							    	alert("上传失败");
							    }

						    });
                 },
                 fail:function(){
                 	alert("上传失败");
                 }
              })  
            }          
        })
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	win.fn_h_19 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	win.fn_h_20 = function(){
		var gTag = true;
		if(gTag){
		gTag = false;
		$("label").bind(CLICK_EVENT,function(){
			var radioId = $(this).attr("name");
			$('label').removeAttr('class') && $(this).attr('class', 'checked');
			var gender = radioId == "man" ? 1 : 2;
			$.ajax({
					url: PORT_URL+'dresser/usersex.php?gender='+gender,
					success: function(msg){
						if(msg.code==1){
							gTag = true;
							location.href = msg.redirect_uri;
						}
					},
					error:function(msg){
						return;
					}
				});	
		 });
	 }
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	win.fn_h_21 = function(){
		$("#n_order").bind(CLICK_EVENT,function(){
		    var oldPass = $("#oldPass").val().trim(),
		    newPass = $("#newPass").val().trim(),
			checkPass = $("#checkPass").val().trim(),
			subtn = $("#n_order"),
			tips = "";
			if( !subtn.hasClass("noTap") ){
				subtn.addClass("noTap");
				//2.新密码不能为空
				if(newPass === ""){tips = "新密码不能为空！";}
				//3.新密码输入不一致
				else if(newPass !== checkPass){tips = "两次密码输入不一致！";}
				if(tips != ""){
					$.popUp.messages( {"innerHTML":tips,"callBack":function(){
						setTimeout(function(){
							subtn.removeClass("noTap");
						},3000);
					}} );
					return false;
				}
				else{
					$.ajax({
					url: PORT_URL+'dresser/userpasswd.php?oldpasswd='+oldPass+'&newpasswd='+newPass,
					success: function(msg){
						   if(msg.code == 1){
							location.href = msg.redirect_uri;
						   }
					},
					error:function(msg){
						return;
					}
				  });	
				}
			}
		});

		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
		
	}
	win.fn_h_23 = function(){
		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
	win.fn_h_24 = function(){
       //var times = window.location.href;
		// html拼装
		var createHtml = function(arr, index){
			var rs = '';
			if(arr){
				for(var i=0;i<arr.length;i++){
					rs += ' <li class="clearfix"><div class="c_cl">'+arr[i].goodstitle+'</div><div class="c_cr"><h2>'+arr[i].price+'</h2><p>'+arr[i].ctime+'</p></div></li>';						//
				}
			}
			return rs;
		}
		var oBtn = $('#load_more'),
		    oBox = $('#c_hlm');
		    oBtn.hide();
		new LoadMore({
			'btn': oBtn,
			'url': PORT_URL+'dresser/incomelist.php', 	 //
			'num': 16,									 //
			'callFn': function(rs,cb){
				var that = this;
				if(rs.code==1){
					var data = rs.data;
					if(data.length>0){
							var str = createHtml(data);
							oBox.append(str);
							oBtn.show();
							cb(rs.next_id, data.length);
						}
						else{
							oBox.html('');
							oBtn.hide();
						}
					}
				}
		}); 

		shareFriend({imgUrl: 'http://side.video.sina.com.cn/weixin/themes/weixin/images/logo1.png'});
	}
})(window,document,Zepto)

