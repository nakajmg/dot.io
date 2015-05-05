(function() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendRequest(tab.id, {}, function(url) {
      chrome.tabs.update(tab.id, {url: url});
    });
  });
})();
