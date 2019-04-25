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
	for (var i = 0; i < elevator * 2 ; i++){
		flag.push(true);
		ary.push([]);
		priority.push(false);
	}
	for (var i = 0; i < calcfloors; i++){
		members[i] = 0;
	}

	//エレベーターをあげる
	function up_elevator(num,floor,time,array,choices){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			var elenum = i < elevator ?num:num - 6;
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +') .people').appendTo(choices +'.elevator:eq('+ elenum +') .floor:eq('+ (floor - 1) +')');
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +')').css({"background-color" : "#26499d"});
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ --floor +')').css({"background-color" : "#f4d420"});

			//人を下ろす
			if(array.find(item => item === floor) || floor === 0){
				//何人下ろすか数える
				var count = array.filter(num => num == floor).length;
				//降りる人数の要素を追加する
				$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +') #people' + floor).remove();
				members[floor] += count;
				//人数の情報を消す
				$(choices +'.gate:eq('+ floor +') .sum p').remove();
				$(choices +'.gate:eq('+ calcfloors +') .sum p').remove();
				$(choices +'.gate:eq('+ floor +') .sum').append('<p>' + members[floor] +'人</p>');
				var sumall = 0;
				for(var i = 0; i < calcfloors; i++){
					sumall += members[i];
				}
				$(choices +'.gate:eq('+ calcfloors +') .sum').append('<p>' + sumall +'人</p>');
			}
			var timer = array.find(item => item === floor) || floor === 0? 10000 : 2000;
			if(floor > array.reduce((a,b)=>a<b?a:b)){
				up_elevator(num,floor,timer,array,choices);
			}else{
				down_elevator(num,floor,timer,choices);
			}
		},time);
	}
	//エレベーターを下げる
	function down_elevator(num,floor,time,choices){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			var elenum = i < elevator ?num:num - 6;
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +')').css({"background-color" : "#26499d"});
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ ++floor +')').css({"background-color" : "#f4d420"});
			// console.log(num +'番は'+ floor +'階');
			if(floor < calcfloors){
				down_elevator(num,floor,2000,choices);
			}else{
				if(num < elevator){

					var waitary =[];
					while(stand.length > 0){
						waitary.push(stand.shift());
						if(waitary.length >= 20){
							break;
						}
					}
					console.log(num +'番は'+ waitary.length +'人乗るぞ');
					$(choices +'.elevator:eq('+ elenum +') .floor:eq(' + calcfloors + ')').append($(choices +'.standby:eq(0) .people:lt(' + waitary.length +')'));
					ary[num] = waitary;
					// console.log(ary[num]);
					if (ary[num].length >=20){
						notice_elevator(num,ary[num],choices);
						up_elevator(num,calcfloors,10000,ary[num],choices);
					}else{
						priority[num] = ary[num].length > 0? true:false;
						flag[num] = true;
						standby(num,flag[num],ary[num],choices);
					}

				}


			}
		},time);
	}
	//止まる階をオレンジで予告
	function notice_elevator(num,array,choices){
		var elenum = i < elevator ?num:num - 6;
		array.forEach(function( value ) {
		     $(choices +'.elevator:eq('+ elenum +') .floor').eq(value).css({"background-color" : "#f18e10"});
		});
	}
	//エレベーターに人を載せる
	function enter_the_elevator(num,a,choices){
				priority[num] = true;
				var setary = ary[num];
				setary.push(a);
				var elenum = i < elevator ?num:num - 6;
				$(choices +'.elevator:eq(' + elenum +') .floor').eq(calcfloors).append('<div class="people" id ="people'+ a +'"></div>');
				flag[num] = setary.length >=20? false:true;
	}


	function people2(){
		var timer = setTimeout(function(){
			//人を生成(いずれphpにさせる)
			clearTimeout(timer);
			var min = 0 ;
			var max = 11 ;
			var a = Math.floor( Math.random() * (max + 1 - min) ) + min;


			//振り分ける(左用、すでに人が乗っているエレベーターが優先)
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
						enter_the_elevator(i,a,left);
						standflag = false;
						break;
					}
				}
			}
			if(standflag){
				stand.push(a);
				$(left +'.standby').eq(0).append('<div class="people" id ="people'+ a +'"></div>');
			}

			//振り分ける(右用、近い階同士を集める)
			switch(a){
				case 0:
				case 1: flag[6] ?		enter_the_elevator(6,a,right) :$(right +'.standby').eq(0).append('<div class="people" id ="people'+ a +'"></div>'); break;
				case 2:
				case 3: flag[7] ?		enter_the_elevator(7,a,right) :$(right +'.standby').eq(1).append('<div class="people" id ="people'+ a +'"></div>'); break;
				case 4:
				case 5: flag[8] ?		enter_the_elevator(8,a,right) :$(right +'.standby').eq(2).append('<div class="people" id ="people'+ a +'"></div>'); break;
				case 6:
				case 7: flag[9] ?		enter_the_elevator(9,a,right) :$(right +'.standby').eq(3).append('<div class="people" id ="people'+ a +'"></div>'); break;
				case 8:
				case 9: flag[10] ?		enter_the_elevator(10,a,right) :$(right +'.standby').eq(4).append('<div class="people" id ="people'+ a +'"></div>'); break;
				case 10:
				case 11: flag[11] ?	enter_the_elevator(11,a,right) :$(right +'.standby').eq(5).append('<div class="people" id ="people'+ a +'"></div>'); break;
			}











			people2();
		},1000);
	}



	function standby(num,flg,standary,choices){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			if( standary.length >= 20 && flg === false){
				priority[num] = false;

				console.log("エレベーター"+ num + "出発");
				notice_elevator(num,standary,choices);
				up_elevator(num,calcfloors,2000,standary,choices);
			}else{
				standby(num,flag[num],standary,choices);
			}
		},1000);
	}




	$(function(){
		for(var i = 0; i < elevator * 2; i++){
			var n = i < elevator ?left:right;
			standby(i,flag[i],ary[i],n);
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
