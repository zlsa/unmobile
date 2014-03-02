
// this is for both options.html and popup.html

var tab;
var domain;
var popup=false;

var options={};

var imgdir="assets/images/mode/";

function domain_set_policy(domain,feature,policy,message) {
    if(popup) {
        $("#"+feature+" .options span").removeClass("active");
        for(var i=0;i<defaults.policies.length;i++) {
            var p=defaults.policies[i];
            $("#"+feature+" .options span."+p+" img").attr("src",imgdir+p+".png");
        }
        console.log(options);
        if(policy == "global") {
            var gp=options.features[feature];
            $("#"+feature+" .options span.global img").attr("src",imgdir+policy+"-"+gp+".png");
            console.log("#"+feature+" .options span.global img");
        } else {
            $("#"+feature+" .options span."+policy+" img").attr("src",imgdir+policy+"-selected.png");
        }
        $("#"+feature+" .options span."+policy).addClass("active");
    }
    if(message != false) {
        chrome.runtime.sendMessage({
            command:"domain-policy-set",
            domain:domain,
            feature:feature,
            policy:policy
        });
    }
}

function popup_option_clicked() {
    if($(this).parent().parent().hasClass("disabled"))
        return;
    var feature=$(this).parent().parent().attr("id");
    var policy=$(this).attr("class");
    domain_set_policy(domain,feature,policy);
    chrome.tabs.reload(tab.id);
}

function update_block_numbers(number) {
    for(var n in number.blocked) {
        $("#"+n+" .number").removeClass("blocked");
        if(number.blocked[n] > 0)
            $("#"+n+" .number").addClass("blocked");
        $("#"+n+" .number .blocked").text(number.blocked[n]);
        $("#"+n+" .number .total").text(number.total[n]);
    }
}

$(document).ready(function() {
    if($("html").hasClass("popup"))
        popup=true;
    if(popup) {
        for(var i=0;i<defaults.features.length;i++) {
            var feature=defaults.features[i];
            var policies="";
            var t=" "+get_feature_name(feature)+" on this domain";
            for(var j=0;j<defaults.policies.length;j++) {
                var policy=defaults.policies[j];
                policies+="<span class='"+policy+"' title='"+get_policy_desc(policy)+t+"'>";
                policies+="<img src='"+imgdir+policy+".png' />";
                policies+="</span>";
            }
            var fn=get_feature_name(feature);
            $("#block-features").append([
                "<li id='"+feature+"'>",
                "<span class='feature'>"+fn+"</span>",
                "<span class='number'>",
                "<span class='blocked' title='Number of blocked "+fn+" contexts'>0</span>",
                "<span class='total' title='Total number of "+fn+" contexts'>0</span>",
                "</span>",
                "<div class='options'>",
                policies, 
                "</div>",
                "</li>",
                ].join("\n"));
        }
        $(".options span").click(popup_option_clicked);
        chrome.runtime.sendMessage({
            command:"options-get"
        },function(response) {
            options=response.options;
        });
        chrome.tabs.query({active:true},function(tabs) {
            tab=tabs[0];
            chrome.runtime.sendMessage({
                command:"blocked-number-get",
                tabId:tab.id
            },function(response) {
                update_block_numbers(response);
            });
            chrome.runtime.onMessage.addListener(function(message,sender,response) {
                var cmd=message.command;
                if(cmd == "blocked-number-set") {
                    if(sender.tab.id == tab.id) {
                        update_block_numbers({
                            blocked:message.blocked,
                            total:message.total
                        });
                    }
                }
            });
            domain=get_domain(tab.url);
            $(".url").text(domain);
            chrome.runtime.sendMessage({
                command:"domain-policy-get",
                domain:domain,
            },function(response) {
                for(var feature in response.policy) {
                    var policy=response.policy[feature];
                    domain_set_policy(domain,feature,policy,false);
                }
            });
        });
    }

});

