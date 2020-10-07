

function visualizza_Dettagli (id_sel) {

	document.body.style.backgroundColor = "DarkSeaGreen";
	
	$('#serieTitoloLabel').html("");
	
	$('#find').trigger("reset");

	$('#modal-content').modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();

	$('#contentPanel').html('');

	//console.log(id_sel);
	var dettaglioHTML ='';
	
	$.get("http://localhost:8080/SerieTVApp/dettagli",{id_ricerca:id_sel}, function(serieDettagli){
		var nome = serieDettagli.name;
		var poster = imageBaseUrl+'w300'+serieDettagli.poster_path;

		//console.log(nome);
		
		var btn = document.getElementById("id_container");
		btn.setAttribute("class", "container jumbotron");
		
		dettaglioHTML =`	
			<div class="col-8">
	          <h1 class="titoloDettagli mb-3 display-3">`+nome+`</h1>
	          <div class=" btn btn-icon" id="btnAdd" hidden="true" onclick = AggiungiAllaLista(`+ id_sel + `)  ><b><i class="fa fa-plus-square" > Aggiungi Alla Lista </i></b></div>
	          <div class=" btn btn-icon" id="btnCheck"  hidden="true" onclick = RimuoviDallaLista(`+ id_sel + `)><i class="fa fa-check-square" > <b> In Lista</b></i></div>		
	          <p>`+serieDettagli.overview+`</p>
	          <h3>Numero di Episodi: `+serieDettagli.number_of_episodes+`</h3> `;
		
	    if (serieDettagli.in_production){
	    	  dettaglioHTML +=`
	    	  <div class = "row">
	    	  <div class="col-3">
	              <h6>Stato: In Corso </h6>  
	             </div>
	              <div class="col-5">  `;
	    
	    	  if(serieDettagli.next_episode_to_air!=null){
	    		  	dettaglioHTML +=` <h6>Prossimo ep:`+serieDettagli.next_episode_to_air.air_date+`</h6>  `; 
	    	  	}
	    	  dettaglioHTML +=`</div></div> `	;
	    }else{	  
	    	dettaglioHTML +=` <h6>Stato: Conclusa</h6>  `;         
	     }
	     
	    dettaglioHTML +=` <div class="col-8 h6 numeroEpisodi" id="numeroEpisodi" hidden="true" ></div>	            
	        </div>
	        <div class="col-4">
	          <img class="poster" src="`+poster+`">    
	        </div>
	        </div>
	
	        <div class="row">
			<div class="col-4">
					<div class="attore  mb-5 mb-lg-0">
						<h3 class="mb-4 homeFont2">Attori:</h3>
						<ul class="list-group">`;
		
		$.get("http://localhost:8080/SerieTVApp/attori",{id_ricerca:id_sel}, function(attoriInfo){
			
			
			for (let i = 0; i<attoriInfo.cast.length; i++){
				
					var nomeAttore = attoriInfo.cast[i].name;
					if (attoriInfo.cast[i].profile_path != null){
						var foto = imageBaseUrl+'w92'+attoriInfo.cast[i].profile_path;	
					} else{
						var foto = "images//non-disponibile.png";
					
					}
					
					
					var personaggio = attoriInfo.cast[i].character;
	
					//console.log(nomeAttore);
					
					dettaglioHTML +=`	
	                	<li  class="list-group-item">        
							<div class="d-flex align-items-center" >
	            				<img src="`+foto+`"  alt="Image" class="img-fluid mr-2" width="92"> </img>
	            				<div class="attori">
	            					<span class="d-block ">`+ nomeAttore +`</span>
	            						<span class="small">`+ personaggio +`</span>
	            				</div>
	            			</div>  
	            		</li> `;
				}
			//console.log(attoriInfo.cast.length);
			
			dettaglioHTML +=`	
				</ul></div></div>`;

	        		dettaglioHTML +=`
	        <div class="col-8">
	        <h3 class="mb-4 homeFont2">Stagioni:</h3>	 `;

	 
	        for(let i=0; i<serieDettagli.seasons.length; i++){

				if (serieDettagli.seasons[i].poster_path != null){
					var posterStagione = imageBaseUrl+'w185'+serieDettagli.seasons[i].poster_path;
					
				} else{
					var posterStagione = "images//non-disponibile.png";
				
				}
				if (serieDettagli.seasons[i].overview != null){
		
					var tramaStagione = serieDettagli.seasons[i].overview;
				} else{
					var tramaStagione = "trama per la stagione non disponibile";
				}
				
			
				var nomeStagione = serieDettagli.seasons[i].name;
				var numEpisodi = serieDettagli.seasons[i].episode_count;
				dettaglioHTML +=`	
		    		
		            <div class="d-block d-md-flex bg-white mb-5" >
		            	<img class="poster" src="`+posterStagione+`"> 
		              
		                <div class="text">
		
		                	<h3 class="font-weight-light"><b> `+ serieDettagli.seasons[i].name  +`</b></h3>
		                		
		                	<div class="text-black mb-3">`+tramaStagione+`</div>
		                	
		                	<button id="stagioneDettagli" type="button" float-right class="btnModal"  onclick="VisualizzaEpisodi(`+ id_sel + `,`+ i + `,`+ numEpisodi +  `,\``+ nomeStagione + `\`)"  data-toggle="modal" data-target="#esempioModal`+ i + `" data-whatever="@` + i + `">Vai agli episodi</button>
							
							</div></div>`;
				
	        }   																					
	        																							
		 
		dettaglioHTML +=`</div></div> `;
		$('#contentPanel').append(dettaglioHTML);	
		
		//console.log(sessionStorage.getItem('username'));
		
		if (sessionStorage.getItem('username')!=null){
			
			var inlista= serieDettagli.inLista;
			//console.log(inlista);
			
			if(inlista.localeCompare("no")==0){
				var btn2 = document.getElementById("btnAdd");
				btn2.removeAttribute("hidden");
			}else{
				var btn2 = document.getElementById("btnCheck");
				btn2.removeAttribute("hidden");
				var numEpisodi = serieDettagli.numEpisodi;
				//console.log("numero episodi visti :"+numEpisodi);
				var btn3 = document.getElementById("numeroEpisodi");
				btn3.removeAttribute("hidden");
				btn3.innerHTML ="Numero episodi visti : " +numEpisodi;
			}
		}
		
		})
	
	})
	
}


