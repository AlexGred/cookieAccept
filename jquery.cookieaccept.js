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
      position: 'bottomLeft',
      type: 'full',
      text: 'This website uses cookies to ensure you get the best experience on our website.',
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
      var block = $('<div class="cookieAccept cA-main"></div>');
      var textBlock = $('<div class="cA-block cA-text-block"><div class="">' + blockOptions.text + '</div></div>');
      var btnBlock = $('<div class="cA-block cA-btn-block"></div>');
      var btn =$('<button type="button" class="cA-btn">' + blockOptions.textButton + '</button>');
      var close = $('<div class="cA-close"></div>');

      // Check position and add class
      switch (blockOptions.position) {
        case 'bottomLeft':
          block.addClass('bottomLeft');
          break;
        case 'bottomRight':
          block.addClass('bottomRight');
          break;
        case 'topLeft':
          block.addClass('topLeft');
          break;
        case 'topRight':
          block.addClass('topRight');
          break;

        default:
          block.addClass('bottomLeft');
          break;
      }

      // Check type and add class
      switch (blockOptions.type) {
        case 'full':
          block.addClass('full');
          break;
        case 'corner':
          block.addClass('corner');
          break;

        default:
          block.addClass('full');
          break;
      }

      // Close cA block
      close.click(function () {
        block.addClass('cA-closed');
      });

      // Set cookie on 'Got it'
      btn.click(function () {
        setCookie('cA_cookie', 'gotIt', {expires: 3600 * 24 * blockOptions.expires, path: '/'});
      });
      btnBlock.append(btn);

      // Assemble block
      block.append(close, textBlock, btnBlock);

      // Check checkCookie
      if (blockOptions.checkCookie) {

        if (getCookie('cA_cookie') === undefined) {
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
