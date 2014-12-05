
$(document).ready(function(){
	
	$.ajax({
		url: 'staff.json',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		
		var output = "";
		for( var i in data) {
			output+="<staff class='" + data[i].rank + "'>" +
				"<span class='name'>" + i + "</span><br>" +
				"<span class='rank'>" + data[i].rdesc + "</span>" +
				"<span class='description'>" + ( data[i].desc || "" ) + "</span>" +
				"</staff>";
		}
		$("content #staff").append(output);

		$("content #staff staff").click(function(){
			if( anim( $(this) ) ) {
				setInfo( $(this).find(".name").text(),
					$(this).find(".rank").text(),
					$(this).find(".description").text(),
					$(this).css("background"));
			}
		});
		
	}).fail(function(){
		$("content #staff").append("Error loading ajax");
	});
	
	$("#staffinfo closebtn").click(function(){
		anim( $("staff.open"), true );
	});

});

function setInfo(name, rank, desc, colour) {
	$("#staffinfo #sname").text(name);
	$("#staffinfo #skin").attr("src", "http://minecraft-skin-viewer.com/body.php?u=" +
		name +"&s=300");
	$("#staffinfo #srank").text(rank);
	$("#staffinfo #sdesc").text(desc);
	$("#staffinfo #stdiv").css("background", colour);
}
function anim(fobj,reverse) {
	if( $("#staffinfo").hasClass("animd") ) {
		return false;
	}
	$("staff").removeClass("open");
	$(fobj).addClass("open");
	$("#staffinfo").addClass("animd").addClass("animt").addClass("open");
	if( !reverse ) {
		$("#sib").addClass("open");
	} else {
		$("#sib").removeClass("open");
	}
	var initCSS = {
		top: "50%",
		left: "50%",
		width: $("#staffinfo").css("width"),
		height: $("#staffinfo").css("height"),
		"border-top-left-radius": $("#staffinfo").css("border-top-left-radius"),
		"border-top-right-radius": $("#staffinfo").css("border-top-right-radius"),
		"border-bottom-left-radius": $("#staffinfo").css("border-bottom-left-radius"),
		"border-bottom-right-radius": $("#staffinfo").css("border-bottom-right-radius"),
		"-webkit-transform": $("#staffinfo").css("transform"),
		transform: $("#staffinfo").css("transform")
	};
	var targetCSS = {
		top: $(fobj).offset().top,
		left: $(fobj).offset().left,
		width: $(fobj).outerWidth(),
		height: $(fobj).outerHeight(),
		"border-top-left-radius": $(fobj).css("border-top-left-radius"),
		"border-top-right-radius": $(fobj).css("border-top-right-radius"),
		"border-bottom-left-radius": $(fobj).css("border-bottom-left-radius"),
		"border-bottom-right-radius": $(fobj).css("border-bottom-right-radius"),
		"-webkit-transform": "translate(0,0)",
		transform: "translate(0,0)"
	};
	$("#staffinfo").css( reverse ? initCSS : targetCSS);
	setTimeout(function(){
		$("#staffinfo").addClass("anim");
		if( reverse ) {
		}
		setTimeout(function(){
			$("#staffinfo").css(reverse ? targetCSS : initCSS);
			if( !reverse ) {
				$("#staffinfo").removeClass("animt");
			}
			setTimeout(function(){
				$("#staffinfo").removeClass("anim").removeClass("animd");
				if( reverse ) {
					$("#staffinfo").removeClass("open").removeClass("animt");
					$("staff").removeClass("open");
					$("#staffinfo").css(initCSS);
				}
			},500);
		},10);
	},10);
	return true;
}