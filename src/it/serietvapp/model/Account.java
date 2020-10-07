package it.serietvapp.model;

import java.sql.ResultSet;
import java.util.ArrayList;

public class Account {

	private String username;
	private String password;
	private ArrayList<Serie> listaserie;
	
	public Account(String username) {
		super();
		this.username = username;
		this.password = null;
		this.listaserie = null;
	}
	
	public Account(String username, String password) {
		super();
		this.username = username;
		this.password = password;
		this.listaserie = null;
	}
	
	
	public String getUsername() {
		return username;
	}

	public boolean verifica() {
		//System.out.println(this.username + this.password);
		
		String query = "SELECT * FROM utenti WHERE username = '"+this.username+"' AND pass ='"+this.password+"'";
		//System.out.println(query);
		try {
			ResultSet rs = ConnectionManagerDB.selectQuery(query);
			if(rs.next() ) {
				//System.out.println("Verificato");
				return true;
			}
			else {
				//System.out.println("Non Verificato");
				return false;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	public int inserisciAccount() {
		
		String query = "INSERT INTO utenti (username, pass) VALUES  ('"+this.username+"','"+this.password+"')";
		//System.out.println(query);
		int rs=0;
		
		try {
			rs = ConnectionManagerDB.updateQueryReturnGeneratedKey(query);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return rs;	
		
	}
	
	public ArrayList<Serie> getLista() {
		
		String query = "SELECT idutenti FROM utenti WHERE username = '"+this.username+"'";
		String idutente="";
		this.listaserie = new ArrayList<Serie>();
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query3 = "SELECT idserie FROM serieutenti WHERE idutente = '"+idutente+"'";
			
			//System.out.println(query3);
			
			ResultSet res3 = ConnectionManagerDB.selectQuery(query3);
			
			while(res3.next()) {
				listaserie.add(new Serie (res3.getInt(1)));
			}
			
			return listaserie;
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		return listaserie;
	}
		
		
}
