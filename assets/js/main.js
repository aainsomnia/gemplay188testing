var config = {
  lobbyFooter : {
    items : 5
  }
};
//main function
$('.opennew a').bind('click', function () {
	if ($(this).attr('target') == "_parent") return;
    CenterPopup($(this).data('href'), '', 830, 690, 'Tab');
});

$('a.opennew').bind('click', function (e) {
  // e.preventDefault();
  if ($(this).attr('target') == "_parent") return;
    CenterPopup($(this).data('href'), '', 830, 690, 'Tab');
});

$('.opennewbig a').bind('click', function () {
  if ($(this).attr('target') == "_parent") return;
    CenterPopup($(this).data('href'), '', 1024, 725, 'Banking');
});

$('a.opennewbig').bind('click', function () {
  if ($(this).attr('target') == "_parent") return;
    CenterPopup($(this).data('href'), '', 1024, 725, 'Banking');
});

$('.openlobby').bind('click', function () {
  if ($(this).attr('target') == "_parent") return;
    CenterPopup($(this).data('href'), '', 1060, 665, '');
});

//Terms & Conditions and Rules & Regulations. open new window
$('#reg-main td:last').parent().prev().on('click', 'a', function () {
    if ($(this).attr('target') == "_parent") return;
    CenterPopup($(this).data('href'), '', 830, 690, 'Tab');
});

// Centering popup for casino lobby
function CenterPopup(url, params, width, height, name) {
  var screenLeft=0, screenTop=0;

  if(!name) name = 'Live Casino';
  if(!width) width = 1060;
  if(!height) height = 665;

  var defaultParams = { }

  if(typeof window.screenLeft !== 'undefined') {
      screenLeft = window.screenLeft;
      screenTop = window.screenTop;
  } else if(typeof window.screenX !== 'undefined') {
      screenLeft = window.screenX;
      screenTop = window.screenY;
  }

  var features_dict = {
      toolbar: 'no',
      location: 'no',
      directories: 'no',
      left: screenLeft + ($(window).width() - width) / 2,
      top: screenTop + ($(window).height() - height) / 2,
      status: 'yes',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      width: width,
      height: height
  };
  features_arr = [];
  for(var k in features_dict) {
      features_arr.push(k+'='+features_dict[k]);
  }
  features_str = features_arr.join(',')

  // var qs = '?'+$.param($.extend({}, defaultParams, params));
  var win = window.open(url, name, features_str);
  win.focus();
  return false;
}

function openNewWindow(url, name, width, height, left, top, scrollbars) {
    window.open(url, name, 'left=' + left + ', top=' + top + ', width=' + width + ', height=' + height + ', scrollbars=' + scrollbars + ', location=no, menubar=no, titlebar=no, hotkeys=no, toolbars=no, status =no, resizable=yes');
}

function SetMainContent() {
    var bodyHeight = parent.window.document.documentElement.clientHeight;
    var hdHeight = $('.header').height();
    var ftHeight = $('.footer').height();
    var mainHeight = bodyHeight - hdHeight - ftHeight;
    //$('.main').css('min-height', mainHeight);
}

////start subnavbar
$(function () {
   var subnavtimeout = 0;
   $('.nav li.sub').hover(function () {
       $('.nav li.sub a').removeClass('hover');
       $(this).find('a').addClass('hover');
       var page = $(this).attr('data-page');
       $('.subnavbar .pagetype').hide();
       $('.subnavbar .pagetype[data-page=' + page + ']').show();
       $('.subnavbar').stop(true, true).slideDown();
       //setTimeout(function () { $('.subnavbar').stop(true, true).slideDown(); }, 600);

       clearTimeout(subnavtimeout);
   });

   $('.nav li:not(".sub")').hover(function () {
       $('.nav li.sub a').removeClass('hover');
       $('.subnavbar').stop(true, true).slideUp();
   });

   $('.subnavbar').hover(function () {
       clearTimeout(subnavtimeout);
   });

   $('.navbar,.subnavbar').on('mouseleave', function () {
       //$('.nav li.sub a').removeClass('hover');
       subnavtimeout = setTimeout(function () {
           $('.nav li.sub a').removeClass('hover');
           $(".subnavbar").stop(true, true).slideUp();
       }, 800);
   });

});
////end subnavbar

//start marquee
$('.marquee').marquee({
    //speed in milliseconds of the marquee
    duration: 10000,
    //gap in pixels between the tickers
    gap: 100,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 100,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
    pauseOnHover: true
});
//end marquee

///start owlcarousel
//main slider
var time = 7; // time in seconds

var $progressBar,
    $bar,
    isPause,
    tick,
    percentTime;

var slider = $(".slide-wrapper .owl-carousel");

slider.owlCarousel({
	singleItem: true,
    stopOnHover: true,
    transitionStyle : "fade",
    addClassActive: true,
    afterMove:  moved,
    afterInit:  progressBar,
    startDragging : pauseOnDragging
});

//big slider
var bigSlider = $(".big-slide-wrapper .owl-carousel");

bigSlider.owlCarousel({
	singleItem: true,
    stopOnHover: true,
    //transitionStyle : "fadeUp",
    addClassActive: true,
    afterMove:  moved,
    afterInit:  progressBar,
    startDragging : pauseOnDragging
});

//Init progressBar
function progressBar(){
	//build progress bar elements
    buildProgressBar();
    //start counting
    start();
    sliderAnimations();
};

//create div#progressBar and div#bar then prepend to $("#owl-demo")
function buildProgressBar(){
    $progressBar = $("<div>",{
      id:"progressBar"
    });
    $bar = $("<div>",{
      id:"bar"
    });
    $progressBar.append($bar).prependTo(slider);
    $progressBar.append($bar).prependTo(bigSlider);
};

