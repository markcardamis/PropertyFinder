package com.majoapps.propertyfinder.business.service;

import com.google.gson.Gson;
import com.majoapps.propertyfinder.business.domain.DomainTokenAuthResponse;
import com.majoapps.propertyfinder.utils.HttpMethod;
import com.majoapps.propertyfinder.utils.IServiceHelper;
import com.majoapps.propertyfinder.utils.ServiceHelper;

public class DomainAuthentication implements IDomainAuthentication
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public DomainAuthentication() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public DomainTokenAuthResponse getAuthToken(String authKey) throws Exception{
        String urlAuth = "https://auth.domain.com.au/v1/connect/token/";
        String responseJson = mServiceHelper.callHTTPService(urlAuth, HttpMethod.POST, "grant_type=client_credentials&scope=api_agencies_read%20api_listings_read", true, authKey);
        Gson gson = new Gson();
        return gson.fromJson(responseJson, DomainTokenAuthResponse.class);
    }

}
