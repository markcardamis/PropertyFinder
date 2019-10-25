package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;

public interface IPlanningPortalZoneSearch {
    PropertyListing[] getPlanningZone(PropertyListing[] propertyListings) throws Exception;
    PropertyListing[] getPlanningZoneMultiThreaded(PropertyListing[] propertyListings) throws Exception;
    PropertyListing[] addPlanningZone(PropertyListing[] propertyListings) throws Exception;
    PropertyListing getSinglePlanningZone(PropertyListing propertyListings) throws Exception;
}
