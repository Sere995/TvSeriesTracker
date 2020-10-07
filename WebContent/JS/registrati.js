
function registatiForm(){
	document.body.style.backgroundColor = "DarkSeaGreen";

	$('#find').trigger("reset");

	$('#serieTitoloLabel').html("");
	
	var btn = document.getElementById("id_container");
	btn.setAttribute("class", "container");
	
	$('#contentPanel').html('');
	
	accediHTML=`
	
		<div class="col-3 mx-auto pt-5" >
	 
		  <center><img class="mb-4" src="images/tv3.png" id="logo"  alt="" width="72" height="72">
		  
		  <h1 class="h3 mb-3 font-weight-normal">Crea un account : </h1></center>

		 <form  oninput='inputPass2.setCustomValidity(inputPass2.value != inputPass.value ? "Le password non coincidono!." : "")' id="registratiForm" class="form registratiForm" >
		
				<div class="control-group">
					<p><b> Inserisci la tua email:</b></p>
					<input type="email" id="inputEmail" class="form-control  mt-1 mb-2" name="inputEmail" placeholder="Indirizzo Email" required >
				</div>
		
				<div class="control-group">
					<p><b> Scegli una password:</b></p>
					<input type="password" id="inputPass" class="form-control mt-1 mb-2" name="inputPass" placeholder="Password" required>
				</div>
					  
				<div class="control-group">
					 <p><b> Ripeti password:</b></p>
					 <input type="password" id="inputPass2" class="form-control mt-1 mb-2" name="inputPass2" placeholder="Password" required>
				</div>
		
		  	<button type="submit" class="btn btn-lg  btn-secondary btn-block mt-4 my-sm-0 " >Sign Up</button>
			
		</form>
		
		</div>
		`;
		
		$('#contentPanel').append(accediHTML);
	
}


function funzioneRegistrati(){
	
	var password = $('input[name="inputPass"]').val(); 

	var email = $('input[name="inputEmail"]').val();
	//console.log(password);
	//console.log(email);
	
	
	$.post("http://localhost:8080/SerieTVApp/registrati",{login_username:email,login_password:password},function(data) {
		
		var msg = $("risposta", data).text();	
		//console.log(msg);
		
		if (msg.localeCompare("ok")==0){
			//console.log("Registrazione avvenuta");
			alert("Registrazione avvenuta con successo!");
			accediForm();
		}
		else {
			//console.log("Registrazione non avvenuta");
			alert("Errore nella registrazione!");
		}

	})
	
}
