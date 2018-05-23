var ssd = {
	width: 0,
	height: 0,
	fullpageState: 1,
	mobileState: 768,
	fpRendered: false,
	teamSlider: {
		slider: null,
		state: null,
		options: {
			1: {
				activeClassName: "active",
				flankingItems: 2,
				sizeMultiplier: 0.9,
				forcedImageWidth: 262,
				forcedImageHeight: 388,
				movingFromCenter: function () {
					$('.team-slider li.active').removeClass('active');
				},
				movedFromCenter: function () {
					var li = $('.team-slider img.active').parents('li');
					li.addClass('active');
					var index = li.index();
					$('.team-slider li').removeClass('shadow');
					var count = $('.team-slider li').length;
					for (var i=index - 2;i<=index+2;i++) {
						console.log(i + 1, count, count - i - 1)
						var b = i + 1 > count ? Math.abs(count - i) : i;
						$('.team-slider li').eq(b).addClass('shadow');
					}
				}
			},
			2: {
				activeClassName: "active",
				flankingItems: 2,
				sizeMultiplier: 0.9,
				forcedImageWidth: 202,
				forcedImageHeight: 300,
				movingFromCenter: function () {
					$('.team-slider li.active').removeClass('active');
				},
				movedFromCenter: function () {
					var li = $('.team-slider img.active').parents('li');
					li.addClass('active');
					var index = li.index();
					$('.team-slider li').removeClass('shadow');
					var count = $('.team-slider li').length;
					for (var i=index - 2;i<=index+2;i++) {
						console.log(i + 1, count, count - i - 1)
						var b = i + 1 > count ? Math.abs(count - i) : i;
						$('.team-slider li').eq(b).addClass('shadow');
					}
				}
			},
			3: {
				activeClassName: "active",
				flankingItems: 2,
				separation: 20,
				sizeMultiplier: 0.9,
				forcedImageWidth: 150,
				forcedImageHeight: 220,
				movingFromCenter: function () {
					$('.team-slider li.active').removeClass('active');
				},
				movedFromCenter: function () {
					var li = $('.team-slider img.active').parents('li');
					li.addClass('active');
					var index = li.index();
					$('.team-slider li').removeClass('shadow');
					var count = $('.team-slider li').length;
					for (var i=index - 2;i<=index+2;i++) {
						console.log(i + 1, count, count - i - 1)
						var b = i + 1 > count ? Math.abs(count - i) : i;
						$('.team-slider li').eq(b).addClass('shadow');
					}
				}
			}
		}
	}
};

var sectionMobileTemplate = '<div class="mobile-section">'+
								'<div class="mobile-section__content">'+
									'<div class="number">$1</div>'+
									'<div class="title">$2</div>'+
								'</div>'+
							'</div>';

var sectionList = function() {
	$('.js-sections-list .section').each(function(){
		$(this).attr('js-step', Math.abs($(this).index() - (ssd.fullpageState - 1)));
	});
	var topMinus = $('.js-sections-list .section').outerHeight(true) * (ssd.fullpageState - 1) + 40;
	$('.js-sections-list').css('margin-top', '-'+topMinus+'px')
}

var sectionMenuUpdate = function () {
	var h = $('.navbar').outerHeight();
	$('.mobile-section__content').css('top', ssd.height / 2 - 100 + h);
};

var teamSlider = function () {
	var state;
	if (ssd.width > 1400) {
		state = 1;
	} else if (ssd.width > 768) {
		state = 2;
	} else {
		state = 3;
	}

	if (!ssd.teamSlider.slider)	{
		ssd.teamSlider.state = state;
		ssd.teamSlider.slider = $(".team-slider").waterwheelCarousel(ssd.teamSlider.options[ssd.teamSlider.state]);
	} else if (ssd.teamSlider.state !== state) {
		ssd.teamSlider.state = state;
		ssd.teamSlider.slider.reload(ssd.teamSlider.options[ssd.teamSlider.state]);
	}
}

