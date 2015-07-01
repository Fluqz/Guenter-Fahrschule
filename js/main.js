
var winH = 0;

$(document).ready(function(){

	$window = $(window);
	var wrapper = document.querySelector('#wrapper');
	var openMenu = document.querySelector('.toggle-menu');
	var listItems = document.querySelectorAll('.menu .menu-icons');
	var sections = document.querySelectorAll('.section-to-scroll');
	var menu = document.querySelector('.menu');
	var bluebar = document.querySelector('.blue-side');
	var menuIsOpen = false;
	var mapSwitcher = document.querySelectorAll('.map-switcher');
	var socials = document.querySelector('.header-social');
	var socialIcon = document.querySelector('.show-socials .menu-icons');
	var mapTouch = document.querySelector('.map-touch');

	// if imgs are loaded
	imagesLoaded(wrapper, function(){
		$('#load-screen').removeClass('visible');
		fadeInContent();
	});

	// on resize
	$window.resize(function(event){
		wrapper.style.width = '100%';
		wrapper.style.transition = 'width .0001s';
		closeMenu();
		unloadCrumps();
	});


	$("#owl").owlCarousel({
		singleItem: true,
		items: 1,
		autoPlay: true,
		lazyLoad: true
	});


	/* Smoothscroll all links */
	$('.smooth-scroll').smoothScroll({easing: 'swing'});

	/* Fade in content */
	function fadeInContent(){
	  	$('.fade-in-content').each(function(){
	        var _this = this;
	        var inview = new Waypoint({
	            element: _this,
	            handler: function (direction) {
	                $(this.element).animate({'opacity': 1},300)
	            },
	            offset: '70%'
	        });
	    });
	}


	/* Toggle menu */
	openMenu.addEventListener('click', slideOutMenu, false);

	function slideOutMenu(){
		menu.classList.toggle('menu-visible');
		openMenu.classList.toggle('open-menu');
		if(menuIsOpen){
			wrapper.style.width = '100%';
			menuIsOpen = false;
		}
		else{
			wrapper.style.width = (wrapper.offsetWidth-200) + 'px';
			menuIsOpen = true;
		}
		wrapper.style.transition = 'width .3s cubic-bezier(.74,.19,.69,.85)';
		google.maps.event.trigger(map, 'resize');
	}

	$(this).mouseup(function(event){
		var menuF = $('.menu');
		var socialF = $('.header-social');
		var socialBtnF = $('.show-socials.menu-icons');
		if(!menuF.is(event.target) && menuF.has(event.target).length === 0 && menuIsOpen)
			closeMenu();

		if(!socialF.is(event.target) && socialF.has(event.target).length === 0 &&
			!socialBtnF.is(event.target) && socialBtnF.has(event.target).length === 0){
			socials.classList.remove('social-visible');
			socialIcon.classList.remove('focus-social');
		}
	});

	function closeMenu(){
		menu.classList.remove('menu-visible');
		openMenu.classList.remove('open-menu');
		wrapper.style.width = '100%';
		menuIsOpen = false;

		wrapper.addEventListener('transitionend', function(){
			google.maps.event.trigger(map, 'resize');
		});
	}

	/* breadcrumps on Icons on scroll */
	$window.scroll(function(event) {
		loadCrumps();
		setMapBlock();
		fadeInContent();
	});

	$window.load(function() {
		unloadCrumps();
		loadCrumps();
	});

	function loadCrumps(){
		for(var i = 0; i < listItems.length-1; i++){
			if(sections[i].offsetTop-1 <= $(this).scrollTop() && !hasClass(sections[i], 'already-scrolled')){
				
				listItems[i].classList.add('already-scrolled');
				if(listItems[listItems.length-2].classList.contains('already-scrolled'))
					bluebar.classList.add('filled-blue');
				else if(bluebar.classList.contains('filled-blue'))
					bluebar.classList.remove('filled-blue');
			}
			else{
				listItems[i].classList.remove('already-scrolled');
				bluebar.classList.remove('filled-blue'); return;
			}
			if(i == 5)
				socialIcon.classList.add('fill-social');
			else
				socialIcon.classList.remove('fill-social');
		}
	}

	function unloadCrumps(){
		for(var i = 0; i < listItems.length-1; i++)
			listItems[i].classList.remove('already-scrolled');
		socialIcon.classList.remove('fill-social');
	}

	// Show Social Media
	socialIcon.addEventListener('click', slideOutSocial, false);

	function slideOutSocial(){
		socials.classList.toggle('social-visible');
		socialIcon.classList.toggle('focus-social');
	}


	// GOOGLE MAPS */
	var map;
	google.maps.event.addDomListener(window, 'load', initialize);
	function initialize(){
		var locations = document.querySelectorAll('.map-switcher');
		var isActive;
		var lat = [48.624920, 48.665152];
		var lng = [8.747755, 8.687720];
		var title = ['Günters Fahrschule Wildberg', 'Günters Fahrschule Neubulach'];
		var text = ['<strong>Günters Fahrschule</strong><br/>Talstraße 26<br/>72218 Wildberg',
					'<strong>Günters Fahrschule</strong><br/>Calwer Straße 53<br/>75387 Neubulach'];
		var mapCanvas = document.getElementById('map-canvas');

		for(var i = 0; i < locations.length; i++){
			if(hasClass(locations[i], 'active')){
				var mapOptions = switchLocation(lat[i], lng[i]);
				isActive = i;
				break;
			}
		}

			map = new google.maps.Map(mapCanvas, mapOptions);

		var infoWindow = new google.maps.InfoWindow({content: 'loading'});

		var marker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.Drop,
			title: title[isActive],
			position: new google.maps.LatLng(lat[isActive], lng[isActive]),
			html: text[isActive]
		});
		infoWindow.setContent(marker.html);
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, this);
		});
		infoWindow.open(map, marker);

	}

	function switchLocation(lat, lng){
		var mapOptions = {
			center: new google.maps.LatLng(lat, lng),
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		return mapOptions;
	}

	function hasClass(element, cls) {
	    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	for(var i = 0; i < mapSwitcher.length; i++)
		mapSwitcher[i].addEventListener('click', switchActiveMap, false);

	function switchActiveMap(event){
		for(var i = 0; i < mapSwitcher.length; i++){
			if(hasClass(mapSwitcher[i], 'active')){
				mapSwitcher[i].classList.remove('active');
			}
			else 
				mapSwitcher[i].classList.add('active');
		}
		initialize();
	}

	mapTouch.addEventListener('click', toggleMapTouch, false);

	function toggleMapTouch(){
		mapTouch.classList.toggle('block-map');
	}
	function setMapBlock(){
		mapTouch.classList.add('block-map');
	}
});