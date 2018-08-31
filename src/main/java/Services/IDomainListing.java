package Services;

import Models.PropertyListing;

public interface IDomainListing {
    PropertyListing[] getPropertyList(String authKey, String searchJson) throws Exception;
}
