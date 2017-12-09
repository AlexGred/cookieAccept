/*
 * jQuery cookieAccept 
 */

(function ($) {
  'use strict';

  $.fn.cookieAccept = function (useroptions) {

    // Define options and extend with user
    var options = {
      checkCookie: true,
      expires: 3,
      type: 'full',
      position: 'bottom-left',
      description: 'This website uses cookies to ensure you get the best experience on our website.',
      textButton: 'Got it!'
    };
    $.extend(options, useroptions);

    // Cookie functions
    var getCookie = function (name) {
      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    var setCookie = function (name, value, options) {
      options = options || {};
    
      var expires = options.expires;
    
      if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
      }
    
      value = encodeURIComponent(value);
    
      var updatedCookie = name + "=" + value;
    
      for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += "=" + propValue;
        }
      }
    
      document.cookie = updatedCookie;
    }

    // Main method
    this.checkCookie = function () {
      var $elem = $(this);
      var blockOptions = {};

      $.extend(blockOptions, options);

      // Part of cA block
      var block = $('<div class="ca-block ca-block_fixed"></div>');
      var textBlock = $('<div class="ca-block__item  ca-block__item_text"><div class="ca-block__text">' + blockOptions.description + '</div></div>');
      var btnBlock = $('<div class="ca-block__item ca-block__item_btn"></div>');
      var btn =$('<button type="button" class="ca-block__btn">' + blockOptions.textButton + '</button>');
      var close = $('<div class="ca-block__close"></div>');

      // Check position and add class
      switch (blockOptions.position) {
        case 'bottom-left':
          block.addClass('ca-block_bottom_left');
          break;
        case 'bottom-light':
          block.addClass('ca-block_bottom_right');
          break;
        case 'top-left':
          block.addClass('ca-block_top_left');
          break;
        case 'top-ight':
          block.addClass('ca-block_top_right');
          break;

        default:
          block.addClass('ca-block_bottom_left');
          break;
      }

      // Check type and add class
      switch (blockOptions.type) {
        case 'full':
          block.addClass('ca-block_full');
          break;
        case 'corner':
          block.addClass('ca-block_corner');
          break;

        default:
          block.addClass('ca-block_full');
          break;
      }

      // Close cA block
      close.click(function () {
        block.addClass('ca-block__close_closed');
      });

      // Set cookie on 'Got it'
      btn.click(function () {
        setCookie('ca_cookie', 'gotIt', {expires: 3600 * 24 * blockOptions.expires, path: '/'});
        block.addClass('ca-block__close_closed');
      });
      btnBlock.append(btn);

      // Assemble block
      block.append(close, textBlock, btnBlock);

      // Check checkCookie
      if (blockOptions.checkCookie) {

        if (getCookie('ca_cookie') === undefined) {
          $elem.append(block);
        }
      }
      else {
        $elem.append(block);
      }
    };

    // Init
    this.checkCookie();

    // Return
    return this;
  };

})(jQuery);
