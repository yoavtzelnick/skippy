let page = document.getElementsByClassName('list-group')[0];
function constructOptions() {
  page.innerHTML = "";
  chrome.storage.sync.get(["blacklisted"], function(result) {
    let blacklisted = result.blacklisted;
    for (let item of blacklisted) {
      let line = document.createElement('li');
      line.classList.add("list-group-item");
      line.innerHTML = item;
      let button = document.createElement('button');
      button.classList.add('btn');
      button.classList.add('btn-primary');
      button.style = "margin: 8px;";
      button.innerHTML = "Undo";
      button.addEventListener('click', function() {
        chrome.storage.sync.get("blacklisted", function(b) {
          b = b.blacklisted;
          var index = b.indexOf(item);
          if (index !== -1) b.splice(index, 1);
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
