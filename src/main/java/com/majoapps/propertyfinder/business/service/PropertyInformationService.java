package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.repository.PropertyInformationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class PropertyInformationService {

    private final PropertyInformationRepository propertyInformationRepository;

    @Autowired
    public PropertyInformationService(PropertyInformationRepository propertyInformationRepository) {
        this.propertyInformationRepository = propertyInformationRepository;
    }

    public PropertyInformation getProperty(Integer id) {
        return this.propertyInformationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(id.toString()));
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
