function randomWithLimit(max){
    return Math.floor(Math.random()*(max+1));
}

function getPoem(){
	var request = $.ajax({
		url: "/ww/poems",
		type: "GET",
		dataType: "json" 
	});

	request.done(function(poemList,status,jqXHR) {
		var rand, poemTitle, parsedTitle;

		do {
			rand = randomWithLimit(poemList.length-1);
			poemTitle = poemList[rand];
			parsedTitle = poemTitle.split("-");
		}while(parsedTitle[0] == "book");

		if(!poemTitle){
			console.error("No poem title found!: "+jqXHR.status);
			$("#author").text(":(");
			$("#author").click(function () {	
				$("#author").text(jqXHR.status);
			});
			return;
		}
			
		var request = $.ajax({
			url: "/ww/poems/"+poemTitle,
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