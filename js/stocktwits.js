STWT = window.STWT || {};

(function() {
  if (STWT && STWT.Widget) {
    // Widget already loaded, bail out
    return;
  }

  function queryParams() {
    var pairs = [];

    this.add = function(name, value) {
      pairs.push({ name: name, value: value });
    };

    this.toString = function() {
      var segments = [];
      for(var i=0; i<pairs.length; i++) {
        segments[i] = encodeURIComponent(pairs[i].name) + "=" + encodeURIComponent(pairs[i].value);
      }

      return segments.join('&');
    };
  }

  STWT.Widget = function(opts) {
    var opts = opts || {};
    var iframe = document.createElement('iframe');
    var params = new queryParams();
    var settingsParams = ['avatars', 'scrollbars', 'times', 'streaming', 'header', 'limit', 'title', 'partner', 'symbol', 'user', 'canned_stream'];
    var styleParams = ['stream_option', 'message_option', 'footer_option', 'border_color', 'border_color_2', 'box_color', 'header_text_color', 'header_option', 'divider_color', 'stream_color', 'username_color', 'username_hover_color', 'username_font', 'username_size', 'divider_type', 'link_color', 'link_hover_color', 'link_ticker_color', 'link_ticker_hover_color', 'font', 'font_option', 'font_size', 'text_color', 'time_color', 'time_font_size'];
    var container = document.getElementById(opts.container || 'stocktwits-widget');
    var i, w, h, domainSrc;

    // Set iframe attributes
    iframe.setAttribute('allowtranparency', 'true');
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('border', '0');
    iframe.setAttribute('style', 'border: 0');
    iframe.setAttribute('scrolling', 'no');

    w = ((/\d+/).test(opts.width)) ? opts.width : 300;
    h = ((/\d+/).test(opts.height)) ? opts.height : 300;

    iframe.style.width = w + "px";
    iframe.style.height = h + "px";

    // Add parameters
    params.add('width', w);
    params.add('height', h);
    params.add('domain', document.domain);

    // Add whitelisted parameters (so nothinge xtra is sent)
    if (opts) {
      for(i=0; i<settingsParams.length; i++) {
        if (opts[settingsParams[i]] !== undefined) {
          params.add(settingsParams[i], opts[settingsParams[i]]);
        }
      }

      if (opts.style) {
        for(i=0; i<styleParams.length; i++) {
          if (opts.style[styleParams[i]] !== undefined) {
            params.add(styleParams[i], opts.style[styleParams[i]]);
          }
        }
      }
    }

    container.appendChild(iframe);

    // Widget-bootstrap uses this to initialize widget iframe
    window._stwtWidget = window._stwtWidget || { num: 0, widgets: {} };
    window._stwtWidget.num += 1;
    window._stwtWidget[window._stwtWidget.num] = { w: w, h: h, param: params.toString() };
    window._stwtWParam = { w: w, h: h, param: params.toString() }; // compat


    // Build the string for the HTML of the iframe
    function html() {
      var endpoint = "https://api.stocktwits.com/addon/widget/2/widget-streams.min.js?1370378978";

      return [
        "<body style=\"border:0;margin:0\" onload=\"",
        "var d=document;d._stwtWidgetIdx="+ window._stwtWidget.num +";",
        "d.getElementsByTagName('head')[0].appendChild(d.createElement('script')).src='",
        endpoint,
        "';\"></body>"
      ].join('');
    }

    /**
    * Try to start writing into the blank iframe. In IE, this will fail if document.domain has been set,
    * so fail back to using a javascript src for the frame. In IE > 6, these urls will normally prevent
    * the window from triggering onload, so we only use the javascript url to open the document and set
    * its document.domain
    */
    try {
      iframe.contentWindow.document.open();
    } catch(e) {
      domainSrc = "javascript:var d=document.open();d.domain='" + document.domain + "';";
      iframe.src = domainSrc + "void(0);";
    }


    /**
     * Set the HTML of the iframe. In IE 6, the document.domain from the iframe src hasn't had time to
     * "settle", so trying to access the contentDocument will throw an error. Luckily, in IE 7 we can
     * finish writing the html with the iframe src without preventing the page from onloading
     */
    try {
      var d = iframe.contentWindow.document;
      d.write(html());
      d.close();
    } catch(e) {
      iframe.src = domainSrc + 'd.write("' + html().replace(/"/g, '\\"') + '");d.close();';
    }
  };
})();