$(document).ready(function() {
	ssd.height = $(window).height();
	ssd.width = $(window).width();


	$('.wrap').fullpage({
		scrollOverflow: true,
		scrollingSpeed: 1000,
		onLeave: function(index, nextIndex, direction){
      $('.scroll').hide();
			ssd.fullpageState = nextIndex;
			sectionList();
			var lastTransform = $('.js-main-background .bg[js-data-id="' + index + '"]').css('transform');
			var slideOutClass = nextIndex - index > 0 ? 'slide-out-bottom' : 'slide-out-top';
			var slideInClass = nextIndex - index > 0 ? 'slide-in-top new' : 'slide-in-bottom new';
			$('.js-main-background .bg[js-data-id="' + index + '"]').attr('style', 'transform: '+lastTransform+' !important;');
			$('.js-main-background .bg[js-data-id="' + index + '"]').addClass(slideOutClass);
			$('.js-main-background .bg[js-data-id="' + nextIndex + '"]').addClass(slideInClass);
			$('.section .js-data-content').removeClass('active');
		},
		afterLoad: function(anchorLink, index){
			if (index === 3 && document.getElementById('videoFirst')) {
				videoFirst.play();
			}
			$('.js-main-background .bg').removeClass('active slide-out-top slide-out-bottom slide-in-bottom slide-in-top new');
			$('.js-main-background .bg').removeAttr('style');
			$('.js-main-background .bg[js-data-id="' + index + '"]').addClass('active');
			$('.section[js-data-id="' + index + '"] .js-data-content').addClass('active');
		},
		afterRender: function () {			
			if (ssd.fpRendered) return;
			ssd.fpRendered = true;
			$('.section[js-data-number]').each(function() {
				var number = $(this).attr('js-data-number');
				var title = $(this).attr('js-data-title');
				var temp = (' ' + sectionMobileTemplate).slice(1);
				temp = temp.replace('$1', number);
				temp = temp.replace('$2', title);
				$(this).append(temp)
			});
			sectionMenuUpdate();
		}
	});

	if ($(".team-slider").length) {
		teamSlider();
	}

	$('.js-tabs-a').click(function(){
		$(this).parents('.js-tabs').find('.js-tabs-body').hide();
		$(this).parents('.js-tabs').find('.js-tabs-a.current').removeClass('current');
		$(this).addClass('current').parents('.js-tabs').find('.js-tabs-body[data-id="'+$(this).attr('data-id')+'"]').show();
		return false;
	});

	$('.js-device-a').click(function(){
		$(this).parents('.js-device').find('.js-device-body').hide();
		$(this).parents('.js-device').find('.js-device-a.current').removeClass('current');
		$(this).addClass('current').parents('.js-device').find('.js-device-body[data-id="'+$(this).attr('data-id')+'"]').show();
		return false;
	});

	$('.navbar-toggle').click(function(){
		$('html').toggleClass('no-scroll');
		$(this).toggleClass('current');
		$('.navbar-nav').toggleClass('current');
	});

	$('.foot-title').click(function(){
		if (ssd.width < ssd.mobileState) {
			$(this).parent().find('ul').toggleClass('active');
		}
	});

	var swiper = new Swiper('.js-news', {
		loop: true,
		speed: 1000,
		spaceBetween: 30,
		pagination: {
			el: '.news-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	var main = document.getElementById('foot-child');
		newDiv = document.getElementById('foot-item');
	var copy =  main.cloneNode(true);
		newDiv.appendChild(copy);
});

$(window).on('resize', function(){
	ssd.height = $(window).height();
	ssd.width = $(window).width();
	sectionMenuUpdate();
	if ($(".team-slider").length) {
		teamSlider();
	}
});

$("body").on( 'scroll', function(){
  console.log('Event Fired');
});

$(document).ready(function(){
	$('.home__android').on('click', function(){
		$('.sitch__point').addClass('sitch__point_android');
		$('.sitch__point').removeClass('sitch__point');
		document.getElementById('videoSecond');
		videoSecond.play();
		
	});
	$('.home__ios').on('click',function() {
		$('.sitch__point_android').addClass('sitch__point');
		$('.sitch__point_android').removeClass('sitch__point_android');
	})

})