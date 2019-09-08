package Services;

import Models.PropertyListing;

public interface ILandValueSearch {
    PropertyListing[] getLandValue(PropertyListing[] propertyListings) throws Exception;
}