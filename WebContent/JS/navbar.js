	
function navbar(){
		let navbarHTML  =`
		<nav class="navbar navbar-expand-lg  navbar-light bg-light">
		
			<a class="navbar-brand homeFont" href="#">SerieTv Tracking</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
 
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					
					<li class="nav-item">
						<a class="nav-link" id="popolari" href="#">Serie Tv Popolari</a>
					</li>
					
					<li class="nav-item" id="li-accedi" >
						<a class="nav-link" id="accedi"  href="#">Accedi</a>
					</li>
					
					<li class="dropdown" id="li-profilo" hidden="true">
						<a href="#" class="nav-link dropdown-toggle" id="vediProfilo" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span id="nomeProfilo" >Profilo</span></a>
						<ul class="dropdown-menu">
							<li><a href="#" class="nav-link btnMioProfilo" id="btnMioProfilo">Il mio profilo</a></li>
							<li><a href="#" class="nav-link btnlogout" id="btnlogout">Logout</a></li>
						</ul>
					</li>
				</ul>
	        
			    <form class="form-inline my-2 my-lg-0 search_Form" id="find">
			      <input class="form-control mr-sm-2" type="search" placeholder="Cerca serie" aria-label="Search">
			      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Cerca</button>
			    </form>
			</div>
		</nav>
		 `;
		$('#nav').append(navbarHTML);

}
