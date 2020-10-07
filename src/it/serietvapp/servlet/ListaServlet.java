package it.serietvapp.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import it.serietvapp.model.Account;
import it.serietvapp.model.Serie;

/**
 * Servlet implementation class ListaServlet
 */
@WebServlet("/ListaServlet")
public class ListaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ListaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
    	HttpSession session=request.getSession(false);
    	
    	String username = session.getAttribute("username").toString();
      
        response.setContentType("application/json");


        Account account = new Account (username);
        
        ArrayList<Serie> lista= account.getLista();
        
        
        ObjectMapper mapper = new ObjectMapper();
     
        ArrayNode models1 = mapper.createArrayNode();
        for(int i=0; i<lista.size();i++) {
        	
        	ObjectNode vendor1 = mapper.createObjectNode();
        	String stringa = Integer.toString(lista.get(i).getId());
        	vendor1.put("elem"+i, stringa);
        	models1.add(vendor1);
        }
       
          out.print(models1);
	
}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		  PrintWriter out = response.getWriter();
	        response.setContentType("text/plain");
			
		    out.println("Spiacenti! Questa servlet non supporta il metodo doPost()...");
	        out.close();
	}

}
