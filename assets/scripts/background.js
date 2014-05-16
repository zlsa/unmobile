
var inhibit={};

var list_url="http://";

function update_redirect_list() {
  
}

chrome.tabs.onUpdated.addListener(function(tab_id,info,tab) {
  if(inhibit[tab_id] && inhibit[tab_id] > 0)
    return;
  var url=tab.url;
  var new_url=redirect(url);
  if(new_url) {
    if(tab_id in inhibit)
      inhibit[tab_id]+=1;
    chrome.tabs.update(tab_id,{url:new_url});
  }
});
