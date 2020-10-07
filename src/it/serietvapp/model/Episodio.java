package it.serietvapp.model;

import java.sql.ResultSet;

public class Episodio {
	private int id;
	private int numStagione;
	private Serie serie;
	
		
public Episodio(int id, int numStagione) {
		super();
		this.id = id;
		this.numStagione = numStagione;
		this.serie =null;
	}



public void setSerie(Serie serie) {
	this.serie = serie;
}



public boolean aggiungiEpisodio() {
	int idEpisodio = this.id;
	int idSerie = this.serie.getId();
	int idStagione = this.numStagione;
	String username = this.serie.getAccount().getUsername();
		
		String query = "SELECT idutenti FROM utenti WHERE username = '"+username+"'";
		String idutente="";
		String idserieutenti="";
		int rs=0;
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query3 = "SELECT idserieutenti FROM serieutenti WHERE idutente = '"+idutente+"' AND idserie = "+idSerie;
			
			ResultSet res3 = ConnectionManagerDB.selectQuery(query3);
			
			if(res3.next()) {
				idserieutenti=res3.getString(1);
			}else{
				if (this.serie.aggiungiInLista() == false)
					return false;
				ResultSet res4 = ConnectionManagerDB.selectQuery(query3);
				res4.next();
				idserieutenti=res4.getString(1);
			}
			
			String query2 = "INSERT INTO episodiaggiunti (idstagione, episodio,idserieutenti) VALUES  ('"+idStagione+"','"+idEpisodio+"','"+idserieutenti+"')";
			//System.out.println(query2);
			
			rs = ConnectionManagerDB.updateQueryReturnGeneratedKey(query2);
			
			if(rs==0)
				return false;
			else
				return true;
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return false;
	}
	
	
public boolean rimuoviEpisodio() {
	int idEpisodio = this.id;
	int idSerie = this.serie.getId();
	int idStagione = this.numStagione;
	String username = this.serie.getAccount().getUsername();
	
		String query = "SELECT idutenti FROM utenti WHERE username = '"+username+"'";
		String idutente="";
		String idserieutenti="";
		int rs=0;
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query3 = "SELECT idserieutenti FROM serieutenti WHERE idutente = '"+idutente+"' AND idserie = "+idSerie;
			//System.out.println(query3);
			
			ResultSet res3 = ConnectionManagerDB.selectQuery(query3);
			
			if(res3.next()) {
				idserieutenti=res3.getString(1);
			}
			
			String query2 = "DELETE FROM episodiaggiunti WHERE idstagione = '"+idStagione+"' AND episodio = '"+idEpisodio+"' AND idserieutenti ='"+idserieutenti+"'"; 
			//System.out.println(query2);
			
			rs = ConnectionManagerDB.updateQuery(query2);
			
			if(rs==0)
				return false;
			else
				return true;
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return false;
	}
	
	
public boolean verificaEpisodio() {
	int idEpisodio = this.id;
	int idSerie = this.serie.getId();
	int idStagione = this.numStagione;
	String username = this.serie.getAccount().getUsername();
	
		String query = "SELECT idutenti FROM utenti WHERE username = '"+username+"'";
		String idutente="";
		String idserieutenti="";
		ResultSet rs=null;
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query3 = "SELECT idserieutenti FROM serieutenti WHERE idutente = '"+idutente+"' AND idserie = "+idSerie;
			
			//System.out.println(query3);
			
			ResultSet res3 = ConnectionManagerDB.selectQuery(query3);
			
			if(res3.next()) {
				idserieutenti=res3.getString(1);	
			}
			
			String query2 = "SELECT idepisodiaggiunti FROM episodiaggiunti WHERE idstagione = '"+idStagione+"' AND episodio = '"+idEpisodio+"' AND idserieutenti ='"+idserieutenti+"'"; 
			//System.out.println(query2);
			
			rs = ConnectionManagerDB.selectQuery(query2);
			
			if(rs.next())
				return true;
			else
				return false;
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return false;
	}
}
