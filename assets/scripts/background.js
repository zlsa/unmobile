
chrome.tabs.onUpdated.removeListener(function() {});
chrome.runtime.onInstalled.removeListener(function() {});
chrome.tabs.onUpdated.addListener(function(tab_id,info,tab) {
  var url=tab.url;
  var new_url=redirect(url);
  if(new_url) {
    chrome.tabs.update(tab_id,{url:new_url});
  }
  update_redirect_list(null,false);
});

chrome.runtime.onInstalled.addListener(function() {
  update_redirect_list(null,true);
});
