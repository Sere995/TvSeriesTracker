function funzioneHome(){

	document.body.style.backgroundColor = "black";
	
	$('#find').trigger("reset");

	$('#serieTitoloLabel').html("");
	
	//console.log("sono nella home");
	 var btn = document.getElementById("id_container");
	btn.setAttribute("class", "");
	
	$('#contentPanel').html('');
	
	if (sessionStorage.getItem('username')!=null){
		
		var btn = document.getElementById("li-accedi");
		btn.setAttribute("hidden", "true");
		
		var btn2 = document.getElementById("li-profilo");
		btn2.removeAttribute("hidden");
		
		var btn3 = document.getElementById("nomeProfilo");
		btn3.innerText=sessionStorage.getItem('username');
	}
	homeHTML = `<img src="images/locandinanuova.png" width="100%">`;
		
	$('#contentPanel').append(homeHTML);
	
}
