
function accediForm(){

	document.body.style.backgroundColor = "DarkSeaGreen";
	$('#find').trigger("reset");

	$('#serieTitoloLabel').html("");
	
	var btn = document.getElementById("id_container");
	btn.setAttribute("class", "container");
	
	$('#contentPanel').html('');
	
	accediHTML=`
	
		<div class="col-3 mx-auto pt-5" >
	 
		<center><img class="mb-4" src="images/tv3.png" id="logo"  alt="" width="72" height="72">
	  
		<h1 class="h3 mb-3 font-weight-normal">Accedi</h1></center>
	
	
		<form  id="accediForm" class="form loginFrm" >
	
			  	<div class="control-group">
					<input type="email" id="inputEmail" class="form-control" name="inputEmail" placeholder="Indirizzo Email" required >
				  </div>
	
				<div class="control-group">
					<input type="password" id="inputPassword" class="form-control mt-2 mb-3" name="inputPassword" placeholder="Password" required>
				 </div>
				 
	
			<button type="submit" class="btn btn-lg  btn-secondary btn-block mt-4 my-sm-0 " >Sign in</button>
		</form>
		
		<button type="button" class="btn  btn-block btn-link mt-2 mb-3 pt-3 my-sm-0 btnRegistrati" onclick=registatiForm() >Non sei registrato?  Registrati</button>
	
		</div>
		`;
	
	$('#contentPanel').append(accediHTML);
	
}


function funzioneAccedi(){
	
	var password = $('input[name="inputPassword"]').val(); 

	var email = $('input[name="inputEmail"]').val();
	//console.log(password);
	//console.log(email);
	
	$.post("http://localhost:8080/SerieTVApp/login",{login_username:email,login_password:password},function(data) {
		
		var msg = $("risposta", data).text();
		//console.log(msg);
		
		if (msg.localeCompare("ok")==0){
			sessionStorage.setItem('username',email);
			//console.log("OK");
			var btn = document.getElementById("li-accedi");
			btn.setAttribute("hidden", "true");
			
			var btn2 = document.getElementById("li-profilo");
			btn2.removeAttribute("hidden");
			
			var btn3 = document.getElementById("nomeProfilo");
			btn3.innerText=email;
			
			funzioneHome();
			
		}
		else {
			alert("Email o password errata!");
		}
		
	})
}