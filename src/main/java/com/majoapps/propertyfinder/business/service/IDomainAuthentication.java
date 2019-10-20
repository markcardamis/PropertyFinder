package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.DomainTokenAuthResponse;

public interface IDomainAuthentication {
    DomainTokenAuthResponse getAuthToken(String authKey) throws Exception;
}
