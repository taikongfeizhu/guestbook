function debugInfo(title,content, format){
	if (typeof content == 'object') {
		content = JSON.stringify(content, null, '\t');
		if (format) {
			content = content.replace(/\n/g, '<br/>').replace(/\t/g, ' &nbsp; &nbsp; ');
		}
		if(arguments.length>3){
			var keywords = Array.prototype.slice.call(arguments, 3);
			for(var i=0;i<keywords.length;i++){
				var keyword = keywords[i];
				content=content.replace(new RegExp('"'+keyword+'"',"g"),'<font style="background:yellow">"'+keyword+'"</font>');
			}
		}
	}
	// 为消息增加点击事件，开始时折叠消息
	var $msg = $('<p/>').addClass('shortMsg').click(function() {
		$(this).toggleClass('shortMsg');
	});
	$('<span/>').css('color', 'red').text(title + ' || ').appendTo($msg);
	$('<span/>').html(content).appendTo($msg);
	$msg.appendTo('#debugInfo > div');
}

Date.prototype.formats = function()	{
	var month = this.getMonth()+1;
	month = month<10?'0'+month:month;
	var day = this.getDate();
	day = day<10?'0'+day:day;
	var hour = this.getHours();
	hour = hour<10?'0'+hour:hour;
	var minute = this.getMinutes();
	minute = minute<10?'0'+minute:minute;
	return month+'-'+day+' '+hour+':'+minute;
}

String.prototype.trim = String.prototype.trim || function(){
	return this.replace(/^\s+|\s+$/g,'');
}
String.prototype.isMobile=function(){
	return /^1[3|4|5|8][0-9]\d{8}$/.test(this);
}
String.prototype.kilometer=function(){
	if( !this || this=='' || isNaN(this) ){
		return '';
	}
	var tmp = parseFloat(this);
	if(tmp>1000){
		return (tmp/1000).toFixed(1) + 'km';
	}else{
		return tmp.toFixed(0) + 'm';
	}
}
String.prototype.num2today=function(){
	if(!this) return 0;
	var tmp = new Date();
	tmp.setMinutes(0);
	tmp.setHours(0);
	var date = new Date(Date.parse(this.substring(0,10).replace(/-/g,'/')));
	return Math.ceil((date - tmp)/1000/60/60/24)+1;
}
function Storage(){
	if (arguments.length==1){
		return localStorage.getItem(arguments[0]);
	}
	localStorage.setItem(arguments[0],arguments[1]);
}

