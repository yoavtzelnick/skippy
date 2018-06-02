chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get("blacklisted", function(blacklisted) {
      if (blacklisted === undefined) {
        chrome.storage.sync.set({"blacklisted": []}, function() {})
      }
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostContains: '.youtube.'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
