package com.majoapps.propertyfinder.utils;

public interface IServiceHelper {
    String callHTTPService(String endpoint, HttpMethod method, String json, Boolean basic,
                           String authorization) throws Exception ;
}
