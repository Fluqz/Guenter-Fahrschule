
$(document).ready(function(){
	var s = skrollr.init({smoothScrolling: true, forceHeight: false, easing: 'sqrt'});

	$window = $(window);
	$body = $('body');
	$contentWrapper = $('#content-wrapper');
	$content = $('#content');
	$scrollToTop = $('#top');
	$loginField = $('#login');
	$loginBtn = $('#loginBtn');
	$signupBtn = $('#signupBtn');
	$loginFieldOut = false;
	$getInfo = $('.getInfobox');
	$infoBox = $('.info-box');
	$infoArrow = $('.info-arrow-down');
	$footer = $('footer');

	$content.imagesLoaded(function(){		
		getSize();
	});

	// Get window sizes 
	function getSize(){
		var winH = $window.height();
		var winW = $window.width();


		if(winH <= 600){
			winH = 600;
		}

		$footer.height(winH);
	}
	
	// resize on resize
	$window.resize(function(event){
		getSize();
	});



	// Detect Adblock
	/*if (document.getElementById("tester") == undefined){ 
		document.write(' TEXT TO DISPLAY IF ADBLOCK IS ACTIVE');
	}*/


	// Fade in/out #top button
	$window.scroll(function(){
	    if ($(this).scrollTop()/* && $(this).scrollTop() + $footer.height() - 100 < $footer.offset().top*/){
	        $('#top:hidden').stop(true, true).fadeIn('fast');
	    } else {
	        $scrollToTop.stop(true, true).fadeOut('fast');
	    }

	    if($window.scrollTop() + $window.height() >= $(document).height() -50){
			$('#footer-header').stop(false, false).animate({'bottom': '0px'}, 200);
		}
		else if($window.scrollTop() + $window.height() < $(document).height()){
			$('#footer-header').stop(false, true).animate({'bottom': '-60px'}, 200);
		}
	});

	// Smooth scroll on #top
	$scrollToTop.smoothScroll();
	$('#footer-content .chevron').smoothScroll();



	// Show login form
	$loginBtn.bind('click', function(event){
		event.preventDefault();
		$('#signupField').fadeOut('fast',function(){
			$('#loginField').fadeIn('fast');
		});
		$('.front-login').addClass('log-active');
		$('.front-signup').removeClass('log-active');
		$loginField.animate({'top':'10px'}, {easing: 'easeInOutBack'});
		$loginFieldOut=true;
		document.getElementById('loginDataInput').focus();
	});

	$signupBtn.bind('click', function(event) {
		event.preventDefault();
		$('#loginField').fadeOut('fast',function(){
			$('#signupField').fadeIn('fast');
		});
		$('.front-signup').addClass('log-active');
		$('.front-login').removeClass('log-active');	
		$loginField.animate({'top':'10px'}, {easing: 'easeInOutBack'});
		$loginFieldOut=true;	
		document.getElementById('signupDataInput').focus();
	});

	// Switching tabs
	$('.front-login').on('click', function(event) {
		event.preventDefault();
		$('#signupField').fadeOut('fast',function(){
			$('#loginField').fadeIn('fast');
		});
		$(this).addClass('log-active');
		$('.front-signup').removeClass('log-active');
		document.getElementById('loginDataInput').focus();
	});

	$('.front-signup').on('click', function(event) {
		event.preventDefault();
		$('#loginField').fadeOut('fast',function(){
			$('#signupField').fadeIn('fast');
		});
		$(this).addClass('log-active');
		$('.front-login').removeClass('log-active');
		document.getElementById('signupDataInput').focus();
	});

	// Click animations
	$(this).mouseup(function (e){
	    var loginField = $loginField;
	    var loginBtn = $loginBtn;
	    var signupBtn = $signupBtn;
	    var sidebar = $('#artistSidebar');
	    var close = $('#login .close i');
	    var items = $('.item');

	    // Hide login form clicking anywhere else
	    if (!loginField.is(e.target) && loginField.has(e.target).length === 0 &&
	    	!loginBtn.is(e.target) && loginBtn.has(e.target).length === 0 &&
	    	!signupBtn.is(e.target) && signupBtn.has(e.target).length === 0 && $loginFieldOut){
	        loginField.animate({'top': '-300px'}, {easing: 'easeInOutBack'});
	        $loginFieldOut=false;
	    }

	    // Hide login form clicking on X
	    if(close.is(e.target)){
	        loginField.animate({'top': '-300px'}, {easing: 'easeInOutBack'});
	        $loginFieldOut=false;

	        document.getElementById('loginDataInput').blur();
	        var loginForm = document.getElementById('loginField');
	        loginForm.reset();
	        document.getElementById('signupDataInput').blur();
	        var signupForm = document.getElementById('signupField');
	        signupForm.reset();
	    }
	});



    // Search field
	$('.searchbox-input').prop('required', 'true');
	var submitIcon = $('.searchbox-icon');
	var inputBox = $('.searchbox-input');
	var searchbox = $('.searchbox');
	var isOpen = false;
	submitIcon.click(function() {
		if(!isOpen){
			searchbox.addClass('searchbox-open');
			inputBox.focus();
			isOpen = true;
		} else{
			searchbox.removeClass('searchbox-open');
			inputBox.focusout();
			if(filled())
				searchbox.submit();
			isOpen = false;
		}
	});

	$('#search').keyup(function() {
		buttonUp();
	});


	submitIcon.mouseup(function() {
		return false;
	});
	searchbox.mouseup(function() {
		return false;
	});
	$(document).mouseup(function() {
		if(isOpen && !filled()){

			$('.searchbox-icon').css('display', 'block');
			submitIcon.click();
		}
	});


	function filled(){
		var inputVal = $('.searchbox-input').val();
		inputVal = $.trim(inputVal).length;

		if(inputVal !== 0)
			return true;
		else
			return false;
	}

	function buttonUp(){
		var inputVal = $('.searchbox-input').val();
		inputVal = $.trim(inputVal).length;

		if(inputVal !== 0){
			$('.searchbox-icon').css('display', 'none');
		} else{
			$('.searchbox-input').val('');
			$('.searchbox-icon').css('display', 'block');
		}
	}

	// Infobox
	$getInfo.bind('mouseover', function(event) {
		createInfobox($(this));
	});

	$getInfo.bind('mouseleave', function(event) {
		$infoBox.stop(false, false).fadeOut(150);
	});



	function createInfobox(jqElement){
		var offset = jqElement.offset();
		var offsetTop,
			offsetLeft,
			arrowOffsetLeft,
			infoArrowHeight = 7,
			infoArrowWidth = 6,
			infoBoxHeight = Math.floor($infoBox.height()),
			infoBoxWidth = $infoBox.width(),
			infoEleHeight = Math.floor(jqElement.height()),
			infoEleWidth = Math.floor(jqElement.width()),
			arrowUpPos = -6,
			arrowDownPos = -6;

		offsetTop = offset.top - (infoBoxHeight + 20) - infoArrowHeight;
		offsetLeft = (offset.left + (infoEleWidth / 2)) - (infoBoxWidth / 2) - 12;
		arrowOffsetLeft = (infoBoxWidth / 2) + infoArrowWidth;

		if(offsetTop <= 0){
			offsetTop = offset.top + infoEleHeight + infoArrowHeight;
			$infoArrow.removeClass('info-arrow-down').addClass('info-arrow-up');
		}
		else{
			if($infoArrow.hasClass('info-arrow-up'))
				$infoArrow.removeClass('info-arrow-up').addClass('info-arrow-down');
		}
		
		$infoBox.css({'top': offsetTop + 'px', 'left': offsetLeft + 'px'}).stop(false, false).fadeIn(150);
		$infoArrow.css('left', arrowOffsetLeft + 'px');
	}

	Modernizr.addTest('mediaBtn',function() {

		var div = document.createElement('div');

		if ('mediaBtn' in div.style)
		  return true;

		'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g,function(val) { 
		  if (val+'mediaBtn' in div.style) return true;
		});

	});
});
