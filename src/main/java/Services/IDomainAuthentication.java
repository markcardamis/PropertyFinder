package Services;

import Models.DomainTokenAuthResponse;

public interface IDomainAuthentication {
    DomainTokenAuthResponse getAuthToken(String authKey) throws Exception;
}
