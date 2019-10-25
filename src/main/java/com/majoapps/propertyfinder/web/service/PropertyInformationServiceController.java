package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.service.PropertyInformationService;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api/propertyinformation")
public class PropertyInformationServiceController {

    @Autowired
    private PropertyInformationService propertyInformationService;

    @RequestMapping(method= RequestMethod.GET)
    public List<PropertyInformation> getAllProperties() {
        return propertyInformationService.getAllProperties();
    }

    @RequestMapping(value="{id}", method= RequestMethod.GET)
    public PropertyInformation getPropertyById(@PathVariable(value="id") Integer propertyId) {
        return propertyInformationService.getPropertyInformation(propertyId);
    }

    @RequestMapping(value = "{id}", method= RequestMethod.PUT)
    public ResponseEntity<PropertyInformation> updatePropertyInformation(@PathVariable Integer propertyId, @RequestBody PropertyInformation propertyInformation){
        return propertyInformationService.updatePropertyInformation(propertyId, propertyInformation);
    }

    @RequestMapping(value = "{id}", method= RequestMethod.PATCH)
    public ResponseEntity<PropertyInformation> partialUpdatePropertyInformation(@PathVariable Integer propertyId, @RequestBody PropertyInformation propertyInformation){
        return propertyInformationService.partialUpdatePropertyInformation(propertyId, propertyInformation);
    }

}
