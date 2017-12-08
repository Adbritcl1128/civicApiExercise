// Voting Location
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
  if (response.offices.length > 0) {
    var firstOfficialsRank = response.officials[3];
    var secondOfficialsRank = response.officials[4];
    var firstOfficialsInfo = firstOfficialsRank.name + ', ' +
     firstOfficialsRank.party + ', ' +
     firstOfficialsRank.urls + ', ' +
     firstOfficialsRank.phones + '    ------    ';
     var secondOfficialsInfo = secondOfficialsRank.name + ', ' +
      secondOfficialsRank.party + ', ' +
      secondOfficialsRank.urls + ', ' +
      secondOfficialsRank.phones;
    el.appendChild(document.createTextNode(firstOfficialsInfo));
    el.appendChild(document.createTextNode(secondOfficialsInfo));
  } else {
    el.appendChild(document.createTextNode(
        'Could not find candidate info for ' + normalizedAddress));
  }
}

//Senators and Congressman

  function lookup(address, callback) {

    var electionId = 2000;
    var req = gapi.client.request({
        'path' : '/civicinfo/v2/voterinfo',
        'params' : {'electionId' : electionId, 'address' : address}
    });
    req.execute(callback);
  }


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

  function searchAddress() {
    gapi.client.setApiKey('AIzaSyAIk4uxgqv35HhVRuaNgq_rn4IF4Y73-Lk');
    lookup(document.getElementById('address').value, renderResults);
  }

  function searchOffices() {
    gapi.client.setApiKey('AIzaSyAIk4uxgqv35HhVRuaNgq_rn4IF4Y73-Lk');
    lookupCandidate(document.getElementById('address').value, renderCandidates);
  }
