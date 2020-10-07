package it.serietvapp.model;


import com.mysql.cj.jdbc.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class ConnectionManagerDB {
	public static String url = "jdbc:mysql://127.0.0.1:3306/";
	public static String dbName = "serietvdatabase";
	public static String driver = "com.mysql.cj.jdbc.Driver";
	public static String userName = "root"; 
	public static String password = "root";

	public static Connection getConnection() throws Exception {
		MysqlDataSource dataSource = new MysqlDataSource();
		dataSource.setUser(userName);
		dataSource.setPassword(password);
		dataSource.setURL(url+dbName);
		dataSource.setServerTimezone("UTC");
		dataSource.setUseSSL(false); //Disable SSL
		Class.forName(driver);
		Connection conn = dataSource.getConnection();
		return conn;
	}

	public static void closeConnection(Connection c) throws Exception{
		c.close();
	}
	
	public static ResultSet selectQuery(String query) throws Exception{
		Connection conn = getConnection();
        Statement statement = conn.createStatement();
        ResultSet ret = statement.executeQuery(query);
        //conn.close();
        return ret;
	}

	public static int updateQuery(String query) throws Exception{
		Connection conn = getConnection();
		Statement statement = conn.createStatement();
		int ret = statement.executeUpdate(query);
		//conn.close();
		return ret;
	}
	
	public static Integer updateQueryReturnGeneratedKey(String query) throws Exception{
		Integer ret = null;
		Connection conn = getConnection();
		Statement statement = conn.createStatement();
		statement.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
		ResultSet rs = statement.getGeneratedKeys();
		if (rs.next()){
		    ret = rs.getInt(1);
		}
		//conn.close();
		return ret;
	}
}
