$(function(){
	for (var i = 0; i < 6; i++){
		$('#elevator'+ i +' #F1').css({"background-color" : "#f4d420"});
	}

	var flug = true;
	//エレベーターをあげる
	function up_elevator(num,floor,time,array){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			$('#elevator'+ num +' #F' + floor +' .people').appendTo('#elevator'+ num +' #F' + (floor + 1))
			$('#elevator'+ num +' #F' + floor ).css({"background-color" : "#26499d"});
			$('#elevator'+ num +' #F' + ++floor ).css({"background-color" : "#f4d420"});
			//人を下ろす
			if(array.find(item => item === floor)){
				//何人下ろすか数える
				var count = array.filter(num => num == floor).length;
				//降りる人数の要素を追加する
				$('#elevator'+ num +' #F' + floor +' #people' + floor).remove();
				for(var i = 0; i < count; i++){
					$('#count' + floor).append("<p></p>");
				}
				//人数の情報を消す
				$('#sum' + floor + ' p').remove();
				$('#sum1 p').remove();
				var sum = $('#count' + floor + ' p').length;
				$('#sum' + floor).append('<p>' + sum +'人</p>');
				var sumall = 0;
				for(var i = 2; i < 14; i++){
					sumall += $('#count' + i + ' p').length
				}
				$('#sum1').append('<p>' + sumall +'人</p>');
			}
			var timer = array.find(item => item === floor)? 5000 : 2000;
			if(floor < array.reduce((a,b)=>a>b?a:b)){
				up_elevator(num,floor,timer,array);
			}else{
				down_elevator(num,floor,timer);
			}
		},time);
	}
	//エレベーターを下げる
	function down_elevator(num,floor,time){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			$('#elevator'+ num +' #F' + floor).css({"background-color" : "#26499d"});
			$('#elevator'+ num +' #F' + --floor).css({"background-color" : "#f4d420"});
			if(floor >1){
				down_elevator(num,floor,2000);
			}else{
				setpeople(num,5000);
			}
		},time);
	}
	//止まる階をオレンジで予告
	function notice_elevator(num,array){
		for(var i = 1; i < 14; i++){
			if(array.find(item => item === i)){
				$('#elevator'+ num +' #F' + i).css({"background-color" : "#f18e10"});
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
				$('#elevator'+ num +'  #F1').append('<div class="people" id ="people'+ value +'"></div>');
			});
			notice_elevator(num,ary);
			up_elevator(num,1,time,ary);
	}


	$(function(){
		//サンプル開始
		for(var i = 0; i < 6; i++){
			setpeople(i,2000);
		}
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
