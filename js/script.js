
$(document).ready(function(){
	var s = skrollr.init({smoothScrolling: true, forceHeight: true});

	$window = $(window);
	$body = $('body');
	$contentWrapper = $('#content-wrapper');
	$content = $('#content');
	$sidemenuBtn = $('#sidemenu-button');
	$sidebarOut = false;
	$scrollToTop = $('#top');
	$loginField = $('#login');
	$loginBtn = $('#loginBtn');
	$signupBtn = $('#signupBtn');
	$loginFieldOut = false;

	getSize();
	initMenuSidebarButton($sidebarOut);

	// Get window sizes 
	function getSize(){
		winH = $window.height();
		winW = $window.width();

		$contentWrapper.width(winW - 280);
		$content.width(winW-280);


		if(winH >= 500){
			// FOOTER ABSOLUTE
		}
	}
	
	// resize on resize
	$window.resize(function(event){
		getSize();
		initMenuSidebarButton($sidebarOut);
	});

	// Initialize Sidebar
	function initMenuSidebarButton(sidebarOut){
		if(!$sidebarOut){
			$sidemenuBtn.css({'right': '0px'});
		}
		else{
			$sidemenuBtn.css({'right': '290px'});		
		}
	}

	// slide in Sidebar Menu
	$sidemenuBtn.on('click', function(event){
		event.preventDefault();
		toggleSidemenu();
	});

	// Toggleing sidebar function
	function toggleSidemenu(){
		if(!$sidebarOut){
			$('#artistSidebar').addClass('sidemenu-shadow').animate({'right': '0px'}, 700);
			$sidemenuBtn.animate({'right': '290px'}, 700);
			$scrollToTop.animate({'right': '315px'}, 700);
			$sidebarOut=true;
			document.getElementById('artistSearch').focus();
		}
		else{			
			$('#artistSidebar').animate({'right': '-300px'}, 700, function(){
				$(this).removeClass('sidemenu-shadow');
			});
			$sidemenuBtn.animate({'right': '0px'}, 700);
			$scrollToTop.animate({'right': '25px'}, 700);
			$sidebarOut = false;
		}
	}

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
	    var button = $loginBtn;
	    var sidebar = $('#artistSidebar');
	    var close = $('#login .close i');

	    // Toggle sidemenu clicken anywhere else 
	    if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0 &&
	    	!button.is(e.target) && button.has(e.target).length === 0 && $sidebarOut){
	    	toggleSidemenu();
	        document.getElementById('artistSearch').blur();
	    }

	    // Hide login form clicking anywhere else
	    if (!loginField.is(e.target) && loginField.has(e.target).length === 0 &&
	    	!button.is(e.target) && button.has(e.target).length === 0 && $loginFieldOut){
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

});

