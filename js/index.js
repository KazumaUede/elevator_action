$(function(){
	for (var i = 0; i < 6; i++){
		$('#elevator'+ i +' #1F').css({"background-color" : "yellow"});
	}
	var j = 1;
	var k = 1;
	var flug = true;
	function up_elevator(num,floor,time){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			$('#elevator'+ num +' #' + floor +'F').css({"background-color" : "blue"});
			$('#elevator'+ num +' #' + ++floor +'F').css({"background-color" : "yellow"});
			console.log(num);
			if(floor <13){
				up_elevator(num,floor,time);
			}else{
				down_elevator(num,floor,time);
			}
		},time);
	}
	function down_elevator(num,floor,time){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			$('#elevator'+ num +' #' + floor +'F').css({"background-color" : "blue"});
			$('#elevator'+ num +' #' + --floor +'F').css({"background-color" : "yellow"});
			console.log(num);
			if(floor >1){
				down_elevator(num,floor,time);
			}else{
				up_elevator(num,floor,time);
			}
		},time);
	}
	$(function(){
		up_elevator(0,j,1000);
		up_elevator(1,k,2000);
		up_elevator(2,k,3000);
		up_elevator(3,k,4000);
		up_elevator(4,k,5000);
		up_elevator(5,k,6000);
	});
});

















$(function(){
	var appendhtml = "";
	$(document).on('click','#button',function(){
		event.preventDefault();
		$.ajax({
			url:"index.php",
			data: {
				d_station: $("select[name='d_station']").val(),
				a_station: $("select[name='a_station']").val(),
					 send: $("input[name='send']").val(),
			},
			//json形式
			dataType: 'json',
			type: "POST"
		}).done(function(response) {
			// $('tr').remove();
			$('.routes').remove();
			var appendhtml;
			console.log(response);
			var station_name;
			appendhtml = '<div class="routes">'  + response + '</div>';
			$('.result').append(appendhtml)
		}).fail(function() {
			alert("通信エラー");
		});
	});

});
