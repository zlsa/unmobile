
var redirect_list=[];

function generate_redirect_list() {
  redirect_list=JSON.parse(localStorage["redirect-list"]);
  if(!redirect_list)
    return;
  $("#redirect-list").empty();
  $("#redirect-list").append("<li id='header'>"+
                             "<span class='name'>Name of filter</span>"+
                             "<span class='matches'>Mobile hostname</span>"+
                             "<span class='replace'>Non-mobile hostname</span>"+
                             "</li>");
  for(var i=0;i<redirect_list.length;i++) {
    var item=redirect_list[i];
    $("#redirect-list").append("<li id='redirect-item-"+item.name+"' class='item'>"+
                               "<span class='name'>"+item.name+"</span>"+
                               "<span class='matches'>"+item.match+"</span>"+
                               "<span class='replace'>"+item.replace+"</span>"+
                               "</li>");
  }
}

$(document).ready(function() {
  generate_redirect_list();
});
