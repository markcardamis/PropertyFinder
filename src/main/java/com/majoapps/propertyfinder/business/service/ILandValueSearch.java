package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;

public interface ILandValueSearch {
    PropertyListing[] getLandValue(PropertyListing[] propertyListings) throws Exception;
}
