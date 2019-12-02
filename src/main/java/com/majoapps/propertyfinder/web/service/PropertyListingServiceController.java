package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.service.PropertyListingService;
import com.majoapps.propertyfinder.data.entity.PropertyListing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/listing")
public class PropertyListingServiceController {

    @Autowired
    private PropertyListingService propertyListingService;

    @RequestMapping(method= RequestMethod.GET)
    public List<PropertyListing> getAllListings() {
        return this.propertyListingService.getAllListings();
    }

    @RequestMapping(value="{id}", method= RequestMethod.GET)
    public PropertyListing getListingById(@PathVariable(value="id") Integer id) {
        return this.propertyListingService.getPropertyListing(id);
    }

}
