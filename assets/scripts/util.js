
var defaults={
    policies:["global","allow","block"],
    features:["canvas","webgl","webaudio"],
    domain:{
        webgl:"block",
        canvas:"block",
        webaudio:"block",
    },
    options:{
        features:{
            webgl:"block",
            canvas:"block",
            webaudio:"block",
        }
    }
};

function get_policy_desc(policy) {
    if(policy == "global")
        return "Use global settings for";
    if(policy == "allow")
        return "Always allow";
    if(policy == "block")
        return "Always block";
}

function get_feature_name(feature) {
    if(feature == "webgl")
        return "WebGL";
    if(feature == "canvas")
        return "Canvas";
    if(feature == "webaudio")
        return "WebAudio";
}

// from http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function get_domain(url) {
    if(!url)
        url=location.href;
    var matches=url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain=matches && matches[1];
    if(!domain)
        domain="chrome";
    return domain;
}
