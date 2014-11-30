
//do not load this script if you have jquery.js!
//it will be loaded automatically. You can disable
//that by doing <html nej>

var canAddV = false;
var isLoaded = false;
var tpload;
$(document).ready(function(){

	//resources that should be present on every page
	$("head").append("<link rel='stylesheet' href='/default.css' type='text/css'>");
	$("head").append("<script src='/snapsvg.js' type='text/javascript'></script>");
	$("head").append("<meta name='viewport' content='initial-scale=1, maximum-scale=1'>");
	$("head").append(
		"<link rel='apple-touch-icon' sizes='57x57' href='/favicons/apple-touch-icon-57x57.png'>" +
		"<link rel='apple-touch-icon' sizes='114x114' href='/favicons/apple-touch-icon-114x114.png'>" +
		"<link rel='apple-touch-icon' sizes='72x72' href='/favicons/apple-touch-icon-72x72.png'>" +
		"<link rel='apple-touch-icon' sizes='144x144' href='/favicons/apple-touch-icon-144x144.png'>" +
		"<link rel='apple-touch-icon' sizes='60x60' href='/favicons/apple-touch-icon-60x60.png'>" +
		"<link rel='apple-touch-icon' sizes='120x120' href='/favicons/apple-touch-icon-120x120.png'>" +
		"<link rel='apple-touch-icon' sizes='76x76' href='/favicons/apple-touch-icon-76x76.png'>" +
		"<link rel='apple-touch-icon' sizes='152x152' href='/favicons/apple-touch-icon-152x152.png'>" +
		"<link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon-180x180.png'>" +
		"<meta name='apple-mobile-web-app-title' content='TDN'>" +
		"<link rel='shortcut icon' href='/favicons/favicon.ico'>" +
		"<link rel='icon' type='image/png' href='/favicons/favicon-192x192.png' sizes='192x192'>" +
		"<link rel='icon' type='image/png' href='/favicons/favicon-160x160.png' sizes='160x160'>" +
		"<link rel='icon' type='image/png' href='/favicons/favicon-96x96.png' sizes='96x96'>" +
		"<link rel='icon' type='image/png' href='/favicons/favicon-16x16.png' sizes='16x16'>" +
		"<link rel='icon' type='image/png' href='/favicons/favicon-32x32.png' sizes='32x32'>" +
		"<meta name='msapplication-TileColor' content='#9c27b0'>" +
		"<meta name='msapplication-TileImage' content='/favicons/mstile-144x144.png'>" +
		"<meta name='msapplication-config' content='/favicons/browserconfig.xml'>" +
		"<meta name='application-name' content='TDN'>");

	$("body").prepend("<!--[if IE]><script>killthisexploderthing()</script><![endif]-->");

	var ob = $("body").html();
	$("body").empty();

	
	$("body").append("<content>" + ob + "</content>");
	if( !$("head title").length ) {
		$("head").append("<title>TDN</title>");
	}

	var loadedHeader = false;
	var loadedFooter = false;

	tpload = new teleport(true);
	tpload.start();
	function checkLd() {
		if( loadedHeader && loadedFooter ) {
			canAddV = true;
			if( isLoaded ) {
				tpload.stop();
			}
			
			//event handlers
			$("tabgroup tab").click(function(e){
				
				if( e.button == 1 ) {
					var win = window.open( $(this).attr("href"), '_blank');
					win.focus();
					return;
				}
				var t = new teleport();
				t.start(e.pageX, e.pageY, true);
				var d = this;
				setTimeout(function(){
					$("body>*:not(#teleport)").remove();
					//t.stop();
					setTimeout(function(){
						document.location = $(d).attr("href") || "/";
					},10);
				},200);
			});
			$("header hamburger").click(function(){
				$("header").toggleClass("open");
			});
			$("footer").click(function(){
				$("footer").toggleClass("open");
			});

			var movingHeader = false;
			var mh_lasty = 0;
			var mh_starty = 0;
			$("header").bind("touchstart", function(e){
				// only in "mobile" mode
				if( $(window).width() > 900 ) {
					return;
				}
				movingHeader = true;
				$("header").addClass("noanim");
				mh_starty = e.originalEvent.touches[0].pageY - $("header").height();
			});
			$(document).bind("touchmove", function(e){
				if( movingHeader ) {
					$("header").css("height", e.originalEvent.touches[0].pageY - mh_starty);
					mh_lasty = e.originalEvent.touches[0].pageY - mh_starty;
				}
			}).bind("touchend", function(e){
				$("header").css("height","");
				$("header").removeClass("noanim");
				if( mh_lasty < ( $(window).height() / 100 * 45 ) ) {
					$("header").removeClass("open");
				} else {
					$("header").addClass("open");
				}
				movingHeader = false;
			});
		}
	}

	$.ajax({
		url: "/default/header.html",
		async: true
	}).done(function(data){
		$("body").prepend(data);
		loadedHeader = true;
		checkLd();
	}).fail(function(){
		$("body").prepend("<header id='err'>Failed to load header</header>");
		loadedHeader = true;
		checkLd();
	});

	$.ajax({
		url: "/default/footer.html",
		async: true
	}).done(function(data){
		$("body").append(data);
		loadedFooter = true;
		checkLd();
	}).fail(function(){
		$("body").append("<footer id='err'>Failed to load footer<br>Still &copy; Creeper32605 though</footer>");
		loadedFooter = true;
		checkLd();
	});
	
});

