
$(document).ready(function(){

	$("head").append("<link rel='stylesheet' href='/default.css'>");

	var originalbody = $("body").html();
	$("body").empty();

	$.ajax({
		url: '/header.html',
		type: 'get',
		async: 'false'
	}).done(function(data){
		$("body").append(data);
		$("body").append("<div id='content' class='start'>" + originalbody + "</div>");
		$.ajax({
			url: '/footer.html',
			type: 'get',
			async: 'false'
		}).done(function(data){
			$("body").append(data);
		});
	});



});

$(window).load(function(){
	setTimeout(function(){
		$("header").css("animation","headerstart 1s cubic-bezier(.2,.3,0,1)");
		$("#logo").css("height","100pt");
		$("#logo").css("top","60pt");
		var currentScrollTop = $(window).scrollTop();
		$(window).scrollTop(0);
		$(window).scroll();
		setTimeout(function(){
			$("#background").css("animation","bgstart .8s cubic-bezier(.2,.3,0,1)");
			$("header").removeClass("start");
			setTimeout(function(){
				$("#content").css("animation","contentstart 2s cubic-bezier(.2,.3,0,1)");
				setTimeout(function(){
					$("#content").removeClass("start");
					setTimeout(function(){
						$(window).scroll();
						setTimeout(function(){
							$('html, body').animate({
								scrollTop: currentScrollTop,
								easing: 'easeOutExpo'
							},1000);
						},100);
					},500);
				},100);
			},100);
		},100);
	},1000);
});

$(window).scroll(function(){
	if( $("#content").offset().top - $(window).scrollTop() < 200 ) {
		$("#background").addClass("bar");
		$("#background").css("top", - ($("#content").offset().top / 2 -  100));
		$("#background").css("clip","rect(0px,10000px," + ($("#content").offset().top / 2 + 100 ) + "px,0px)");
	} else {
		$("#background").removeClass("bar");
		$("#background").css("top", -($(window).scrollTop() / 2) );
		$("#background").css("clip","");
	}
});

$(window).resize($(window).scroll());