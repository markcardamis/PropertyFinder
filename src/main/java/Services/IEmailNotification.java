package Services;

import Models.PropertyListing;

public interface IEmailNotification {
    void sendEmailNotification(PropertyListing[] propertyListings) throws Exception;
}
