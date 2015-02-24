$(document).ready(function(){
	var s = skrollr.init({smoothScrolling: true, forceHeight: true});
	skrollr.menu.init(s, { easing: 'swing', duration: function(currentTop, targetTop){return 800;}});

	$window = $(window);
	$overview = $('#overview');
	$buttonOverview = $('#goToContent');
	$buttonExplore = $('#explore');
	$loadingScreen = $('.loading');

	$overview.imagesLoaded(function(){
		resizeWindow();
		$loadingScreen.fadeOut('fast');
	});


	$window.resize(function() {
		resizeWindow();
	});

	function resizeWindow(){
		windowHeight = $window.height();
		windowWidth = $window.width();

		if(windowHeight <= 700)
			windowHeight = 700;

		$overview.height(windowHeight);
		$buttonOverview.css({top: windowHeight - 70, left: (windowWidth / 2) - 25});
	}


	$window.scroll(function() {
	    if ($(this).scrollTop() >= $(this).height()) {
	        $('#top:hidden').stop(true, true).fadeIn(100);
	        $('#explore-circle:hidden').stop(true, true).fadeIn(100);
	    } else {
	        $('#top').stop(true, true).fadeOut(100);
	    }

	    if($(this).scrollTop() + $(this).height() == $(document).height())
	        $('#explore-circle').stop(true, true).fadeOut(100);
	    else
	        $('#explore-circle:hidden').stop(true, true).fadeIn(100);
	});



	$('#form .tab-links a').on('click', function(e){
		var curr = $(this).attr('href');

		$('tab-links' + curr).show().siblings().hide();

		$(this).parent('li').addClass('active').siblings().removeClass('active');
		e.preventDefault();
	});

});
