$(function () {

    resize();
    $(window).resize(function (event) {
        resize();
    });
    $('.timer').each(count);


    $(window).load(function () {
        if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
            new WOW().init()
        }
    })
    $(".class_nav li").click(function () { $(this).addClass("on").siblings().removeClass("on") });

    $(".wow_list li").each(function (e) {
        $(this).attr("data-wow-delay", (e / 10) + "s");

    })


    $(".banner").each(function () {
        if ($(this).find(".item").length > 1) {
            var owl = $(this).find(".owl").owlCarousel({ items: 1, loop: true, autoplay: true });
            owl.on('changed.owl.carousel', function (event) {
                owl.find(".animated").each(function () { $(this).removeClass($(this).attr("data-animation")); })
                owl.find(".owl-item").eq(event.item.index).find(".animated").each(function () { $(this).addClass($(this).attr("data-animation")); });
            })
            $(".banner_cur .prev").click(function () {
                owl.trigger("prev.owl.carousel");
            })
            $(".banner_cur .next").click(function () {
                owl.trigger("next.owl.carousel");
            })
        }
    })

    var team = $(".team_owl .owl").owlCarousel({ items: 1, dots: false, loop: true });
    $(".team_cur .prev").click(function () {
        team.trigger("prev.owl.carousel");
    })
    $(".team_cur .next").click(function () {
        team.trigger("next.owl.carousel");
    })

    var course = $(".course_owl .owl").owlCarousel({ items: 4, dots: false, loop: true, autoWidth: true, margin: 20, center: true });
    $(".course_cur .prev").click(function () {
        course.trigger("prev.owl.carousel");
    })
    $(".course_cur .next").click(function () {
        course.trigger("next.owl.carousel");
    })
    if ($(".link_owl .owl .item").length > 1) {
        var link = $(".link_owl .owl").owlCarousel({ items: 1, dots: false, loop: true });
        $(".link_cur .prev").click(function () {
            link.trigger("prev.owl.carousel");
        })
        $(".link_cur .next").click(function () {
            link.trigger("next.owl.carousel");
        })
    }
    $(".his_owl .owl").owlCarousel({
        items: 6,
        responsive:{
            0:{
                items:3
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        },
        nav: true, navText: ["", ""], dots: false, loop: true
    });

    $(".zxns_list .tit").click(function () {
        $(this).parents("li").toggleClass("on");
        $(this).siblings().stop().slideToggle();
    })
    $(".nav_wap").click(function () { $(".header").toggleClass("h_menu") });

});

/*main*/
//

function font() {


}


/*call*/
//
function resize() {
    var ht = $(window).height();
    $(".curriculum_article").css("padding", ((ht - $(".curriculum_article").height() - $(".header").height() - $(".footer").height() - 70) / 4) + "px 0");
    $(".ht_w").each(function () { $(this).height($(this).width()); });
    $(".text_t_ht").css("top", $(".li_more a").height() + 5);
}

$.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {
        // set options for current element
        var settings = $.extend({}, $.fn.countTo.defaults, {
            from: $(this).data('from'),
            to: $(this).data('to'),
            speed: $(this).data('speed'),
            refreshInterval: $(this).data('refresh-interval'),
            decimals: $(this).data('decimals')
        }, options);

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
            increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
            $self = $(this),
            loopCount = 0,
            value = settings.from,
            data = $self.data('countTo') || {};

        $self.data('countTo', data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
            clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
            value += increment;
            loopCount++;

            render(value);

            if (typeof (settings.onUpdate) == 'function') {
                settings.onUpdate.call(self, value);
            }

            if (loopCount >= loops) {
                // remove the interval
                $self.removeData('countTo');
                clearInterval(data.interval);
                value = settings.to;

                if (typeof (settings.onComplete) == 'function') {
                    settings.onComplete.call(self, value);
                }
            }
        }

        function render(value) {
            var formattedValue = settings.formatter.call(self, value, settings);
            $self.html(formattedValue);
        }
    });
};

$.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
};
function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
}
function formatter(value, settings) {
    return value.toFixed(settings.decimals);
}
