(function ($) {
    "use strict";
    window.onload = function() {
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                console.log('Spinner trouvé, suppression de la classe show.');
                $('#spinner').removeClass('show');
            } else {
                console.log('Spinner non trouvé.');
            }
        }, 500);
    };

    spinner();
};

    
    
    
    


    // Initiate WOW.js
    $(document).ready(function () {
        if (typeof WOW === 'function') {
            new WOW().init();
        } else {
            console.warn('⚠️ WOW.js is not loaded.');
        }
    });

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('#navbar-logo').attr('src', "../../assets/images/Datalake.png");
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('#navbar-logo').attr('src', '../../assets/images/Datalake.png');
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    $(document).ready(function () {
    $('.dropdown-toggle').on('click', function () {
        console.log("✅ Dropdown cliqué");
    });

    $('.dropdown').hover(
        function () {
            console.log("🖱️ Hover sur le dropdown");
        },
        function () {
            console.log("❌ Fin du hover");
        }
    );
});


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    $(document).ready(function () {
        // Sélecteurs pour le dropdown
        const $dropdown = $(".dropdown");
        const $dropdownToggle = $(".dropdown-toggle");
        const $dropdownMenu = $(".dropdown-menu");
        const showClass = "show";
    
        // Logique du dropdown sur hover
        $(window).on("load resize", function () {
            if (this.matchMedia("(min-width: 992px)").matches) {
                // Comportement sur hover pour écrans larges
                $dropdown.hover(
                    function () {
                        const $this = $(this);
                        $this.addClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "true");
                        $this.find($dropdownMenu).addClass(showClass);
                    },
                    function () {
                        const $this = $(this);
                        $this.removeClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "false");
                        $this.find($dropdownMenu).removeClass(showClass);
                    }
                );
            } else {
                // Désactive le hover sur petits écrans
                $dropdown.off("mouseenter mouseleave");
            }
        });
    });
    
    
    

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Facts Counter
    $(document).ready(function () {
        if ($.fn.counterUp && $.fn.waypoint) {
            $('[data-toggle="counter-up"]').counterUp({
                delay: 10,
                time: 2000
            });
        } else {
            console.warn('⚠️ CounterUp or Waypoints is not loaded.');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(document).ready(function () {
        if ($.fn.owlCarousel) {
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
                loop: true,
                center: true,
                margin: 30,
                responsive: {
                    0: { items: 1 },
                    576: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });

            // Vendor carousel
            $('.vendor-carousel').owlCarousel({
                loop: true,
                margin: 45,
                dots: false,
                autoplay: true,
                smartSpeed: 1000,
                responsive: {
                    0: { items: 2 },
                    576: { items: 4 },
                    768: { items: 6 },
                    992: { items: 8 }
                }
            });
        } else {
            console.warn('⚠️ OwlCarousel is not loaded');
        }
    });

})(jQuery);
