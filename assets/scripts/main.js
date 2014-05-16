
var redirect_list=[];

function generate_redirect_list() {
  redirect_list=JSON.parse(localStorage["redirect-list"]);
  if(!redirect_list)
    return;
  $("#redirect-list").empty();
  $("#redirect-list").append("<li id='header'>"+
                             "<span class='name'>Name of filter</span>"+
                             "<span class='matches'>Mobile hostname</span>"+
                             "<span class='replace'>Non-mobile replacement</span>"+
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

var tt=null;

$(document).ready(function() {
  $("#update-list").click(function() {
    $("html").addClass("updating");
    $("#update-list").text("Updating...");
    if(tt)
      clearTimeout(tt);
    update_redirect_list(function(status) {
      $("html").removeClass("updating");
      generate_redirect_list();
      if(status == "ok") {
        $("#update-list").text("Updated.");
        tt=setTimeout(function() {
          $("#update-list").text("Update list");
          tt=null;
        },10000);
      } else if(status == "fail") {
        $("#update-list").text("Failed to update list");
      } else if(status == "pass") {
        $("#update-list").text("Oops, please file an issue on GitHub...");
      }
    },true);
  });
  generate_redirect_list();
});
