package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.OktaUser;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import java.util.Collections;
import java.util.Map;
import lombok.Data;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Data
@Service
public class RestService {

    private final String NEW_USER_ENDPOINT = "/api/v1/users?activate=true";
    
    private final RestTemplate restTemplate;

    @Autowired
    public RestService(RestTemplateBuilder restTemplateBuilder){
        this.restTemplate = restTemplateBuilder.build();
    }

    public OktaUser postNewUser(JSONObject oktaUser) {
        String url = System.getenv().get("OKTA_URL")+NEW_USER_ENDPOINT;
    
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "SSWS " + System.getenv().get("OKTA_API_TOKEN_USER"));

        // build the request
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(oktaUser, headers);

        // use `exchange` method for HTTP call
        ResponseEntity<OktaUser> response = this.restTemplate.exchange(url, HttpMethod.POST, 
            entity, OktaUser.class);
        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new ResourceNotFoundException("Failed to create new user account");
        }
    }

}
