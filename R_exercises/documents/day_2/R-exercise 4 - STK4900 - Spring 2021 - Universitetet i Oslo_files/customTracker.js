if (uioGaCheck.shouldRunGA()) {

  // Should be loaded in head
  // analytics.js must already have been loaded
  // uioGa.js must already have been loaded

  // PRODUCTION all official UiO hosts
  ga('create', 'UA-64548311-1', {'name': 'uioFellesTracker', 'cookieName': '_gaT01UiOAgg', 'legacyHistoryImport': false, 'cookieDomain': 'uio.no', 'cookieFlags': 'SameSite=None;Secure' });
  ga('create', 'UA-64546224-1', {'name': 'uioFelles50Tracker', 'sampleRate': 50, 'cookieName': '_gaT01UiOAgg', 'legacyHistoryImport': false, 'cookieDomain': 'uio.no', 'cookieFlags': 'SameSite=None;Secure' });

  // PRODUCTION current host
  ga('create', 'UA-64548311-2', {'name': 'uioTracker', 'cookieName': '_gaT01UiO', 'legacyHistoryImport': false, 'cookieDomain': 'www.uio.no', 'cookieFlags': 'SameSite=None;Secure' });
  ga('create', 'UA-64546224-2',  {'name': 'uio50Tracker', 'sampleRate': 50, 'cookieName': '_gaT01UiO', 'legacyHistoryImport': false, 'cookieDomain': 'www.uio.no', 'cookieFlags': 'SameSite=None;Secure' });
  
  // Will only execute when everything needed by ga is set up (Asynchronous Synchronization)
  ga(function () {
    uioGa.initForProduction();
    uioGa.tryEarlyPageView();
  });

}
