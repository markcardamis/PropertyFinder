package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.repository.PropertyInformationRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

@Service
public class PropertyInformationService {

    private final PropertyInformationRepository propertyInformationRepository;

    @Autowired
    public PropertyInformationService(PropertyInformationRepository propertyInformationRepository) {
        this.propertyInformationRepository = propertyInformationRepository;
    }

    public List<PropertyInformation> getAllProperties() {
        List<PropertyInformation> properties = new ArrayList<>();
        Iterable<PropertyInformation> results = this.propertyInformationRepository.findAll();
        results.forEach(properties::add);
        return properties;
    }

    public PropertyInformation getPropertyInformation(Integer id) {
        return this.propertyInformationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(id.toString()));
    }

    public ResponseEntity<PropertyInformation> updatePropertyInformation(Integer id, PropertyInformation newAccount){

        return propertyInformationRepository.findById(id).map(propertyInformation -> {
            propertyInformation.setZoneCode(newAccount.getZoneCode());
            propertyInformation.setFloorSpaceRatio(newAccount.getFloorSpaceRatio());
            propertyInformation.setMinimumLotSize(newAccount.getMinimumLotSize());
            propertyInformationRepository.save(propertyInformation);
            return ResponseEntity.ok(propertyInformation);
        }).orElseThrow(() -> new ResourceNotFoundException("Account [ID="+id+"] can't be found"));

    }

}
