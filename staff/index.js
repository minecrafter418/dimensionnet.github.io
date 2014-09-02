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
				"<span class='description'>" + data[i].desc + "</span>" +
				"</staff>";
		}
		$("#content #staff").append(output);
		
	}).fail(function(){
		$("#staff").append("Error loading ajax");
	});
	
});