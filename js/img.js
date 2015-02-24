$(document).ready(function(){
	$content = $('#content');
	$contentWidth = $content.width();

	imageSizer($contentWidth);

	$(window).resize(function(event) {
		imageSizer($content.width());
	});


	function imageSizer(contentWidth){
			var imgs = document.getElementsByClassName("gallery");

			for(var i=0;i<imgs.length;i++){
				$('.image-box').css('height', imgs[i]);
			}

		if(contentWidth <= 600){			
			var targetImgWidth = Math.floor((contentWidth - 50) / 1);
		}
		else if(contentWidth >= 600 && contentWidth <= 800){			
			var targetImgWidth = Math.floor((contentWidth - 70) / 2);
		}
		else if(contentWidth >= 800 && contentWidth <= 1000){
			var targetImgWidth = Math.floor((contentWidth - 90) / 3);
		}
		else if(contentWidth >= 1000 && contentWidth <= 1200){			
			var targetImgWidth = Math.floor((contentWidth - 110) / 4);
		}
		else if(contentWidth >= 1200){			
			var targetImgWidth = Math.floor((contentWidth - 130) / 5);
		}

		$('.gallery').css({'width': targetImgWidth});	
		$('.image-box').css({'width': targetImgWidth+'px'});
	}
});