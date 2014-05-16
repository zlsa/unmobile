
var inhibit={};

var redirect_list=[
  {
    name:"wikipedia",
    match:"^(.{2,3})\\.m\\.wikipedia\\.org$",
    replace:"$1.wikipedia.org"
  },
  {
    name:"wikipedia",
    match:"i\\.reddit\\.com",
    replace:"reddit.com"
  },
  {
    name:"mobile_prefix",
    match:"mobile\\.(([a-zA-Z0-9\\-_]+\\.)+([a-zA-Z0-9\\-_]+))",
    replace:"$1"
  }
];

var redirect_list_url="http://raw.githubusercontent.com/zlsa/unmobile/master/redirect.json";
var update_interval=60*60*24; // every day

function update_redirect_list() {
  var last_update=Math.floor(localStorage["last-update"]||0);
  if(time()-last_update > update_interval) {
    var req=new XMLHttpRequest();
    req.open("GET",redirect_list_url,false);
    req.onload=function() {
      console.log(this);
      var data=this.responseText;
      localStorage["redirect"]=data;
      redirect_list=JSON.parse(data).list;
      localStorage["last-update"]=time();
      console.log("successfully updated redirect list");
    };
    req.send(null);
  }
}

function time() {
  return Math.round(new Date().getTime()/1000);
}

chrome.tabs.onUpdated.addListener(function(tab_id,info,tab) {
  update_redirect_list();
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
