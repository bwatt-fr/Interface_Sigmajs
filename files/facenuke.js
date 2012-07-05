
Array.prototype.member=function(o) {
  for (var index=0; index<this.length; index++) {
     if (this[index]==o) { return index; }
  }
  return -1;
}


function array_label2()
{
var $res=new Array();
for(var i= 0; i < sigInst.actif.length; i++){

var d = sigInst._core.graph.nodesIndex[sigInst.actif[i]];
if(d)
{	
$res.push(new Array(d.label,d.id));
}
}
return $res;

}


function Recherche(a) {
    this.input = a.find("input[name=recherche]");
    this.state = a.find(".state");
    this.results = a.find(".resultats");
    this.exactMatch = !1;
    this.lastSearch = "";
    this.searching = !1;
    var b = this;
    this.input.focus(function () {
        var a = $(this);
        a.data("focus") || (a.data("focus", !0), a.removeClass("empty"));
        b.clean()
    });
    this.input.keyup(function (a) {
         return b.state.addClass("searching"), b.search(b.input.val()), !1
    });
    this.state.click(function () {
        var a = b.input.val();
        b.searching && a == b.lastSearch ? b.close() : (b.state.addClass("searching"), b.search(a))
    });
    this.dom = a;
    this.close = function () {
        this.state.removeClass("searching");
        this.results.hide();
        this.searching = !1;
        nodeNormal()
    };
    this.clean = function () {
        this.results.empty().hide();
        this.state.removeClass("searching");
        this.input.val("")
    };
    this.search = function (a) {
        var b = !1,
            c = [],
            b = this.exactMatch ? ("^" + a + "$").toLowerCase() : a.toLowerCase(),
            g = RegExp(b);
        this.exactMatch = !1;
        this.searching = !0;
        this.lastSearch = a;
        this.results.empty();
        if (2 >= a.length) this.results.html("<i>Veuillez faire une recherche sur un nom d'au minimum 3 lettres.</i>");
        else {
            sigInst.iterNodes(function (a) {
                g.test(a.label.toLowerCase()) && c.push({
                    id: a.id,
                    nom: a.label
                })
            });
            c.length ? (b = !0, Select(c[0].id)) : b = showCluster(a);
            a = ["<b>R\u00e9sultats de votre recherche : </b>"];
            if (1 < c.length) for (var d = 0, h = c.length; d < h; d++) a.push('<a href="#' + c[d].nom + '" onclick="Select(\'' + c[d].id + "')\">" + c[d].nom + "</a>");
            0 == c.length && !b && a.push("<i>Aucun r\u00e9sultat trouv\u00e9</i>");
            1 < a.length && this.results.html(a.join(""));
            this.results.show()
        }
    }
}





function nodeNormal() {
    document.getElementById("actifs").innerHTML = '';

    sigInst.actif = new Array();
    sigInst.iterNodes(function (b) {
        b.attr.lineWidth = !1; //1
        b.attr.color = b.color
    });
    sigInst.iterEdges(function (a) {
        a.attr.color = a.color; //!1;
        a.hidden = !0
    });
    $GP.info.hide();
    sigInst.draw(2, 2, 2, 2);


}

function unSelect(a) {
sigInst.actif.splice(sigInst.actif.member(a),1);
}

function Select(a) {

    if (sigInst.actif.member(a) != -1) {
        unSelect(a);
    } else {
        sigInst.actif.push(a);
        //Select(a);
        $GP.info_data.show();
        var b = sigInst._core.graph.nodesIndex[a];
        $GP.info.show();
        resize();
        window.location.hash = b.label;


    }
    refresh();
}


