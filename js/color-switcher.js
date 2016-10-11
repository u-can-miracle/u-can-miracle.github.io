$(document).ready(function() {
	/* ======================
===  Style switcher  ===
===================== */
	var toggle = $('.color-switcher .toggle');
	var colorTile = $('.color-switcher a');
	toggle.click(function() {
		$(this).parent().toggleClass('open');
	});

	colorTile.click(function(e) {
		colorTile.removeClass('current');
		$(this).addClass('current');
		var color = $(this).attr('data-theme');
		$('head link.color-theme').attr('href', 'css/' + color + '.css');
		e.preventDefault();
	});
});