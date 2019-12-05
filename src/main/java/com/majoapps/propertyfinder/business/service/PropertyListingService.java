package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.majoapps.propertyfinder.data.repository.PropertyListingRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
public class PropertyListingService {

    private final PropertyListingRepository propertyListingRepository;

    @Autowired
    public PropertyListingService(PropertyListingRepository propertyListingRepository) {
        this.propertyListingRepository = propertyListingRepository;
    }

    // return different amount of listings based on account priority
    // return 100 listings for unauthenticated user
    // return 1000 listings for authenticated user
    // return all listings for an admin user
    public List<PropertyListing> getAllListings(JwtAuthenticationToken JwtAuthToken) {
        
        if (JwtAuthToken != null && JwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
            // unauthenticated
            if (token == null || token.isEmpty()) { 
                return this.propertyListingRepository.findTop100ByOrderByIdAsc();
            }
            // admin
            if (JwtAuthToken.getTokenAttributes().containsKey("groups") && 
                JwtAuthToken.getTokenAttributes().get("groups").toString().contains("admin")) {
                    return this.propertyListingRepository.findAll(); 
            } else { // authenticated
                return this.propertyListingRepository.findTop1000ByOrderByIdAsc();
            }
        } else {
            // unauthenticated
            return this.propertyListingRepository.findTop100ByOrderByIdAsc();
        }
    }

    public PropertyListing getPropertyListingById(Integer Id) {
        Objects.requireNonNull(Id);
        return this.propertyListingRepository
                .findById(Id)
                .orElseThrow(() -> new ResourceNotFoundException(("Listing [ID="+Id+"] can't be found")));
    }
}
