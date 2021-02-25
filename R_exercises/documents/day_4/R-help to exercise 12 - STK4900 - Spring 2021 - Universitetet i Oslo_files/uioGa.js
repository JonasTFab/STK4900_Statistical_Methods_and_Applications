// defines global uioGaCheck
var uioGaCheck = {};

uioGaCheck.shouldRunGA = function() {
  return ((location.protocol === "http:")                     // http
    || ( (typeof(uioPageInfo) === "object")
      && (typeof(uioPageInfo.readRestricted ) === "boolean")  // or readRestriced is false
      && !uioPageInfo.readRestricted )
    || ( (typeof(uioPageInfo) === "object")
      && (typeof(uioPageInfo.readRestricted ) === "boolean")  // or cloudAllowed and readRestricted defined
      && (typeof(uioPageInfo.cloudAllowed ) === "boolean")
      && uioPageInfo.cloudAllowed ) );
};

if (uioGaCheck.shouldRunGA()) {

  /*

  This code should be loaded in head, after load of analytics.js and jQuery:

  For UiO Vortex hosts, it is loaded in customTracker.js
  In general:

    It should be loaded in head, must initialize trackers, e.g.:

    ga('create', 'UA-123456-1', ...);

    Then still in head, initialize uioGa and call tryEarlyPageView, e.g.:

    ga(function () {
      uioGa.initForProduction();
      uioGa.tryEarlyPageView();
    })

  As early as possible thereafter (if quickLinks counts are used):

    uioGa.setQuickLinksCount(quickLinksCount);

  On document ready (in case initial pageview hit had to be delayed):

    uioGa.pendingPageView()

  */

  // loads analytics.js and defines global ga
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    //noinspection CommaExpressionJS
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//vrtx.uio.no/js/analytics/v3/analytics.js', 'ga');

  // Rest of code assumes ga is global analytics object

  // defines global uioGa
  var uioGa = {};

  uioGa.quickLinksCount = 0;
  uioGa.pageViewLater = false;
  uioGa.initOK = false;
  uioGa.proxyUrl = "";

  // getParsedUrlParams is based on
  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  // Solution by Andy E
  uioGa.getParsedUrlParams = function () {
    var match,
      pl = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.search.substring(1),
      urlParams = {},
      getParamVal = function (paramName) {
        if (urlParams.hasOwnProperty(paramName)) {
          return urlParams[paramName];
        } else {
          return undefined;
        }
      };
    while (match = search.exec(query)) {
      urlParams[decode(match[1])] = decode(match[2]);
    }
    return {
      "urlParams": urlParams,
      "getParamVal": getParamVal
    };
  };

  uioGa.parseIntWithSeparators = function(intTxt) {
    var res, resTxt;
    if ((typeof(intTxt) === 'string') && intTxt.length) {
      resTxt = intTxt.replace(/[\s,]/g, ''); // comma used as thousands separator in English
      // Coerced to number before isNaN, accepts floats and spaces before and after
      if (!isNaN(resTxt)) {
        res = (parseInt(resTxt, 10));
      }
    }
    return res;
  };

  uioGa.getHitsText = function() {
    var hitsHTML,
      hitsText = "";
    if (window.jQuery) {
      hitsHTML = $("#vrtx-main-content > .hits");  // Was $(".hits");
      if (hitsHTML.length) {
        hitsText = hitsHTML.text();
      }
    }
    return hitsText;
  };

  uioGa.parseHits = function(hitsText) {
    var counts = {'resultsStart' : 0, 'resultsEnd' : 0, 'resultsTotal' : 0 },
      hitsMatches;
    // Note two types of dashes
    hitsMatches = hitsText.match(/^[^\d]*([\d\s,]*)[-–]([\d\s,]*)[^\d]*([\d\s,]*)/);
    if(hitsMatches && hitsMatches.length === 4) {
      counts = {};
      counts['resultsStart'] = uioGa.parseIntWithSeparators(hitsMatches[1]);
      counts['resultsEnd'] = uioGa.parseIntWithSeparators(hitsMatches[2]);
      counts['resultsTotal'] = uioGa.parseIntWithSeparators(hitsMatches[3]);
    }
    return counts;
  };

  // Call with null for parsedUrlParamsIn if it is not already available for other purposes
  uioGa.getSearchType = function(parsedUrlParamsIn) {
    var searchType = false,
      urlParams = parsedUrlParamsIn ? parsedUrlParamsIn : uioGa.getParsedUrlParams(),
      vrtxParam = urlParams.getParamVal("vrtx");

    if ((vrtxParam === "person-search") || (vrtxParam === "unit-search")
        || (vrtxParam === "library-search")) {
      searchType = vrtxParam;
    } else if (vrtxParam === "search") {
      if (urlParams.getParamVal("searchMode") === "emne") {
        searchType = "search-emne";
      } else {
        searchType = "search";
      }
    } else if (vrtxParam === "searchuio") {
      if (urlParams.getParamVal("searchMode") === "emne") {
        searchType = "searchuio-emne";
      } else {
        searchType = "searchuio";
      }
    }
    return searchType;
  };

  // Should be called as early as possible, so it is ready when the search result pageview
  // is sent to Analytics
  uioGa.setQuickLinksCount = function(count) {
    uioGa.quickLinksCount = count;
  };

  // Not all Vortex search types currently have counts added in Analytics. This defines which ones.
  uioGa.processAsSearch = function(searchType) {
    var searchTypeOk = (typeof(searchType) === 'string'
                        && ((searchType === "search") || (searchType === "searchuio"))),
      hostOK;

    // Temporary: vortex-systest.uio.no og www.uio.no only for now
    // hostOK = /^http(s)?:\/\/(www\.)?(vortex-systest\.)?uio\.no\//ig.test(window.location.href);
    hostOK = true;
    return (searchTypeOk && hostOK);
  };

  // Modifies customDims
  // Previous authenticated parameter (renamed to notUsed) is no longer used,
  // now use uioPageInfo.authenticated in getCustomDimensions instead
  uioGa.searchMouseDownExtra = function(parsedUrlParams, notUsed, searchUrl, customDims) {
    var queryParam,
      actionQuery;
    customDims["dl"] = searchUrl; // re-use existing dimension instead og using custom dimension

    // TODO: query is the only one relevant here for the time being, but that will change
    // Analytics search setup: (first with value of) query, unit-query, person-query, course-query
    actionQuery = 'NO_QUERY'; // Required value in API
    queryParam = parsedUrlParams.getParamVal("query");
    if ((typeof(queryParam) === 'string') && queryParam.length) {
      actionQuery = queryParam;
    }
    return actionQuery;
  };

  uioGa.addAuthReadRestrictedCustomDimensions = function (customDims) {
    if ( (typeof(uioPageInfo) === "object")
      && (typeof(uioPageInfo.authenticated ) === "string") ) {
      customDims["dimension8"] = uioPageInfo.authenticated;  // uio-authenticated
    } else {
      customDims["dimension8"] = 'anonymous'; // uio-authenticated
    }
    if ( (typeof(uioPageInfo) === "object")
         && (typeof(uioPageInfo.readRestricted ) === "boolean") ) {
      if ( uioPageInfo.readRestricted ) {
        customDims["dimension9"] = 'read-restricted';  // uio-read-restricted
      } else {
        customDims["dimension9"] = 'open'; // uio-read-restricted
      }
    } else {
      // Should not really happen
      customDims["dimension9"] = 'unknown'; // uio-read-restricted
    }
  };

  // Call with null for parsedUrlParamsIn if it is not already available for other purposes
  // Call with null for counts to not include counts based data for custom dimensions
  uioGa.getCustomDimensions = function (parsedUrlParamsIn, counts) {
    var urlParams = parsedUrlParamsIn ? parsedUrlParamsIn : uioGa.getParsedUrlParams(),
      searchType = uioGa.getSearchType(urlParams),
      cdim = {};

    if (searchType) {

      cdim["dimension1"] = searchType; // vsearch-type
      if (urlParams.getParamVal("theme_type_facet")) {
        cdim["dimension2"] = urlParams.getParamVal("theme_type_facet"); // vsearch-theme_type_facet
      }
      if (urlParams.getParamVal("site_facet")) {
        cdim["dimension3"] = urlParams.getParamVal("site_facet"); // vsearch-site_facet
      }
      if (urlParams.getParamVal("languages")) {
        cdim["dimension4"] = urlParams.getParamVal("languages"); // vsearch-languages
      }
      if (urlParams.getParamVal("areacode")) {
        cdim["dimension5"] = urlParams.getParamVal("areacode"); // vsearch-areacode
      }
      if (urlParams.getParamVal("affiliation")) {
        cdim["dimension6"] = urlParams.getParamVal("affiliation"); // vsearch-affiliation
      }
    }

    uioGa.addAuthReadRestrictedCustomDimensions(cdim);

    if (counts) {
      if (uioGa.processAsSearch(searchType)) {
        var tot = counts['resultsTotal'];
        var totGroup = 'r0';
        if (tot > 9999) {
          totGroup = 'r9999+';
        } else if (tot >= 5001) {
          totGroup = 'r5001-9999';
        } else if (tot >= 1001) {
          totGroup = 'r1001-5000';
        } else if (tot >= 501) {
          totGroup = 'r0501-1000';
        } else if (tot >= 201) {
          totGroup = 'r0201-0500';
        } else if (tot >= 51) {
          totGroup = 'r0051-0200';
        } else if (tot >= 21) {
          totGroup = 'r0021-0050';
        } else if (tot >= 6) {
          totGroup = 'r0006-0020';
        } else if (tot >= 1) {
          totGroup = 'r0001-0005';
        }
        cdim["dimension7"] = totGroup; // vsearch-rescountgroup
        cdim["metric1"] = tot;  // vsearch-rescountexact
        cdim["metric2"] = uioGa.quickLinksCount;  // vsearch-quicklinksexact

      }
    }
    return cdim;
  };

  uioGa.modifyHitTaskForTrackers =  function() {
    // Modify sendHitTask for all trackers
    var trackers = ga.getAll(),
      tracker,
      i;
    if (!uioGa.proxyUrl) {
      throw new Error('Attempt to call modifyHitTaskForTrackers without proxyUrl set');
    }
    for (i = 0; i < trackers.length; i++) {
      tracker = trackers[i];

      // Set anonymizeIp as a fallback
      tracker.set('anonymizeIp', true);  // with this, should get aip=1 for hits

      // Modifies sendHitTask for tracker to send the request to a local ipproxy server, which passes
      // it on to www.google-analytics.com/collect after ip anonymization
      tracker.set('sendHitTask', function (model) {
        var payload = model.get('hitPayload'),
          xhr = new XMLHttpRequest();
        xhr.open('GET', uioGa.proxyUrl + '?' + payload, true);
        xhr.send();
      });
    }
    uioGa.initOK = true;
  };

  uioGa.errorIfNotInited = function() {
    if (!uioGa.initOK) {
      throw new Error('Attempt to call tracker(s) without having modified hit task');
    }
  };

  // Should only be called from inside ga(function() {}
  uioGa.initForProduction = function () {
    // PRODUCTION all official UiO hosts
    uioGa.proxyUrl = '//w3prod-ipproxy.uio.no/collect';
    uioGa.pseudonymizedUrl = '//w3prod-ipproxy.uio.no/pseudonymized';
    uioGa.modifyHitTaskForTrackers();
    uioGa.initOK = true; // TODO: Why only for production. Does it make a difference?
  };

  // Should only be called from inside ga(function() {}
  uioGa.initForTest = function () {
    // e.g. vortex-test.uio.no
    uioGa.proxyUrl = '//w3test-ipproxy.uio.no/collect';
    uioGa.pseudonymizedUrl = '//w3test-ipproxy.uio.no/pseudonymized';
    uioGa.modifyHitTaskForTrackers();
  };

  // Functions that cause hits to Analytics

  // Should be called from inside ga(function() {} after initializing uioGa
  uioGa.tryEarlyPageView =  function() {
    var trackers = ga.getAll(),
      tracker,
      i,
      searchType = uioGa.getSearchType(null),
      cust;
    uioGa.errorIfNotInited();
    if (uioGa.processAsSearch(searchType)) {
      // Wait for document ready to be able to get counts from DOM
      uioGa.pageViewLater = true;
    } else {
      cust = uioGa.getCustomDimensions();

      // Send asynchronous 'pageview' for all trackers
      for (i = 0; i < trackers.length; ++i) {
        tracker = trackers[i];
        if (cust) {
          ga(tracker.get('name') + '.send', 'pageview', cust);
        } else {
          ga(tracker.get('name') + '.send', 'pageview');
        }
      }
    }
  };

  // Should always be called on document ready, in case the initial pageview hit
  // had to be delayed
  uioGa.pendingPageView = function () {
    ga(function () {
      if (uioGa.pageViewLater) {
        uioGa.pageViewLater = false;
        uioGa.latePageView();
      }
    });
  };

  // Should only be called from inside ga(function() {}, in practise only by pendingPageView
  // Need to parse counts from document, pageview hit therefore delayed until document ready
  uioGa.latePageView = function () {
    var urlParams,
      counts,
      cust,
      trackers = ga.getAll(),
      tracker,
      i,
      searchType = uioGa.getSearchType(null);
    uioGa.errorIfNotInited();

    // latePageView currently only meant to be called if processAsSearch() but that
    // might not always be the case
    if (uioGa.processAsSearch(searchType)) {
      urlParams = uioGa.getParsedUrlParams();
      counts = uioGa.parseHits(uioGa.getHitsText());
      cust = uioGa.getCustomDimensions(urlParams, counts);
    }

    // Send asynchronous 'pageview' for all trackers
    for (i = 0; i < trackers.length; ++i) {
      tracker = trackers[i];
      if (cust) {
        ga(tracker.get('name') + '.send', 'pageview', cust);
      } else {
        ga(tracker.get('name') + '.send', 'pageview');
      }
    }
  };

  // Didn't expect much usage of this method, but still being used sometimes -> add extra custom dimensions
  uioGa.trackVirtual = function (path) {
    ga(function () {
      var trackers = ga.getAll(),
        tracker,
        cust = {},
        i;
      uioGa.errorIfNotInited();
      // Don't want full set of custom dimensions, but do want uio-authenticated and uio-read-restricted
      uioGa.addAuthReadRestrictedCustomDimensions(cust);

      // Send "virtual pageview" for all defined trackers
      for (i = 0; i < trackers.length; ++i) {
        tracker = trackers[i];
        ga(tracker.get('name') + '.send', 'pageview', path, cust);

      }
    });
  };

  uioGa.trackEvent = function (category, action, label, value, nonInteraction) {
    ga(function () {
      var trackers = ga.getAll(),
        tracker,
        cust = {},
        i;
      uioGa.errorIfNotInited();
      if (nonInteraction) {  // true if passed and truthy, undefined if function called with fewer params
        cust = {nonInteraction: true};
      }
      // Don't want full set of custom dimensions, but do want uio-authenticated and uio-read-restricted
      uioGa.addAuthReadRestrictedCustomDimensions(cust);
      // Send event for all trackers
      for (i = 0; i < trackers.length; ++i) {
        tracker = trackers[i];
        if (typeof(value) === "number") {
          ga(tracker.get('name') + '.send', 'event', category, action, label, value, cust);
        } else {
          ga(tracker.get('name') + '.send', 'event', category, action, label, undefined, cust);
        }
      }
    });
  };
  
  uioGa.nonGAPseudonymizedEvent = function (category, action, label, value, nonInteraction, pseudonimizedUser) {
    // TODO
    timestamp = encodeURIComponent((new Date()).toISOString());
    pseudouser = encodeURIComponent(pseudonimizedUser);
    pageurl = encodeURIComponent(location.href);
    mediaurl = encodeURIComponent(label);
    mediaevent = encodeURIComponent(action);
    payload = "timestamp=" + timestamp + '&' + "pseudouser=" + pseudouser + '&' + "pageurl=" + pageurl + '&' + "mediaurl=" + mediaurl + '&' + "mediaevent=" + mediaevent;
    xhr = new XMLHttpRequest();
    xhr.open('GET', uioGa.pseudonymizedUrl + '?' + payload, true);
    xhr.send();
  };


  // authenticated parameter no longer used, now use uioPageInfo.authenticated instead
  uioGa.trackSearchResult = function(searchUrl, hitNumLocal, authenticated, targetUrl) {
    ga(function () {
      var urlParams = uioGa.getParsedUrlParams(),
        counts = uioGa.parseHits(uioGa.getHitsText()),
        cust = uioGa.getCustomDimensions(urlParams, counts),
        actionQuery = uioGa.searchMouseDownExtra(urlParams, authenticated, searchUrl, cust),
        trackers = ga.getAll(),
        tracker,
        i,
        hitNumGlobal = 0;
      uioGa.errorIfNotInited();

      if (counts && (hitNumLocal !== null)) {
        hitNumGlobal = counts['resultsStart'] - 1 + hitNumLocal;
      }

      // Send event for all trackers
      for (i = 0; i < trackers.length; ++i) {
        tracker = trackers[i];
        // Event: category, action, label, value (last two optional)
        ga(tracker.get('name') + '.send', 'event', 'searchResultMD', actionQuery, targetUrl,
           hitNumGlobal, cust);
      }
    });
  };

  // authenticated parameter no longer used, now use uioPageInfo.authenticated instead
  uioGa.trackSearchQuickLink = function(searchUrl, hitNum, authenticated, targetUrl) {
    ga(function () {
      var urlParams = uioGa.getParsedUrlParams(),
        counts = uioGa.parseHits(uioGa.getHitsText()),
        cust = uioGa.getCustomDimensions(urlParams, counts),
        actionQuery = uioGa.searchMouseDownExtra(urlParams, authenticated, searchUrl, cust),
        trackers = ga.getAll(),
        tracker,
        i;
      uioGa.errorIfNotInited();

      // Send event for all trackers
      for (i = 0; i < trackers.length; ++i) {
        tracker = trackers[i];
        // Event: category, action, label, value (last two optional)
        ga(tracker.get('name') + '.send', 'event', 'searchQuickLinkMD', actionQuery, targetUrl,
           hitNum, cust);
      }
    });
  };

}
