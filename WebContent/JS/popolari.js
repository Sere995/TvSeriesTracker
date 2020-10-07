
// Funzione Serie Popolari
	
function getPopolari(){

	document.body.style.backgroundColor = "DarkSeaGreen";

	$('#find').trigger("reset");

	var btn = document.getElementById("id_container");
	btn.setAttribute("class", "container");
		

		
	$.get("http://localhost:8080/SerieTVApp/popolari", function(serieRisultato){
		//console.log(serieRisultato);
		for(let i = 0; i<serieRisultato.results.length; i++){
			var serieid = serieRisultato.results[i].id;
			
			$.get("http://localhost:8080/SerieTVApp/video",{id_serie: serieid}, function(serieKey){
					
				var poster = imageBaseUrl+'w300'+serieRisultato.results[i].poster_path;
				var titolo = serieRisultato.results[i].name;
				var dataUscita = serieRisultato.results[i].first_air_date;
				var overview = serieRisultato.results[i].overview;
				var mediaVoti = serieRisultato.results[i].vote_average;				
				
				if(serieKey.results[0] != null){
							
					var youtubeKey = serieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
				}
						
				var popolariHTML = '';
				popolariHTML += '<div class="col-3  eachSerie">';
				popolariHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img class="poster" src="'+poster+'"></button>';
				
				//effetto finestra interna
				popolariHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
						
				//impostazione finestra interna
				popolariHTML += '<div class="modal-dialog" modal-side modal-bottom-right modal-notify modal-info" role="document">';
						
				//si può impostare bordo, colore di sfondo ecc.
				popolariHTML += '<div class="col-12 modal-content">';
				popolariHTML += '<div class="modal-header"><div class="col-6 seriePosterModal">';
				popolariHTML += '<img class="poster" src="'+poster+'">';
				popolariHTML += '</div>';
				popolariHTML += '<div class="col-6 dettagliSerie">';
				popolariHTML += '<div class="nomeSerie">'+titolo+'</div>';
						
				if(youtubeLink!=null){
					popolariHTML += '<div class="linkTrailer"><a href="'+youtubeLink+'">Guarda Trailer</a></div>';	
				}
					
				popolariHTML += '<div class="release">Data di uscita: '+dataUscita+'</div>';
				popolariHTML += '<div class="overview">' +overview+ '</div>';
				popolariHTML += '<div class="voto">Voto: '+mediaVoti+ '/10</div>';
						

					
				popolariHTML += '<div class="col-6 btn btn-primary  btn-large dettaglio" onclick = "visualizza_Dettagli ('+serieKey.id+')"> Vai ai dettagli' + '</div>';
						
						
				popolariHTML += '</div></div></div></div></div></div>'; 					
				//console.log(popolariHTML)
				$('#contentPanel').append(popolariHTML);
						
				$('#serieTitoloLabel').html("Serie TV Popolari del Momento : ");
			        
			})
			
	      }
	}) 
}