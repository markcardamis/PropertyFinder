package Services;

import Models.PropertyListing;
import Models.PropertySearchRequest;

public interface IDomainListing {
    PropertyListing[] getPropertyList(String authKey, PropertySearchRequest request) throws Exception;
}
