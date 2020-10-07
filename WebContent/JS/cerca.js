function cercaSerie(){
	document.body.style.backgroundColor = "DarkSeaGreen";
		
		var btn = document.getElementById("id_container");
		btn.setAttribute("class", "container");
		
		$.get("http://localhost:8080/SerieTVApp/ricerca",{id_ricerca:parolachiave}, function(serieRisultato){
			//console.log(serieRisultato);
			
			if(serieRisultato.results.length==0){
				$('#serieTitoloLabel').html("Non ho trovato risultati per la parola :  "+ parolachiave);
			}
			else{
			
				for (let i = 0; i<serieRisultato.results.length; i++){
					var serieid = serieRisultato.results[i].id;		
					
					$.get("http://localhost:8080/SerieTVApp/video",{id_serie: serieid}, function(serieKey){
					
						if( serieRisultato.results[i].poster_path != null) {
						//console.log(serieKey)
							var poster = imageBaseUrl+'w300'+serieRisultato.results[i].poster_path;
							var titolo = serieRisultato.results[i].name;
							var dataUscita = serieRisultato.results[i].first_air_date;
							var overview = serieRisultato.results[i].overview;
							var mediaVoti = serieRisultato.results[i].vote_average;	
							
							if(serieKey.results[0] != null){
								var youtubeKey = serieKey.results[0].key;
								var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
							}
							
							var searchResultsHTML = '';
							searchResultsHTML += '<div class="col-3 eachSerie">';
							//effetto finestra interna
							
							searchResultsHTML += '<button id="posterTV" type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img class="poster" src="'+poster+'"></button>';

							searchResultsHTML += '<div class="modal" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							
							//impostazione finestra interna
							searchResultsHTML += '<div class="modal-dialog" modal-side modal-bottom-right modal-notify modal-info" role="document">';
							
							//si può impostare bordo, colore di sfondo ecc.
							searchResultsHTML += '<div class="col-12 modal-content">';
							searchResultsHTML += '<div class="modal-header"><div class="col-6 seriePosterModal">';
							searchResultsHTML += '<img class="poster" src="'+poster+'">';
							searchResultsHTML += '</div>';
							searchResultsHTML += '<div class="col-6 dettagliSerie">';
							searchResultsHTML += '<div class="nomeSerie">'+titolo+'</div>';
							
							if(youtubeLink!=null){
								searchResultsHTML += '<div class="linkTrailer"><a href="'+youtubeLink+'">Guarda Trailer</a></div>';	
							}
						
							searchResultsHTML += '<div class="release">Data di uscita: '+dataUscita+'</div>';
							searchResultsHTML += '<div class="overview">' +overview+ '</div>';
							searchResultsHTML += '<div class="voto">Voto: '+mediaVoti+ '/10</div>';
							//console.log(serieid);
						
							searchResultsHTML += '<div class="col-6 btn btn-primary btn-large  dettaglio" onclick = "visualizza_Dettagli ('+serieKey.id+')">Vai ai dettagli</div>';
							
							searchResultsHTML += '</div></div></div></div></div></div>'; 					
							
							$('#contentPanel').append(searchResultsHTML);
	
							$('#serieTitoloLabel').html("Hai cercato la parola : "+ parolachiave);
							
						
						}
						
					})
				}
			}
		})
}
