$(document).ready(function() {
    /***  Single Item Slider  ***/
    $('#slider .slider_container').slick({
        infinite: true,
        dots: true, // bellows navigations buttons
        arrows: false, // left and right navigations arrows
        slidesToScroll: 1, // how items slide
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        speed: 600, // slide/Fade animation speed
        swipe: true, // enable swiping
        cssEase: 'cubic-bezier(.05,0,0,.83)'
    });


    /***  Center Mode Slider  ***/
    $('.center-mode').slick({
        dots: true,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        /* Side padding when in center mode (px or %) */
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true,
        swipe: true,
        pauseOnHover: true,
        speed: 600,
        cssEase: 'cubic-bezier(.05,0,0,.83)',
        responsive: [{
            breakpoint: 975, // browser window width wiout scrollbar
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '0px',
                dots: true,
                slidesToShow: 1,
                pauseOnHover: true
            }
        }, {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '0px',
                dots: true,
                slidesToShow: 1,
                pauseOnHover: true
            }
        }]
    });


    /** Section with logotypes **/
    $('#logo-slider').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: false,
        dots: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'cubic-bezier(.05,0,0,.83)',
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: true
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true
            }
        }]
    });


    /***  SMOOTH SCROLL  ***/
    var scrollAnimationTime = 750,
        scrollAnimation = 'easeInOutExpo';
    $('a.scrollto').bind('click.smoothscroll', function(event) {
        event.preventDefault();
        var target = this.hash;
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function() {
            window.location.hash = target;
        });
    });


    /***  Settings offset scroll  ***/
    /**
     * Check an href for an anchor. If exists, and in document, scroll to it.
     * If href argument omitted, assumes context (this) is HTML Element,
     * which will be the case when invoked by jQuery after an event
     */
    function scroll_if_anchor(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");

        // If href missing, ignore
        if (!href) return;

        // You could easily calculate this dynamically if you prefer
        var fromTop = 50;

        // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
        // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
        if (href.charAt(0) == "#") {
            var $target = $(href);

            // Older browsers without pushState might flicker here, as they momentarily
            // jump to the wrong position (IE < 10)
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - fromTop
                }, 2500);
                if (history && "pushState" in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
        }
    }

    /* When our page loads, check to see if it contains and anchor */
    scroll_if_anchor(window.location.hash);

    // Intercept all anchor clicks
    $("body").on("click", "a", scroll_if_anchor);


    /***   Animation wow? when IE <= 8 WOW() don't init   ***/
    function getInternetExplorerVersion()
    // Returns the version of Internet Explorer or a -1
    // (indicating the use of another browser).
    {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
            if (re.exec(ua) !== null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    /* Disable WOW animation in IE < 9*/
    if (getInternetExplorerVersion() < 0 || getInternetExplorerVersion() > 8) {
        wow = new WOW({
            mobile: false // Disable WOW animate on mobile
        });
        wow.init();
    }

    /***  Sticy navbar  ***/
    $(".navbar-fixed-top").waypoint('sticky', { // fiil background navbar when scrolled #home section - .nav height
        offset: -($(".navbar-fixed-top").height())
    });


    /* Fill transparent Navbar */
    $('.navbar-toggle').click(function() {
        $('.navbar-default').toggleClass('fillNavBar');
    });
    $('.navbar-default a').click(function() {
        $('.navbar-default').removeClass('fillNavBar');
    });


    /* Stop video */
    $('#portfolio .btn').on('hidden.bs.modal', function() {
        callPlayer('yt-player', 'stopVideo');
    });
    /**/


    /***  Validation  ***/
    // Download
    $('#subscribe_form').validate({
        rules: {
            describe_email: {
                minlength: 3,
                maxlength: 15,
                required: true
            }
        },
        messages: {
            describe_email: {
                required: "",
                email: ""
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'has-error glyphicon glyphicon-remove form-control-feedback',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    // Contact Us
    $('#contact-form').validate({
        rules: {
            name: {
                minlength: 3,
                maxlength: 15,
                required: true
            },
            email: {
                minlength: 3,
                maxlength: 15,
                required: true
            },
            message: {
                required: true
            },
            subject: {
                required: true
            }
        },
        messages: {
            name: {
                required: "",
                email: ""
            },
            email: {
                required: "",
                email: ""
            },
            subject: {
                required: "",
                email: ""
            },
            message: {
                required: "",
                email: ""
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'has-error glyphicon glyphicon-remove form-control-feedback',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    /***  Navbar hide with Click menu on mobile mode  ***/
    $('.nav li a').on('click', function() {
        $('.navbar-collapse.in').collapse('hide');
    });


    /***  Switchclass in theme menu   ***/
    $('#theme_switch li a').on('click', function() {
        $('#theme_switch li a').removeClass('switch-active');
        $(this).addClass('switch-active');
    });


    /***  LightBox gallery  ***/
    $('.popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true // lightbox gallery enable
        }
    });


    /***  Sticky #top button  ***/

    $("#to-top").waypoint('sticky', {
        offset: -($("#home").height())
    });

    /* Counter */
    if (jQuery().appear) {
        jQuery('.counter').appear();
        jQuery('body').on('appear', '.counter', function(e, $affected) {
            jQuery($affected).each(function(index) {
                if (jQuery(this).hasClass('counted')) {
                    return;
                } else {
                    jQuery(this).countTo().addClass('counted');
                }
            });
        });
    }


    /***  Preload animation  ***/
    $(window).load(function() {

        /***  Google map  ***/
        var myLatlng = new google.maps.LatLng(40.6843528, -74.1159731);
        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        // To add the marker to the map, use the 'map' property
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.7513528, -73.9599731),
            map: map,
            title: "It's here"
        });


        /*** Portfolio gallery ***/
        $('.isotope-container').isotope({
            itemSelector: '.mix'
        });

        $('#portfolio ul a').click(function() {

            $('#portfolio ul a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');

            $('.isotope-container').isotope({
                filter: selector,
                animationOptions: {
                    duration: 2000,
                    queue: false
                }
            });
            return false;

        });


        $(window).smartresize(function() {
            var selector = $(this).attr('data-filter');
            $('.isotope-container').isotope({
                filter: selector,
                animationOptions: {
                    duration: 2000,
                    queue: false
                }
            });
        });


        $(window).smartresize();


        $('.preloader').fadeOut(1000); // set duration in brackets
    });


    $('.ytvideo').on('hidden.bs.modal', function() {

        $('.yt-modal').each(function(index, el) {
            callPlayer($(el).attr('id'), 'stopVideo');
        });

    });

}); //document ready