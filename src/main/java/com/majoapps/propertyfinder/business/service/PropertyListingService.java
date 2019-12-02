package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.majoapps.propertyfinder.data.repository.PropertyListingRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropertyListingService {

    private final PropertyListingRepository propertyListingRepository;

    @Autowired
    public PropertyListingService(PropertyListingRepository propertyListingRepository) {
        this.propertyListingRepository = propertyListingRepository;
    }

    public List<PropertyListing> getAllListings() {
        return this.propertyListingRepository.findAll();
    }

    public PropertyListing getPropertyListingByPlanningPortalId(String id) {
        List<PropertyListing> propertyListingResponse = this.propertyListingRepository.findByPlanningPortalPropId(id);
        if (propertyListingResponse.size() == 0) {
            throw new ResourceNotFoundException("Listing [ID="+id+"] can't be found");
        } else {
            return propertyListingResponse.get(0);
        }
    }


}
