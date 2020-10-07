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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class RicercaServlet
 */
@WebServlet("/PrimaServlet")
public class RicercaServlet extends HttpServlet {
	private static final long serialVersionUID = 102831973239L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RicercaServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        String parolachiave = request.getParameter("id_ricerca");
        
        //se si cercano più parole gli spazi vanno sostituiti dal +
        parolachiave = parolachiave.replace(" ", "+");
        
        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();
        
        HttpRequest request1 = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://api.themoviedb.org/3/search/tv?api_key=567260adb714b7a87e42806ce2ff893e&language=it-IT&query="+parolachiave))
                .setHeader("User-Agent", "Java 11 HttpClient Bot")
                .build();
        

        HttpResponse<String> response1;
		try {
			response1 = httpClient.send(request1, HttpResponse.BodyHandlers.ofString());
								
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(response1.body());
						
			out.print(node);
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
