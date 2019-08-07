package Services;

import Models.PropertyListing;
import Models.PropertySearchCommercialRequest;
import Models.PropertySearchRequest;

public interface IDomainListing {
    PropertyListing[] getPropertyList(String authKey, PropertySearchRequest request) throws Exception;
    PropertyListing[] getPropertyList(String authKey, PropertySearchCommercialRequest request) throws Exception;
}
