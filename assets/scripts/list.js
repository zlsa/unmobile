
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
    name:"mobile-prefix",
    match:"mobile\\.(([a-zA-Z0-9\\-_]+\\.)+([a-zA-Z0-9\\-_]+))",
    replace:"$1"
  }
];

var redirect_list_url="http://raw.githubusercontent.com/zlsa/unmobile/master/redirect.json";
var update_interval=60*60*24; // every day

function update_redirect_list(callback,force) {
  if(!callback)
    callback=function() {};
  var last_update=Math.floor(localStorage["last-update"]||0);
  if(time()-last_update > update_interval || !("redirect-list" in localStorage) || force) {
    var req=new XMLHttpRequest();
    req.onreadystatechange=function() {
      if(this.readyState == XMLHttpRequest.DONE) {
        if(this.status == 200) {
          var data=this.responseText;
          localStorage["redirect-list"]=data;
          var list=JSON.parse(data);
          console.log("successfully updated redirect list");
          if(typeof list == typeof []) {
            redirect_list=list;
            localStorage["last-update"]=Math.floor(time());
          } else if(typeof list == typeof {}) {
            redirect_list=list.list;
            localStorage["last-update"]=Math.floor(time());
          } else {
            return;
          }
          callback("ok");
        } else {
          console.log("failed to update redirect list; got http status "+this.status);
          callback("fail");
        }
      }
    };
    req.open("GET",redirect_list_url,true);
    req.send();
  } else {
    redirect_list=JSON.parse(localStorage["redirect-list"]);
    callback("pass");
  }
}

function time() {
  return Math.round(new Date().getTime()/1000);
}
