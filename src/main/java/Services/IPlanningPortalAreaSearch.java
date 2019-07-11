package Services;

import Models.PropertyListing;

public interface IPlanningPortalAreaSearch {
    PropertyListing[] getAddressArea(PropertyListing[] propertyListings) throws Exception;
}
