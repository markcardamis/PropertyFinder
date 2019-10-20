package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;

public interface IEmailService {
    void sendEmailNotification(PropertyListing[] propertyListings) throws Exception;
}
