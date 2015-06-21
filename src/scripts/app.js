/* Smooth scrolling para anclas */
$(document).on('click', 'a.smooth', function(e) {
  e.preventDefault();
  var $link = $(this);
  var anchor = $link.attr('href');
  $('html, body').stop().animate({
    scrollTop: $(anchor).offset().top
  }, 1000);
});

(function($) {
  $(document).ready(function() {
    $.slidebars();
  });
})(jQuery);

(function($) {

  var $container = $('.masonry-container');
  $container.imagesLoaded(function() {
    $container.masonry({
      columnWidth: '.masonry-item',
      itemSelector: '.masonry-item'
    });
  });

})(jQuery);

// Syntax Enable
// SyntaxHighlighter.all();

jQuery(document).ready(function() {
  $('.nav').on('click mousedown mouseup touchstart touchmove', 'a.has_children', function() {
    if ($(this).next('ul').hasClass('open_t') && !$(this).parents('ul').hasClass('open_t')) {
      $('.open_t').removeClass('open_t');
      return false;
    }
    $('.open_t').not($(this).parents('ul')).removeClass('open_t');
    $(this).next('ul').addClass('open_t');
    return false;
  });
  $(document).on('click', ':not(.has_children, .has_children *)', function() {
    if ($('.open_t').length > 0) {
      $('.open_t').removeClass('open_t');
      $('.open_t').parent().removeClass('open');
      return false;
    }
  });

  // hide #back-top first
  $("#back-top").hide();

  // fade in #back-top
  $(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#back-top').fadeIn();
      } else {
        $('#back-top').fadeOut();
      }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  });

});

// WOW Activate
new WOW().init();

jQuery(document).ready(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({
    'overflow': 'visible'
  });
});

//add blank target to external links
jQuery(document).ready(function() {
  $('a').each(function() {
    var a = new RegExp('/' + window.location.host + '/');
    if (!a.test(this.href)) {
      $(this).attr("target", "_blank");
    }
  });
});

// full-width-checkbox
$("[name='full-width-checkbox']").bootstrapSwitch();


/**
 * jQuery scroroller Plugin 1.0
 *
 * http://www.tinywall.net/
 *
 * Developers: Arun David, Boobalan
 * Copyright (c) 2014
 */
(function($) {
  $(window).on("load", function() {
    $(document).scrollzipInit();
    $(document).rollerInit();
  });
  $(window).on("load scroll resize", function() {
    $('.numscroller').scrollzip({
      showFunction: function() {
        numberRoller($(this).attr('data-slno'));
      },
      wholeVisible: false,
    });
  });
  $.fn.scrollzipInit = function() {
    $('body').prepend(
      "<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
  };
  $.fn.rollerInit = function() {
    var i = 0;
    $('.numscroller').each(function() {
      i++;
      $(this).attr('data-slno', i);
      $(this).addClass("roller-title-number-" + i);
    });
  };
  $.fn.scrollzip = function(options) {
    var settings = $.extend({
      showFunction: null,
      hideFunction: null,
      showShift: 0,
      wholeVisible: false,
      hideShift: 0,
    }, options);
    return this.each(function(i, obj) {
      $(this).addClass('scrollzip');
      if ($.isFunction(settings.showFunction)) {
        if (!$(this).hasClass('isShown') &&
          ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(
            this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
          ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) <
          ($(this).outerHeight() + $(this).offset().top - settings.showShift)
        ) {
          $(this).addClass('isShown');
          settings.showFunction.call(this);
        }
      }
      if ($.isFunction(settings.hideFunction)) {
        if (
          $(this).hasClass('isShown') &&
          (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(
              this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) >
            ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
        ) {
          $(this).removeClass('isShown');
          settings.hideFunction.call(this);
        }
      }
      return this;
    });
  };

  function numberRoller(slno) {
    var min = $('.roller-title-number-' + slno).attr('data-min');
    var max = $('.roller-title-number-' + slno).attr('data-max');
    var timediff = $('.roller-title-number-' + slno).attr('data-delay');
    var increment = $('.roller-title-number-' + slno).attr('data-increment');
    var numdiff = max - min;
    var timeout = (timediff * 1000) / numdiff;
    //if(numinc<10){
    //increment=Math.floor((timediff*1000)/10);
    //}//alert(increment);
    numberRoll(slno, min, max, increment, timeout);

  }

  function numberRoll(slno, min, max, increment, timeout) { //alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
    if (min <= max) {
      $('.roller-title-number-' + slno).html(min);
      min = parseInt(min) + parseInt(increment);
      setTimeout(function() {
        numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout))
      }, timeout);
    } else {
      $('.roller-title-number-' + slno).html(max);
    }
  }
})(jQuery);

