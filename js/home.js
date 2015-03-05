
$(document).ready(function(){

	$showDetails = $('.open-close-details');
	var container = document.querySelector('#image-container');
	$imageContainer = $('#image-container');
	var msnry = new Masonry( container, {
			itemSelector: '.item',
			columnWidth: '.item',
		    gutter: 10,
	});
	

	imagesLoaded(container, function(){
		msnry.layout();
	});
	
	/*new AnimOnScroll( document.getElementById( 'grid' ), {
		minDuration : 0.4,
		maxDuration : 0.7,
		viewportFactor : 0.2
	});*/

	$showDetails.on('click', function(){
		$(this).parent().next().toggle();
		$(this).children('i').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');;
		msnry.layout();

	});

	$('#close-register-ad').on('click', function(event) {
		event.preventDefault();
		$('#register-ad').slideUp(100);
	});
	

	$('.close-description').on('click', function(event) {
		event.preventDefault();
		$(this).parent().hide();
		msnry.layout();
		$(this).parent('div .image-details').prev('div .image').children('div .open-close-details').children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
	});

	// Front gif anchor scrolling
	$('#front-animation a').smoothScroll();
});