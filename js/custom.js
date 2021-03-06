$(function () {
  var windowH = $(window).height();
  windowH = windowH - 50;
  $('.mobile-f-el .panel').css({
    'height': windowH + 'px'
  });
  $(window).resize(function () {
    var windowH = $(window).height();
    windowH = windowH - 50;
    $('.mobile-f-el .panel').css('height', windowH + 'px');

  })
});






var updateQueryStringParam = function (key, value) {

  var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
    urlQueryString = document.location.search,
    newParam = key + '=' + value,
    params = '?' + newParam;

  // If the "search" string exists, then build params from it
  if (urlQueryString) {

    updateRegex = new RegExp('([\?&])' + key + '[^&]*');
    removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

    if (typeof value == 'undefined' || value == null || value == '') { // Remove param if value is empty

      params = urlQueryString.replace(removeRegex, "$1");
      params = params.replace(/[&;]$/, "");

    } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it

      params = urlQueryString.replace(updateRegex, "$1" + newParam);

    } else { // Otherwise, add it to end of query string

      params = urlQueryString + '&' + newParam;

    }

  }
  window.history.replaceState({}, "", baseUrl + params);
};

jQuery(window).load(function () {


  // Same height boxes
  jQuery.fn.sameheight = function () {

    var maxHeight = 0;

    jQuery(this).each(function () {

      // reset the height
      jQuery(this).css({
        'height': 'auto'
      });
      var thisHeight = jQuery(this).height();

      if (thisHeight > maxHeight) {
        maxHeight = thisHeight;
      }

    });

    jQuery(this).each(function () {
      jQuery(this).height(maxHeight);
    });

  };


  jQuery('.new-listing .new-listing-wrap a.h-car-link').sameheight();
  jQuery('.home-bottom .home-bottom-item').sameheight();
  jQuery('.cat-body .new-listing').sameheight();

  jQuery(window).resize(function () {

    jQuery('.new-listing .new-listing-wrap a.h-car-link').sameheight();
    jQuery('.home-bottom .home-bottom-item').sameheight();
    jQuery('.cat-body .new-listing').sameheight();

  });


});

(function ($) {
  $.extend({
    initPageFuncs: function () {

      // Ajax Wish List
      $.addToWishList({
        'class': 'wishlist_toggle',
        'textclass': 'wishlist_text',
        'htmlon': 'Remove From Wishlist',
        'htmloff': 'Add To Wishlist',
        'tooltip_css': 'whltooltips'
      });
      // Ajax Add To Cart
      $.addToCartInit({
        'cart_id': 'cartcontents',
        'target_id': 'cartcontentsheader',
        'image_rel': 'itmimg'
      });

      $(".disp_ajax_templ").unbind();
      $(".disp_ajax_templ").change(function () {
        var sku = $(this).val();
        var rel = $(this).attr('rel');
        $.load_ajax_template(rel, {
          'sku': sku,
          'showloading': true,
          'procdata': 'n'
        }, {
          onLoad: function () {
            $.initPageFuncs();
          }
        });
      });
      // This renders the instant search results - edit design of ajax results here
      $.initSearchField({
        'result_header': '<ul class="nav nav-list">',
        'result_body': '<li><a href="##url##" search-keyword="##keyword##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
        'result_footer': '</ul>',
        'category_header': '<ul class="nav nav-list">',
        'category_body': '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
        'category_footer': '</ul>'
      });
    },

    // For child product multi-add to cart function
    checkValidQty: function () {
      var found = 0;
      $("#multiitemadd :input").each(function () {
        if ($(this).attr('id').match(/^qty/)) {
          if ($(this).val() > 0) {
            found = 1;
          }
        }
      });
      if (found == 0) {
        $.fancybox("Please specify a quantity before adding to cart");
        return false;
      }
      return true;
    },

    modQtyByMulti: function (obj, act) {
      var mul = 1;
      var maxm;
      var minm = 0;
      var objid = obj.replace(/^qty/, '');
      if ($('#qty' + objid).length > 0) {
        if ($('#multiplier_qty' + objid).length > 0) {
          mul = $('#multiplier_qty' + objid).val();
        }
        if ($('#min_qty' + objid).length > 0) {
          minm = $('#min_qty' + objid).val();
        }
        if ($('#max_qty' + objid).length > 0) {
          maxm = $('#max_qty' + objid).val();
        }

        var cur = $('#' + obj).val();
        if (isNaN(cur)) {
          cur = 0;
        }

        if (act == 'add') {
          cur = parseInt(cur) + parseInt(mul);
          if (!isNaN(maxm) && cur > maxm) {
            cur = maxm;
          }
        } else if (act == 'subtract') {
          cur = parseInt(cur) - parseInt(mul);
          if (cur < minm) {
            cur = minm;
          }
        }

        $('#qty' + objid).val(cur);
      }
    }
  });
})(jQuery);