/**
 * jquery.matchHeight-min.js master
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
(function(c) {
  var n = -1,
    f = -1,
    g = function(a) {
      return parseFloat(a) || 0
    },
    r = function(a) {
      var b = null,
        d = [];
      c(a).each(function() {
        var a = c(this),
          k = a.offset().top - g(a.css("margin-top")),
          l = 0 < d.length ? d[d.length - 1] : null;
        null === l ? d.push(a) : 1 >= Math.floor(Math.abs(b - k)) ? d[d.length - 1] = l.add(a) : d.push(
          a);
        b = k
      });
      return d
    },
    p = function(a) {
      var b = {
        byRow: !0,
        property: "height",
        target: null,
        remove: !1
      };
      if ("object" === typeof a) return c.extend(b, a);
      "boolean" === typeof a ? b.byRow = a : "remove" === a && (b.remove = !0);
      return b
    },
    b = c.fn.matchHeight =
    function(a) {
      a = p(a);
      if (a.remove) {
        var e = this;
        this.css(a.property, "");
        c.each(b._groups, function(a, b) {
          b.elements = b.elements.not(e)
        });
        return this
      }
      if (1 >= this.length && !a.target) return this;
      b._groups.push({
        elements: this,
        options: a
      });
      b._apply(this, a);
      return this
    };
  b._groups = [];
  b._throttle = 80;
  b._maintainScroll = !1;
  b._beforeUpdate = null;
  b._afterUpdate = null;
  b._apply = function(a, e) {
    var d = p(e),
      h = c(a),
      k = [h],
      l = c(window).scrollTop(),
      f = c("html").outerHeight(!0),
      m = h.parents().filter(":hidden");
    m.each(function() {
      var a = c(this);
      a.data("style-cache", a.attr("style"))
    });
    m.css("display", "block");
    d.byRow && !d.target && (h.each(function() {
      var a = c(this),
        b = "inline-block" === a.css("display") ? "inline-block" : "block";
      a.data("style-cache", a.attr("style"));
      a.css({
        display: b,
        "padding-top": "0",
        "padding-bottom": "0",
        "margin-top": "0",
        "margin-bottom": "0",
        "border-top-width": "0",
        "border-bottom-width": "0",
        height: "100px"
      })
    }), k = r(h), h.each(function() {
      var a = c(this);
      a.attr("style", a.data("style-cache") || "")
    }));
    c.each(k, function(a, b) {
      var e = c(b),
        f = 0;
      if (d.target) f =
        d.target.outerHeight(!1);
      else {
        if (d.byRow && 1 >= e.length) {
          e.css(d.property, "");
          return
        }
        e.each(function() {
          var a = c(this),
            b = {
              display: "inline-block" === a.css("display") ? "inline-block" : "block"
            };
          b[d.property] = "";
          a.css(b);
          a.outerHeight(!1) > f && (f = a.outerHeight(!1));
          a.css("display", "")
        })
      }
      e.each(function() {
        var a = c(this),
          b = 0;
        d.target && a.is(d.target) || ("border-box" !== a.css("box-sizing") && (b += g(a.css(
          "border-top-width")) + g(a.css("border-bottom-width")), b += g(a.css(
          "padding-top")) + g(a.css("padding-bottom"))), a.css(d.property,
          f - b))
      })
    });
    m.each(function() {
      var a = c(this);
      a.attr("style", a.data("style-cache") || null)
    });
    b._maintainScroll && c(window).scrollTop(l / f * c("html").outerHeight(!0));
    return this
  };
  b._applyDataApi = function() {
    var a = {};
    c("[data-match-height], [data-mh]").each(function() {
      var b = c(this),
        d = b.attr("data-mh") || b.attr("data-match-height");
      a[d] = d in a ? a[d].add(b) : b
    });
    c.each(a, function() {
      this.matchHeight(!0)
    })
  };
  var q = function(a) {
    b._beforeUpdate && b._beforeUpdate(a, b._groups);
    c.each(b._groups, function() {
      b._apply(this.elements,
        this.options)
    });
    b._afterUpdate && b._afterUpdate(a, b._groups)
  };
  b._update = function(a, e) {
    if (e && "resize" === e.type) {
      var d = c(window).width();
      if (d === n) return;
      n = d
    }
    a ? -1 === f && (f = setTimeout(function() {
      q(e);
      f = -1
    }, b._throttle)) : q(e)
  };
  c(b._applyDataApi);
  c(window).bind("load", function(a) {
    b._update(!1, a)
  });
  c(window).bind("resize orientationchange", function(a) {
    b._update(!0, a)
  })
})(jQuery);

$('.col-megamenu').matchHeight({
  byRow: true,
  property: 'height',
  target: null,
  remove: false
});