function refresh() {
    var tab = array_label2();
    var e = [];
    var tmp = [];
    var old = [];
    var res = [];
    if (tab.length == 0) {

        nodeNormal();
    } else {
        sigInst.neighbors = {};

        sigInst.iterNodes(function (a) {
            a.hidden = !1; //cache les noeuds qui ne sont pas voisins.
            a.attr.lineWidth = !1; //1
            a.attr.color = "rgba(100, 100, 100, 1)" //a.color
        });
        for (var i = 0; i < sigInst.actif.length; i++) {
            tmp = [];
            sigInst.iterEdges(function (a) {
                a.attr.color = a.color; //!1;
                a.hidden = !0
                var flag = false;
                //traitement des noeuds voisins
                if (sigInst.actif[i] == a.source || sigInst.actif[i] == a.target) {
                    if (sigInst.actif[i] == a.source) {
                        if (tmp.member(a.target) == -1) tmp.push(a.target);

                    } else {
                        if (tmp.member(a.source) == -1) tmp.push(a.source);
                    }

                    if (i == 0) {
                        old = [];
                        for (var z = 0; z < tmp.length; z++) {
                            old.push(tmp[z]);
                        }

                    }
                    res = [];

                    for (var j = 0; j < tmp.length; j++) {
                        if (old.member(tmp[j]) != -1) {
                            res.push(tmp[j]);
                        }
                    }
                    old = [];
                    for (var z = 0; z < res.length; z++) {
                        old.push(res[z]);
                    }
                    sigInst.neighbors[sigInst.actif[i] == a.target ? a.source : a.target] = {
                        nom: a.label,
                        couleur: a.color
                    }
                    if (i == sigInst.actif.length - 1) {
                        a.attr.lineWidth = !0, 4; //1
                        if (sigInst.actif[i] == a.target) var d = sigInst._core.graph.nodesIndex[a.source];
                        else var d = sigInst._core.graph.nodesIndex[a.target];
                        d.hidden = !1;
                        d.attr.lineWidth = !1; //1 // ligne autours du noeud
                        d.attr.color = "rgba(255, 102,0, 1)";
                        a.hidden = !1;
                        a.attr.color = "rgba(255, 255, 255, 255)";
                    }
                }
            })
        }
        for (var z = 0; z < res.length; z++) //version pour afficher tous les voisin
        {
            var d = sigInst._core.graph.nodesIndex[res[z]];
            e.push({
                id: d.id,
                nom: d.label
            });
        }

        e.sort(function (a, b) {
            var e = a.nom.toLowerCase(),
                f = b.nom.toLowerCase();
            return e < f ? -1 : e > f ? 1 : 0
        });
        var f = [];
        for (var z = 0; z < e.length; z++) {
            c = e[z];
            if (c) f.push('<li class="membre"><a href="#' + c.nom + '" onmouseover="sigInst._core.plotter.drawHoverNode(sigInst._core.graph.nodesIndex[\'' + c.id + "'])\" onclick=\"Select('" + c.id + '\')" onmouseout="sigInst.refresh()">' + c.nom + "</a></li>");
        }

        $GP.info_link.find("ul").html(f.join(""));



        for (var i = 0; i < sigInst.actif.length; i++) { //traitement des noeuds voisins

            var d = sigInst._core.graph.nodesIndex[sigInst.actif[i]];
            d.hidden = !1;
            d.attr.color = d.color;
            d.attr.lineWidth = 6;
            d.attr.strokeStyle = "#000000";

        }
        document.getElementById("actifs").innerHTML = '';
        for (var i = 0; i < tab.length; i++) {
            document.getElementById("actifs").innerHTML += '<div class="unselect" onclick="unSelect(\'' + tab[i][1] + '\');refresh();">' + tab[i][0] + '</div>';
        }
        sigInst.draw(2, 2, 2, 2);
    }
}




