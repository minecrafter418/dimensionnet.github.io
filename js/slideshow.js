
$(document).ready(function(){

	$("head").append("<link rel='stylesheet' href='/css/slideshow.css'>");

	var slideshow = function(jqnode) {
		var n = $(jqnode);
		$(n).find("sli").first().addClass("selected");
		$(n).find("sli").first().next().addClass("after");
		$(n).find("sli").last().addClass("before");
		this.next = function() {
			var d;
			if( $(n).find("sli.selected").next("sli").length ) {
				d = $(n).find("sli.selected").next("sli");
			} else {
				d = $(n).find("sli").first();
			}
			$(n).find("sli").removeClass("selected").removeClass("before").removeClass("after");
			if( d.prev("sli").length ) {
				d.prev("sli").addClass("before");
			} else {
				$(n).find("sli").last().addClass("before");
			}
			if( d.next("sli").length ) {
				d.next("sli").addClass("after");
			} else {
				$(n).find("sli").first().addClass("after");
			}
			d.addClass("selected");
		};
		this.before = function() {
			var d;
			if( $(n).find("sli.selected").next("sli").length ) {
				d = $(n).find("sli.selected").prev("sli");
			} else {
				d = $(n).find("sli").last();
			}
			$(n).find("sli").removeClass("selected").removeClass("before").removeClass("after");
			if( d.prev("sli").length ) {
				d.prev("sli").addClass("before");
			} else {
				$(n).find("sli").last().addClass("before");
			}
			if( d.next("sli").length ) {
				d.next("sli").addClass("after");
			} else {
				$(n).find("sli").first().addClass("after");
			}
			d.addClass("selected");
		};
	};

	$("slideshow").each(function(){
		var images = [];
		$(this).find("img").each(function(){
			images.push( $(this).attr("src") );
		});

		$(this).empty();

		var out = "";
		for( var x in images ) {
			out += "<sli><img src='" + images[x] + "'></sli>";
		}
		$(this).html(out);
		var sl = new slideshow(this);
		setInterval(function(){
			sl.next();
		},5000);
	});

});