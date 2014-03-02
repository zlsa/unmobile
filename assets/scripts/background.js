
var domains={

};

var options={
    
};

var tabs={

};

function update_browser_action(tab) {
    var domain=get_domain(tab.url);
    var blocked_number=0;
    if(tab.id in tabs) {
        blocked_number+=tabs[tab.id].blocked.canvas;
        blocked_number+=tabs[tab.id].blocked.webgl;
        blocked_number+=tabs[tab.id].blocked.webaudio;
    }
    var total_number=0;
    if(tab.id in tabs) {
        total_number+=tabs[tab.id].total.canvas;
        total_number+=tabs[tab.id].total.webgl;
        total_number+=tabs[tab.id].total.webaudio;
    }
    chrome.browserAction.setBadgeText({text:blocked_number+""});
    chrome.browserAction.setBadgeBackgroundColor({color:"#888"});
    if(blocked_number < total_number) {
        chrome.browserAction.setIcon({
            "path":{
                "19":"assets/images/icon/19-partial.png"
            }
        });
    } else if(blocked_number > 0) {
        chrome.browserAction.setIcon({
            "path":{
                "19":"assets/images/icon/19-blocked.png"
            }
        });
    } else {
        chrome.browserAction.setIcon({
            "path":{
                "19":"assets/images/icon/19-disabled.png"
            }
        });
    }
}

chrome.storage.sync.get(["domains","options"],function(data) {
    if(!("domains" in data)) {
        options=clone(defaults.options);
        save();
    } else {
        domains=clone(data.domains);
        options=clone(data.options);
    }
    options=clone(defaults.options);
    init();
});

function save() {
    chrome.storage.sync.set({
        domains:domains,
        options:options
    });
}

function domain_policy_set(domain,feature,policy) {
    if(!(domain in domains)) {
        domains[domain]=clone(defaults.domain);
    }
    domains[domain][feature]=policy;
    chrome.runtime.sendMessage({
        command:"domain-policy-changed",
        domain:domain,
        feature:feature,
        policy:policy
    });
    save();
}

function domain_policy_get(domain) {
    var policy=domains[domain];
    if(!policy)
        policy=clone(defaults.domain);
    return(policy);
}

function init() {
    chrome.runtime.onMessage.addListener(function(message,sender,response) {
        var cmd=message.command;
        if(cmd == "domain-policy-set") {
            domain_policy_set(message.domain,message.feature,message.policy);
        } else if(cmd == "domain-policy-get") {
            response({
                domain:message.domain,
                policy:domain_policy_get(message.domain)
            });
        } else if(cmd == "domain-policy-changed") {
            
        } else if(cmd == "should-block") {
            var policy=domain_policy_get(message.domain);
            if(policy[cmd.feature] == "block")
                response(true);
            else if(policy[cmd.feature] == "allow")
                response(false);
            if(options.features[cmd.feature] == "block")
                response(true);
            else
                response(false);
        } else if(cmd == "blocked-features") {
            var domain_policy=domain_policy_get(message.domain);
            var features=[];
            for(var i=0;i<defaults.features.length;i++) {
                var feature=defaults.features[i];
                var global_policy=options.features[feature];
                if(domain_policy[feature] == "allow")
                    continue;
                else if(domain_policy[feature] == "block")
                    features.push(feature);
                else if(global_policy == "block")
                    features.push(feature);
            }
            response({
                features:features
            });
        } else if(cmd == "options-get") {
            response({
                options:options
            });
        } else if(cmd == "blocked-number-set") {
            tabs[sender.tab.id]={
                blocked:message.blocked,
                total:message.total,
            };
            update_browser_action(sender.tab);
        } else if(cmd == "blocked-number-get") {
            var tid=message.tabId;
            if(!tid)
                tid=sender.tab.id;
            response(tabs[tid]);
        }
    });

    chrome.tabs.onUpdated.addListener(function(tabId,info,tab) {
        update_browser_action(tab);
    });

    chrome.tabs.onActivated.addListener(function(info) {
        chrome.tabs.get(info.tabId,function(tab) {
            update_browser_action(tab);
        });
    });

    chrome.runtime.onSuspend.addListener(function() {
        save();
    });
}
