var gexf,sigmaInst;
sigma.publicPrototype.parseGexf=function(f){sigmaInst=this;var c=!1;try{var a=new XMLHttpRequest;a.open("GET",f,!1)}catch(j){if("undefined"!=typeof window.ActiveXObject){gexf=new ActiveXObject("Microsoft.XMLDOM");for(gexf.async=!1;4!=gexf.readyState;);gexf.load(f);parseXML()}else gexf=document.implementation.createDocument("","",null),gexf.onload=parseXML,gexf.load(f);c=!0}c||(a.setRequestHeader("Content-Type","text/xml"),a.overrideMimeType&&a.overrideMimeType("text/xml"),a.send(""),gexf=a.responseXML,
$parseXML())};
function parseXML(){var f,c,a,j=[],n=[],h=gexf.getElementsByTagName("attributes");for(f=0;f<h.length;f++)if(c=h[f],"node"==c.getAttribute("class")){a=c.getElementsByTagName("attribute");for(c=0;c<a.length;c++){var d=a[c],e=d.getAttribute("id"),b=d.getAttribute("title"),d=d.getAttribute("type"),e={id:e,title:b,type:d};j.push(e)}}else if("edge"==c.getAttribute("class")){a=c.getElementsByTagName("attribute");for(c=0;c<a.length;c++)d=a[c],e=d.getAttribute("id"),b=d.getAttribute("title"),d=d.getAttribute("type"),
e={id:e,title:b,type:d},n.push(e)}n=gexf.getElementsByTagName("nodes");j=document.body.getElementsByTagNameNS?!0:!1;for(f=0;f<n.length;f++){h=n[f].getElementsByTagName("node");for(c=0;c<h.length;c++){b=h[c];e=b.getAttribute("id");a=b.getAttribute("label")||e;var d=1,g=100-200*Math.random(),k=100-200*Math.random(),m,i=b.getElementsByTagName("size");0<i.length||(i=j?b.getElementsByTagNameNS("http://www.gexf.net/1.2draft/viz","size"):b.getElementsByTagName("viz:size"));0<i.length&&(d=parseFloat(i[0].getAttribute("value")));
i=b.getElementsByTagName("position");0<i.length||(i=j?b.getElementsByTagNameNS("*","position"):b.getElementsByTagName("viz:position"));0<i.length&&(k=i[0],g=parseFloat(k.getAttribute("x")),k=parseFloat(k.getAttribute("y")));i=b.getElementsByTagName("color");0<i.length||(i=j?b.getElementsByTagNameNS("*","color"):b.getElementsByTagName("viz:color"));if(0<i.length){m=i[0];var l=parseFloat(m.getAttribute("r")),p=parseFloat(m.getAttribute("g")),o=parseFloat(m.getAttribute("b"));m="#"+sigma.tools.rgbToHex(l,
p,o)}k={label:a,size:d,x:g,y:k,attributes:[],color:m,colors:{r:l,g:p,b:o}};b=b.getElementsByTagName("attvalue");for(a=0;a<b.length;a++)g=b[a],d=g.getAttribute("for"),g=g.getAttribute("value"),k.attributes.push({attr:d,val:g});sigmaInst.addNode(e,k)}}l=0;p=gexf.getElementsByTagName("edges");for(f=0;f<p.length;f++){m=p[f].getElementsByTagName("edge");for(c=0;c<m.length;c++){h=m[c];o=h.getAttribute("source");e=h.getAttribute("target");a=h.getAttribute("label");n={id:c,sourceID:o,targetID:e,label:a,attributes:[]};
a=h.getAttribute("weight");void 0!=a&&(n.weight=a);a=h.getElementsByTagName("color");0<a.length||(a=j?h.getElementsByTagNameNS("*","color"):h.getElementsByTagName("viz:color"));0<a.length&&(a=a[0],n.color="#"+sigma.tools.rgbToHex(parseFloat(a.getAttribute("r")),parseFloat(a.getAttribute("g")),parseFloat(a.getAttribute("b"))));b=h.getElementsByTagName("attvalue");for(a=0;a<b.length;a++)g=b[a],d=g.getAttribute("for"),g=g.getAttribute("value"),n.attributes.push({attr:d,val:g});sigmaInst.addEdge(l++,
o,e,n)}}}
function $parseXML(){var f,c,a,j=jQuery,n=j(gexf),h=[],d=[];a=n.find("attributes");for(f=0;f<a.length;f++)if(c=a[f],"node"==c.attr("class")){var e=c.find("attribute");for(c=0;c<e.length;c++){var b=j(e[c]),g=b.attr("id"),k=b.attr("title"),b=b.attr("type"),g={id:g,title:k,type:b};h.push(g)}}else if("edge"==c.attr("class")){e=c.find("attribute");for(c=0;c<e.length;c++)b=j(e[c]),g=b.attr("id"),k=b.attr("title"),b=b.attr("type"),g={id:g,title:k,type:b},d.push(g)}h=n.find("nodes");for(f=0;f<h.length;f++){d=j(h[f]).find("node");
for(c=0;c<d.length;c++){e=j(d[c]);g=e.attr("id");a=e.attr("label")||g;var b=1,k=100-200*Math.random(),m=100-200*Math.random(),i,l=e.find("size");0<l.length||(l=e.find("viz\\:size"));0<l.length&&(b=j(l[0]),b=parseFloat(b.attr("value")));l=e.find("position");0<l.length||(l=e.find("viz\\:position"));0<l.length&&(m=j(l[0]),k=parseFloat(m.attr("x")),m=parseFloat(m.attr("y")));l=e.find("color");0<l.length||(l=e.find("viz\\:color"));if(0<l.length){i=j(l[0]);var p=parseFloat(i.attr("r")),o=parseFloat(i.attr("g")),
q=parseFloat(i.attr("b"));i="#"+sigma.tools.rgbToHex(p,o,q)}m={label:a,size:b,x:k,y:m,attributes:[],color:i,colors:{r:p,g:o,b:q}};e=e.find("attvalue");for(a=0;a<e.length;a++)b=j(e[a]),k=b.attr("for"),b=b.attr("value"),m.attributes.push({attr:k,val:b});sigmaInst.addNode(g,m)}}p=0;n=n.find("edges");for(f=0;f<n.length;f++){o=j(n[f]).find("edge");for(c=0;c<o.length;c++){h=j(o[c]);i=h.attr("source");q=h.attr("target");a=h.attr("label");g={id:c,sourceID:i,targetID:q,label:a,attributes:[]};d=h.attr("weight");
void 0!=d&&(g.weight=d);d=h.find("color");0<d.length||(d=h.find("viz\\:color"));0<d.length&&(d=j(d[0]),g.color="#"+sigma.tools.rgbToHex(parseFloat(d.attr("r")),parseFloat(d.attr("g")),parseFloat(d.attr("b"))));e=h.find("attvalue");for(a=0;a<e.length;a++)b=j(e[a]),k=b.attr("for"),b=b.attr("value"),g.attributes.push({attr:k,val:b});sigmaInst.addEdge(p++,i,q,g)}}};