package Tools;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;

public class ServiceHelper implements IServiceHelper
{
    private static final int HTTP_REQUEST_TIMEOUT = 30000;

    public String callHTTPService(String url, HttpMethod method, String json, Boolean basic, String authorization) throws Exception {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String dateString = dateFormat.format(date);

        String result;
        URL obj = new URL(url);

        String proxyURLHost = System.getenv().get("proxyURLHost");
        String proxyURLPort = System.getenv().get("proxyURLPort");
        String proxyUsername = System.getenv().get("proxyUsername");
        String proxyPassword = System.getenv().get("proxyPassword");

        System.setProperty("http.proxyHost", proxyURLHost);
        System.setProperty("http.proxyPort", proxyURLPort);
        Authenticator.setDefault(new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(proxyUsername, proxyPassword.toCharArray());
                }
        });

        HttpsURLConnection request = (HttpsURLConnection) obj.openConnection();
        SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
        sslContext.init(null,null,null);
        request.setSSLSocketFactory(sslContext.getSocketFactory());
        request.setConnectTimeout(HTTP_REQUEST_TIMEOUT);
        request.setReadTimeout(HTTP_REQUEST_TIMEOUT);
        String httpMethodString  = method.toString();
        request.setRequestMethod(httpMethodString);
        // request.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
        // String host = url.substring(8,url.indexOf("/", 8));
        // request.setRequestProperty("Host", host);
        if (basic) {
            System.out.println("HTTP write auth " + authorization);
            request.setRequestProperty("Authorization", "Basic " + authorization);
            // request.setRequestProperty("charset", "utf-8");
            request.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
        } else {
            System.out.println("HTTP Bearer " + authorization);
            request.setRequestProperty("Authorization", "Bearer " + authorization);
            request.setRequestProperty("updatedSince", dateString);
            request.setRequestProperty("content-type","application/json");
        }

        request.setUseCaches(false);

        if (httpMethodString.equals("POST") || httpMethodString.equals("PUT"))
        {
            request.setDoOutput(true);
            request.setRequestProperty("Content-Length", "" + Integer.toString(json.getBytes().length));
            // request.setRequestProperty("Content-Language", "en-US");  
            try
            {
                System.out.println("HTTP POST Content " + json);
                DataOutputStream wr = new DataOutputStream (request.getOutputStream());
                wr.writeBytes(json);
                wr.flush();
                wr.close();
            }catch (Exception e) {
                System.out.println("HTTP write exeption " + e.getLocalizedMessage());
                return null;
            }
        }
        try
        {
            request.connect();
            int httpCode = request.getResponseCode();
            BufferedReader rd;

            if (httpCode == 200 || httpCode == 201)
            {
                rd = new BufferedReader(new InputStreamReader(request.getInputStream()));
            }
            else
            {
                rd = new BufferedReader(new InputStreamReader(request.getErrorStream()));
            }

            String line;
            StringBuilder response = new StringBuilder();

            while((line = rd.readLine()) != null) {
                response.append(line).append('\n');
            }
            rd.close();
            result = response.toString();
            System.out.println("HTTP RESPONSE");
            System.out.println(result);
            if(!(httpCode == 200 || httpCode == 201))
                throw new IllegalStateException(httpCode + " " + request.getResponseMessage());

        } catch (SocketTimeoutException e){
            throw new Exception(e);
        }
        finally
        {
            request.disconnect();
        }
        return result;
    }

}



