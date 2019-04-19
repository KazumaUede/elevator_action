$(function(){
	for (var i = 0; i < 6; i++){
		$('#elevator'+ i +' #1F').css({"background-color" : "#f4d420"});
	}

	var flug = true;
	//エレベーターをあげる
	function up_elevator(num,floor,time,array){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			$('#elevator'+ num +' #' + floor +'F .people').appendTo('#elevator'+ num +' #' + (floor + 1) +'F')
			$('#elevator'+ num +' #' + floor +'F').css({"background-color" : "#26499d"});
			$('#elevator'+ num +' #' + ++floor +'F').css({"background-color" : "#f4d420"});
			//人を下ろす
			if(array.find(item => item === floor)){
				console.log('#people' + floor);
				$('#elevator'+ num +' #' + floor +'F #people' + floor).remove();

			}
			var timer = array.find(item => item === floor)? 5000 : 2000;
			// if(floor <13){
			// if(floor != array.slice(-1)[0]){
			if(floor < array.reduce((a,b)=>a>b?a:b)){
				// .reduce((a,b)=>a>b?a:b)
				console.log(floor);
				up_elevator(num,floor,timer,array);
			}else{
				console.log(floor);
				down_elevator(num,floor,timer);
			}
		},time);
	}
	//エレベーターを下げる
	function down_elevator(num,floor,time){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			$('#elevator'+ num +' #' + floor +'F').css({"background-color" : "#26499d"});
			$('#elevator'+ num +' #' + --floor +'F').css({"background-color" : "#f4d420"});
			if(floor >1){
				down_elevator(num,floor,2000);
			}else{
				setpeople(num,5000);
				// var ary = [];
				// ary = people();
				// console.log(ary);
				// notice_elevator(num,ary);
				// up_elevator(num,1,5000,ary);
			}
		},time);
	}
	//止まる階をオレンジで予告
	function notice_elevator(num,array){
		for(var i = 1; i < 14; i++){
			if(array.find(item => item === i)){
				$('#elevator'+ num +' #' + i +'F').css({"background-color" : "#f18e10"});
			}

		}
	}

	function people(){
		var min = 2 ;
		var max = 13 ;
		var array = [];
		for(var i = 0; i < 10; i++){
			 var a = Math.floor( Math.random() * (max + 1 - min) ) + min;
			array.push(a);
		}
		return array;
	}
	function setpeople(num,time){
			var ary = [];
			ary = people();
			console.log(ary);
			ary.forEach(function( value ) {
				$('#elevator'+ num +'  #1F').append('<div class="people" id ="people'+ value +'"></div>');
			});
			notice_elevator(num,ary);
			up_elevator(num,1,time,ary);
	}


	$(function(){
		for(var i = 0; i < 6; i++){
			setpeople(i,2000);
		}
		// for(var i = 0; i < 6; i++){
		// 	var ary = [];
		// 	ary = people();
		// 	console.log(ary);
		// 	ary.forEach(function( value ) {
		// 		$('#elevator'+ i +'  #1F').append('<div class="people" id ="people'+ value +'"></div>');
		// 	});
		// 	notice_elevator(i,ary);
		// 	up_elevator(i,1,2000,ary);
		// }
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
