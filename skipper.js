var currentLocation = window.location.href;
interval = setInterval(function() {
  if (window.location.href != currentLocation) {
    currentLocation = window.location.href;
    chrome.storage.sync.get(["blacklisted"], function(result) {
      let blacklisted = result.blacklisted === undefined ? [] : result.blacklisted;
      if (blacklisted.includes(currentLocation)) {
        var next = document.getElementsByClassName("ytp-next-button")[0];
        next.click();
      }
    });
  }
}, 1000);

window.onload = function() {
  var title = document.getElementsByClassName("title")[0];
  var skip = document.createElement("button");
  skip.style = "width: 44px; height: 44px; border: none; background: transparent";
  var img = document.createElement("img");
  img.src = chrome.extension.getURL("img/skippy.png");
  skip.append(img);
  skip.onclick = function() {
    chrome.storage.sync.get(["blacklisted"], function(result) {
      var blacklisted = result.blacklisted === undefined ? [] : result.blacklisted;
      if (!blacklisted.includes(currentLocation)) {
        blacklisted.push(currentLocation);
        chrome.storage.sync.set({"blacklisted": blacklisted}, function() {
          var next = document.getElementsByClassName("ytp-next-button")[0];
          next.click();
        });
      }
    });
  };
  title.append(skip);
}
