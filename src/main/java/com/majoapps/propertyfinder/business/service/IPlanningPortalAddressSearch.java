package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;

public interface IPlanningPortalAddressSearch {
    PropertyListing[] getFormattedAddress(PropertyListing[] propertyListings) throws Exception;
    PropertyListing[] getFormattedAddressMultiThreaded(PropertyListing[] propertyListings) throws Exception;
}
