//META{"name":"baloonPlugin"}*//
var baloonPlugin = function () {}

//------------------------------------------------
	var preDateTime;
	var filter = "bal{";
	// this.filter = "hoge";
	var balloonCssClass = '<style type="text/css">.balloon{ border-radius: 4px; background-color: #ccc; margin-left: 8px; padding: 8px; padding-top: 3px; padding-bottom: 3px; position: relative; }</style>';
	var balloonAfCssClass = '<style type="text/css">.balloon:after{ border-right: 6px solid #ccc; border-top: 6px solid transparent; border-bottom: 6px solid transparent; content: ""; margin-top: -5px; position: absolute; left: -6px; top: 50%;}</style>';

baloonPlugin.prototype.inject = function(){
	console.info("%c[BetterDiscord] %c baloonPlugin.inject()", "color: purple; font-weight: bold;");

	setTimeout(function(){
		$('div.markup').each(function() {
			if($('.balloon', this).length > 0){
				return;
			}
			var messageText = $(this).text();
			if(messageText.indexOf(filter) > -1){
				var array = messageText.split(filter);
				if(array[1]　!= ""){
					$(this).text(array[0]);
					// $(this).append('<div style="' + balloonCssRaw + ': ' + balloonAfCssRaw + '">' + array[1] + '</div>');
					$(this).append('<font class="balloon" color="#444444"/>');

					$('font', this).text(array[1]);
				}else{
					// $(this).append('<div style="' + balloonCssRaw + ': ' + balloonAfCssRaw + '">' + "・・・" + '</div>');
				}
			}
		});
	}, 500);
};

	function balloonJudgeAndCreate(message) {
		console.info("message = " + message);
		if(message.indexOf(pattern) > -1){
			
		}
	};
//------------------------------------------------


baloonPlugin.prototype.start = function () {
	$('head').append(balloonCssClass);
	$('head').append(balloonAfCssClass);

	preDateTime = new Date().getTime();
	this.inject();

};

baloonPlugin.prototype.load = function () {
	console.info("%c[BetterDiscord] %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
	console.info(
		"%c[BetterDiscord] ロードしたお. %c ",
		"color: purple; font-weight: bold;",
		"");
};

baloonPlugin.prototype.unload = function () {};

baloonPlugin.prototype.stop = function () {};

baloonPlugin.prototype.onMessage = function () {
	//called when a message is received
	console.info("onMessage だお");
	var messages = $('.messages').get(0);
	balloonJudgeAndCreate(messages);
	this.inject();
};

baloonPlugin.prototype.onSwitch = function () {
	//called when a server or channel is switched
	console.info(
		"%c[BetterDiscord] onSwitch %c ",
		"color: purple; font-weight: bold;",
		"");
	var currentTime = new Date().getTime();
	if(currentTime - preDateTime >= 2000){
		preDateTime = currentTime;
		this.inject();
	}
};

baloonPlugin.prototype.observer = function (e) {
	//raw MutationObserver event for each mutation
	console.info("MutationObserver だお");
	var currentTime = new Date().getTime();
	if(currentTime - preDateTime >= 2000){
		preDateTime = currentTime;
		this.inject();
	}
};

baloonPlugin.prototype.getSettingsPanel = function () {
	return "<h3>Settings Panel</h3>";
};

baloonPlugin.prototype.getName = function () {
	return "Balloon Plugin";
};

baloonPlugin.prototype.getDescription = function () {
	return "Balloon Plugin";
};

baloonPlugin.prototype.getVersion = function () {
	return "0.1.0";
};

baloonPlugin.prototype.getAuthor = function () {
	return "PM_Coffee";
};