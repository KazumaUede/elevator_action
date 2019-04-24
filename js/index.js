$(function(){
	var elevator = 6;
	var floors = 13;
	var calcfloors =floors - 1;
	var flag =[];
	var ary = [];
	var priority =[];
	var stand = [];
	var members = [];
	var left = '.left ';
	var right = '.right ';
	for (var i = 0; i < elevator; i++){
		flag.push(true);
		ary.push([]);
		priority.push(false);
	}
	for (var i = 0; i < calcfloors; i++){
		members[i] = 0;
	}

	//エレベーターをあげる
	function up_elevator(num,floor,time,array){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			// console.log(floor);
			$('.elevator:eq('+ num +') .floor:eq('+ floor +') .people').appendTo('.elevator:eq('+ num +') .floor:eq('+ (floor - 1) +')');
			$('.elevator:eq('+ num +') .floor:eq('+ floor +')').css({"background-color" : "#26499d"});
			$('.elevator:eq('+ num +') .floor:eq('+ --floor +')').css({"background-color" : "#f4d420"});

			//人を下ろす
			if(array.find(item => item === floor) || floor === 0){
				//何人下ろすか数える
				var count = array.filter(num => num == floor).length;
				//降りる人数の要素を追加する
				$('.elevator:eq('+ num +') .floor:eq('+ floor +') #people' + floor).remove();
				members[floor] += count;
				//人数の情報を消す
				$('.gate:eq('+ floor +') .sum p').remove();
				$('.gate:eq('+ calcfloors +') .sum p').remove();
				$('.gate:eq('+ floor +') .sum').append('<p>' + members[floor] +'人</p>');
				var sumall = 0;
				for(var i = 0; i < calcfloors; i++){
					sumall += members[i];
				}
				$('.gate:eq('+ calcfloors +') .sum').append('<p>' + sumall +'人</p>');
			}
			var timer = array.find(item => item === floor) || floor === 0? 10000 : 2000;
			if(floor > array.reduce((a,b)=>a<b?a:b)){
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
			$('.elevator:eq('+ num +') .floor:eq('+ floor +')').css({"background-color" : "#26499d"});
			$('.elevator:eq('+ num +') .floor:eq('+ ++floor +')').css({"background-color" : "#f4d420"});
			// console.log(num +'番は'+ floor +'階');
			if(floor < calcfloors){
				down_elevator(num,floor,2000);
			}else{
				var waitary =[];
				while(stand.length > 0){
					waitary.push(stand.shift());
					if(waitary.length >= 20){
						break;
					}
				}
				console.log(num +'番は'+ waitary.length +'人乗るぞ');
				$('.elevator:eq('+ num +') .floor:eq(' + calcfloors + ')').append($('.standby:eq(0) .people:lt(' + waitary.length +')'));
				ary[num] = waitary;
				// console.log(ary[num]);
				if (ary[num].length >=20){
					notice_elevator(num,ary[num]);
					up_elevator(num,calcfloors,10000,ary[num]);
				}else{
					priority[num] = ary[num].length > 0? true:false;
					flag[num] = true;
					standby(num,flag[num],ary[num]);
				}

			}
		},time);
	}
	//止まる階をオレンジで予告
	function notice_elevator(num,array){
		array.forEach(function( value ) {
		     $('.elevator:eq('+ num +') .floor').eq(value).css({"background-color" : "#f18e10"});
		});
	}
	//エレベーターに人お載せる
	function enter_the_elevator(num,a){
				priority[num] = true;
				var setary = ary[num];
				setary.push(a);
				$('.elevator:eq(' + num +') .floor').eq(calcfloors).append('<div class="people" id ="people'+ a +'"></div>');
				flag[num] = setary.length >=20? false:true;
	}


	function people2(){
		var timer = setTimeout(function(){
			//人を生成(いずれphpにさせる)
			clearTimeout(timer);
			var min = 0 ;
			var max = 11 ;
			var a = Math.floor( Math.random() * (max + 1 - min) ) + min;


			//振り分ける(すでに人が乗っているエレベーターが優先)

			var standflag = true;
			for(var i = 0; i <= elevator-1; ++i){
				if(flag[i]){
					var priflag = true;
					for(var j = i+1; j <= elevator-1;++j){
						if(priority[j]){
							priflag = false;
							break;
						}
					}
					if(priflag){
						enter_the_elevator(i,a);
						standflag = false;
						break;
					}
				}
			}
			if(standflag){
				stand.push(a);
				$('.standby').eq(0).append('<div class="people" id ="people'+ a +'"></div>');
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
				up_elevator(num,calcfloors,2000,standary);
			}else{
				standby(num,flag[num],standary);
			}
		},1000);
	}




	$(function(){
		for(var i = 0; i < elevator; i++){
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
