
var custom_urls=[
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

function redirect_custom_url(hostname,regexp,replace) {
  // accepts a hostname (en.m.wikipedia.org for example) and returns the replaced hostname
  // (en.wikipedia.org).
  return hostname.replace(regexp,replace);
}

function escape_regexp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function redirect(url) {
//  if(url.indexOf("chrome") >= 0)
//    return;
  var current_url=new URI(url);
  var new_url=null;
  var mobile=null;
  for(var i=0;i<custom_urls.length;i++) {
    var custom=custom_urls[i];
    var regexp=new RegExp(custom.match);
    if(current_url.hostname().match(regexp)) {
      new_url=new URI(url);
      new_url.hostname(redirect_custom_url(current_url.hostname(),regexp,custom.replace));
      // var current_hostname=current_url.hostname().split(".").reverse();
      // var new_hostname=new_url.hostname().split(".").reverse();
      // if we want to prevent google.com to redirect to googIe.com, check here. (obvious
      // problems include i.wund.com.)
      mobile=custom.name;
      break;
    }
  }
  // if(hostname.match(custom_urls.wikipedia)) {
  //   var language=hostname.substr(0,hostname.indexOf("."));
  //   url=url.hostname(language+".wikipedia.org");
  // } else if(hostname.match(custom_urls.theverge)) {
  //   url=url.hostname("theverge.com");
  // } else if(hostname.match(custom_urls.reddit)) {
  //   url=url.hostname("reddit.com");
  // } else if(hostname.match(custom_urls.twitter)) {
  //   url=url.hostname("twitter.com");
  // } else {
  //   url=null;
  // }
  if(new_url) {
    if(new_url.toString() == current_url.toString()) {
      console.log("Warning: mobile URL "+mobile+" redirects to itself!")
      return;
    }
    console.log("Mobile page, redirecting to "+new_url.toString());
    return new_url.toString();
  }
  console.log(current_url.toString()+" is not a mobile website.");
  return;
}

