$(function(){
	var flug0 = true;
	var flug1 = true;
	var flug2 = true;
	var flug3 = true;
	var flug4 = true;
	var flug5 = true;

	var array0 = [];
	var array1 = [];
	var array2 = [];
	var array3 = [];
	var array4 = [];
	var array5 = [];
	var stand = [];

	var priority0 = false;
	var priority1 = false;
	var priority2 = false;
	var priority3 = false;
	var priority4 = false;
	var priority5 = false;



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
			var timer = array.find(item => item === floor)? 10000 : 2000;
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
				var array =[];
				while(stand.length > 0){
					array.push(stand.shift());
					if(array.length >= 20){
						break;
					}
				}

				switch(num){
					case 0 :
							$('#elevator'+ 0 +'  #F1').append($('#stand0 .people:lt(' + array.length +')'));
							array0 = array;
							if (array.length >=20){
								notice_elevator(num,array);
								up_elevator(0,1,10000,array);
							}else{
								flug0 = true;
								standby(num,flug0,array0);
							}
							break;
					case 1 :
							$('#elevator'+ 1 +'  #F1').append($('#stand0 .people:lt(' + array.length +')'));
							array1 = array;
							if (array.length >=20){
								notice_elevator(num,array);
								up_elevator(1,1,10000,array);
							}else{
								flug1 = true;
								standby(num,flug1,array1);
							}
							break;
					case 2 :
							$('#elevator'+ 2 +'  #F1').append($('#stand0 .people:lt(' + array.length +')'));
							array2 = array;
							if (array.length >=20){
								notice_elevator(num,array);
								up_elevator(2,1,10000,array);
							}else{
								flug2 = true;
								standby(num,flug2,array2);
							}
							break;
					case 3 :
							$('#elevator'+ 3 +'  #F1').append($('#stand0 .people:lt(' + array.length +')'));
							array3 = array;
							if (array.length >=20){
								notice_elevator(num,array);
								up_elevator(3,1,10000,array);
							}else{
								flug3 = true;
								standby(num,flug3,array3);
							}
							break;
					case 4 :
							$('#elevator'+ 4 +'  #F1').append($('#stand0 .people:lt(' + array.length +')'));
							array4 = array;
							if (array.length >=20){
								notice_elevator(num,array);
								up_elevator(4,1,10000,array);
							}else{
								flug4 = true;
								standby(num,flug4,array4);
							}
							break;
					case 5 :
							$('#elevator'+ 5 +'  #F1').append($('#stand0 .people:lt(' + array.length +')'));
							array5 = array;
							if (array.length >=20){
								notice_elevator(num,array);
								up_elevator(5,1,10000,array);
							}else{
								flug5 = true;
								standby(num,flug5,array5);
							}
							break;
				}
				// setpeople(num,5000);
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

	// function people(){
	// 	var min = 2 ;
	// 	var max = 13 ;
	// 	var array = [];
	// 	for(var i = 0; i < 10; i++){
	// 		 var a = Math.floor( Math.random() * (max + 1 - min) ) + min;
	// 		array.push(a);
	// 	}
	// 	return array;
	// }
	// //サンプル用のファンクション
	// function setpeople(num,time){
	// 		var ary = [];
	// 		ary = people();
	// 		console.log(ary);
	// 		ary.forEach(function( value ) {
	// 			$('#elevator'+ num +'  #F1').append('<div class="people" id ="people'+ value +'"></div>');
	// 		});
	// 		notice_elevator(num,ary);
	// 		up_elevator(num,1,time,ary);
	// }

	function people2(){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			var min = 2 ;
			var max = 13 ;
			var a = Math.floor( Math.random() * (max + 1 - min) ) + min;
			if(flug0 === true && priority1 === false && priority2 === false && priority3 === false && priority4 === false && priority5 === false){
				priority0 = true;
				array0.push(a);
				$('#elevator'+ 0 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flug0 = array0.length >=20? false:true;
			}else if(flug1 === true && priority2 === false && priority3 === false && priority4 === false && priority5 === false){
				priority1 = true;
				array1.push(a);
				$('#elevator'+ 1 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flug1 = array1.length >=20? false:true;
			}else if(flug2 === true && priority3 === false && priority4 === false && priority5 === false){
				priority2 = true;
				array2.push(a);
				$('#elevator'+ 2 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flug2 = array2.length >=20? false:true;
			}else if(flug3 === true && priority4 === false && priority5 === false){
				priority3 = true;
				array3.push(a);
				$('#elevator'+ 3 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flug3 = array3.length >=20? false:true;
			}else if(flug4 === true && priority5 === false){
				priority4 = true;
				array4.push(a);
				$('#elevator'+ 4 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flug4 = array4.length >=20? false:true;
			}else if(flug5 === true){
				priority5 = true;
				array5.push(a);
				$('#elevator'+ 5 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flug5 = array5.length >=20? false:true;
			}else{
				stand.push(a);
				$('#stand0').append('<div class="people" id ="people'+ a +'"></div>');
			}
			people2();
		},1000);
	}



	function standby(num,flg,array){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			var count = array.length;
			if( count >= 20 && flg === false){
				switch(num){
	        case 0 : priority0 = false; break;
	        case 1 : priority1 = false; break;
					case 2 : priority2 = false; break;
	        case 3 : priority3 = false; break;
	        case 4 : priority4 = false; break;
					case 5 : priority5 = false; break;
    		}
				console.log("エレベーター"+ num + "出発");
				notice_elevator(num,array);
				up_elevator(num,1,2000,array);
			}else{
				// console.log(flug0);
				// console.log(count);
				switch(num){
	        case 0 : standby(num,flug0,array0); break;
	        case 1 : standby(num,flug1,array1); break;
					case 2 : standby(num,flug2,array2); break;
	        case 3 : standby(num,flug3,array3); break;
	        case 4 : standby(num,flug4,array4); break;
					case 5 : standby(num,flug5,array5); break;
    		}
			}
		},1000);
	}




	$(function(){
		//サンプル開始
		// for(var i = 0; i < 6; i++){
		// 	setpeople(i,2000);
		// }
		standby(0,flug0, array0);
		standby(1,flug1, array1);
		standby(2,flug2, array2);
		standby(3,flug3, array3);
		standby(4,flug4, array4);
		standby(5,flug5, array5);
		people2();


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
