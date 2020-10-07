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
import it.serietvapp.model.Episodio;
import it.serietvapp.model.Serie;

/**
 * Servlet implementation class RimuoviEpisodioServlet
 */
@WebServlet("/RimuoviEpisodioServlet")
public class RimuoviEpisodioServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RimuoviEpisodioServlet() {
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
		//System.out.println(idSerie);
		int idStagione = Integer.parseInt(request.getParameter("num_stagione"));
		//System.out.println(idStagione);
		int idEpisodio = Integer.parseInt(request.getParameter("id_episodio"));
		//System.out.println(idEpisodio);
		
		out.append("<risposta>");
		String risposta= null;
		
		HttpSession session=request.getSession(false);
		Account account = new Account (session.getAttribute("username").toString() );
		Serie serie = new Serie (idSerie);
		Episodio episodio = new Episodio (idEpisodio, idStagione);
		episodio.setSerie(serie);
		serie.setAccount(account);
		
		boolean ok = episodio.rimuoviEpisodio();
		
		if (ok) {
			risposta= "Episodio Rimosso";
		}else risposta= "Episodio non rimosso";
	
		out.append(risposta);
		out.append("</risposta>");
		
		out.close();
	}

}
