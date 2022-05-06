function randomWithLimit(max){
    return Math.floor(Math.random()*(max+1));
}

function getPoem(){
	var request = $.ajax({
		url: "/ww/poems",
		type: "GET",
		dataType: "json" 
	});

	request.done(function(data,status,jqXHR) {
		rand = randomWithLimit(data.length-1);
	
			var request = $.ajax({
				url: "/ww/poems/"+data[rand],
				type: "GET",
				dataType: "json" 
			});
			
			request.done(function(data,status,jqXHR) {
				$("#title").text(data.title);
				$("#text").text(data.text);					
				$("#author").text("Walt Whitman");
	
			});
								
			request.fail(function(jqXHR,status) {
				$("#author").text(":(");
				$("#author").click(function () {	
					$("#author").text(jqXHR.status);
				});
			});
		
	});
		
	
	request.fail(function(jqXHR,status) {
		$("#author").text(":(");
		$("#author").click(function () {	
			$("#author").text(jqXHR.status);
		});
	});
}

$(document).ready(function () {
	getPoem();
	$("#button").click(function () {
		getPoem();
	});
});