function start() {
    //reset timer
    percentTime = 0;
    isPause = false;
    //run interval every 0.01 second
    tick = setInterval(interval, 10);
};

function interval() {
    if(isPause === false){
      percentTime += 1 / time;
      $bar.css({
         width: percentTime+"%"
       });
      //if percentTime is equal or greater than 100
      if(percentTime >= 100){
        //slide to next item
        slider.trigger('owl.next');
        bigSlider.trigger('owl.next');
      }
    }
};

//pause while dragging
function pauseOnDragging(){
    isPause = true;
};

//moved callback
function moved(){
    //clear interval
    clearTimeout(tick);
    //start again
    start();
    sliderAnimations();
};

//uncomment this to make pause on mouseover
slider.on('mouseover',function(){
	isPause = true;
})
slider.on('mouseout',function(){
    isPause = false;
});
bigSlider.on('mouseover',function(){
	isPause = true;
})
bigSlider.on('mouseout',function(){
    isPause = false;
});

// Custom Navigation Events
$("#main-slide .navigation .next").click(function(){
    slider.trigger('owl.next');
})
$("#main-slide .navigation .prev").click(function(){
    slider.trigger('owl.prev');
})
$("#main-slide .navigation .next").click(function(){
    bigSlider.trigger('owl.next');
})
$("#main-slide .navigation .prev").click(function(){
    bigSlider.trigger('owl.prev');
})

function sliderAnimations(){

    $('#main-slide .owl-item').not('active').find('.caption').each(function(){
      var caption = $(this),
          captionAnimation = caption.data('animation');

      caption.removeClass('animated' + ' ' + captionAnimation);
    });

    $('#main-slide .owl-item.active .caption').each(function(){
      var caption = $(this),
          captionAnimation = caption.data('animation'),
          captionDelay = 0;

      captionDelay = caption.data('delay');

      window.setTimeout(function(){
        caption.addClass('animated' + ' ' + captionAnimation);
      }, captionDelay);
    })
}

//promo slider
var promoTopCarousel = $("#promo-slide1 .owl-carousel");

promoTopCarousel.owlCarousel({
    autoPlay: 5000, //Set AutoPlay to 5 seconds
    //items: 1,
    singleItem: true,
    //stopOnHover: true,
    //transitionStyle : "goDown", //fade, backSlide, goDown, fadeUp
    itemsDesktop: false,
    pagination: false
});

promoTopCarousel.on('click',function(){
    promoTopCarousel.trigger('owl.next');
});

var promoBotCarousel = $("#promo-slide2 .owl-carousel");

promoBotCarousel.owlCarousel({
    autoPlay: 5000, //Set AutoPlay to 5 seconds
    //items: 1,
    singleItem: true,
    //stopOnHover: true,
    //transitionStyle : "goDown", //fade, backSlide, goDown, fadeUp
    itemsDesktop: false,
    pagination: false
});

promoBotCarousel.on('click',function(){
    promoBotCarousel.trigger('owl.next');
});
///end owlcarousel

//start sroll to top
$(function () {
    $('.rollto a.scrolltop').on('click', function () {
        scrollTo('', 500);
    });
    $('.rollto a.scrollbottom').on('click', function () {
        scrollTo('.footer');
    });
    $(window).scroll(function () {
        var scroller = $('.rollto');
        document.documentElement.scrollTop + document.body.scrollTop > 150 ? scroller.fadeIn() : scroller.fadeOut();
    });
});

function scrollTo(name, speed) {
    if (!speed) speed = 300;
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed);
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top
            }, speed);
        }
    }
}
//end sroll to top

// reload captcha
$(function()
{
  $('#captcha-login, #re-captcha-login').click(function(){
      $('#captcha-login').attr('src','/captcha/login?'+Math.random());
  });

  $('#re-captcha-login-popup').click(function(){
      $('#captcha-login-popup').attr('src','/captcha/login?'+Math.random());
  });
})
// end of reload captcha

// achor function
$(function () {
    $('a[href^="#"]').attr('onclick', 'return false');
});
// end achor function

// hover effect on casino page
$('.studio1').hover(function(){
  $('.studio1').addClass('studio-hover');
  $('.std1').addClass('std-hover');
  $('.std-play-btn1').addClass('std-play-btn-hover');
},
function(){
  $('.studio1').removeClass('studio1-hover');
  $('.std1').removeClass('std-hover');
  $('.std-play-btn1').removeClass('std-play-btn-hover');
});

$('.studio2').hover(function(){
  $('.studio2').addClass('studio-hover');
  $('.std2').addClass('std-hover');
  $('.std-play-btn2').addClass('std-play-btn-hover');
},
function(){
  $('.studio2').removeClass('studio-hover');
  $('.std2').removeClass('std-hover');
  $('.std-play-btn2').removeClass('std-play-btn-hover');
});
// end hover effect on casino page

// balance popover
// var popOverSettings = {
//   placement: 'bottom',
//   trigger: 'hover',
//   container: 'body',
//   html: true,
//   selector: '[rel="popover"]',
//   content: function () {
//     return $('#popover-content').html();
//   }
// }
// $('body').popover(popOverSettings);
// end balance popover

$('[rel="popover"]').each(function() {
    // console.log($(this).attr('id'));
    var $pElem= $(this);
    $pElem.popover(
        {
            placement: 'bottom',
            trigger: 'hover',
            container: 'body',
            html: true,
            // selector: '[rel="popover"]',
            content: getPopoverContent($pElem.attr("id"))
        }
    );
});

function getPopoverContent(target) {
    return $("#" + target + "-content").html();
};

// loader
$("#loader").delay(300).fadeOut(8000);
$(".mask").delay(500).fadeOut(8000);
