
chrome.tabs.onUpdated.addListener(function(tab_id,info,tab) {
  var url=tab.url;
  var new_url=redirect(url);
  if(new_url) {
    chrome.tabs.update(tab_id,{url:new_url});
  }
  update_redirect_list(null,false);
});

