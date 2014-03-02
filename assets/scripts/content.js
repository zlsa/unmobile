
function inject_blocker(blocked_features) {
    var embed=[
        "html5_block={};",
        "html5_block.canvas_getContext=HTMLCanvasElement.prototype.getContext;",
        "html5_block.features=['"+blocked_features.join("','")+"'];",
        "html5_block.number={canvas:0,webgl:0,webaudio:0}",
        "html5_block.total={canvas:0,webgl:0,webaudio:0}",
        "HTMLCanvasElement.prototype.getContext=function(type) {",
        "  var blocked=false;",
        "  if(type == '2d')",
        "    html5_block.total.canvas+=1;",
        "  if(type == 'webgl' || type == 'experimental-webgl')",
        "    html5_block.total.webgl+=1;",
        "  if((type == 'webgl' || type == 'experimental-webgl') && ",
        "     html5_block.features.indexOf('webgl') > -1) {",
        "    html5_block.number.webgl+=1;",
        "    blocked=true;",
        "  } else if(type == '2d' && html5_block.features.indexOf('canvas') > -1) {",
        "    html5_block.number.canvas+=1;",
        "    blocked=true;",
        "  }",
        "  window.postMessage({type:'NUMBER',text:JSON.stringify([",
        "    html5_block.number,",
        "    html5_block.total",
        "  ])},'*');",
        "  if(blocked)",
        "    return(null);",
        "  return(html5_block.canvas_getContext.apply(this,arguments));",
        "};",
        ""
    ].join("\n");

    var script=document.createElement("script");
    script.textContent=embed;
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}

window.addEventListener("message",function(event) {
    if(event.source != window)
        return;
    if(event.data.type && (event.data.type == "NUMBER")) {
        var data=JSON.parse(event.data.text);
        chrome.runtime.sendMessage({
            command:"blocked-number-set",
            domain:domain,
            blocked:data[0],
            total:data[1]
        });
    }
}, false);

var domain=get_domain();

chrome.runtime.sendMessage({
    command:"blocked-features",
    domain:domain
},function(response) {
    inject_blocker(response.features);
    chrome.runtime.sendMessage({
        command:"blocked-number-set",
        domain:domain,
        blocked:{webgl:0,canvas:0,webaudio:0},
        total:{webgl:0,canvas:0,webaudio:0}
    });
});

