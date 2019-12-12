package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OktaUser implements Serializable{  

    private String id;
    @JsonProperty("profile") private Profile profile;
    @JsonProperty("credentials") private Credentials credentials;
    private static final long serialVersionUID = -4553563068517937081L;

    private static class Profile implements Serializable { 
        @JsonProperty("firstName") private String firstName;
        @JsonProperty("lastName") private String lastName;
        @JsonProperty("email") private String email;
        @JsonProperty("email") private String login;
        private static final long serialVersionUID = -6169041570452038527L;
    }

    private static class Credentials implements Serializable {
        private Password password;
        private static final long serialVersionUID = -5309333783245882355L;
    }

    private static class Password implements Serializable {
        @JsonProperty("password") private String value;
        private static final long serialVersionUID = 4557135798173454311L;
    }    
}

