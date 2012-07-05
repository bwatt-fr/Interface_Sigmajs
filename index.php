<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml" itemscope="" itemtype="http://schema.org/Map" lang="fr">


<head>
	<title>Interface de visualisation de graphe</title>

	<meta name="viewport" content="width=device-width, initial-scale=2,maximum-scale=1.0, user-scalable=yes">
	<meta name="content-language" content="fr">
	<meta name="robots" content="index,follow,noodp">

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<link rel="stylesheet" href="files/style.css" type="text/css">

	<!--[if IE]><script type="text/javascript" src="assets/js/excanvas.js"></script><![endif]--> <!-- js/default.js -->
	  <script src="files/ga.js" async="" type="text/javascript"></script><script src="files/jquery.js" type="text/javascript"></script>
	  <script src="files/loader.js" type="text/javascript" language="javascript"></script>
	  <script src="files/sigma.js" type="text/javascript" language="javascript"></script>
	  <script src="files/sigma_002.js" type="text/javascript" language="javascript"></script>
	  <script src="files/jquery_002.js" type="text/javascript" language="javascript"></script>
	  <script src="files/jquery.smart_autocomplete.min.js" type="text/javascript" language="javascript"></script>
	  <script src="files/facenuke.js" type="text/javascript" language="javascript"></script>

	  <link rel="stylesheet" type="text/css" href="files/jquery.css">
	  <link href='http://fonts.googleapis.com/css?family=Maven+Pro:400,700' rel='stylesheet' type='text/css'>




	<script>$(window).load(function(){load("les_miserables")});</script>




</head>


	<body>
		

		
		<div class="container">
			<h2> Graphe de navigation</h2>
			<div id="fonctionnalite">
				<div style="display: none;" id="minifier"></div>
				<div class="col">
					<div id="titre">Fonctionnalités</div>
					
					<div id="cmove">
					
						<div class="zoom">
							<div class="contains-icon zoom-icon" action="in" title="Zoom in the graph">
								<div class="icon-button icon-zoom-in"></div>
							</div>
							<div class="contains-icon zoom-icon" action="out" title="Zoom out the graph">
								<div class="icon-button icon-zoom-out"></div>
							</div>
							<div class="contains-icon" action="refresh" title="Reset graph position">
								<div class="icon-button refresh-icon icon-resize-full"></div>
							</div>
						</div>
					
									<div class="move">
							  <div title="Move up in the graph" action="up" class="contains-icon move-icon">
								<div class="icon-button icon-arrow-up"></div>
							  </div>
							  <div title="Move down in the graph" action="down" class="contains-icon move-icon">
								<div class="icon-button icon-arrow-down"></div>
							  </div>
							  <div title="Move left in the graph" action="left" class="contains-icon move-icon">
								<div class="icon-button icon-arrow-left"></div>
							  </div>
							  <div title="Move right in the graph" action="right" class="contains-icon move-icon">
								<div class="icon-button icon-arrow-right"></div>
							  </div>
							</div>
							</div>
							
					<div class="b1">
					
						
							<h3>chercher un noeud</h3>
							<form class="search-nodes-form" method="post" action="/">
							<fieldset>
							<div>
						<input type="text" id="search-nodes" autocomplete="on">
						</div>
						</fieldset>
						</form>
						
						
							<h3>noeuds sélectionnés</h3>
							<div id="actifs"></div>
							<div class="retour">Deselectionner tout</div>
								
					</div>
				</div>
				
			</div> <!-- fin de la div fonctionnalite -->
			
			<div class="sigma-parent">
				<div class="sigma-expand" id="sigma-example"></div>
			</div>
			

			<div id="info">
				
				<div id="titre">Informations</div>
				
				
				<h4> noeuds en relation </h4>
				<div class="donnees">
					
					<div class="link">
						<ul>
							<li class="reseau cf" rel="">
							<div style="background-color: rgb(69, 149, 193);" class="puce"></div>
							<div class="n"></div></li>
							<li class="membre"></li>
						</ul>
					</div>
				</div>
			</div>
		</div> <!-- fin du div container-->

		<br><br><br><br><br><br>
		
		
		

	</body>
</html>
