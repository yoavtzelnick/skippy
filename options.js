let page = document.getElementsByClassName('collection')[0];
function constructOptions() {
  page.innerHTML = "";
  chrome.storage.sync.get(["blacklisted"], function(result) {
    let blacklisted = result.blacklisted;
    for (let item of blacklisted) {
      let line = document.createElement('li');
      line.classList.add("collection-item");
      line.innerHTML = item.title;
      let button = document.createElement('button');
      button.className = 'waves-effect waves-light red btn';
      button.style = "margin: 8px;";
      button.innerHTML = "Undo";
      button.addEventListener('click', function() {
        chrome.storage.sync.get("blacklisted", function(b) {
          b = b.blacklisted;
          for (var i=0; i<b.length; i++) {
            if (b[i].href == item.href) {
              b.splice(i, 1);
            }
          }
          chrome.storage.sync.set({"blacklisted": b}, function() {
            constructOptions();
          })
        });
      });
      line.appendChild(button);
      page.appendChild(line);
    }
  });
}
constructOptions();