$(document).ready(function () {

  var windowWidth = $(window).width();
  $('.thumb .new-listing .new-listing-wrap').click(
    function () {

      if (windowWidth < 768) {
        $(this).parent().addClass('hover-list');
      } else if (($(window).width() >= 768) && ($(window).width() <= 1024)) {
        $('.new-listing').removeClass('hover-list');
        $(this).parent().addClass('hover-list');
      }
    }
  );

  $('.thumb .new-listing .close-mobile').click(
    function () {
      $(this).closest('.new-listing').removeClass('hover-list');
    }
  );


  var windowWidth = $(window).width();


  $('.new-listing').hover(
    function () {
      if (windowWidth > 1024) {
        $(this).addClass('hover-list');
      }
    },
    function () {
      if (windowWidth > 1024) {
        $(this).removeClass('hover-list');
      }
    }

  );







  $(window).on('resize', function (e) {
    var windowWidth = $(window).width();
    $('.thumb .new-listing .new-listing-wrap').click(
      function () {

        if (windowWidth < 768) {
          $(this).parent().addClass('hover-list');
        } else if (($(window).width() >= 768) && ($(window).width() <= 1024)) {
          $('.new-listing').removeClass('hover-list');
          $(this).parent().addClass('hover-list');
        }
      }
    );

    $('.thumb .new-listing .close-mobile').click(
      function () {
        $(this).closest('.new-listing').removeClass('hover-list');
      }
    );


    var windowWidth = $(window).width();

    if (windowWidth > 1024) {
      $('.new-listing').hover(
        function () {
          $(this).addClass('hover-list');
        },
        function () {

          $(this).removeClass('hover-list');

        }

      )
    }

  })
  /*
    $('.new-listing .new-listing-wrap').click(

    if ($(window).width() < 768) {
   

      $('a.h-car-link').click(
        function (e) {
          e.preventDefault();
        }
      );


      $('.new-listing .new-listing-wrap').click(
        function () {
          $('.new-listing').addClass('hover-list');
          $(this).parent().toggleClass('hover-list');
        }
      );
      $('.close-mobile').click(
        function (e) {
          e.preventDefault();
          $(this).closest('.new-listing').removeClass('hover-list');
        }
      );
    } else if (($(window).width() >= 768) && ($(window).width() <= 1024)) {

      $('.new-listing').click(
        function () {
          $('.new-listing').removeClass('hover-list');
          $(this).toggleClass('hover-list');
        }
      );

    } else {
      $('.new-listing').hover(
        function () {
          $(this).addClass('hover-list');
        },
        function () {
          $(this).removeClass('hover-list');
        }
      );
    }*/

  /*
    $(window).resize(function () {
      if ($(window).width() > 769) {
        $(".tab-pane:first").show();
      }
    });*/

  $(".wrapper-qty .num-wrapper").append('<div class="inc button">+</div><div class="dec button">-</div>');

  $(".wrapper-qty .button").on("click", function () {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
      }
    }

    $button.parent().find("input").val(newVal);

  });

  $(".tab-pane").hide();
  // $(".tab-pane:first").show();

  //control first open browser
  $(document).ready(function () {
    if ($(window).width() > 769) {
      $(".tab-pane:first").show();
    }
  });

  //change browser size
  $(window).resize(function () {
    if ($(window).width() > 769) {
      $(".tab-pane:first").show();
    }
  });

  $(".tabbable ul.nav-tabs li a").click(function (e) {
    e.preventDefault();
    $(".tab-pane").hide();
    var activeTab = $(this).attr("href");
    $(activeTab).fadeIn();
    $(".tabbable ul.nav-tabs li").removeClass('active');
    $(this).parent().addClass('active');

    $(".acc-head").removeClass("d_active");
    //$(".acc-head[rel^='"+activeTab+"']").addClass("d_active");

  });

  /* if in drawer mode */
  $(".acc-head").click(function (e) {

    e.preventDefault();

    //$('.tab-content h3').removeClass("d_active"); 



    var d_activeTab = $(this).attr("rel");


    if ($(this).hasClass("d_active")) {
      $('.tab-content h3').removeClass("d_active");
      $(".tab-pane").hide();
    } else {
      $('.tab-content h3').removeClass("d_active");
      $(this).addClass("d_active");
      $(".tab-pane").hide();
      $("#" + d_activeTab).show();
    }

    //alert("#"+d_activeTab);
    //$(this).toggleClass("d_active");

    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
  });


  /* Extra class "tab_last" 
     to add border to right side
     of last tab */
  $('ul.tabs li').last().addClass("tab_last");

  $('[data-countdown]').each(function () {
    var $this = $(this),
      finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function (event) {

      var $limidate = event.strftime('%D');

      if ($limidate <= 14) {
        $this.html(event.strftime('in %D days'));
      } else {
        $this.html('soon');
      }
    });
  });

  $('.top-carousel').slick({
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,

    /*centerMode: true,
    variableWidth: true,
    fade: true,*/
    responsive: [{
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          infinite: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          infinite: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          fade: true,
          cssEase: 'linear',
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          fade: true,
          cssEase: 'linear',
          infinite: true
        }
      }
    ]
  });



  $('.top-carousel').show();


  $('.top-ads-carousel').slick({
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,

    /*centerMode: true,
    variableWidth: true,
    fade: true,*/
    responsive: [{
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 7000,
          fade: true,
          cssEase: 'linear',
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 7000,
          fade: true,
          cssEase: 'linear',
          infinite: true
        }
      }
    ]
  });
  $('.top-ads-carousel').show();


  $('.top-ads-carousel-full').on('init', function (event, slick, direction) {

    // check to see if there are one or less slides
    if (!($('.top-ads-carousel-full .slick-slide').length > 1)) {

      // remove arrows
      $('.slick-dots').hide();

    }

  });
  $('.top-ads-carousel-full').slick({
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1

    /*centerMode: true,
    variableWidth: true,
    fade: true,*/

  });
  $('.top-ads-carousel-full').show();

  $('.category-car').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    autoplay: false,
    slidesToScroll: 2,
    arrows: true,
    prevArrow: "<a href='#' class='prev-arr rel-arr'><i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
    nextArrow: "<a href='#' class='next-arr rel-arr'><i class='fa fa-chevron-right' aria-hidden='true'></i></a>",
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          autoplay: false,
          dots: true
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          autoplay: false,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.item-car').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    autoplay: false,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: "<a href='#' class='prev-arr rel-arr'><i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
    nextArrow: "<a href='#' class='next-arr rel-arr'><i class='fa fa-chevron-right' aria-hidden='true'></i></a>",
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          autoplay: false,
          dots: true
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          autoplay: false,
          slidesToScroll: 2
        }
      }
    ]
  });


  $('.image-thumbs').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    autoplay: false,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<a href='#' class='prev-arr rel-arr'><i class='fa fa-chevron-left' aria-hidden='true'></i></a>",
    nextArrow: "<a href='#' class='next-arr rel-arr'><i class='fa fa-chevron-right' aria-hidden='true'></i></a>",
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          dots: true
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          autoplay: false,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          autoplay: false,
          slidesToScroll: 1,
          dots: true,
          adaptiveHeight: true
        }
      }
    ]
  });

  $('.m-menu-items').hover(
    function () {
      $(this).parent().addClass('hover')
    },
    function () {
      $(this).parent().removeClass('hover')
    }
  )

  // Popup Credit Card CCV Description At Checkout
  $("#card_ccv").fancybox();

  // Popup Terms At Checkout
  $("#terms").fancybox({
    'width': 850,
    'height': 650
  });

  // Jquery Ui Date Picker
  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yy"
  });
  $.initPageFuncs();

  // Carousel
  $('.carousel').carousel();

});

