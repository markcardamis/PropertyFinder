package Services;

import com.google.gson.Gson;

import Models.DomainTokenAuthResponse;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;

public class DomainAuthentication implements IDomainAuthentication
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public DomainAuthentication() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    public DomainTokenAuthResponse getAuthToken(String authKey) throws Exception{
        String urlAuth = "https://auth.domain.com.au/v1/connect/token/";
        String responseJson = mServiceHelper.callHTTPService(urlAuth, HttpMethod.POST, 
        "grant_type=client_credentials&scope=api_agencies_read api_listings_read", true, authKey);
        Gson gson = new Gson();
        return gson.fromJson(responseJson, DomainTokenAuthResponse.class);
    }

}
