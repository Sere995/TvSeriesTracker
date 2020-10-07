$(document).ready(function(){
	
	 	$('.navbar-brand').click(function(){
	        funzioneHome();
	        $('#contentPanel').html(homeHTML);
	    })  
	    
	    
	    $('#popolari').click(function(){
	        getPopolari();
	        $('#contentPanel').html(popolariHTML);
	    })
	    
	      	
	    $('#accedi').click(function(){
	        accediForm();
	        $('#contentPanel').html(accediHTML);
	    })
	    
	    $('#btnlogout').click(function(){
	        funzioneLogout();
	    })
	    

	    $('#btnMioProfilo').click(function(){
	    	visualizza_Profilo();
	    })

});

$(document).on('submit', 'form', function(e) {
   
    e.preventDefault();
   
    switch(this.id) {
    	
    	case "accediForm" :   
    		
    		//console.log("fatto sign in");
    		funzioneAccedi();
    		break;
	
    	case "find":
    		$('#contentPanel').html('');
    		event.preventDefault();
    		parolachiave = $('.form-control').val();
    		cercaSerie();
    		break;
    		
    	case "registratiForm" :   
			//console.log("form registrati");
			funzioneRegistrati();
			break;
    }
});


var parolachiave = '*';
var popolariHTML = '';
var accediHTML ='';
var homeHTML ='';

var imageBaseUrl = 'https://image.tmdb.org/t/p/'; 
	

