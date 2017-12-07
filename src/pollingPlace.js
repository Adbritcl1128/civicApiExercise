
function lookupCandidate(address, callback) {

  var includeOffices = true;

  var req = gapi.client.request({
    'path' : '/civicinfo/v2/representatives',
    'params' : {'address' : address, 'includeOffices' : includeOffices}
  });
  req.execute(callback);
}

function renderCandidates(response, rawResponse) {
  var el = document.getElementById('resultsTwo');
  if (!response || response.error) {
    el.appendChild(document.createTextNode(
      'Error while trying to fetch candidate'));
      return;
  }

  var normalizedAddress = response.normalizedInput.line1 + ' ' +
      response.normalizedInput.city + ', ' +
      response.normalizedInput.state + ' ' +
      response.normalizedInput.zip;
  if (response.offices > 0) {
    var offices = response.offices[0].name;
    var officesInfo = offices.divisionID;
    el.appendChild(document.createTextNode(officesInfo));
  } else {
    el.appendChild(document.createTextNode(
        'Could not find official info for ' + normalizedAddress));
  }
}



  /**
   * Build and execute request to look up voter info for provided address.
   * @param {string} address Address for which to fetch voter info.
   * @param {function(Object)} callback Function which takes the
   *     response object as a parameter.
   */
   function lookup(address, callback) {
   /**
     * Election ID for which to fetch voter info.
     * @type {number}
     */
    var electionId = 2000;
    /**
     * Request object for given parameters.
     * @type {gapi.client.HttpRequest}
     */
    var req = gapi.client.request({
        'path' : '/civicinfo/v2/voterinfo',
        'params' : {'electionId' : electionId, 'address' : address}
    });
   req.execute(callback);
  }

  /**
   * Render results in the DOM.
   * @param {Object} response Response object returned by the API.
   * @param {Object} rawResponse Raw response from the API.
   */
  function renderResults(response, rawResponse) {
    var el = document.getElementById('results');
    if (!response || response.error) {
      el.appendChild(document.createTextNode(
          'Error while trying to fetch polling place'));
      return;
    }

    var normalizedAddress = response.normalizedInput.line1 + ' ' +
        response.normalizedInput.city + ', ' +
        response.normalizedInput.state + ' ' +
        response.normalizedInput.zip;
    if (response.pollingLocations.length > 0) {
      var pollingLocation = response.pollingLocations[0].address;
      var pollingAddress = pollingLocation.locationName + ', ' +
          pollingLocation.line1 + ' ' +
          pollingLocation.city + ', ' +
          pollingLocation.state + ' ' +
          pollingLocation.zip;
      el.appendChild(document.createTextNode(pollingAddress));
    } else {
      el.appendChild(document.createTextNode(
          'Could not find polling place for ' + normalizedAddress));
    }
  }


  /**
   * Initialize the API client and make a request.
   */
  function searchAddress() {
    gapi.client.setApiKey('AIzaSyAIk4uxgqv35HhVRuaNgq_rn4IF4Y73-Lk');
    lookup(document.getElementById('address').value, renderResults);
  }

  function searchOffices() {
    gapi.client.setApiKey('AIzaSyAIk4uxgqv35HhVRuaNgq_rn4IF4Y73-Lk');
    lookupCandidate(document.getElementById('address').value, renderCandidates);
  }
