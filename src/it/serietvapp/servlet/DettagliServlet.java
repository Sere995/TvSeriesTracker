package it.serietvapp.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import it.serietvapp.model.Account;
import it.serietvapp.model.Serie;

/**
 * Servlet implementation class DettagliServlet
 */
@WebServlet("/DettagliServlet")
public class DettagliServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DettagliServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String id_serie = request.getParameter("id_ricerca");
        
        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();
        
        HttpRequest request1 = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://api.themoviedb.org/3/tv/"+id_serie+"?api_key=567260adb714b7a87e42806ce2ff893e&language=it-IT"))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .build();

        
        HttpSession session = request.getSession(false);
        HttpResponse<String> response1;
		try {
			response1 = httpClient.send(request1, HttpResponse.BodyHandlers.ofString());
	
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(response1.body());
			ObjectNode nuovo = (ObjectNode) node;
			
			if(session!=null) {
				Account account=new Account(session.getAttribute("username").toString());
				Serie serie = new Serie(Integer.parseInt(id_serie));
				serie.setAccount(account);
				
				boolean ok = serie.serieInLista();
				
				//System.out.println("ok è "+ok);
				if (ok) {
					nuovo.put("inLista", "si");
					int num = serie.contaEpisodi();
					nuovo.put("numEpisodi", num);
				}
					
				else
					nuovo.put("inLista", "no");
				
			}
			out.print(nuovo);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		
        out.close();
	}
	
    /**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        response.setContentType("text/plain");
		
	    out.println("Spiacenti! Questa servlet non supporta il metodo doPost()...");
        out.close();
	}

}
