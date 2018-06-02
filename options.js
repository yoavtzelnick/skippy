let page = document.getElementById('buttonDiv');
function constructOptions() {
  chrome.storage.sync.get(["blacklisted"], function(result) {
    let blacklisted = result.blacklisted;
    for (let item of blacklisted) {
      let button = document.createElement('button');
      button.innerHTML = item;
      button.addEventListener('click', function() {
        alert("Removing " + item);
        // chrome.storage.sync.set({color: item}, function() {
        // })
      });
      page.appendChild(button);
    }
  });
}
constructOptions();
