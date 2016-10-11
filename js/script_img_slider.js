$(document).ready(function() {

	/***  Vegas - background slider  ***/
	var backgroundList = [];

	/* Build the background list with href of links  */
	$('.background-images-preloaded img').each(function() {
		backgroundList.push({
			src: $(this).attr('src'),
			fade: 1500
		});
	});
	$.vegas('slideshow', {
		delay: 9000,
		preload: true,
		loading: false,
		backgrounds: backgroundList
	});


}); //document ready