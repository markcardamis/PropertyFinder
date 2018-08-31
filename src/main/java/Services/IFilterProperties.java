package Services;

import Models.PropertyListing;

public interface IFilterProperties {
    PropertyListing[] filterProperties(PropertyListing[] propertyListings);
}
