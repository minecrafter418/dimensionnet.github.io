
$(document).ready(function(){
	
	$("head").append("<link rel='stylesheet' type='text/css' href='/default.css'>");
	
	$.ajax({
		url: '/files/header.html',
		type: 'get',
		async: false
	}).done(function(data){
		$("body").prepend(data);
		$( "tab#" + $("body").attr("id") ).addClass("selected");
		var biggerSize = $(window).width();
		var smallerSize = $(window).height();
		if( $(window).height() > $(window).width() ) {
			biggerSize = smallerSize;
			smallerSize = $(window).width();
		}
		$("#load").css("width", biggerSize * 3 )
		.css("height", biggerSize * 3 )
		.css("top","50%").css("left","50%");
	});
	
	$.ajax({
		url: '/files/footer.html',
		type: 'get',
		async: false
	}).done(function(data){
		$("body").append(data);
		positionElements();
	});
	
	
	$("a").click(function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		$("body").prepend("<div id='teleport'></div>");
		$("#teleport").css("top", e.pageY)
		.css("left", e.pageX)
		.css("transition", "all 1s cubic-bezier(.2,.3,0,1)");
		setTimeout(function(){
			var biggerSize = $(window).width();
			var smallerSize = $(window).height();
			if( $(window).height() > $(window).width() ) {
				biggerSize = smallerSize;
				smallerSize = $(window).width();
			}
			$("#teleport").css("width", biggerSize * 3 )
			.css("height", biggerSize * 3 );
			setTimeout(function(){
				window.location = href;
			},1000);
		},10);
	});
	
	$("#header #tabs tab").click(function(e){
		if( $(this).attr("href") ) {
			var href = $(this).attr("href");
			$("body").prepend("<div id='teleport'></div>");
			$("#teleport").css("top", e.pageY)
			.css("left", e.pageX)
			.css("transition", "all 1s cubic-bezier(.2,.3,0,1)");
			setTimeout(function(){
				var biggerSize = $(window).width();
				var smallerSize = $(window).height();
				if( $(window).height() > $(window).width() ) {
					biggerSize = smallerSize;
					smallerSize = $(window).width();
				}
				$("#teleport").css("width", biggerSize * 3 )
				.css("height", biggerSize * 3 );
				setTimeout(function(){
					window.location = href;
				},1000);
			},10);
			
		} else if( $(this).attr("group") ){
			if( $("#header #tabs drop[group=" + $(this).attr("group") + "]").hasClass("visible") ) {
				$("#header #tabs drop[group=" + $(this).attr("group") + "]").removeClass("visible");
			} else {
				$("#header #tabs drop[group=" + $(this).attr("group") + "]").addClass("visible");	
			}
		}
	});
	
});

function positionElements() {
	
	if( $("body").height() > $(window).height() ){
		$("#footer").removeClass("fixed");
	} else {
		$("#footer").addClass("fixed");
	}
	
}

$(window).load(function(){
	positionElements();
	$("*").addClass("animated");
	$("#load").css("width",0).css("height",0);
});