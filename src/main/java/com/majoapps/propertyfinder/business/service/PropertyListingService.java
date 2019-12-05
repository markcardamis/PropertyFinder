package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.majoapps.propertyfinder.data.repository.PropertyListingRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Objects;

@Slf4j
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
    // return 100000 listings for an admin user
    public List<PropertyListing> getPropertyListingBySearch(JwtAuthenticationToken JwtAuthToken, @SearchSpec Specification<PropertyListing> searchSpec) {
        try {
            if (JwtAuthToken != null && JwtAuthToken.getTokenAttributes().containsKey("uid")) {
                String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
                // unauthenticated
                if (token == null || token.isEmpty()) { 
                    Pageable pageable = PageRequest.of(0, 100, Sort.by("Id").ascending());
                    return this.propertyListingRepository.findAll(Specification.where(searchSpec), pageable).getContent();
                }
                // admin
                if (JwtAuthToken.getTokenAttributes().containsKey("groups") && 
                    JwtAuthToken.getTokenAttributes().get("groups").toString().contains("admin")) {
                        Pageable pageable = PageRequest.of(0, 100000, Sort.by("Id").ascending());
                        return this.propertyListingRepository.findAll(Specification.where(searchSpec), pageable).getContent(); 
                } else { // authenticated
                    Pageable pageable = PageRequest.of(0, 1000, Sort.by("Id").ascending());
                    return this.propertyListingRepository.findAll(Specification.where(searchSpec), pageable).getContent();
                }
            } else {
                // unauthenticated
                Pageable pageable = PageRequest.of(0, 100, Sort.by("Id").ascending());
                return this.propertyListingRepository.findAll(Specification.where(searchSpec), pageable).getContent();
            }
        } catch (IllegalArgumentException ae) {
            log.error("IllegalArgumentException: ", ae);
            throw new ResourceNotFoundException("Malformed search query");
        }
        catch (Exception e) {
            log.error("Exception: ", e);
            throw new ResourceNotFoundException("Error retrieving results");
        }
    }

    public PropertyListing getPropertyListingById(Integer Id) {
        Objects.requireNonNull(Id);
        return this.propertyListingRepository
                .findById(Id)
                .orElseThrow(() -> new ResourceNotFoundException(("Listing [ID="+Id+"] can't be found")));
    }    
}
