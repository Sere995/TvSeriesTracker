function visualizza_Profilo () {
	
	document.body.style.backgroundColor = "DarkSeaGreen";
	$('#serieTitoloLabel').html("");
	
	$('#find').trigger("reset");

	$('#modal-content').modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();

	$('#contentPanel').html('');
	var btn = document.getElementById("id_container");
	btn.setAttribute("class", "container ");

	//console.log(id_sel);
	var profiloHTML ='';

	$.get("http://localhost:8080/SerieTVApp/lista", function(data){
	
		//console.log(data);
		profiloHTML +=`	
		
			<div class="container rounded  bg-light p-3 my-3 border">
				<div class="centrato"><h3 class="homeFont2">Ciao  `+sessionStorage.getItem('username')+`! </h3></div>
			</div>
			
			<div class="container-fluid rounded  bg-light mb-4 p-3 my-3 border d-flex flex-row flex-nowrap overflow-auto" >
				 <div class=" mr-4 mieSerie "  mb-5 mb-lg-0">
				 
				 <h3 class="homeFont2 mb-4">Segui `+data.length+` serie tv!</h3>
				<h3 class="homeFont2 mb-4">La tua lista :</h3>`;
		
		switch(data.length){
			case 1:
				profiloHTML +=`	<div class="row row-cols-1 row-cols-lg-1">`;
				break;
			case 2:
				profiloHTML +=`	<div class="row row-cols-1 row-cols-lg-2">`;
				break;
			case 3:
				profiloHTML +=`	<div class="row row-cols-1 row-cols-lg-3">`;	
				break;
			default:
				profiloHTML +=`	<div class="row row-cols-1 row-cols-lg-4">`;
				break;
		}
					
		prelevaValori(data).then(results => { 
		    
			//console.log(results);
			for (let i = 0; i<results.length; i++){
				var nome = results[i].name;
				var poster = imageBaseUrl+'w185'+results[i].poster_path;
				
				
				profiloHTML +=`		
						<div class="col-4  mb-4">
						<div class="card h-100 border-success" style="max-width: 400px;">
				
						<img src="`+poster+`" class="card-img-top" alt="...">
						<div class="card-body ">
						<h5 class="card-title homeFont">`+ nome +`</h5>
						<div class="btn btn-primary btn-large  dettaglio" onclick = "visualizza_Dettagli (`+results[i].id+`)">Vai ai dettagli</div>
						</div>
						</div>
						</div>
					`;
		
		    }
		 	
			profiloHTML +=`	
				</div></div></div>  
	             `;
				
			$('#contentPanel').append(profiloHTML); 
		     
		 }).catch(err => {
		     console.log(err);
		 });				
		
	
	})

}


function prelevaValori(data){
	let promises = [];
    
	for (let i = 0; i < data.length; i++) {
    	var elem = 'elem'+i;
        promises.push($.get("http://localhost:8080/SerieTVApp/dettagli", { id_ricerca:data[i][elem]}));
    }
    
    return Promise.all(promises);
}
		