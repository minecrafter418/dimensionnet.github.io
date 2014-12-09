
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
			var mh_percentage = 0;
			$("header").bind("touchstart", function(e){
				// only in "mobile" mode
				if( $(window).width() >= 900 ) {
					return;
				}
				if( $(window).height() <= 400 ) {
					if( e.target != $("header").get(0) &&
						e.target != $("header hamburger").get(0) ) {
						return;
					}
				}
				movingHeader = true;
				$("header").addClass("noanim");
				mh_starty = e.originalEvent.touches[0].pageY - $("header").height();
				if( $(window).height() <= 400 ) {
					mh_starty = e.originalEvent.touches[0].pageX - $("header").width();
				}
				if( $("header").hasClass("open") ) {
					mh_percentage = 0;
				} else {
					mh_percentage = 1;
				}
			});
			$(document).bind("touchmove", function(e){
				if( movingHeader ) {
					if( $(window).height() <= 400 ) {
						$("header").css("width", e.originalEvent.touches[0].pageX - mh_starty);
						mh_lasty = e.originalEvent.touches[0].pageX - mh_starty;
						mh_percentage = ( $("header").width() - 56 ) / ( $(window).width() - 56 );
						$("header").css("height", ($(window).height()-56) * mh_percentage + 56 );
					} else {
						$("header").css("height", e.originalEvent.touches[0].pageY - mh_starty);
						mh_lasty = e.originalEvent.touches[0].pageY - mh_starty;
						mh_percentage = ( $("header").height() - 56 ) / ( $(window).height() * 0.9 - 56 );
					}
					if( $(window).height() <= 400 ) {
						$("header #ptabs").css("opacity", mh_percentage );
						$("header").css("border-top-right-radius", 28 * (1 - mh_percentage))
						.css("border-bottom-right-radius", 28 * (1 - mh_percentage));
					} else {
						$("header #ptabs").css("opacity", mh_percentage )
						.css("bottom", ( 100 * ( 1 - mh_percentage ) ) + "px" );
						$("header #ptitle").css("opacity", 1 - mh_percentage )
						.css("bottom", ( 30 * ( 1 - mh_percentage ) - 12 ) + "px" );
					}

					$("header hamburger").css("transform","rotate(" + (180 * mh_percentage ) + "deg)");

					$("header hamburger #l1").css("transform","rotate(" + (45 * mh_percentage) + "deg)")
					.css("top", 5 * mh_percentage + 19 );
					$("header hamburger #l3").css("transform","rotate(" + (-45 * mh_percentage) + "deg)")
					.css("top", -5 * mh_percentage + 29 );
					$("header hamburger #l2").css("left", ( 9 * mh_percentage ) + 15 )
					.css("width", 18 * (1 - mh_percentage) );
				}
			}).bind("touchend", function(e){
				$("header").css("height","").css("width","")
				.css("border-top-right-radius","")
				.css("border-bottom-right-radius","");
				$("header #ptabs").css("opacity","").css("bottom","");
				$("header #ptitle").css("opacity","").css("bottom","");
				$("header hamburger").css("transform","");
				$("header hamburger *").css("transform","").css("top","").css("left","").css("width","");
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

	var kc = "38>38>40>40>37>39>37>39>66>65>";
	var kcl = false;
	var kph = "";
	var knd = false;
	var d = new teleport();
	$(document).keyup(function(e){
		if( knd ) {
			if( e.which == 38 ) {
				d.start();
			} else if( e.which == 40 ) {
				d.stop();
			}
			return;
		}
		if( kcl ) {
			kph += e.which + ">";
			if( kph == kc ) {
				console.log("woot");
				knd = true;
				var style = "@-webkit-keyframes rainbow" +
				"{0%{"+
				"color:#f00;fill:#f00;stroke:#ff0;}25%{"+
				"color:#ff0;fill:#ff0;stroke:#0ff;}50%{"+
				"color:#0ff;fill:#0ff;stroke:#00f;}75%{"+
				"color:#00f;fill:#00f;stroke:#f00;}100%{"+
				"color:#f00;fill:#f00;stroke:#ff0;}}" +
				"@keyframes rainbow" +
				"{0%{"+
				"color:#f00;fill:#f00;stroke:#ff0;}25%{"+
				"color:#ff0;fill:#ff0;stroke:#0ff;}50%{"+
				"color:#0ff;fill:#0ff;stroke:#00f;}75%{"+
				"color:#00f;fill:#00f;stroke:#f00;}100%{"+
				"color:#f00;fill:#f00;stroke:#ff0;}}" +
				"*{-webkit-animation:rainbow .5s infinite;animation: rainbow .5s infinite;";
				$("head").append("<style>" + style + "</style>");
			} else if( kc.indexOf(kph) > -1 ) {

			} else {
				kph = "";
				kcl = false;
			}
		}
		if( e.which == 38 && kcl === false ) {
			kcl = true;
			kph = "38>";
		}
	});


	lcns();
	
});

$(document).unload(function(){
	//hope this'll work
	var tpend = new teleport();
	tpend.start(true);
});

$(window).load(function(){
	isLoaded = true;
	if( canAddV ) {
		tpload.stop();
	}
});

var teleport = function ( noanim, x, y) {
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

var dialog = function() {

	var id = Math.floor( Math.random() * Date.now() * 693 );
	$("body").append("<es-dialog id='" + id + "'>" +
		"<esd-top><esd-title></esd-title></esd-top>" +
		"<esd-message></esd-message><esd-buttons></esd-buttons></es-dialog>");
	this.node = $("es-dialog#" + id);

	this.setTitle = function(text) {
		this.node.find("esd-title").text(text);
	};
	this.setText = function(text,centered) {
		this.node.find("esd-message").text(text);
		if( centered === true ) {
			this.node.addClass("mcent");
		} else if( centered === false ) {
			this.node.removeClass("mcent");
		}
	};

	this.open = function() {
		var node = this;
		setTimeout(function(){
			node.node.addClass("open");
		},10);
	};
	this.close = function() {
		var node = this;
		setTimeout(function(){
			this.node.removeClass("open");
		},10);
	};

};

var lens = false;
var lcns = function() {
	var index = "pFSfqBxAby7GS4QrpRhV1pLV4FuZGUcmy7dpm5KOEXZl7YsR4iBmojEyAWt7x1j8CWNsNRZM5OWLyrlqTMKPbWWwhGeD6XNpDPuL";
	
	var getLcn = function(code,callback) {
		try {
			$.ajax({
				url: "http://creeper32605.github.io/io/" + code,
				async: true,
				dataType: 'text'
			}).done(function(d){
				callback(d);
			}).fail(function(){
				callback(false);
			});
		} catch(err) {
			fail();
		}
	};

	var fail = function(){
		setTimeout(function(){
			$("body>*:not(.teleport)").remove();
			var ftp = new teleport();
			ftp.start();
			var diag = new dialog();
			diag.setTitle("Error");
			diag.setText("Website is under maintenance. Please try again later",true);
			diag.open();
		},270);
	};

	var _index = index;
	var iindex = 0;
	var indexes = [index];

	fail();
	(function lcnLoop(){
		return;
		getLcn(_index,function(d){
			if( d === false ) {
				fail();
			} else if( d.length == index.length ) {
				if( iindex > 3 ) {
					fail();
					return;
				}
				if( d == index ) {
					lens = true;
				}
				indexes.push(d);
				_index = d;
				iindex++;
				console.log( _index + " verified");
				lcnLoop();
			} else {
				fail();
			}
		});
	})();
};