function getNumberOfSeason(nomeStagione,i) {

		//console.log("nomeStagione: " +nomeStagione);
		var num = nomeStagione.replace("Stagione", "");
		var num = num.replace("Season", "");
		var num = num.replace("Specials", "");
		var num = num.replace("Speciali", "0");
		var num = num.replace(" ", "");
		//console.log("Questo e numStagione : "+num);
		//console.log("Questo e i : "+i);
		if(num.length!=1){
			return i;
		}	
	return num;
}

function VisualizzaEpisodi(id_sel,i,numEpisodi,nomeStagione){
	
	var btn2 = document.getElementById("stagioneDettagli");
	btn2.setAttribute("showEdit","true");
	
	//console.log(nomeStagione);
	var numStagione =getNumberOfSeason(nomeStagione,i);

	
	var episodiHTML=`
	
		<div class="modal" id="esempioModal` + i +`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		
		<div class="modal-dialog modal-dialog-scrollable"  modal-side modal-bottom-right modal-notify modal-info" role="document">

		<div class="col-12 modal-content"  mb-5 mb-lg-0>
		<div class="modal-header ">
		
		 <h3 class="modal-title mx-auto" id="exampleModalScrollableTitle">`+nomeStagione+`: </h3>
		</div>
			<div class="modal-body">
				<ul class="list-group "> 
			`;
	
	prelevaEpisodi(id_sel,numStagione).then(episodi_info => {
	     //console.log(episodi_info[0]);
	
	     if (sessionStorage.getItem('username')!=null){
	    	 verifica(id_sel,numStagione,numEpisodi).then(data => {
			 //console.log(data[0]);
					
		
				for(let j=0; j<numEpisodi; j++){	
						//console.log(episodi_info.episodes[j].name);	
	
						episodiHTML +=`	
							
							<li  class="list-group-item">
									
							<div class="custom-control custom-checkbox">`;
			
						var msg = $("risposta", data[j]).text();
						//console.log(msg);
						
						if (msg.localeCompare("Vero") == 0){
							episodiHTML +=`	
								<input type="checkbox"   class="custom-control-input" id="check`+numStagione+j+`" checked="true"  >`;
						}else {
							episodiHTML +=`	
								<input type="checkbox"   class="custom-control-input" id="check`+numStagione+j+`"  >`;
						}
						
					
					episodiHTML +=`<label class="custom-control-label" for="check`+numStagione+j+`">Ep `+(j+1)+`: `+episodi_info[0].episodes[j].name+`</label>
					
					 	</div>	</li>`;

				}
				
				episodiHTML +=`	</ul></div></div></div></div>`;
				$('#contentPanel').append(episodiHTML);
				$('#esempioModal'+i).modal('show');
				
				$('.custom-control-input').on('change', function(){ 
					var idEp = this.id;
					idEp = idEp.replace("check"+numStagione, "");
					idEp = idEp.replace("check"+i, "");
					if(this.checked){
					//console.log(idEp);
					//console.log(numStagione);
						var btn2 = document.getElementById("btnAdd");
						var prop = btn2.getAttribute("hidden");

				
						$.post("http://localhost:8080/SerieTVApp/aggiungiEpisodio",{id_ricerca:id_sel,num_stagione:numStagione,id_episodio:idEp}, function(data){
							var msg = $("risposta", data).text();
							//console.log(msg);
							if (msg.localeCompare("Episodio Aggiunto") == 0){
							
								if(prop == null ){
	
									btn2.setAttribute("hidden","true");
									var btn3 = document.getElementById("btnCheck");
									btn3.removeAttribute("hidden");
								}	
							}else {			
								alert("Errore episodio non aggiunto!");
								var elem = document.getElementById(this.id);
								elem.removeAttribute("checked");
							}
						})
					}else{

						$.post("http://localhost:8080/SerieTVApp/rimuoviEpisodio",{id_ricerca:id_sel,num_stagione:numStagione,id_episodio:idEp}, function(data){
							
							var msg = $("risposta", data).text();
							//console.log(msg);
							if (msg.localeCompare("Episodio Rimosso") == 0){
								//console.log("Episodio rimosso!");
	
							}else{
								alert("Errore episodio non rimosso!");
								var elem = document.getElementById(this.id);
								elem.setAttribute("checked","true");
							}
						})
					
					}

				})

			
	    	 })
	     	}else {
				for(let j=0; j<numEpisodi; j++){
					episodiHTML +=
					`<li  class="list-group-item">
					<p3>Ep `+(j+1)+`: `+episodi_info[0].episodes[j].name+`</p3>
					</li>`;
				}
				episodiHTML +=`	</ul></div></div></div></div>`;
				$('#contentPanel').append(episodiHTML);	
				$('#esempioModal'+i).modal('show');
			}
        
	 }).catch(err => {
	     console.log(err);
	 });
	
}

