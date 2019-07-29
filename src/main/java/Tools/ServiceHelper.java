package Tools;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;

public class ServiceHelper implements IServiceHelper
{
    private static final int HTTP_REQUEST_TIMEOUT = 60000;

    public String callHTTPService(String url, HttpMethod method, String json, Boolean basic, String authorization) throws Exception {

        SimpleDateFormat ISO_8601_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:sss'Z'", new Locale("AU"));
        String timeDate = ISO_8601_FORMAT.format(new Date());

        // if (basic) {
        //     setProxy(System.getenv().get("QUOTAGUARDSTATIC_URL"));
        //  } else {
        //     System.clearProperty("https.proxySet");
        //     System.clearProperty("https.proxyHost");
        //     System.clearProperty("https.proxyPort");
        //  }
        
        String result;
        URL obj = new URL(url);

        HttpsURLConnection request = (HttpsURLConnection) obj.openConnection();
        SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
        sslContext.init(null,null,null);
        request.setSSLSocketFactory(sslContext.getSocketFactory());
        request.setConnectTimeout(HTTP_REQUEST_TIMEOUT);
        request.setReadTimeout(HTTP_REQUEST_TIMEOUT);
        String httpMethodString  = method.toString();
        request.setRequestMethod(httpMethodString);

        if (basic) {
            request.setRequestProperty("Authorization", "Basic " + authorization);
            request.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
        } else {
            request.setRequestProperty("Authorization", "Bearer " + authorization);
            request.setRequestProperty("updatedSince", timeDate);
            request.setRequestProperty("content-type","application/json");
        }

        request.setUseCaches(false);

        if (httpMethodString.equals("POST") || httpMethodString.equals("PUT"))
        {
            request.setDoOutput(true);
            request.setRequestProperty("Content-Length", "" + Integer.toString(json.getBytes().length));
            try
            {
                DataOutputStream wr = new DataOutputStream (request.getOutputStream());
                wr.writeBytes(json);
                wr.flush();
                wr.close();
            }catch (Exception e) {
                System.out.println("HTTP write exeption " + e.getLocalizedMessage());
                throw new Exception(e);
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
        } catch (SocketTimeoutException e){
            throw new Exception(e);
        }
        finally
        {
            request.disconnect();
        }
        return result;
    }

    void setProxy(String proxyStringConnectionURL) throws Exception {

        System.setProperty("jdk.http.auth.tunneling.disabledSchemes", "");
        System.setProperty("jdk.http.auth.proxying.disabledSchemes", "");
            
        URL proxyUrl = new URL(proxyStringConnectionURL);
        String userInfo = proxyUrl.getUserInfo();
        String user = userInfo.substring(0, userInfo.indexOf(':'));
        String password = userInfo.substring(userInfo.indexOf(':') + 1);
        
        Authenticator.setDefault(new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password.toCharArray());
            }
        });  

        System.setProperty("https.proxyHost", proxyUrl.getHost());
        System.setProperty("https.proxyPort", Integer.toString(proxyUrl.getPort()));
    }

}