$('.type-wrapper li.filter.filter-remove').parent().find('.not-selected').addClass('inactive-filter');

$('section.short-content .col-xs-12.col-sm-3').html(function (i, html) {
  return html.replace(/&nbsp;/g, '');
});

$('.type-wrapper li.filter.inactive-filter a').click(function (event) {


  event.preventDefault();

});

$(".btn-loads").click(function () {
  $(this).button("loading");
  var pendingbutton = this;
  setTimeout(function () {
    $(pendingbutton).button("reset");
  }, 3000);
});

$(document).ready(function () {
  $('.main-image').magnificPopup({
    delegate: 'a.mag-box',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
      titleSrc: function (item) {
        return item.el.attr('title');
      }
    },
    gallery: {
      enabled: true
    }
  });
});

$(document).ready(function () {
  $('.image-thumbs').magnificPopup({
    delegate: 'a.mag-box',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
      titleSrc: function (item) {
        return item.el.attr('title');
      }
    },
    gallery: {
      enabled: true
    }
  });
});

// Fancybox
$(document).ready(function () {
  $(".fancybox").fancybox({
    autoSize: true,
    fitToView: true
  });

  $("#filters .list-group-item h4").click(function (e) {
    e.preventDefault();
    $(this).toggleClass('close');
    $(this).parent().parent().toggleClass('close');

  });

  $(".m-filter").click(function (e) {
    e.preventDefault();
    $('.mobile-filter').stop().toggleClass('mopen');
    $('body').toggleClass('noOverlay');
    //$(this).toggleClass('open-mobile');
  });

  $(".closemobile").click(function (e) {
    e.preventDefault();
    $('.mobile-filter').stop().toggleClass('mopen');
    //$(this).toggleClass('open-mobile');
    $('body').toggleClass('noOverlay');
  });



  // Tooltip
  $('.tipsy').tooltip({
    trigger: 'hover',
    placement: 'bottom'
  });

  // Who needs AddThis?
  function windowPopup(url, width, height) {
    // Calculate the position of the popup so
    // it’s centered on the screen.
    var left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);
    window.open(url, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
  }
  $(".js-social-share").on("click", function (e) {
    e.preventDefault();
    windowPopup($(this).attr("href"), 500, 300);
  });

  $('.nToggleMenu').click(function () {
    var toggleTarget = $(this).attr('data-target')
    $(toggleTarget).slideToggle();
  });

  $('.mobile-main-trigger').click(function () {
    $('body').addClass('noOverflow');
    $('.mobile-menu').addClass('open');
    $('.overlay').addClass('open');
  });

  $('a.close-menu').click(function () {
    $('body').removeClass('noOverflow');
    $('.mobile-menu').removeClass('open');
    $('.overlay').removeClass('open');
  });

  //active link
  var currentPage = location.pathname;
  $('a').each(function () {
    var currentHref = $(this).attr('href');
    if (currentHref == currentPage) {
      $(this).addClass('active');
    }
  });


});