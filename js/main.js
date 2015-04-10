
$(document).ready(function(){
	var s = skrollr.init({smoothScrolling: true, forceHeight: false});

	$window = $(window);
	$menu = $('#menu');
	$section = $('section');
	$body = $('body');


	$body.imagesLoaded(function(){
		setTimeout(function(){
			
			getWindowSize();
			menuPositioning();

			$body.removeClass('loading').addClass('loaded');
		});
	});


	function getWindowSize(){
		winH = $window.height();

		if(winH < 600)
			winH = 600;

		$section.height(winH);
	}

	function menuPositioning(){
		var position = ($window.height() / 2) - ($menu.height() / 2);

		$menu.css('top', position + 'px').show('fast');;
	}

	$window.resize(function(event) {
		getWindowSize();
		menuPositioning();
	});

});