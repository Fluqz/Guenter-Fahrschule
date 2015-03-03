
$(document).ready(function(){
	var s = skrollr.init({smoothScrolling: true, forceHeight: false});

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


	// Get window sizes 
	function getSize(){
		winH = $window.height();
		winW = $window.width();


		if(winH >= 500){
			// FOOTER ABSOLUTE
		}
	}
	
	// resize on resize
	$window.resize(function(event){
		getSize();
	});




	// Fade in/out #top button
	$window.scroll(function(){
	    if ($(this).scrollTop()){
	        $('#top:hidden').stop(true, true).fadeIn('fast');
	    } else {
	        $scrollToTop.stop(true, true).fadeOut('fast');
	    }
	});

	// Smooth scroll on #top
	$scrollToTop.on('click', function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 1000);
	});


	// Show login form
	$loginBtn.bind('click', function(event){
		event.preventDefault();
		$('#signupField').hide();
		$('#loginField').show();
		$('.front-login').addClass('log-active');
		$('.front-signup').removeClass('log-active');
		$loginField.animate({'top':'10px'});
		$loginFieldOut=true;
		document.getElementById('loginDataInput').focus();
	});

	$signupBtn.bind('click', function(event) {
		event.preventDefault();
		$('#loginField').hide();
		$('#signupField').show();
		$('.front-signup').addClass('log-active');
		$('.front-login').removeClass('log-active');	
		$loginField.animate({'top':'10px'});
		$loginFieldOut=true;	
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
	        loginField.animate({'top': '-300px'});
	        $loginFieldOut=false;
	    }

	    // Hide login form clicking on X
	    if(close.is(e.target)){
	        loginField.animate({'top': '-300px'});
	        $loginFieldOut=false;

	        document.getElementById('loginDataInput').blur();
	        var loginForm = document.getElementById('loginField');
	        loginForm.reset();
	        document.getElementById('signupDataInput').blur();
	        var signupForm = document.getElementById('signupField');
	        signupForm.reset();
	    }

	    // Hide login form on Sidebar pullout
	    if(sidebar.is(e.target)){
	        loginField.animate({'top': '-300px'});
	        $loginFieldOut=false;
	    }
	});

	// Switching tabs
	$('.front-login').on('click', function(event) {
		event.preventDefault();
		$('#signupField').hide();
		$('#loginField').show();
		$(this).addClass('log-active');
		$('.front-signup').removeClass('log-active');
		document.getElementById('loginDataInput').focus();
	});

	$('.front-signup').on('click', function(event) {
		event.preventDefault();
		$('#loginField').hide();
		$('#signupField').show();
		$(this).addClass('log-active');
		$('.front-login').removeClass('log-active');
		document.getElementById('signupDataInput').focus();
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


	$getInfo.bind('mouseover', function(event) {
		createInfobox($(this));
	});

	$getInfo.bind('mouseleave', function(event) {
		$infoBox.stop(false, false).fadeOut(150);
	});

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
	offsetLeft = (offset.left + (infoEleWidth / 2)) - (infoBoxWidth / 2) - 11;
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