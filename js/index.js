$(function(){
	var elevator = 6;
	var floor = 13;
	var flag =[];
	for (var i = 0; i < elevator; i++){
		flag.push(true);
	}
	var ary = [];
	for (var i = 0; i < elevator; i++){
		ary.push([]);
	}
	var priority =[];
	for (var i = 0; i < elevator; i++){
		priority.push(false);
	}
	var stand = [];

// $('.floor:eq(12)').css({"background-color" : "#f4d420"});
	// for (var i = 0; i < 6; i++){
		// $('#elevator'+ i +' #F1').css({"background-color" : "#f4d420"});
	// }


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
			var timer = array.find(item => item === floor)? 8000 : 2000;
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
				var waitary =[];
				while(stand.length > 0){
					waitary.push(stand.shift());
					if(waitary.length >= 20){
						break;
					}
				}
				$('#elevator'+ num +'  #F1').append($('#stand0 .people:lt(' + waitary.length +')'));
				// var aryset = ary[num];
				// aryset = waitary;
				ary[num] = waitary;
				console.log(ary[num]);
				if (ary[num].length >=20){
					notice_elevator(num,ary[num]);
					up_elevator(num,1,10000,ary[num]);
				}else{
					console.log("まだです");
					console.log(ary[num]);
					priority[num] = ary[num].length > 0? true:false;
					flag[num] = true;
					standby(num,flag[num],ary[num]);
				}

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



	function people2(){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			var min = 2 ;
			var max = 13 ;
			var a = Math.floor( Math.random() * (max + 1 - min) ) + min;
			if(flag[0] === true && priority[1] === false && priority[2] === false && priority[3] === false && priority[4] === false && priority[5] === false){
				priority[0] = true;
				// array0.push(a);
				var setary = ary[0];
				setary.push(a);
				$('#elevator'+ 0 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flag[0] = setary.length >=20? false:true;
			}else if(flag[1] === true && priority[2] === false && priority[3] === false && priority[4] === false && priority[5] === false){
				priority[1] = true;
				var setary = ary[1];
				setary.push(a);
				// array1.push(a);
				$('#elevator'+ 1 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flag[1] = setary.length >=20? false:true;
			}else if(flag[2] === true && priority[3] === false && priority[4] === false && priority[5] === false){
				priority[2] = true;
				var setary = ary[2];
				setary.push(a);
				// array2.push(a);
				$('#elevator'+ 2 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flag[2] = setary.length >=20? false:true;
			}else if(flag[3] === true && priority[4] === false && priority[5] === false){
				priority[3] = true;
				var setary = ary[3];
				setary.push(a);
				// array3.push(a);
				$('#elevator'+ 3 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flag[3] = setary.length >=20? false:true;
			}else if(flag[4] === true && priority[5] === false){
				priority[4] = true;
				var setary = ary[4];
				setary.push(a);
				// array4.push(a);
				$('#elevator'+ 4 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flag[4] = setary.length >=20? false:true;
			}else if(flag[5] === true){
				priority[5] = true;
				var setary = ary[5];
				setary.push(a);
				// array5.push(a);
				$('#elevator'+ 5 +'  #F1').append('<div class="people" id ="people'+ a +'"></div>');
				flag[5] = setary.length >=20? false:true;
			}else{
				stand.push(a);
				$('#stand0').append('<div class="people" id ="people'+ a +'"></div>');
			}
			people2();
		},1000);
	}



	function standby(num,flg,standary){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			if( standary.length >= 20 && flg === false){
				priority[num] = false;

				console.log("エレベーター"+ num + "出発");
				notice_elevator(num,standary);
				up_elevator(num,1,2000,standary);
			}else{
				// var aryset = ary[num];
				standby(num,flag[num],standary);
			}
		},1000);
	}




	$(function(){
		for(var i = 0; i < 6; i++){
			// var aryset = ary[i];
			standby(i,flag[i],ary[i]);
		}
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
