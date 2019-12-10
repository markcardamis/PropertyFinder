package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.OktaUser;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Data
@Service
public class RestTemplateService {

    private final String NEW_USER_ENDPOINT = "/api/v1/users?activate=false";
    
    private final RestTemplate restTemplate;

    @Autowired
    public RestTemplateService(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public OktaUser postNewUser(OktaUser oktaUser) throws Exception {
        return restTemplate.postForObject(System.getenv().get("OKTA_URL")+NEW_USER_ENDPOINT, oktaUser, OktaUser.class);
    }

}
