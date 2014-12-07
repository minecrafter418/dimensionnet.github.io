
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

function getSkin(name) {
	var url;
	url = "http://minecraft-skin-viewer.com/body.php?u=" + name + "&s=300";
	//url = "http://skins.minecraft.net/MinecraftSkins/" + name + ".png";
	return url;
}

function setSkin(name) {
	var url = getSkin(name);
	$("#skin").attr("src", url);
	//fuck js canvas. It doesn't work eh
}

function setInfo(name, rank, desc, colour) {
	$("#staffinfo #sname").text(name);
	setSkin(name);
	$("#staffinfo #srank").text(rank);
	$("#staffinfo #sdesc").text(desc);
	$("#staffinfo #stdiv").css("background", colour);
}
function anim(fobj,reverse) {

	if( $("#staffinfo").hasClass("animd") ) {
		return false;
	}
	if( !reverse ) {
		$("#sib").addClass("open");
		$(fobj).morph("#staffinfo",500,{
			pname: $(fobj).find(".name")
		},{
			
		},true);
	} else {
		$("#sib").removeClass("open");
		$("#staffinfo").morph("staff.mr-hidden",500,{

		},{

		},true);
	}
	return true;
	//should work
	$("staff").removeClass("open");
	$(fobj).addClass("open");
	$("#staffinfo").addClass("animd").addClass("animt").addClass("open");
	if( !reverse ) {
		$("#sib").addClass("open");
	} else {
		$("#sib").removeClass("open");
	}
	var ism = false;
	if ( $(window).height() <= 500 ) { ism = true; }
	if( $(window).width() <= 700 ) { ism = true; }
	var initCSS = {
		top: ism ? "56px" : "50%",
		left: ism ? 0 : "50%",
		width: $("#staffinfo").css("width"),
		height: $("#staffinfo").css("height"),
		"border-top-left-radius": $("#staffinfo").css("border-top-left-radius"),
		"border-top-right-radius": $("#staffinfo").css("border-top-right-radius"),
		"border-bottom-left-radius": $("#staffinfo").css("border-bottom-left-radius"),
		"border-bottom-right-radius": $("#staffinfo").css("border-bottom-right-radius"),
		"margin-top": $("#staffinfo").css("margin-top"),
		"margin-left": $("#staffinfo").css("margin-left")
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
		"margin-top": 0,
		"margin-left": 0
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
				$("#staffinfo").removeClass("anim");
				if( reverse ) {
					$("#staffinfo").removeClass("open").removeClass("animt");
					$("staff").removeClass("open");
					$("#staffinfo").css(initCSS);
				}
				setTimeout(function(){
					$("#staffinfo").css({
						top: "",
						left: "",
						width: "",
						height: "",
						"border-top-left-radius": "",
						"border-top-right-radius": "",
						"border-bottom-left-radius": "",
						"border-bottom-right-radius": "",
						"margin-top": "",
						"margin-left": ""
					}).removeClass("animd");
				},10);
			},500);
		},10);
	},10);
	return true;
}