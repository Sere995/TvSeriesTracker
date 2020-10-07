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
 * Servlet implementation class VerificaEpisodioServlet
 */
@WebServlet("/VerificaEpisodioServlet")
public class VerificaEpisodioServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public VerificaEpisodioServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/xml");
		response.setHeader("Cache-Control", "no-cache");
		
		PrintWriter out = response.getWriter();
		
		int idSerie = Integer.parseInt(request.getParameter("id_ricerca"));
		int idStagione = Integer.parseInt(request.getParameter("num_stagione"));
		int idEpisodio = Integer.parseInt(request.getParameter("id_episodio"));
		
		out.append("<risposta>");
		String risposta= null;
		
		HttpSession session=request.getSession(false);
		Account account = new Account (session.getAttribute("username").toString() );
		Serie serie = new Serie (idSerie);
		Episodio episodio = new Episodio (idEpisodio, idStagione);
		episodio.setSerie(serie);
		serie.setAccount(account);
		
		boolean ok = episodio.verificaEpisodio();
		
		if (ok) {
			risposta= "Vero";
		}
		else risposta= "Falso";
		
		out.append(risposta);
		out.append("</risposta>");
		
		out.close();
		
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