function init(param) {
    var a = sigma.init(document.getElementById("sigma-example")).drawingProperties({
        defaultLabelColor: "#333",
        defaultLabelSize: 12,
        defaultLabelBGColor: "#ddd",
        defaultHoverLabelBGColor: "#009BE1",
        defaultLabelHoverColor: "#fff",
        labelThreshold: 8,
        defaultEdgeType: "curve",
        hoverFontStyle: "bold",
        fontStyle: "bold",
        activeFontStyle: "bold"
    }).graphProperties({
        minNodeSize: 1,
        maxNodeSize: 7,
        minEdgeSize: 0.2,
        maxEdgeSize: 0.5
    }).mouseProperties({
        minRatio: 0.5,
        maxRatio: 32,
        zoomDelta: 0.1,
        zoomMultiply: 2
    });
    sigInst = a;
    a.actif = !1;
    a.neighbors = {};
    a.detail = !1;
	
	 $.loader({
        className:"blue-with-image",
        content:''
    });
	
	var s="Gexf/"+param+".gexf"
     a.parseGexf(s);
	 

$.loader('close');
    gexf = sigmaInst = null;

	sigInst.actif=new Array();

	
    a.bind("upnodes", function (a) {
        Select(a.content[0])
    });
	labels=new  Array;
	a.iterNodes(function (b) {		
        b.attr.lineWidth = !1;//1
        b.attr.color = b.color;
		labels.push(b.label);
    });
	
	$('form.search-nodes-form').submit(function(e){
          onAction();
          e.preventDefault();
        });
		
	$('#search-nodes').smartAutoComplete({
          source: labels
        });
        
         $("#search-nodes").bind({
		 
     itemSelect: function(ev, selected_item){ 
      var options = $(this).smartAutoComplete();

      //get the text from selected item
      var selected_value = $(selected_item).text();
	$('#search-nodes').val(selected_value);
   
   a.iterNodes(function(n){
            if(n.label==selected_value){
              node = n;
			  Select(n.id);
            }
          });
		  
		  options.setItemSelected(true);

      //hide results container
      $(this).trigger('lostFocus');
        
      //prevent default event handler from executing
      ev.preventDefault();
    }

  });
  
     $('.move-icon').click(function (event) {
         var moveDelay = 80;
         var newPos = a.position();
         switch ($(this).attr('action')) {
         case 'up':
             newPos.stageY -= moveDelay;
             break;
         case 'down':
             newPos.stageY += moveDelay;
             break;
         case 'left':
             newPos.stageX -= moveDelay;
             break;
         case 'right':
             newPos.stageX += moveDelay;
             break;
         }

         a.goTo(newPos.stageX, newPos.stageY);

         event.stopPropagation();
         return false;
     });


     $('.zoom-icon').click(function (event) {
         var zoomDelay = 1.5;
         var ratio = a.position().ratio;
         switch ($(this).attr('action')) {
         case 'in':
             ratio *= zoomDelay;
             break;
         case 'out':
             ratio /= zoomDelay;
             break;
         }

         a.goTo($('.sigma-container').width() / 1.5, $('.sigma-container').height() / 1.5, ratio);

         event.stopPropagation();
         return false;
     });

     $('.refresh-icon').click(function (event) {
         a.position(0, 0, 1).draw();

         event.stopPropagation();
         return false;
     });

     a.draw();
     refresh();



     }

function resize() {
    var a = $("body");
    500 > a.width() ? ($GP.intro.hide(), $GP.mini.show()) : ($GP.intro.show(), $GP.mini.hide());
    $GP.minifier.hide();
    // a = a.height() - 120;
    // $GP.info.css("height", a);
    var b = $GP.info_link.position(),
        f = $GP.info.position();
    $GP.info_link.height(a - b.top - f.top)
}

function load(param) {
    var a = $;
    $GP = {
        calculating: !1,
        showgroupe: !1
    };
    $GP.intro = a("#fonctionnalite");
	$GP.info_close = $GP.intro.find(".retour");
    $GP.minifier = $GP.intro.find("#minifier");
    $GP.mini = a("#minify");
    $GP.info = a("#info");
    $GP.info_donnees = $GP.info.find(".donnees");
    $GP.info_name = $GP.info.find(".name");
    $GP.info_link = $GP.info.find(".link");
    $GP.info_data = $GP.info.find(".data");
    $GP.info_close = $GP.intro.find(".retour");
    $GP.info_close2 = $GP.info.find(".fermer");
    $GP.info_p = $GP.info.find(".p");
    $GP.info_close.click(nodeNormal);
    $GP.info_close2.click(nodeNormal);
    $GP.form = a("#fonctionnalite").find("form");
    $GP.recherche = new Recherche($GP.form.find("#recherche"));
    init(param);
    resize();
    $GP.bg = a(sigInst._core.domElements.bg);
    $GP.bg2 = a(sigInst._core.domElements.bg2);
    var a = [],
        b;

    a.sort();

    b = {
        minWidth: 400,
        maxWidth: 800,
        minHeight: 300,
        maxHeight: 600
    };
    $("a.fb").fancybox(b);
    $(".zoom").find("contains-icon zoom-icon").each(function () {
        var a = $(this),
            b = a.attr("action");
        a.click(function () {
            var a = sigInst._core;
            sigInst.zoomTo(a.domElements.nodes.width / 2, a.domElements.nodes.height / 2, a.mousecaptor.ratio * ("in" == b ? 1.5 : 0.5))
        })
    });
    $GP.mini.click(function () {
        $GP.mini.hide();
        $GP.intro.show();
        $GP.minifier.show()
    });
    $GP.minifier.click(function () {
        $GP.intro.hide();
        $GP.minifier.hide();
        $GP.mini.show()
    });



	
	
	
}
$(window).resize(resize);






