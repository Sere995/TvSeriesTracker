package it.serietvapp.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import it.serietvapp.model.Account;
import it.serietvapp.model.Serie;

/**
 * Servlet implementation class RimuoviServlet
 */
@WebServlet("/RimuoviServlet")
public class RimuoviServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RimuoviServlet() {
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
		response.setContentType("text/xml");
		response.setHeader("Cache-Control", "no-cache");
		
		PrintWriter out = response.getWriter();
		
		int idSerie = Integer.parseInt(request.getParameter("id_ricerca"));
		
		out.append("<risposta>");
		String risposta= null;
		
		HttpSession session=request.getSession(false);
		Account account = new Account (session.getAttribute("username").toString() );
		Serie serie = new Serie(idSerie);
		serie.setAccount(account);
		
		boolean ok = serie.rimuoviDallaLista();
		
		if (ok) {
			risposta= "Serie Rimossa";
		}else risposta= "Non Rimossa";
	
		out.append(risposta);
		out.append("</risposta>");
		
		out.close();
	}

}
