package Services;

import Models.PropertyListing;

public interface IPlanningPortalZoneSearch {
    PropertyListing[] getPlanningZone(PropertyListing[] propertyListings) throws Exception;
    PropertyListing[] getPlanningZoneMultiThreaded(PropertyListing[] propertyListings) throws Exception;
}
