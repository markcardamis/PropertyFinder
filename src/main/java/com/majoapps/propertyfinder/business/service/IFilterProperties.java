package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;

public interface IFilterProperties {
    PropertyListing[] filterProperties(PropertyListing[] propertyListings);
}
