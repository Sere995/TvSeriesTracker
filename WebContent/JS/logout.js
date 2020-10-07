
function funzioneLogout(){

	document.body.style.backgroundColor = "DarkSeaGreen";
	//console.log("sono nel logout");
	
	$.post("http://localhost:8080/SerieTVApp/logout",function(data) {
		
		var msg = $("risposta", data).text();
		//console.log(msg);
		
		if (msg.localeCompare("Hai effettuato il Logout") == 0){
			
			sessionStorage.removeItem("username");
			var btn = document.getElementById("li-accedi");
			btn.removeAttribute("hidden");
			
			var btn2 = document.getElementById("li-profilo");
			btn2.setAttribute("hidden","true");
			
			var btn3 = document.getElementById("nomeProfilo");
			btn3.innerText="";
			
			funzioneHome();

		}
		
	})

}