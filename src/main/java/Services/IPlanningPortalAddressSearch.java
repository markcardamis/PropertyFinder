package Services;

import Models.PropertyListing;

public interface IPlanningPortalAddressSearch {
    PropertyListing[] getFormattedAddress(PropertyListing[] propertyListings) throws Exception;
}