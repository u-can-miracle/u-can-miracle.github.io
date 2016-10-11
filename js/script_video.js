$(document).ready(function() {

	/*** Background Video ***/

	// BigVideo (local files)  
	
		var BV = new $.BigVideo({useFlashForFirefox: false});
		BV.init();
		BV.show([
				{type: "video/mp4", src: "videos/waterlily.mp4" },
				{type: "video/webm", src: "videos/waterlily.webm" }
			],
			{ambient:true}, 
			{ doLoop: true }
		);
		$("#big-video-vid_html5_api").fitVids();

	

	/*  Tubular - youtube video  */

	// $('body').tubular({ videoId: '0Bmhjf0rKe8' });
	// $("body").fitVids();


}); //document ready