$(".search-icon").click(function(){
	$(this).parents().siblings(".search-icon-expand").toggle(500);
}); 

/*=========================*/ 

$(".dropdown-toggle").click(function(){
	$(this).siblings(".dropdown-menu").toggle(500);
	
});

/*======================*/
$('.user-submenu').hide();
$("li.user a").click(function(){
  $(this).siblings(".user-submenu").toggle(500);
  
});

/*======================*/
$(window).load(function(){
	$('.left-aside-sec .aside-twitter-sec .comedian_twitter').addClass('mCustomScrollbar');
	$('.video-plus-playlist-sec .playlist-sec .playlist-content').addClass('mCustomScrollbar');
	$('.playlist-sec').addClass('mCustomScrollbar');
		$("").mCustomScrollbar();
		theme:"myscroll-theme"
	});

$(function() {
    $('.comedian-box').matchHeight();
    $('.video-pg-content .episodes-sec .episode').matchHeight();
    $('.tv-channel-images .channel-logos figure').matchHeight();
    $('.recommended-sec .top-articles').matchHeight();
	$('.daily-joke-tweet-sec .jokeplustweet').matchHeight();
	$('.more-sec-content .box').matchHeight();
	$('.contestants-sec .contestants').matchHeight();
    
});
/*======================*/

$(".comedian-index-sec li a").click(function(){
    $('.comedian-index-sec li').removeClass('active');
    $(this).parents('li').addClass('active');
});

/*======================*/

var $status = $('.control-sec');
    var $slickElement = $('.hero-slider');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.html( i+'<span>of</span> ' + slick.slideCount);
    });

    $slickElement.slick({
        slide: '.slide',
        autoplay: true,
        dots: false,
		autoplaySpeed: 7000,
        vertical: true,
        verticalSwiping: true,
		    arrows: true,
  		    prevArrow: '<i class="fa fa-angle-up hero-slide-up"></i>',
    	    nextArrow: '<i class="fa fa-angle-down hero-slide-down"></i>',
    });
	var $slickElementtext = $('.hero-slidertext');
	$slickElementtext.slick({
        slide: '.slidetext',
        autoplay: true,
		autoplaySpeed: 7000,
        dots: false,
        vertical: true,
        verticalSwiping: true,
		    arrows: false,
  		    prevArrow: '<i class="fa fa-angle-up hero-slide-up"></i>',
    	    nextArrow: '<i class="fa fa-angle-down hero-slide-down"></i>',
    });

/*===============================*/

/***********************************************
* Simple Marquee (04-October-2012)
* by Vic Phillips - http://www.vicsjavascripts.org.uk/
***********************************************/

/*var zxcMarquee={

 init:function(o){
  var mde=o.Mode,mde=typeof(mde)=='string'&&mde.charAt(0).toUpperCase()=='H'?['left','offsetWidth','top','']:['top','offsetHeight','left','height'],id=o.ID,srt=o.StartDelay,ud=o.StartDirection,p=document.getElementById(id),obj=p.getElementsByTagName('DIV')[0],sz=obj[mde[1]],clone;
  p.style.overflow='hidden';
  obj.style.position='absolute';
  obj.style[mde[0]]='0px';
  obj.style[mde[3]]=sz+'px';
  clone=obj.cloneNode(true);
  clone.style[mde[0]]=sz+'px';
  clone.style[mde[2]]='0px';
  obj.appendChild(clone);
  o=this['zxc'+id]={
   obj:obj,
   mde:mde[0],
   sz:sz
  }
  if (typeof(srt)=='number'){
   o.dly=setTimeout(function(){ zxcMarquee.scroll(id,typeof(ud)=='number'?ud:-1); },srt);
  }
  else {
   this.scroll(id,0);
  }
 },

 scroll:function(id,ud){
  var oop=this,o=this['zxc'+id],p;
  if (o){
   ud=typeof(ud)=='number'?ud:0;
   clearTimeout(o.dly);
   p=parseInt(o.obj.style[o.mde])+ud;
   if ((ud>0&&p>0)||(ud<0&&p<-o.sz)){
    p+=o.sz*(ud>0?-1:1);
   }
   o.obj.style[o.mde]=p+'px';
   o.dly=setTimeout(function(){ oop.scroll(id,ud); },50);
   
  }
 }
}*/

