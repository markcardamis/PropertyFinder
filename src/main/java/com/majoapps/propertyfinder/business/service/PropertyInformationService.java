package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.repository.PropertyInformationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyInformationService {

    private final PropertyInformationRepository propertyInformationRepository;

    @Autowired
    public PropertyInformationService(PropertyInformationRepository propertyInformationRepository) {
        this.propertyInformationRepository = propertyInformationRepository;
    }

    public List<PropertyInformation> getProperty(Integer id) {
        List<PropertyInformation> properties = new ArrayList<>();
        Optional<PropertyInformation> propertyResponse = this.propertyInformationRepository.findById(id);
        if (propertyResponse.isPresent()) {
            PropertyInformation account = propertyResponse.get();
            properties.add(account);
        }
        return properties;
    }

    // public ResponseEntity<PropertyInformation> updateAccount(Integer id, PropertyInformation newAccount){

    //     return propertyInformationRepository.findById(id).map(customer -> {
    //         customer.setFirstName(newAccount.getFirstName());
    //         customer.setLastName(newAccount.getLastName());
    //         customer.setEmailAddress(newAccount.getEmailAddress());
    //         customer.setPhoneNumber(newAccount.getPhoneNumber());
    //         propertyInformationRepository.save(customer);
    //         return ResponseEntity.ok(customer);
    //     }).orElseThrow(() -> new ResourceNotFoundException("Account [ID="+id+"] can't be found"));

    // }

}
