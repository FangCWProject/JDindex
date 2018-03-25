var setRota;
//下面这个是鼠标移动时的轮播
function rotaMouse(){
	var index = $(this).data('item');
	if(setRota){//检测是否有延时调用轮播函数
		clearTimeout(setRota);
	}
	rotation(index);
}
//下面这个是轮播的函数，主要负责具体动作
function rotation(index){
	$('.rota-check li').removeClass('rota-but-check');
	$('.rota-check li').eq(index).addClass('rota-but-check');
	$('.rotation-ul li').removeClass('rota-visible');
	$('.rotation-ul li').eq(index).addClass('rota-visible');
	if (index==7) {
		setRota = setTimeout("rotation(0)",3000);
	} else{
		setRota = setTimeout("rotation("+(index+1)+")",3000);
	}
}
//这个是左右两边的按钮的函数
function rotaClick(event){
	var index;
	if(event.data.nextIndex){
		index = $('.rota-but-check').data('item')+1;
	}
	else{
		index = $('.rota-but-check').data('item')-1;
	}
	if(setRota){
		clearTimeout(setRota);
	}
	if(index<0){
		rotation(7);
	}
	else if(index>7){
		rotation(0);
	}
	else{
		rotation(index);
	}
}

function serviceRotation(i,el,width){
	el.css('left',(-i*width)+"px");
}

var skTime = new Date().getTime()+2*60*60*1000;
//下面这个函数是秒杀倒计时
function jishi(){
	var nowTime = skTime - new Date().getTime();
	var hour = Math.floor(nowTime/(60*60*1000)) ;
	var minute = Math.floor((nowTime%(60*60*1000))/(60*1000));
	var sec = Math.floor(nowTime%(60*1000)/1000);
	if(hour<10){
		hour = "0"+hour;
	}
	if(minute<10){
		minute = "0"+minute;
	}
	if(sec<10){
		sec = "0"+sec;
	}
	$('.sk-hour').text(hour);
	$('.sk-minute').text(minute);
	$('.sk-sec').text(sec);
	if(nowTime >= 0){
		setTimeout(jishi,1000);
	}
}


//下面是秒杀轮播按钮的函数，应可以被其他的轮播模块使用
function butRotation(data){
	//index为当前显示的模块下标，el1表示轮播的容器，el2表示当前显示的元素，max表示轮播块的最大下标
	var index=data.rotaIndex,el1=data.el1,el2=data.el2,max=data.max;
	if(data.nextIndex){
		if (index == max) {
			index = 0;			
		} else{
			index++;
		}
		el1.eq(index).css("transition","none").removeClass('rota-prev').addClass('rota-next');	//将下一个模块位置设置好
		el2.css("transition","all .5s").removeClass('rota-current').addClass('rota-prev');		//开始移动当前显示的模块（向左）
		setTimeout(function(){
			el1.eq(index).removeClass('rota-next');	
			el1.eq(index).css("transition","all .5s").addClass('rota-current');
		},10);
	}
	else{
		if (index == 0) {
			index = max;
		} else{
			index--;
		}
		el1.eq(index).css("transition","none").removeClass('rota-next').addClass('rota-prev');
		el2.css("transition","all .5s").removeClass('rota-current').addClass('rota-next');		//移动当前显示的模块（向右）
		setTimeout(function(){
			el1.eq(index).removeClass('rota-prev');
			el1.eq(index).css("transition","all .5s").addClass('rota-current');
		},10);
	}
}

//秒杀最右的轮播
function Rotation2(dd){
	//t为this，el为要移动的ul
	var i=dd.i,width=dd.width,t=dd.th,el=dd.el;
	t.parent().children().removeClass('rota-but-active');
	t.addClass('rota-but-active');
	el.css('left',-i*width+'px');
}

function clickButRota(da){
	var i=da.i,p=da.p,el=da.el,but=da.but,max=da.max;
	if(da.nextIndex){
		i++;
	}
	else{
		i--;
	}
	if(i > max){
		i = 0;
	}
	if(i < 0){
		i = max;
	}
	el.css('left',-i*p+'px');
	but.removeClass('rota-but-active');
	but.eq(i).addClass('rota-but-active');
}
//
//function moveButRota(data){
//	//此处的el是传回来的ul
//	var i = data.i,
//		p = data.p,
//		el = data.el,
//		li = el.children(),
//		but = data.but,
//		max = data.max;
//	
//	i+=2;
//	if(data.nextIndex){
//		if(i == 3){
//			el.css({
//				'transition':'none',
//				'left':'0px'
//			});
//			li.removeClass('item1 item3');
//			li.eq()
//		}
//		else{
//			
//		}
//		
//		but.eq(i).mouseover();
//	}
//	else{
//		
//	}
//}
