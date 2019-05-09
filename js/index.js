$(function(){

	//ビルの初期設定
	var floors = $('.left .elevator:eq(0) .floor').length;
	var elevators = $('.left .elevator').length;
	var capacity  = $('.left .elevator:eq(0) .people').length; ;
	$('.people').remove();
	if(floors > 10){
		$('.sky').css({"height" : "calc(80px * "+ (floors + 1) +")"});
	}
	$('.buildings').css({"width" : "calc(120px * "+ (elevators + 0.5) +")"}).css({"height" : "calc(80px * "+ floors +")"});
	$('.ground').css({"width" : "calc(120px * "+ (elevators * 2.3) +")"});
	$('.right').css({"margin-left" : "calc(120px * "+ (elevators + 1.25) +")"});
	for(var i = 0; i < elevators * 2; i++){
		$('.elevator').eq(i).css({"margin-left" : "60px"});
	}


	var passenger = [];
	var flag = [];
	var arrived = [];
	var left = '.left ';
	var right ='.right ';
	var demo = floors - 1;

	// for(var i = 0; i <elevators * 2; i++){
	// 	opendoor("",i,floors - 1);
	// }

	//試運転
	function elevator_demo(){
		var timer = setTimeout(function(){
			clearTimeout(timer);
			var demoafter = demo ==0? floors - 1:demo - 1;
			for(var i = 0; i <elevators * 2; i++){
				closedoor("",i,demo);
				opendoor("",i,demoafter);
			}
			demo = demo ==0? floors - 1:demo - 1;
			elevator_demo();
		},3000);
	}

	elevator_demo();



//ドアを開ける
	function opendoor(whichside,elenum,floornum){
		$(whichside +'.elevator:eq('+ elenum +') .floor:eq('+ floornum +') .doorleft').animate({ width: 'hide'}, 2000 );
		$(whichside +'.elevator:eq('+ elenum +') .floor:eq('+ floornum +') .doorright').animate({ width: 'hide'}, 2000 );
	}
//ドアを閉める
	function closedoor(whichside,elenum,floornum){
		$(whichside +'.elevator:eq('+ elenum +') .floor:eq('+ floornum +') .doorleft').animate({ width: 'show'}, 2000 );
		$(whichside +'.elevator:eq('+ elenum +') .floor:eq('+ floornum +') .doorright').animate({ width: 'show'}, 2000 );
	}
});



