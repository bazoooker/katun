			$(document).ready(function(){
				$('.menubutton').click(function(){
					$('.mobilemenu').animate({    top: "0%",
					}, 500);
				})
				$('.mobilemenu .close').click(function(){
					$('.mobilemenu').animate({    top: "-200%",}, 500);
				})
				$('.slide, #slider, #content').click(function(){
					$('.mobilemenu').animate({    top: "-200%",}, 500);
				});
			});