var Matrix = {
	pageId:null,platform:'andh',action:null,poiInfo:null,extraUrl:null,Weibo:{},config:{introNum:5,roomTypeNum:5,carsNum:5,tuangouDesc:50},
	readyTag:{aroundStation:0,aroundPoi:0,streetView:0},shortUrlPrefix:'http://amap.com/poi/',
	// 图片的大小参数，s:小，m:中，l:大
	imgSize: {
		s: '?type=5',
		m: '?type=6',
		l: '?type=10'
	},
	PanoramaServer:'http://sv.amap.com/AnGeoPoitopanoServer',PanoTol:364.088889,
//Release_start
	KomoviePrefix:'http://m.komovie.cn:10000/buyticket.php?access=amap&qid=',
	shareUrl: 'http://wb.test.myamap.com/channel/poishare?', // 分享的wap地址
	activityUrl: {
		hotel: 'http://group.myamap.com/jingran.wang/activity/hotel_banner.html?poi=1'
	},
	aosPrefixUrl:{
		baseUrl:'http://ass.test.myamap.com/ws/valueadded/deepinfo/search?cms_ver=4',
		hotelSearch: 'http://ass.test.myamap.com/ws/valueadded/hotel/search',
		hotelCanBook: 'http://ass.test.myamap.com/ws/valueadded/hotel/hotel_avail',
		tuangou:'http://ass.test.myamap.com/ws/valueadded/groupbuy/search',
		nearestShop:'http://ass.test.myamap.com/ws/valueadded/cms/tuan-shop?version=2.0',
		nearbyTuanType:'http://ass.test.myamap.com/ws/valueadded/cms/tuan-search?version=2.0',
		nearbyFoodType:'http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11',
		nearbyRoomType:'http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11',
		trafficSearch:'http://ass.test.myamap.com/ws/mapapi/poi/bus/?version=2.0',
		aroundPoi:'http://ass.test.myamap.com/ws/mapapi/poi/recommend/?version=2.0',
		send2car:'http://sns.test.myamap.com/ws/archive/sendtoX/',
		xiaomishu:'http://sns.test.myamap.com/ws/valueadded/dining/xiaomishu/',
		qqMovieContent:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_info',
		qqMovieTuan:'http://ass.test.myamap.com/ws/valueadded/cinema/cinema_info',
		qqMovieMore:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_price',
		qqMoviePicList:'http://ass.test.myamap.com/ws/valueadded/deepinfo/pic_list',
		qqMovieDate:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_tickets',
		activity_getVCodeUrl:'http://sns.test.myamap.com/ws/auth/request-verifycode/',
		activity_verifyVCodeUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/validate-code/',
		activity_getSignInfoUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/query/',
		activity_signArriveUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/action/',
		activity_exchangeFlowUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/exchange/',
		almm:'http://ass.test.myamap.com/ws/valueadded/alimama/poiad/info'
	},
// Release_end
/* dev_env_start
	KomoviePrefix:'http://m.komovie.cn:10000/buyticket.php?access=amap&qid=',
	shareUrl: 'http://wb.test.myamap.com/channel/poishare?',
	activityUrl: {
		hotel: 'http://group.myamap.com/jingran.wang/activity/hotel_banner.html?poi=1'
	},
	aosPrefixUrl:{
		baseUrl:'http://ass.test.myamap.com/ws/valueadded/deepinfo/search?cms_ver=4',
		hotelSearch: 'http://ass.test.myamap.com/ws/valueadded/hotel/search',
		hotelCanBook: 'http://ass.test.myamap.com/ws/valueadded/hotel/hotel_avail',
		tuangou:'http://ass.test.myamap.com/ws/valueadded/groupbuy/search',
		nearestShop:'http://ass.test.myamap.com/ws/valueadded/cms/tuan-shop?version=2.0',
		nearbyTuanType:'http://ass.test.myamap.com/ws/valueadded/cms/tuan-search?version=2.0',
		nearbyFoodType:'http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11',
		nearbyRoomType:'http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11',
		trafficSearch:'http://ass.test.myamap.com/ws/mapapi/poi/bus/?version=2.0',
		aroundPoi:'http://ass.test.myamap.com/ws/mapapi/poi/recommend/?version=2.0',
		send2car:'http://sns.test.myamap.com/ws/archive/sendtoX/',
		xiaomishu:'http://sns.test.myamap.com/ws/valueadded/dining/xiaomishu/',
		qqMovieContent:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_info',
		qqMovieTuan:'http://ass.test.myamap.com/ws/valueadded/cinema/cinema_info',
		qqMovieMore:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_price',
		qqMoviePicList:'http://ass.test.myamap.com/ws/valueadded/deepinfo/pic_list',
		qqMovieDate:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_tickets',
		activity_getVCodeUrl:'http://sns.test.myamap.com/ws/auth/request-verifycode/',
		activity_verifyVCodeUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/validate-code/',
		activity_getSignInfoUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/query/',
		activity_signArriveUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/action/',
		activity_exchangeFlowUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/exchange/'
	},
dev_env_end */
/* test_env_start
	KomoviePrefix:'http://m.komovie.cn:10000/buyticket.php?access=amap&qid=',
	shareUrl: 'http://wb.test.myamap.com/channel/poishare?',
	activityUrl: {
		hotel: 'http://group.myamap.com/jingran.wang/activity/hotel_banner.html?poi=1'
	},
	aosPrefixUrl:{
		baseUrl:'http://ass.test.myamap.com/ws/valueadded/deepinfo/search?cms_ver=4',
		hotelSearch: 'http://ass.test.myamap.com/ws/valueadded/hotel/search',
		hotelCanBook: 'http://ass.test.myamap.com/ws/valueadded/hotel/hotel_avail',
		tuangou:'http://ass.test.myamap.com/ws/valueadded/groupbuy/search',
		nearestShop:'http://ass.test.myamap.com/ws/valueadded/cms/tuan-shop?version=2.0',
		nearbyTuanType:'http://ass.test.myamap.com/ws/valueadded/cms/tuan-search?version=2.0',
		nearbyFoodType:'http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11',
		nearbyRoomType:'http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11',
		trafficSearch:'http://ass.test.myamap.com/ws/mapapi/poi/bus/?version=2.0',
		aroundPoi:'http://ass.test.myamap.com/ws/mapapi/poi/recommend/?version=2.0',
		send2car:'http://sns.test.myamap.com/ws/archive/sendtoX/',
		xiaomishu:'http://sns.test.myamap.com/ws/valueadded/dining/xiaomishu/',
		qqMovieContent:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_info',
		qqMovieTuan:'http://ass.test.myamap.com/ws/valueadded/cinema/cinema_info',
		qqMovieMore:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_price',
		qqMoviePicList:'http://ass.test.myamap.com/ws/valueadded/deepinfo/pic_list',
		qqMovieDate:'http://ass.test.myamap.com/ws/valueadded/cinema/movie_tickets',
		activity_getVCodeUrl:'http://sns.test.myamap.com/ws/auth/request-verifycode/',
		activity_verifyVCodeUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/validate-code/',
		activity_getSignInfoUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/query/',
		activity_signArriveUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/action/',
		activity_exchangeFlowUrl:'http://sns.test.myamap.com/ws/valueadded/telecom/checkin/exchange/'
	},
test_env_end */
/* public_env_start
	KomoviePrefix:'http://m.komovie.cn/buyticket.php?access=amap&qid=',
	shareUrl: 'http://wb.amap.com/channel/poishare?',
	activityUrl: {
		hotel: 'http://wap.amap.com/activity/hotel_banner.html?poi=1'
	},
	aosPrefixUrl:{
		baseUrl:'http://m5.amap.com/ws/valueadded/deepinfo/search?cms_ver=4',
		hotelSearch: 'http://m5.amap.com/ws/valueadded/hotel/search',
		hotelCanBook: 'http://m5.amap.com/ws/valueadded/hotel/hotel_avail',
		tuangou:'http://m5.amap.com/ws/valueadded/groupbuy/search',
		nearestShop:'http://s.amap.com/ws/valueadded/cms/tuan-shop?version=2.0',
		nearbyTuanType:'http://s.amap.com/ws/valueadded/cms/tuan-search?version=2.0',
		nearbyFoodType:'http://s.amap.com/ws/mapapi/poi/info/?version=2.11',
		nearbyRoomType:'http://s.amap.com/ws/mapapi/poi/info/?version=2.11',
		trafficSearch:'http://s.amap.com/ws/mapapi/poi/bus/?version=2.0',
		aroundPoi:'http://ass.amap.com/ws/mapapi/poi/recommend/?version=2.0',
		send2car:'http://sns.amap.com/ws/archive/sendtoX/',
		xiaomishu:'http://sns.amap.com/ws/valueadded/dining/xiaomishu/',
		qqMovieContent:'http://m5.amap.com/ws/valueadded/cinema/movie_info',
		qqMovieTuan:'http://m5.amap.com/ws/valueadded/cinema/cinema_info',
		qqMovieMore:'http://m5.amap.com/ws/valueadded/cinema/movie_price',
		qqMoviePicList:'http://m5.amap.com/ws/valueadded/deepinfo/pic_list',
		qqMovieDate:'http://m5.amap.com/ws/valueadded/cinema/movie_tickets',
		activity_getVCodeUrl:'http://sns.amap.com/ws/auth/request-verifycode/',
		activity_verifyVCodeUrl:'http://sns.amap.com/ws/valueadded/telecom/checkin/validate-code/',
		activity_getSignInfoUrl:'http://sns.amap.com/ws/valueadded/telecom/checkin/query/',
		activity_signArriveUrl:'http://sns.amap.com/ws/valueadded/telecom/checkin/action/',
		activity_exchangeFlowUrl:'http://sns.amap.com/ws/valueadded/telecom/checkin/exchange/'
	},
public_env_end */
	connect:function(){
		var act = arguments[0];
		if(typeof(act) == 'object') {
			Matrix.action = {
				send:function(arg){
					arg = JSON.stringify(arg);
					if (arguments[1]){
						window.jsInterface.invokeMethod('send', [arg, arguments[1]]);
					}else{
						window.jsInterface.invokeMethod('send', [arg]);
					}
				}
			}
			Matrix.init();
		}else{
			window.ampTpl = act;
			document.addEventListener('DOMContentLoaded', Matrix.connect, false);
		}
	},init:function(){
		switch(window.ampTpl){
			case 'index':
				var realAction = this.action;
				realAction.send({"action":"registerCallback"}, "callback");
				realAction.send({"action":"getFavoriteMark","_action":"setFavoriteMark"});
				realAction.send({"action":"getExtraUrl"});
				realAction.send({"action":"getPoiInfo"});
				break;
			case 'intro':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Page.exIntro();
				break;
			case 'picture': // 大图页面
				Page.picture.createHtml();
				break;
			case 'piclist':
				Page.exPiclist();
				break;
			case 'dinningMenu':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Action.act('networkInfo');
				break;
			case 'tuangou'://入口：客户端团购列表			
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Matrix.action.send({"action":"tuanGou","_action":"tuanGou"});
				break;
			case 'tuangouFromLink'://入口：“附近推荐”中团购链接
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Action.getTuangouInfo(Storage("tuan.tuangouID"),Storage("tuan.mergeID"),Storage("tuan.src_type"));
				break;
			case 'discount':
				Page.exDiscount();
				break;
			case 'comments': // 评论页面
				Page.comment.exComment();
				break;
			case 'streetdetail':
				StreetView.showData();
				break;
			case 'data2car':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Page.exData2car();
				break;
			case 'room': // 酒店更多报价页面
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Page.hotel.aosRequest(true);
				break;
			case 'data2dinning':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Page.exData2dinning();
				break;
			case 'cardecline':
				Page.exCarDecline();
				break;
			case 'carbrand':
				Page.exCarBrand();
				break;
			case 'carserial':
				Page.exCarSerial();
				break;
			case 'carpiclist':
				Page.exCarpiclist();
				break;
			case 'cardetail':
				Page.exCarDetail();
				break;
			case 'activity':
				Page.exActivitylist();
				break;
			case 'travel':
				Page.exTravel();
				break;
			case 'calendar': // 酒店日期选择页面
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Matrix.action.send({"action":"openHotelCalendar", _action: 'openHotelCalendar'});
				break;
			case 'golfDetail'://高尔夫详情
				Matrix.action.send({"action":"registerCallback"}, "callback");
				Page.exGolfDetail();
				break;
			case 'phoneAd':
				Action.registShareBtn();
				break;
			case 'activity_entrance':
				entrance.init();
				break;
			case 'activity_phoneVerify':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				verify.init();
				break;
			case 'activity_signArrive':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				signArrive.init();
				break;
			case 'activity_exchange':
				Matrix.action.send({"action":"registerCallback"}, "callback");
				exchange.initExchangePage();
				break;
			case 'movieSeats':
				var movieDateS = Storage('movieDate') || '{}';
				var _movieDate = $.parseJSON(movieDateS) ;
				var _pushPara = Storage('pushPara');
				var pushpara = _pushPara.split(',');
				Page.pushMovieSeat(pushpara,'#MovieInfoSeats',_movieDate);
				break;
			case 'movieDetail': // 电影详情页
				this.action.send({"action":"registerCallback"}, "callback");
				if( Storage('movie.detail.from') == 'poi' ) {// 从详情页面进入的
					Action.getMovieInfo( Storage('movieID') );
				}else{
					this.action.send({action: 'openMovieDetail', _action: 'openMovieDetail'});
				}
				break;
			case 'movieShowings': // 电影排期
				this.action.send({"action":"registerCallback"}, "callback");
				this.action.send({action: 'openMovieShowings', _action: 'openMovieShowings'});
				break;
			case 'movieTuan': // 电影 团购、兑换券
				this.action.send({"action":"registerCallback"}, "callback");
				Action.getMovieInfoTuan( Storage('pageId') );
				var params = [
					{poiid: Storage('pageId'), sign: 1},
					{pagenum: 1},
					{pagesize: 2},
					{custom: 'sort_rule=2'},
					{classify: '0'}
				];
				Matrix.action.send({action: 'aosrequest', _action: 'movieTuanList',
					params: params, urlPrefix: Matrix.aosPrefixUrl.nearbyTuanType,
					method: 'POST', poiInfo: ''});
				break;
			case 'movieQuan': // 电影 兑换券
				Page.movieQuan();
				break;
			case 'movieMorePrice': // 电影 更多报价
				this.action.send({"action":"registerCallback"}, "callback");
				Action.getMovieInfoMore(Storage('pageId'), Storage('movieID'), Storage('ticketID'));
				break;
			default:
				break;
		}
		//log 日志信息记录
		Log.startLog();
	},
	//从客户端返回数据处理
	callback:function(){
		if (arguments[1]._action){
			var arg = arguments[1];
		}else if (arguments[0]._action){
			var arg = arguments[0];
		}else{
			return;
		}

        debugInfo("split","==============================================");
        debugInfo("info",arg);

        switch (arg._action){
			case 'setMyLocation':		// 传递我的位置信息
                break;

			case 'setMapPoint':			// 传递地图选点信息

                break;
            case 'setPoiInfo':			// 传递poi点信息
				if(Matrix.poiInfo) break;
				Matrix.poiInfo = arg.poiInfo;
				Matrix.favInfo = arg.favInfo;
				// 不是从地图来的室内地图不再显示室内地图按钮
				Matrix.indoor = arg.indoor == '1';
				Page.showClientData(arg._action);
				if (arg.poiInfo.poiid){
					Matrix.pageId = arg.poiInfo.poiid;
					Matrix.getPoiData(Matrix.pageId);
					localStorage.setItem('pageId', Matrix.pageId);
				}else{
					Matrix.noPoiid=true;//不存在poiid标志
					//显示电话
					if(Action.showPoiPhone){//因方法走不到showCmsData,因此在这里显示电话
						$('#phone').show();
					}
				}
				break;

			case 'setFavoriteMark': // 设置收藏状态
				//$('#poiNav a:last').toggleClass('favOn', arg.status).text(arg.status?"已收藏":"收藏");
				Matrix.favStatus=arg.status;
				Matrix.favInfo = arg.favInfo;
				if(!arg.status){
					$('#MyFavInfo,#MyFavPoint').hide();
				}else{
					Page.util.favInfoEvt();
				}
				break;

			case 'setPoiId':
				localStorage.setItem('pageId',arg.poiid);
				break;

			case 'setAmapUserId':
				var wapurl = arg.extra.urlPrefix + arg.userid,noappurl="";
				Action.getAppPara(noappurl,noappurl,wapurl);
				break;

			case 'getExtraUrl':
				Matrix.dic=arg.dic;
				Matrix.extraUrl='&div='+arg.div+'&dic='+arg.dic+'&dip='+arg.dip+'&diu='+arg.diu+'&cifa='+arg.cifa;
				break;

			case 'setPoiData': // 联网获取poi数据
debugInfo('setPoiData',arg.content.trim(),false,"iddictionary","id");
				var poiData = $.parseJSON(arg.content.trim());
				if (poiData && poiData.code && poiData.code==1&&poiData.poiinfo){
					localStorage.setItem(Matrix.pageId, JSON.stringify(poiData.poiinfo));
debugInfo('poiData1',poiData,true,['rti','car_bitauto_api','query_price_list']);
					Page.showCmsData();
				}else{
					$("#poiFace > a > img").attr("src","attach/images/empty.png").css({'background-image':'url(attach/images/img_default.png)','background-color':'#f8f8f8','background-size':'50px'});
					$('#exIntro').hide();
					if(Action.showPoiPhone){//POI数据获取不到时，假如客户端推送来的数据中有电话等信息，显示出来
						$('#phone').show();
					}
					if(Action.showPanorama){
						$('#StreetViewImage').show();	
					}
				}
				break;
			case 'setPanoramaImage': // 获取街景/全景数据
				Page.showPanoramaData(arg.content.trim());
				break;
			case 'setNearBusData': //附近公交站点
				Page.showNearBusData(arg.content);
				break;
			case 'setMapLocation':
                debugInfo("split","==============================================");
                debugInfo("info",arg);

				break;
			case 'setFeatureList':
				var data = $.parseJSON(arg.content.trim());
				break;
			case 'networkInfo':
				Page.exGallery(arg.type);
				break;
			case 'openHotelCalendar': // 日期控件页面客户端返回信息
				debugInfo("info",arg);
				break;
		 	case 'freshRoomData': // 酒店日期更新操作
				Page.hotel.aosRequest();
				break;
			case 'hotelSearchBack': // 酒店页面按日期查询结果
				Page.hotel.searchResult(arg);
				break;
			case 'hotelRoomList': // 酒店更多报价页面查询结果
				Page.hotel.createRoomList(arg);
				break;
			case 'hotelCanBook': // 查询酒店是否可预订结果
				Page.hotel.canBookRes(arg);
				break;
			case 'tuanGou':
				Action.getTuangouInfo(arg.tuangouID,arg.mergeID,arg.src_type);
				break;
			case 'tuangouBack':
				Page.exTuangou($.parseJSON(arg.content.trim()));
				break;
			case 'getNearestShop':
				var lat =arg.lat,lon = arg.lon;
				var params=[];
				params.push({'tuanid':Storage("tuan.tuangouID"),'sign':1});
				params.push({'mergeid':Storage("tuan.mergeID"),'sign':1});
				params.push({'src':Storage("tuan.src_type"),'sign':1});
				params.push({'latitude':arg.lat,'sign':0});//纬度
				params.push({'longitude':arg.lon,'sign':0});//经度
				params.push({'pagesize':1,'sign':0});
				params.push({'pagenum':1,'sign':0});
				Matrix.action.send({'action':'aosrequest','_action':'nearestShopBack','params':params,'poiInfo':'','urlPrefix':Matrix.aosPrefixUrl.nearestShop,'method':'POST'});
				break;
			case 'nearestShopBack':
				Page.exNearestShop($.parseJSON(arg.content.trim()));
				break;
			case 'nearbyTuanBack':
				Page.showNearbyTuan($.parseJSON(arg.content.trim()));
				break;
			case 'nearbyFoodBack':
				Page.showNearbyFood($.parseJSON(arg.content.trim()));
				break;
			case 'nearbyRoomBack':
				Page.showNearbyRoom($.parseJSON(arg.content.trim()));
				break;
			case 'nearbyTrafficStationBack':
				Page.outputNearbyTrafficStation($.parseJSON(arg.content.trim()));
				break;
			case 'crossTrafficLinesBack':
				Page.showCrossTrafficLines($.parseJSON(arg.content.trim()));
				break;
			case 'activity_exchangeFlowCallBack':
				exchange.exchangeFlowCallBack($.parseJSON(arg.content.trim()));
				break;
			case 'activity_getExchangeVCodeCallBack':
				exchange.getExchangeVCodeCallBack($.parseJSON(arg.content.trim()));
				break;
			case 'activity_getSignInfoCallBack':
				signArrive.getSignInfoCallBack($.parseJSON(arg.content.trim()));
				break;
			case 'activity_signArriveCallBack':
				signArrive.signArriveCallBack($.parseJSON(arg.content.trim()));
				break;
			case 'activity_getVCodeCallBack':
				verify.getVCodeCallBack($.parseJSON(arg.content.trim()));
				break;
			case 'activity_verifyVCodeCallBack':
				verify.verifyVCodeCallBack($.parseJSON(arg.content.trim()));
				break;
			case 'movieInfo':
//debugInfo('movieInfo_arg', JSON.stringify( $.parseJSON(arg.content.trim()) ,null,'\t') );
				Page.exMovieDetail( $.parseJSON(arg.content.trim()) );
				break;
			case 'movieTuanList': // 电影 团购、兑换券页面团购列表
				Page.movieTuanList(arg);
				break;
			case 'movieInfoTuan': // 电影 团购、兑换券页面兑换券列表
				Page.movieInfoTuan(arg);
				break;
			case 'movieInfoMore': // 电影 更多报价页面
				Page.movieInfoMore(arg);
				break;
			case 'movieInfoDate':   //电影排期
				var movieDate = $.parseJSON(arg.content.trim());
//debugInfo('电影排期',movieDate)
				Storage('movieDate',arg.content.trim());
				if(movieDate && movieDate.code && movieDate.code == 1){
					var pushPara = Page.showMovieDate(movieDate);
					Storage('pushPara',pushPara);
//debugInfo('Matrix.poiSign',Matrix.poiSign)
					if (Matrix.poiSign) {
						//表示POI详情页的排期
						Page.pushMovieDate(pushPara,'#MovieInfo',movieDate);
					} else {
//debugInfo('pushMovieShowing','pushMovieShowing')
						Page.pushMovieShowing(pushPara,'#MovieInfoSpec',movieDate);
					}
				}
				break;
			case 'picListData':
//debugInfo('picListData_arg',arg.content);
				Page.util.jumpTo( arg.content );
				break;
			case 'movieInfoContentPic':
//debugInfo('movieInfoContentPic_arg',arg.content);
				break;
			case 'openMovieDetail': // 电影详情页
				Action.getMovieInfo( arg.movieID );
				break;
			case 'openMovieShowings': // 电影排期
//alert( JSON.stringify(arg) );
				Storage('pageId',arg.poiID);
				Action.getMovieDate(arg.poiID,arg.movieID,1);
				break;
			case 'showAlmm':
				Page.subcms.showAlmm($.parseJSON(arg.content.trim()));
				break;
			default:
		}
		//log 日志信息记录
		Log.startLog();
	},
	getPoiData:function(poiid){
//		var token='', poiDataString=localStorage.getItem(Matrix.pageId)||'{}';
//		var poiData = $.parseJSON(poiDataString);
//		if (poiData.token){
//			token = poiData.token;
//			Page.showCmsData();
//		}
//		var fetchUrl = Matrix.dataInfoPrefix + Matrix.pageId + '&token=' + token + '&' + Matrix.extraUrl;
//		Matrix.action.send({'action':'getHttpString','url':fetchUrl,'_action':'setPoiData'});
		var indexParms = [];
		indexParms.push({'poiid':poiid,'sign':1});
		indexParms.push({'mode':255,'sign':1});
		indexParms.push({'deepcount':1,'sign':0});
//		indexParms.push({'cms_ver':4,'sign':0});
		Matrix.action.send({'action':'aosrequest','_action':'setPoiData','params':indexParms,'poiInfo':'','urlPrefix':Matrix.aosPrefixUrl.baseUrl,'method':'GET','progress':'加载中'});
	},
	send:function(action){
		var realAction = Matrix.action;
		switch (action){
			case 'sendWeiBo': // 发表Weibo评论
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid,'sinaid':Matrix.Weibo.sinaID,'content':Matrix.Weibo.content}});
				break;
			case 'pageWeiBoList': // 此地热议（更多）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid,'cardid':'poistatuses','title':'此地热议'}});
				break;
			case 'pagePhotoList': // 此地图片（更多）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid,'cardid':'poiphoto','title':'热图'}});
				break;
			case 'pageUserList': // 此地用户（更多）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid,'cardid':'poiuser','title':'他/她们来过这里'}});
				break;
			case 'pageInfo': // 查看更多（poi点）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid,'title':'位置'}});
				break;
			case 'nearbyWeiBo': // 周边热议（更多）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid, 'cardid':'nearstatuses', 'title':'周边热议'}});
				break;
			case 'nearbyPhotoList': // 周边图片（更多）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid, 'cardid':'nearphoto'}});
				break;
			case 'nearbyPeople': // 周边用户（更多）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid, 'cardid':'nearuser'}});
				break;
			case 'nearbyPageInfo': // 查看更多（周边热议）
				realAction.send({'action':action,'data':{'pageid':Matrix.Weibo.pageid, 'title':'位置'}});
				break;
		//	case 'setFavoriteMark': // 收藏
		//		realAction.send({'action':action,'poiInfo':Matrix.poiInfo},Matrix.callback);
		//		break;
			case 'searchRoute':			// 路线规划
				realAction.send({'action':action,'poiInfo':Matrix.poiInfo,'pointType':'1'});
				break;
			case 'errorReport':			// 报告错误
				var typeToClient=0, poiNewType = {'150500':2,'150600':2,'150700':2};
				if (!!Matrix.poiNewType){
					switch(poiNewType[Matrix.poiNewType]){
						case 2:
							typeToClient=2;
							break;
						default:
							typeToClient=1;
					}
				}
				realAction.send({'action':action,'poiInfo':Matrix.poiInfo,'type':typeToClient});
				break;
			case 'openIndoorMap': // 打开室内地图
				realAction.send({'action':action,'indoorMapArray':Matrix.indoorMapData});
				break;
			case 'openPanorama': // 打开街景/全景视图
				realAction.send({'action':action,'poiInfo':Matrix.poiInfo,'data':Action.Panorama});
				break;
			case 'openBusLine': // 打开公交路线
				realAction.send({'action':action,'data':Matrix.busLineInfo});
				break;
			case 'openPoi': // 打开poi点
				realAction.send({'action':action,'poiInfo':Action.openPoi});
				break;
			case 'searchCategory': // 搜索分类
				realAction.send({'action':action,'poiInfo':Matrix.poiInfo,'category':Action.searchCategoryKey,'serviceType':Action.serviceType});
				break;
			case 'searchPoi': // 搜索周边 频道入口用
				realAction.send({'action':action,'data':Action.searchPoiKey});
				Log.userAction(Action.searchPoiKey.key);
				break;
			case 'logUserAction':
				var userAction = Matrix.userParas;
				realAction.send({'action':action,'poiInfo':Matrix.poiInfo, 'pageid':'1000', 'buttonid':userAction.btnid, 'para':userAction.para});
				// debug-code:
				var _poiInfoName = '-udf-';
				if( Matrix.poiInfo && Matrix.poiInfo.name ){
					_poiInfoName = Matrix.poiInfo.name;
				}
				new Image().src= 'http://group.myamap.com/duxing.ma/test/sigma.php?json=' + JSON.stringify( {'from':'andh','poiname':_poiInfoName,'para':userAction.para} ) + '&t='+(+new Date());//debug-duxing
				break;
			case 'mapControl':
				realAction.send({'action':action,'mapInfo':Action.mapControlObj});
				break;
			case 'aosrequest'://Matrix.clientInfo 是二级页面用不是主页面用
				realAction.send({'action':action,'params':Action.params,'poiInfo':Matrix.clientInfo,'urlPrefix':Action.aosReqUrl,'method':Action.method,'encrypt':1,'progress':'发送中...','goback':'1','alert':Action.alert});
				break;
			case 'getAmapUserId':
				realAction.send({'action':action,'_action':'setAmapUserId',extra:Action.ticketExtra});
				break;
			case 'getMapLocation':
				realAction.send({'action':action,'_action':'setMapLocation','forceReturnValue':0});
				break;
			case 'share':
				realAction.send({'action':action,'type':Action.shareType,'message':Action.shareMsg,'needShortUrl':Action.needShortUrl});
				break;
			case 'triggerFeature':
				realAction.send({'action':action,'feature':Action.featureNm,'poiInfo':Matrix.poiInfo});
				break;
			case 'getFeatureList':
				realAction.send({'action':action,'_action':'setFeatureList'});
				break;
			case 'showPanellist':
				realAction.send({'action':action,'list':Action.lists});
				break;
				// 我的卡券
			case 'showCard':
				realAction.send({'action':action,'list':Action.cardlist});
				break;
			case 'showLog':
				/*alert("吉友良");*/
				realAction.send({'action':action,'log':Action.logs});
				break;
				// 拨打客服电话
			case 'callPhone':
				realAction.send({'action':action,'phone':Action.phone});
				break;
			case 'networkInfo':
				realAction.send({'action':action,'_action':'networkInfo'});
				break;
			case 'callSMS':
				realAction.send({'action':action,'message':Action.message});
				break;	
			case 'shareToFriends':
				realAction.send({'action':action,'poiInfo':Action.poiInfo});
				break;
			default:
				realAction.send({'action':action,'poiInfo':Matrix.poiInfo});
		}
	}
}
callback=function(){
	Matrix.callback(null, arguments[0]);
}
//log 日志记录
var Log = {
	startLog:function(){
		var that = this;
		$('a[name],a[href],.more[name]').unbind('click.log').on('click.log' ,function(e){
			if( $(this) ){
				var href = $(this).attr("href");
				if(href){
					that.userAction(href);
				}else if($(this).attr('name')){
					that.userAction( $(this).attr('name') );
				}
				e.stopPropagation();
			}
		});
	},
	//category 哪个页面增加的日志,para记录的参数
	userAction:function(key,category){
		//发送请求给客户端
		category = category||window.ampTpl;
		if(category&&key){
			var lat=lon=new_type=adcode='';
			if(Matrix.poiInfo){
				 lat = Matrix.poiInfo.lat;
				 lon = Matrix.poiInfo.lon;
				 new_type=Matrix.poiInfo.new_type;
				 adcode=Matrix.adcode||'0';
			}
			Action.userAction({'page':category,'click':key,'lon':lon,'lat':lat,'poiid':Matrix.pageId,'new_type':new_type,'adcode':adcode});
		}
	}
}
//页面直接调用
var Action = {
	act:function(para){
		Matrix.send(para);
	},
	test:function(){
		$("#body").remove();
	},
	callSMS:function(){
		/*发送短信*/
		/*alert("发送短信");*/
		Action.message = "新年快乐";
		this.act("callSMS");
	},
	shareToFriends:function(){	/*分享*/
		/*alert("分享");*/
		var poiInfo =
			{
				"poiid": "B000123456",
				"name": "POI_NAME",
				"address": "POI_ADDRESS",
				"cityCode": "010",
				"poiType": "1",
				"new_type": "123456",
				"phoneNumbers": "010-12345678;010-87654321",
				"x": "poi_G20_x",
				"y": "poi_G20_y",
				"lon": "123.45678",
				"lat": "32.123"
			};
		
		var telArr=[];
		telArr.push(poiInfo);
		Action.poiInfo = poiInfo;
		/*console.log(telArr);*/
		/*alert(jsonTextpo);*/
		this.act("shareToFriends");	
	/*	alert(jsonText);
		console.log(">>>");*/
	},
	showLog:function(log){
		/*alert(log);*/
		Action.logs = log;
		this.act("showLog");
	},
	showPanellist:function(list){
		var telArr=[];
		$.each(list,function(i,item){
			if(typeof item =="object"){
				telArr.push(item);
			}else{//简易调用方式且兼容以前的调用
				if(typeof item =="number"){
					item=''+item;
				}
				telArr.push({title:item,content:item});
			}
		})
		console.log(telArr);
		Action.lists = telArr;
		this.act('showPanellist');
	},
	// 我的卡券
	showCard:function(list) {
		var cardArr = [];
		$.each(list,function(i,item){
			cardArr.push(item);
		})
		Action.cardlist = cardArr;
		this.act("showCard");
	},
	
	//拨打客服电话
	callPhone:function(json) {
		//alert(json.phone);
		Action.phone = "10086";
		this.act('callPhone');
	},
	
	/**
	 * 打开第三方页面.
	 * @param {String} iosh ios应用url，用于呼起应用
	 * @param {String} andh android应用url，用于呼起应用
	 * @param {String} wapUrl 已第三方网站形式打开页面的url
	 * @param {Object} showButton 可选，打开第三方页面时右上角显示按钮
	 *    buttonText: '更多报价', 按钮显示文字
	 *    localFile:'xxx.html', 点击此按钮打开的本地页面名称
	 *    otherUrl: 'www.xxx.xxx' 点击此按钮打开的其它页面url
	 *    localFile 和 otherUrl 只能一个有值另一个为空字符串
	 */
	getAppPara: function(iosh, andh, wapUrl, showButton) {
		var param = {
			action: 'openAppUrl', 'package': '', version: '',
			iosh: iosh || '',
			andh: andh || '',
			wapUrl: wapUrl || ''
		};
		if (typeof showButton == 'object') {
			param.showButton = showButton;
		}
		Matrix.action.send(param);
	},
	goGetTicket:function(url){
		Action.ticketExtra= {'urlPrefix':url};
		this.act('getAmapUserId');
	},
	data2Car:function(){
		$("#recipient").blur();
		$("#mobile").blur();
		$("#customname").blur();
		$("#description").blur();
		$("#vehicleKey").blur();
		var cartype = $('#recipient').val();
		if(cartype == -1){
			Page.util.showTip('请选择汽车品牌!');
			return;
		}
		var parms = [];
		parms.push({'type':2,'sign':0});
		parms.push({'action':2});
		var poidata = Matrix.clientInfo;
		if(!Action.ex2carData){
			Action.ex2carData = {};
		}
		Action.ex2carData.carType = $('#recipient').val();
		switch(cartype){
			case 'BYD':
				var tmpkey = $('#vehicleKey').val();
				if(!tmpkey.trim() || tmpkey.trim() == '请输入车牌号(必填)'){
					Page.util.showTip('请输入车牌号!');
					//$('#vehicleKey').focus();
					return;
				}else if(tmpkey.length >10){
					Page.util.showTip('请您输入正确的车牌号!','如：京N5TY28!');
					return;
				}
				parms.push({'recipient':7,'sign':1});
				parms.push({'account':tmpkey,'sign':0});
				Action.ex2carData.vehicleKey = tmpkey;
				break;
			case 'BULCK':
				var tmpname = $('#bcustomname').val();
				if(!tmpname.trim() || tmpname.trim() == '仅限VOICELINK用户使用'){
					Page.util.showTip('请输入用户名!');
					return;
				}else if(tmpname.length >100){
					Page.util.showTip('请输入正确的用户名!','不能超过100个字符');
					return;
				}
				parms.push({'recipient':8,'sign':1});
				parms.push({'account':tmpname,'sign':0});
				parms.push({'category':poidata.new_type,'sign':0});
				Action.ex2carData.bcustomname = tmpname;
				break;
			case 'Chevrolet':
				var tmpname = $('#xcustomname').val();
				if(!tmpname.trim()||tmpname.trim() == '仅限e路享用户使用'){
					Page.util.showTip('请输入用户名!');
					return;
				}else if(tmpname.length >100){
					Page.util.showTip('请输入正确的用户名!','不能超过100个字符');
					return;
				}
				parms.push({'recipient':9,'sign':1});
				parms.push({'account':tmpname,'sign':0});
				parms.push({'category':poidata.new_type,'sign':0});
				Action.ex2carData.xcustomname = tmpname;
				break;
			case 'BMW':
				var mobile = $('#bmwmobile').val();
				if(!mobile||mobile.length>32){
					Page.util.showTip('请输入正确的手机号!');
					return;
				}
				var des = $('#description').val();
				if(des.length>30&&des.replace(/[^\x00-\xff]/g, 'xx').length>60){
					Page.util.showTip('备注(可输入30个汉字)');
					return;
				}
				parms.push({'recipient':3,'sign':1});
				parms.push({'type':2,'sign':0});
				parms.push({'bmwact':'send_external','sign':0});
				parms.push({'account':mobile,'sign':0});
				parms.push({'poiid':poidata.poiid,'sign':0});
				if(des && des.trim() != '备注(可输入30个汉字)'){
					parms.push({'message':$('#description').val(),'sign':0});
				}
				Action.ex2carData.bmwMobile = mobile;
				break;
			case 'ds':
				var mobile = $('#bsmobile').val();
				if(!mobile.isMobile()){
					Page.util.showTip('请输入正确的手机号!');
					//$('#mobile').focus();
					return;
				}
				var des = $('#description').val();
				if(des.length>50&&des.replace(/[^\x00-\xff]/g, 'xx').length>100){
					Page.util.showTip('备注(可输入100个汉字)!');
					return;
				}
				parms.push({'recipient':11,'sign':1});
				parms.push({'vehicleKey':cartype,'sign':0});
				parms.push({'account':mobile,'sign':0});
				parms.push({'category':poidata.new_type,'sign':0});
				if($('#description').val().trim() && $('#description').val().trim() != '备注(可输入100个汉字)'){
					parms.push({'message':$('#description').val(),'sign':0});
				}
				Action.ex2carData.bsmobile = mobile;
				break;
			default:
				var mobile = $('#mobile').val();
				if(!mobile.isMobile()){
					Page.util.showTip('请输入正确的手机号!');
					return;
				}
				if($('#description').val().length>100){
					Page.util.showTip('备注长度不要超过100个字符!');
					return;
				}
				parms.push({'recipient':6,'sign':1});
				parms.push({'vehicleKey':cartype,'sign':0});
				parms.push({'account':mobile,'sign':0});
				parms.push({'category':poidata.new_type,'sign':0});
				if($('#description').val().trim() && $('#description').val().trim() != '备注(可输入100个汉字)'){
					parms.push({'message':$('#description').val(),'sign':0});
				}
				Action.ex2carData.mobile = mobile;
				break;
		}
		parms.push({'name':poidata.name,'sign':0});
		parms.push({'address':poidata.address,'sign':0});
		parms.push({'tel':poidata.phoneNumbers,'sign':0});
		parms.push({'longitude':poidata.lon,'sign':0});
		parms.push({'latitude':poidata.lat,'sign':0});
		localStorage.setItem('ex2carData',JSON.stringify(Action.ex2carData));
		Action.params = parms;
		Action.method = 'POST';
		Action.alert = {'success':'信息已发送','fail':'发送失败','admin':'1'};
		Action.aosReqUrl = Matrix.aosPrefixUrl.send2car;
		this.act('aosrequest');
	},
	data2dinning:function(){
		if(Matrix.sendStatus != undefined){
			Page.util.showTip('您已经提交成功!','请勿重复提交！');
			return;
		}
		var input = $('.form article input');
		var personNum = input.eq(0).val();
		if(!/^\d{1,2}$/.test(personNum)||parseInt(personNum)<=0){
			Page.util.showTip('请输入正确订餐人数！','最多两位数字！');
			return;
		}
		var personNm = input.eq(1).val();
		if(!personNm||personNm.trim() == '姓名'){
			Page.util.showTip('请填写预订人姓名','姓名不能为空!');
			return;
		}else if(personNm.length>10){
			Page.util.showTip('名字超长','不能超过10个字符！');
			return;
		}else if(!/^[\u4E00-\u9FA5]{1,10}$/.test(personNm)){
			Page.util.showTip('姓名文字有误','仅支持中文字符！');
			return;
		}
		var personMb = input.eq(2).val();
		if(!personMb.isMobile()){
			Page.util.showTip('手机号码错误','请输入正确的手机号码!');
			return;
		}
		if($('#description').val().trim().length>50){
			Page.util.showTip('备注超长','长度不能超过50个字符！');
			return;
		}

		var param = [];
		var pageId = localStorage.getItem('pageId');
		var poiDataString = localStorage.getItem(pageId);
		var poiData = $.parseJSON(poiDataString);
		var dict=poiData.idDictionaries||{};
		param.push({'resid':dict.dining_xiaomishu_id,'sign':1});
		param.push({'time':$('#dateBox').val()+$('#bookTime input').val().replace(':',''),'sign':0});
		param.push({'count':personNum,'sign':0});
		param.push({'bookname':personNm,'sign':0});
		param.push({'booktel':personMb,'sign':0});
		if($('#description').val().trim() && $('#description').val().trim() != '如：包间/大厅，无烟'){
			param.push({'note':$('#description').val(),'sign':0});
		}
		var exDinningData = {};
		exDinningData.mobile = personMb;
		exDinningData.personNm = personNm;
		localStorage.setItem('exDinningData',JSON.stringify(exDinningData));
		var clientString=localStorage.getItem('clientData');
		var clientData=$.parseJSON(clientString)||"{}";
		if (!clientData){return;}
		Matrix.clientInfo=clientData;
		Action.aosReqUrl = Matrix.aosPrefixUrl.xiaomishu;
		Action.params = param;
		Action.method ='POST';
		Action.alert = {'success':'发送成功,稍后商家会与您联系','fail':'发送失败,请您稍后重新提交','admin':'1'};
		Action.act('aosrequest');
	},
	openPanorama:function(id,type){
		Action.Panorama = {'type':type||'StreetView','panoid':id};
		this.act('openPanorama');
	},
	openPanoramaItem:function(id,lon,lat,pname,poiid,type){
		Matrix.poiInfo = {
			"poiid":poiid||'',
			"name":pname||'',
			"address":"",
			"cityCode":"010",
			"poiType":"1",
			"phoneNumbers":"",
			"x":'',
			"y":'',
			"lon":lon||"",
			"lat":lat||""
		};
		Action.Panorama = {'type':type||'StreetView','panoid':id};
		this.act('openPanorama');
	},
	openBus:function(x){
		Action.openPoi = Matrix.busStation[x];
		this.act('openPoi');
	},
	busLine:function(x){
		Matrix.busLineInfo = {'busLineid':Matrix.busLineId[x],'cityCode':Matrix.poiInfo.cityCode,'showType':1};
		this.act('openBusLine');
	},
	searchPoi:function(key){
		Action.searchPoiKey = {'key':key,'title':key};
		this.act('searchPoi');
	},
	openAroundPoi:function(poiid){
		Action.openPoi = Page.aroundPoi[poiid];
		this.act('openPoi');
	},
	searchCategory:function(cate,serviceType){
		Action.searchCategoryKey = cate;
		Action.serviceType=serviceType;
		this.act('searchCategory');
	},
	//日志统计
	userAction:function(para,btnid){
		Matrix.userParas = {'btnid':btnid||1, 'para':JSON.stringify(para)};
		this.act('logUserAction');
	},
	//控制地图的通用接口
	mapControl:function(x,y,level){
		Action.mapControlObj = {'x':x,'y':y,'level':level};
		this.act('mapControl');
	},
	//分享，type 分享的类型
	share:function(type,message,needShortUrl){
		Action.shareType = type;
		Action.shareMsg = message;
		Action.needShortUrl=needShortUrl;
		this.act('share');
	},
	//公用方法,客户端根据不同的feature name 触发不同的跳转
	triggerFeature:function(feature){
		Action.featureNm = feature;
		this.act('triggerFeature');
	},
	//openPoiinfo
	openPoiInfo:function(poiid,poiname,address,citycode,newtype,tel,lon,lat){
debugInfo('poi',poiid+','+poiname+','+address+','+citycode+','+newtype+','+tel+','+lon+','+lat);
		Action.openPoi = {
			"poiid":poiid||'',
			"name":poiname||'',
			"address":address||'',
			"cityCode":citycode,
			"poiType":1,
			"new_type":newtype,
			"phoneNumbers":tel||'',
			"x":'',
			"y":'',
			"lon":lon,
			"lat":lat
		}
		this.act('openPoi');
	},
	getTuangouInfo:function(tuangouID,mergeID,src_type){
		//新传入的团购参数，将其保存在localstorage中，在查询最近分店时需要使用到
		this.saveTuangouParams(tuangouID,mergeID,src_type);
		var params = [];
		params.push({'mergeid':mergeID,'sign':1});
		params.push({'groupid':tuangouID,'sign':1});
		params.push({'src_type':src_type,'sign':1});
		Matrix.action.send({'action':'aosrequest','_action':'tuangouBack','params':params,'poiInfo':'','urlPrefix':Matrix.aosPrefixUrl.tuangou,'method':'POST','progress':'加载中'});
	},
	saveTuangouParams:function(tuangouID,mergeID,src_type){
		Storage("tuan.tuangouID",tuangouID);
		Storage("tuan.mergeID",mergeID);
		Storage("tuan.src_type",src_type);
	},
	// 注册右侧分享按钮
	registShareBtn: function() {
		var content = this.getShareContent();
		Matrix.action.send({
			action: 'registRightButton',
			type: 'share',
			buttonText: '分享',
			'function': {action: 'share', content: content, urlType: '1'}
		});
	},
	//电影详情页内容
	getMovieInfo:function(movieID){
		var params = [];
		params.push({'movieid':movieID,'sign':1});
		Matrix.action.send({'action':'aosrequest','_action':'movieInfo','params':params,'urlPrefix':Matrix.aosPrefixUrl.qqMovieContent,'method':'POST','progress':'加载中'});
	},
	//电影团购兑换
	getMovieInfoTuan:function(poiID){
		var params = [];
		params.push({'poiid':poiID,'sign':1});
		Matrix.action.send({'action':'aosrequest','_action':'movieInfoTuan','params':params,'urlPrefix':Matrix.aosPrefixUrl.qqMovieTuan,'method':'POST','progress':'加载中'});
	},
	//电影更多报价
	getMovieInfoMore:function(poiID,movieID,ticketID){
		var params = [];
		params.push({'poiid':poiID,'sign':1},{'movieid':movieID,'sign':1},{'ticketid':ticketID,'sign':1});
		Matrix.action.send({'action':'aosrequest','_action':'movieInfoMore','params':params,'urlPrefix':Matrix.aosPrefixUrl.qqMovieMore,'method':'POST','progress':'加载中'});
	},
	//电影排期
	getMovieDate:function(poiID,movieID,mode){
		var params = [];
		params.push({'poiid':poiID,'sign':1},{'movieid':movieID,'sign':1},{'mode':mode});
		Matrix.action.send({'action':'aosrequest','_action':'movieInfoDate','params':params,'urlPrefix':Matrix.aosPrefixUrl.qqMovieDate,'method':'POST'});
	},
	//获取图片列表
	getPicListData:function( mode, poiID, itemID ){
		var params = [{'mode':mode,'sign':1}];
		if( itemID ){
			params.push({'itemid':itemID});
		}
		if( poiID ){
			params.push({'poiid':poiID});
		}
		Matrix.action.send({'action':'aosrequest','_action':'picListData','params':params,'urlPrefix':Matrix.aosPrefixUrl.qqMoviePicList,'method':'POST','progress':'加载中'});
	},
	//电影详情页内容图片列表
	getMovieContentPic:function(itemID,mode){
		var params = [];
		params.push({'itemid':itemID},{'mode':mode,'sign':1});
		Matrix.action.send({'action':'aosrequest','_action':'movieInfoContentPic','params':params,'urlPrefix':Matrix.aosPrefixUrl.qqMoviePicList,'method':'POST','progress':'加载中'});
	},
	// 打开附近的电影院
	openNearbyCinema: function(movieID) {
		Matrix.action.send({action: 'OpenNearbyCinema', movieID: movieID});
	},
	/**
	 * 获取分享的内容.
	 * @return {Array.<Object>} 分享接口使用的content参数
	 */
	getShareContent: function() {
		var url = 'a=1';
		var cont = [
			{type: 'weibo', message: '#用高德赚流量#免流量神马的都弱爆了，用高德地图，每天额外赚流量，签到就送30M，最高可得90M，欢乐点击领取：', title: '免费拿流量喽！', url: url},
			{type: 'weixin', message: '还不快来抢！白送你都不要？高德免费送流量，签到送30M，最高可获得90M！', title: '免费拿流量喽！', url: url},
			{type: 'pengyou', message: '', title: '快来抢！高德免费送流量！签到即送30M，最高可得90M', url: url}
		];
		return cont;
	}
}


