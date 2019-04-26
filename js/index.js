$(function(){
	var elevator = 6;
	var floors = 13;
	var calcfloors =floors - 1;
	var flag =[];
	var ary = [];
	var priority =[];
	var stand = [];
	var stand2 = [];
	var members = [];
	var left = '.left ';
	var right = '.right ';
	var starttimer =[];
	for (var i = 0; i < elevator * 2 ; i++){
		flag.push(true);
		ary.push([]);
		priority.push(false);
		stand2.push([]);
		starttimer.push(0);
	}
	for (var i = 0; i < calcfloors * 2; i++){
		members[i] = 0;
	}

	//エレベーターをあげる
	function up_elevator(num,floor,time,array,choices){
		var eletimer = setTimeout(function(){
			clearTimeout(eletimer);
			var elenum = num < elevator ?num:num - 6;
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +') .people').appendTo(choices +'.elevator:eq('+ elenum +') .floor:eq('+ (floor - 1) +')');
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +')').css({"background-color" : "#26499d"});
			$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ --floor +')').css({"background-color" : "#f4d420"});

			//人を下ろす
			if(array.find(item => item === floor) || floor === 0){
				//何人下ろすか数える
				var count = array.filter(num => num == floor).length;
				//降りる人数の要素を追加する
				$(choices +'.elevator:eq('+ elenum +') .floor:eq('+ floor +') #people' + floor).remove();
				var choicefloor = num < elevator ?floor:floor + calcfloors ;
				members[choicefloor] += count;
				// members[floor] += count;
				//人数の情報を消す
				$(choices +'.gate:eq('+ floor +') .sum p').remove();
				$(choices +'.gate:eq('+ calcfloors +') .sum p').remove();
				$(choices +'.gate:eq('+ floor +') .sum').append('<p>' + members[choicefloor] +'人</p>');
				// $(choices +'.gate:eq('+ floor +') .sum').append('<p>' + members[floor] +'人</p>');
				var sumall = 0;
				if (num < elevator){
					var start = 0;
					var end = calcfloors;
				}else{
					var start = calcfloors;
					var end = calcfloors * 2;
				}
				for(var i = start; i < end; i++){
					sumall += members[i];
				}
				// for(var i = 0; i < calcfloors; i++){
				// 	sumall += members[i];
				// }
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
				var waitary =[];
				if(num < elevator){
					// var waitary =[];
					while(stand.length > 0){
						waitary.push(stand.shift());
						if(waitary.length >= 20){
							break;
						}
					}
					// console.log(num +'番は'+ waitary.length +'人乗るぞ');
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

				}else{
					while(stand2[num].length > 0){
						waitary.push(stand2[num].shift());
						if(waitary.length >= 20){
							break;
						}
					}
					// console.log(num +'番は'+ waitary.length +'人乗るぞ');
					$(choices +'.elevator:eq('+ elenum +') .floor:eq(' + calcfloors + ')').append($(choices +'.standby:eq(' + elenum +') .people:lt(' + waitary.length +')'));
					ary[num] = waitary;
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
				starttimer[num] = 0;
				flag[num] = setary.length >=20? false:true;
	}


	function people2(){
		var timer = setTimeout(function(){
			//人を生成(いずれphpにさせる)
			clearTimeout(timer);
			var min = 0 ;
			var max = 11 ;
			// var max = 5 ;
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
				case 0: var elenum = elevator; break;
				case 1:
				case 2: var elenum = elevator + 1; break;
				case 3:
				case 4: var elenum = elevator + 2; break;
				case 5:
				case 6: var elenum = elevator + 3; break;
				case 7:
				case 8: var elenum = elevator + 4; break;
				case 9:
				case 10:
				case 11: var elenum = elevator + 5; break;
			}
			var beforenum = elenum -1;
			if (flag[elenum]){
				enter_the_elevator(elenum,a,right);
			}else if((elenum === elevator + 1 || elenum === elevator + 5) && flag[beforenum]){
				enter_the_elevator(beforenum,a,right);
			}else{
				$(right +'.standby').eq(elenum - elevator).append('<div class="people" id ="people'+ a +'"></div>');
				var setary = stand2[elenum];
				setary.push(a);
			}
			var standall =0;
			for(var i = elevator; i < elevator * 2;i++){
				var j = stand2[i]
				standall+= j.length;
			}
			if(stand.length >=500){
				$('.ground').append('<div class="result">左ビルキャパオーバー!!社員投入を終了します</div>');
				return false;
			}else if(standall >=500){
				$('.ground').append('<div class="result">右ビルキャパオーバー!!社員投入を終了します</div>');
				return false;
			}else{
				people2();
			}
		},500);
	}



	function standby(num,flg,standary,choices){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			if( (standary.length >= 20 && flg === false) || ( standary.length >= 1 && starttimer[num] >= 10)){
				flag[num] = false;
				priority[num] = false;
				starttimer[num] = 0;

				// console.log("エレベーター"+ num + "出発");
				notice_elevator(num,standary,choices);
				up_elevator(num,calcfloors,2000,standary,choices);
			}else{
				starttimer[num] += 1;
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
			// console.log(response);
			var station_name;
			appendhtml = '<div class="routes">'  + response + '</div>';
			$('.result').append(appendhtml)
		}).fail(function() {
			alert("通信エラー");
		});
	});

});
