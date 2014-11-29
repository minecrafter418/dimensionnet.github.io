
$(document).ready(function(){

	var s = Snap("#tdn-logo");
	Snap.load("/assets/tdn.svg", function(f) {
		for( var x = 0; x < 53; x++ ) {
			f.select("#b" + x ).attr({
				style: 'opacity: 0; -webkit-transform: rotate(' + ( 52 - x ) + 'deg);' +
					'transform: rotate(' + ( 52 - x ) + 'deg)' });
		}
		s.append(f);
	});

});

$(window).load(function(){

	var s = Snap("#tdn-logo");
	var itr = 0;
	(function loop() {
		s.select("#b" + itr ).animate({opacity: 1}, 100).attr({
				style: '-webkit-transform: rotate(0deg);' +
					'transform: rotate(0deg)'
		});
		if( itr < 53 ) {
			setTimeout(loop,20);
		}
		itr++;
	})();

});