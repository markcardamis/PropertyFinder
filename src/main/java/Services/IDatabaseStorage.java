package Services;

import Models.PropertyListing;

public interface IDatabaseStorage {
        void save(PropertyListing[] propertyListings) throws Exception;
}
