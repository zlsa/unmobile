
function inject_blocker(blocked_features) {
    var embed=[
        "html5_block={};",
        "html5_block.canvas_getContext=HTMLCanvasElement.prototype.getContext;",
        "html5_block.features=['"+blocked_features.join("','")+"'];",
        "html5_block.number={canvas:0,webgl:0,webaudio:0}",
        "HTMLCanvasElement.prototype.getContext=function(type) {",
        "  var blocked=false;",
        "  if((type == 'webgl' || type == 'experimental-webgl') && \\",
        "     html5_block.indexOf('webgl') > -1) {",
        "    html5_block.number.webgl+=1;",
        "    blocked=true;",
        "  } else if(type == '2d' && html5_block.indexOf('canvas') > -1) {",
        "    html5_block.number.canvas+=1;",
        "    blocked=true;",
        "  }",
        "  if(blocked) {",
        "    console.log('We blocked '+type);",
        "    window.postMessage({type:'NUMBER',text:JSON.stringify(html5_block.number)},'*');",
        "    return(null);",
        "  }",
        "  console.log('We did not block '+type);",
        "  return(html5_block.canvas_getContext.apply(this,arguments));",
        "};",
        ""
    ].join("\n");
    console.log(embed);

    var script=document.createElement("script");
    script.textContent=embed;
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}

window.addEventListener("message",function(event) {
    if(event.source != window)
        return;
    if(event.data.type && (event.data.type == "NUMBER")) {
        chrome.runtime.sendMessage({
            command:"blocked-number",
            domain:domain,
            number:JSON.parse(event.data.text)
        });
    }
}, false);

var domain=get_domain();

chrome.runtime.sendMessage({
    command:"blocked-features",
    domain:domain
},function(response) {
    console.log(response.features);
    inject_blocker(response.features);
});