$(window).load(function(){
	isLoaded = true;
	if( canAddV ) {
		tpload.stop();
	}
});

var teleport = function ( noanim, x, y ) {
	x = x || $(window).width() / 2;
	y = y || $(window).height() / 2;

	var svgstyle = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9001;pointer-events:none;";

	var uid = Math.floor( Math.random() * 301 );

	$("body").append("<svg id='teleport' class='teleport" + uid + "' style='" + svgstyle + "'></svg>");

	var t = Snap("svg#teleport.teleport" + uid);

	//put a fancier animation here but this one should do for now
	//#9c27b0
	var bgc = t.circle(x,y, noanim ? 
		Math.sqrt( Math.pow( $(window).width(), 2) + Math.pow( $(window).height(), 2))
		: 0).attr({
		fill: '#280A2E'
	});

	var blob = function(x,y) {
		this.randomRotation = Math.floor(Math.random() * 360);
		this.randomDestination = Math.floor(Math.random() * $(window).width());
		this.style1 = '-webkit-transform-origin: ' + x + ' ' + y +
				';-webkit-transform: rotate(' + this.randomRotation +
				'deg);transform-origin: ' + x + ' ' + y +
				';transform: rotate(' + this.randomRotation + 'deg);';
		this.style2 = '-webkit-transform-origin: ' + x + ' ' + y +
				';-webkit-transform: rotate(' + this.randomRotation +
				'deg) translateX(' + this.randomDestination +
				'px);transform-origin: ' + x + ' ' + y +
				';transform: rotate(' + this.randomRotation +
				'deg) translateX(' + this.randomDestination + 'px);';
		this.node = t.circle(x,y, 0).attr({
			fill: '#9c27b0',
			style: this.style1
		});
		var b = this;
		setTimeout(function(){
			b.node.attr({
				style: b.style2
			});
			b.node.animate({
				r: 25
			} ,250, null, function(){
				b.node.animate({
					r: 0
				},250, function() {
					b.node.remove();
				});
			});
		},20);
	};

	var blobs = [];
	var cb = false;
	function createblobs(){
		for( var a = 0; a < 10; a++ ) {
			new blob( $(window).width() / 2, $(window).height() / 2);
		}
		if( cb )
			setTimeout(createblobs, 100);
	}

	this.start = function(x,y,noparticles){
		x = x || $(window).width() / 2;
		y = y || $(window).height() / 2;
		bgc.attr({
			cx: x,
			cy: y
		});
		bgc.animate({
			//yeah skrubs I learnt how to Pythagorean Theorem - a^2 = b^2 + c^2
			r: Math.sqrt( Math.pow( $(window).width(), 2) + Math.pow( $(window).height(), 2))
		},100);
		if( !noparticles ) {
			cb = true;
			createblobs();
		}
	};
	this.stop = function() {
		bgc.animate({
			r: 0
		},250,null,function(){
			cb = false;
			if( typeof(callback) == "function" ) {
				try {
					callback();
				} catch(err) {
					throw err;
				}
			}
		});
	};
};