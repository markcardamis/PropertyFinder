package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.business.domain.PropertyListing;

import java.util.Map;

public interface IDatabaseStorage {
        void save(PropertyListing[] propertyListings) throws Exception;
        Map<String, PropertyListing> retrieve() throws Exception;
}
