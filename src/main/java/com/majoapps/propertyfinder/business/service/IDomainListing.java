package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.business.domain.PropertySearchCommercialRequest;
import com.majoapps.propertyfinder.business.domain.PropertySearchRequest;

public interface IDomainListing {
    PropertyListing[] getPropertyList(String authKey, PropertySearchRequest request) throws Exception;
    PropertyListing[] getPropertyList(String authKey, PropertySearchCommercialRequest request) throws Exception;
}
