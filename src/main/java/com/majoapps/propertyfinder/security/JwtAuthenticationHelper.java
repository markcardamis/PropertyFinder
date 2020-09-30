package com.majoapps.propertyfinder.security;

import com.majoapps.propertyfinder.data.enums.AccountType;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class JwtAuthenticationHelper {

    public static String getUserByToken(JwtAuthenticationToken jwtAuthToken) {
        if (jwtAuthToken != null && jwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = jwtAuthToken.getTokenAttributes().get("uid").toString();
            if (token == null || token.isEmpty()) {
                throw new ResourceNotFoundException("uid is null in JWT ");
            }
            return token;
        } else {
            throw new ResourceNotFoundException("Cannot find uid Key in JWT ");
        }
    }

    public static AccountType getAccountTypeByToken(JwtAuthenticationToken jwtAuthToken) {
        if (jwtAuthToken != null && jwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = jwtAuthToken.getTokenAttributes().get("uid").toString();
            // unauthenticated
            if (token == null || token.isEmpty()) {
                return AccountType.UNAUTHENTICATED;
            }
            // admin
            if (jwtAuthToken.getTokenAttributes().containsKey("groups")
                    && jwtAuthToken.getTokenAttributes().get("groups").toString().contains("admin")) {
                return AccountType.ADMIN;
            } else { // authenticated
                return AccountType.AUTHENTICATED;
            }
        } else {
            // unauthenticated
            return AccountType.UNAUTHENTICATED;
        }
    }

}
