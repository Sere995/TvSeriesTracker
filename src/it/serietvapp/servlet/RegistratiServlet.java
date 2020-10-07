package it.serietvapp.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import it.serietvapp.model.Account;

/**
 * Servlet implementation class RegistratiForm
 */
@WebServlet("/RegistratiForm")
public class RegistratiServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegistratiServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
        response.setContentType("text/plain");
		
	    out.println("Spiacenti! Questa servlet non supporta il metodo doGet()...");
        out.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String username = request.getParameter("login_username");
        String password = request.getParameter("login_password");
        
        //System.out.println (username + password);
       
        response.setContentType("text/xml");

        response.setHeader("Cache-Control", "no-cache");

        out.append("<risposta>");


        Account account = new Account (username,password);
        
        int ok = account.inserisciAccount();
       
        if (ok!=0) {	
        	 response.getWriter().append("ok");

             response.getWriter().append("</risposta>");
     
        	 // System.out.println("registrazione avvenuta");
        }else {
        	
        	 response.getWriter().append("no");

             response.getWriter().append("</risposta>");
             
        //	System.out.println("errore registrazione");
        }
       // out.close();
	}

}
