package it.serietvapp.model;

import java.sql.ResultSet;

public class Serie {
	private int id;
	private Account account;
	

	public Serie(int id) {
		super();
		this.id = id;
		this.account=null;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public int getId() {
		return id;
	}
	

	public Account getAccount() {
		return account;
	}

	public boolean serieInLista() {
		String username = account.getUsername();
		
		String query = "SELECT S.idserieutenti FROM serieutenti S, utenti U WHERE U.username = '"+username+"' AND S.idserie = " +this.id+" AND S.idutente = U.idutenti";
		//System.out.println(query);
		try {
			ResultSet rs = ConnectionManagerDB.selectQuery(query);
			if (rs.next()) {
				return true;
			}else 
				return false;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}
	
	public boolean aggiungiInLista() {
		String username = this.account.getUsername();
		String query = "SELECT idutenti FROM utenti WHERE username = '"+username+"'";
		String idutente="";
		int rs=0;
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query2 = "INSERT INTO serieutenti (idutente, idserie) VALUES  ('"+idutente+"','"+this.id+"')";
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
	
	public int contaEpisodi() {
		
		String username = this.account.getUsername();
		String query = "SELECT idutenti FROM utenti WHERE username = '"+username+"'";
		String idutente="";
		String idserieutenti="";
		ResultSet rs=null;
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query3 = "SELECT idserieutenti FROM serieutenti WHERE idutente = '"+idutente+"' AND idserie = "+this.id;
			
			ResultSet res3 = ConnectionManagerDB.selectQuery(query3);
			
			if(res3.next()) {
				idserieutenti=res3.getString(1);
				
			}
			
			String query2 = "SELECT count(idepisodiaggiunti) FROM episodiaggiunti WHERE idserieutenti = '"+idserieutenti+"'"; 
			
			rs = ConnectionManagerDB.selectQuery(query2);
			
			if(rs.next())
				return rs.getInt(1);
			else
				return 0;
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return 0;
	}

	public boolean rimuoviDallaLista() {
		String username = this.account.getUsername();
		String query = "SELECT idutenti FROM utenti WHERE username = '"+username+"'";
		String idutente="";
		String idserieutenti="";
		int rs=0;
		
		try {
			ResultSet res = ConnectionManagerDB.selectQuery(query);
			
			if(res.next()) {
				idutente=res.getString(1);
			}
			
			String query3 = "SELECT idserieutenti FROM serieutenti WHERE idutente = '"+idutente+"' AND idserie = "+this.id;
			
			//System.out.println(query3);
			
			ResultSet res3 = ConnectionManagerDB.selectQuery(query3);
			
			if(res3.next()) {
				idserieutenti=res3.getString(1);
			}
			
			String query4 = "DELETE FROM episodiaggiunti WHERE idserieutenti ='"+idserieutenti+"'"; 
			//System.out.println(query4);
			
			ConnectionManagerDB.updateQuery(query4);

			String query2 = "DELETE FROM serieutenti WHERE idserieutenti = '"+idserieutenti+"'"; 
			//System.out.println(query2);
			
			rs = ConnectionManagerDB.updateQuery(query2);

			if(rs!=0)
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
