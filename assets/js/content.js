(function() {
  var host = location.host;
  var path = location.pathname;
  
  function buildUrl() {
    var name = getNames();
    var user = name.user;
    var repo = name.repo;
    
    var url = "";
    if (host === "github.com") {
      return "http://" + user + ".github.io/" + repo;
    }
    else {
      return "https://github.com/" + user + "/" + repo;
    }
  }

  function getNames() {
    var user, repo, match;
    var reg = /^\/.+?\//;
    
    match = path.match(reg);
    if (host === "github.com") {
      if (match) {
        user = match[0].replace(/\//g, "");
        repo = path.split("/")[2];
      }
      else {
        user = path.replace(/\//g, "");
        repo = "";
      }
    }
    else {
      user = host.split(".")[0];
      if (match) {
        repo = match[0].replace(/\//g, "");
      }
      else {
        repo = "";
      }
    }
    
    return {
      user: user,
      repo: repo,
    };
  }
  
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var url = buildUrl();
    sendResponse(url);
  });
})();
