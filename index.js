
$(document).ready(function(){

	var s = Snap("#tdn-logo");
	Snap.load("/assets/tdn.svg", function(f) {
		s.append(f);
	});

});