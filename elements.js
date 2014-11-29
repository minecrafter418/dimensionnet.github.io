
//do not load this script if you have jquery.js!
//it will be loaded automatically. You can disable
//that by doing <html nej>

var canAddV = false;
var isLoaded = false;
$(document).ready(function(){

	//resources that should be present on every page
	$("head").append("<link rel='stylesheet' href='/default.css' type='text/css'>");
	$("head").append("<script src='/snapsvg.js' type='text/javascript'></script>");
	$("head").append("<meta name='viewport' content='initial-scale=1, maximum-scale=1'>")

	var ob = $("body").html();
	$("body").empty();
	$("body").append("<content>" + ob + "</content>");

	var loadedHeader = false;
	var loadedFooter = false;
	function checkLd() {
		if( loadedHeader && loadedFooter ) {
			canAddV = true;
			if( isLoaded ) {
				$("body").addClass("vsb");
			}
			
			//event handlers
			$("tabgroup tab").click(function(e){
				var t = new teleport(e.pageX, e.pageY,function(){
				});
				t.start();
				setTimeout(function(){
					$("body>*:not(#teleport)").remove();
					t.stop();
					setTimeout(function(){
						document.location = $(this).attr("href") || "/";
					},1000);
				},500);
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
		$("body").prepend("<div id='err'>Failed to load header</div>");
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
		$("body").append("<div id='err'>Failed to load footer<br>Still &copy; Creeper32605 though</div>");
		loadedFooter = true;
		checkLd();
	});
	
});

$(window).load(function(){
	isLoaded = true;
	if( canAddV ) {
		$("body").addClass("vsb");
	}
});

var teleport = function ( x, y, callback ) {

	x = x || $(window).width() / 2;
	y = y || $(window).height() / 2;

	$("body").append("<svg id='teleport'></svg>");

	var t = Snap("svg#teleport");

	//put a fancier animation here but this one should do for now
	//#9c27b0
	var bgc = t.circle(x,y, 0).attr({
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
				},250);
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

	this.start = function(){
		bgc.animate({
			//yeah skrubs I learnt how to Pythagorean Theorem - a^2 = b^2 + c^2
			r: Math.sqrt( Math.pow( $(window).width(), 2) + Math.pow( $(window).height(), 2))
		},100);
		cb = true;
		createblobs();
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