function init(){

 //zxcMarquee.init({
  //ID:'marquee1',     // the unique ID name of the parent DIV.                        (string)
  //Mode:'Horizontal',   //(optional) the mode of execution, 'Vertical' or 'Horizontal'. (string, default = 'Vertical')
  //StartDelay:500,   //(optional) the auto start delay in milli seconds'.            (number, default = no auto start)
  //StartDirection:-1  //(optional) the auto start scroll direction'.                  (number, default = -1)
  
 //});


}

if (window.addEventListener)
 window.addEventListener("load", init, false)
else if (window.attachEvent)
 window.attachEvent("onload", init)
else if (document.getElementById)
 window.onload=init


    $('#marquee1 div').css('width','100%');

/*==============================*/
$('.expand-show-ticket-sec').hide();
$(".ticket-toggle-btn").click(function(){
  $(this).parents(".show-details").siblings('.expand-show-ticket-sec').toggle(500);
  
});
/*===============================*/
var $statusvOne = $('.control-sec-vsliderone');
    var $slickvElementOne = $('#featured-videos');

    $slickvElementOne.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var a = (currentSlide ? currentSlide : 0) + 1;
        var b = (currentSlide ? currentSlide : 0) + 4;
         if(b>slick.slideCount) {
          b=slick.slideCount;
          a= b-3;
        }
        $statusvOne.html( a +' - '+ b + ' <span> of </span> ' + slick.slideCount);
    });

    $slickvElementOne.slick({
        slide: '#featured-videos .slide',
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
		autoplaySpeed: 7000,
        dots: false,
    arrows: true,
      prevArrow: '<i class="vslider-prevarrow vslider-arrows"></i>',
      nextArrow: '<i class="vslider-nextarrow vslider-arrows"></i>',
    });
/*===============================*/
var $statusv = $('.control-sec-vslider');
    var $slickvElement = $('#popular-videos');

    $slickvElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        var j = (currentSlide ? currentSlide : 0) + 4;
        if(j>slick.slideCount) {
          j=slick.slideCount;
          i= j-3;
        }
        $statusv.html( i+'-'+ j + ' <span> of </span> ' + slick.slideCount);
    });

    $slickvElement.slick({
        slide: '#popular-videos .slide',
        slidesToShow: 4,
		autoplaySpeed: 7000,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
    arrows: true,
      prevArrow: '<i class="vslider-prevarrow vslider-arrows"></i>',
      nextArrow: '<i class="vslider-nextarrow vslider-arrows"></i>',
    });

/*===============================*/
var $statusvthree = $('.control-sec-vsliderthree');
    var $slickvElementthree = $('#new-release-videos');

    $slickvElementthree.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var x = (currentSlide ? currentSlide : 0) + 1;
        var y = (currentSlide ? currentSlide : 4) + 1;
        if(y>slick.slideCount) {
          y=slick.slideCount;
          x= y-3;
        }
        $statusvthree.html( x+'-'+y+ ' <span> of </span> ' + slick.slideCount);
    });

    $slickvElementthree.slick({
        slide: '#new-release-videos .slide',
        slidesToShow: 4,
		autoplaySpeed: 7000,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
    arrows: true,
      prevArrow: '<i class="vslider-prevarrow vslider-arrows"></i>',
      nextArrow: '<i class="vslider-nextarrow vslider-arrows"></i>',
    });

/*==============================*/
$(".submenu-trigger").click(function(){
  $(this).toggleClass("toggle-icon-change");
  $(this).siblings(".expand-sub-li").slideToggle(500);
  $(this).parents("li").siblings().find("a").removeClass("toggle-icon-change");
  $(this).parents("li").siblings().children(".expand-sub-li").hide(500);
});

/*============Video playlist script===================*/
if($(window).innerWidth() < 980) {
var vplaylistHeight = $('.video-plus-playlist-sec .playlist-sec').height();
 var vfileHeight = $('.video-plus-playlist-sec .video-file-sec').height();
  console.log(vplaylistHeight);
  console.log(vfileHeight);
if(vplaylistHeight < vfileHeight ) {
  $(vplaylistHeight).css('height', vfileHeight +'px');

}
else {
  $(vfileHeight).css('height', vplaylistHeight +'px');
}
}

/*==============================*/
/*$(".box-detail .story-detail .readmore-btn").hover(function(){
    $(this).siblings('.detail-content-box').toggle(400);
});
*/

/*===============================*/
if ( $("#calender" ).length ) {
 $('#calender').datepicker({
  language: 'en',
   showOtherMonths:false,
  navTitles: {
        days: 'MM'
      }
  
});
}