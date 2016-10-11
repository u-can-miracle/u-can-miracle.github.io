$(document).ready(function() {
	
	$('.focus').lettering();

	/***  Preload animation  ***/
	$(window).load(function() {
		$('.preloader').fadeOut(1000); // set duration in brackets
	});

}); //document ready