function verifica(id_sel,numStagione,numEpisodi){
	let promises = [];
	//console.log("sto in verifica e questo è i : "+i);
    for (let j = 0; j < numEpisodi; j++) {
    
         promises.push($.get("http://localhost:8080/SerieTVApp/verificaEpisodio",{id_ricerca:id_sel,num_stagione:numStagione,id_episodio:j}));
    }
    return Promise.all(promises);
}

function prelevaEpisodi(id_sel,numStagione){
	let promises = [];
	//console.log("sono nella get episodi e questo è numStagione :" +numStagione);
		promises.push($.get("http://localhost:8080/SerieTVApp/episodi", { id_ricerca:id_sel,num_stagione:numStagione})); 
    return Promise.all(promises);
}


function AggiungiAllaLista(id_Sel){
	
	$.post("http://localhost:8080/SerieTVApp/aggiungi",{id_ricerca:id_Sel}, function(data){
		
		var msg = $("risposta", data).text();
		//console.log(msg);
		if (msg.localeCompare("Serie Aggiunta") == 0){
		
			var btn = document.getElementById("btnCheck");
			btn.removeAttribute("hidden");
	
			var btn2 = document.getElementById("btnAdd");
			btn2.setAttribute("hidden","true");
			
		}else {
			alert("Errore Serie non aggiunta!");
		}
	})
}



function RimuoviDallaLista(id_Sel){
	
	$.post("http://localhost:8080/SerieTVApp/rimuovi",{id_ricerca:id_Sel}, function(data){
		
		var msg = $("risposta", data).text();
		//console.log(msg);
		if (msg.localeCompare("Serie Rimossa") == 0){
		
			$('#contentPanel').html('');
			
			visualizza_Dettagli(id_Sel);
		}else {
			alert("Errore Serie non rimossa!");
		}

	})

}
