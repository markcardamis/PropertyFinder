package Tools;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManagerFactory;

public class ServiceHelper implements IServiceHelper
{
    private static final int HTTP_REQUEST_TIMEOUT = 30000;

    public String callHTTPService(String url, HttpMethod method, String json, Boolean basic, String authorization) throws Exception {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String dateString = dateFormat.format(date);

        String result;
        URL obj = new URL(url);

        HttpsURLConnection request = (HttpsURLConnection) obj.openConnection();
        // SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
        // sslContext.init(null,null,null);
        // request.setSSLSocketFactory(sslContext.getSocketFactory());
        request.setConnectTimeout(HTTP_REQUEST_TIMEOUT);
        request.setReadTimeout(HTTP_REQUEST_TIMEOUT);
        String httpMethodString  = method.toString();
        request.setRequestMethod(httpMethodString);
        request.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
        String host = url.substring(8,url.indexOf("/", 8));
        request.setRequestProperty("Host", host);
        System.out.println("Host " + host);
        if (basic) {
            request.setRequestProperty("Authorization", "Basic " + authorization);
            request.setRequestProperty("content-type","application/x-www-form-urlencoded");
        } else {
            request.setRequestProperty("Authorization", "Bearer " + authorization);
            request.setRequestProperty("updatedSince", dateString);
            request.setRequestProperty("content-type","application/json");
        }

        request.setUseCaches (false);

        if (httpMethodString.equals("POST") || httpMethodString.equals("PUT"))
        {
            request.setDoOutput(true);
            request.setRequestProperty("Content-Length","" + Integer.toString(json.getBytes().length));
            try
            {
                DataOutputStream wr = new DataOutputStream (request.getOutputStream());
                wr.writeBytes (json);
                wr.flush ();
                wr.close ();
            }catch (Exception e) {
                System.out.println(e.getMessage());
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

            System.out.println("Result " +result);

            if(!(httpCode == 200 || httpCode == 201))
                throw new IllegalStateException(httpCode + " " + request.getResponseMessage());

        } catch (SocketTimeoutException e){
            throw new Exception(e);
        }
        finally
        {
            request.disconnect();
        }
        System.out.println("Run result " + result);
        return result;
    }

}



