package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListingDTO;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.majoapps.propertyfinder.data.repository.PropertyListingRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import com.majoapps.propertyfinder.web.util.ObjectMapperUtils;
import com.majoapps.propertyfinder.web.util.SpecificationUtil;
import com.sipios.springsearch.SpecificationsBuilder;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PropertyListingService {

    private final PropertyListingRepository propertyListingRepository;
    private final NotificationsService notificationsService;
    private static final Integer adminResultsLimit = 100000;
    private static final Integer authorisedResultsLimit = 1000;
    private static final Integer unauthorisedResultsLimit = 100;

    @Autowired
    public PropertyListingService(PropertyListingRepository propertyListingRepository,
            NotificationsService notificationsService) {
        this.propertyListingRepository = propertyListingRepository;
        this.notificationsService = notificationsService;
    }

    // return different amount of listings based on account priority
    // return 100 listings for unauthenticated user
    // return 1000 listings for authenticated user
    // return 100000 listings for an admin user
    public List<PropertyListingDTO> getPropertyListingBySearch(JwtAuthenticationToken JwtAuthToken,
            Specification<PropertyListing> searchSpec, Sort sort) {
        try {
            if (JwtAuthToken != null && JwtAuthToken.getTokenAttributes().containsKey("uid")) {
                String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
                // unauthenticated
                if (token == null || token.isEmpty()) {
                    Pageable pageable = PageRequest.of(0, unauthorisedResultsLimit, sort);
                    List<PropertyListing> propertyListing = this.propertyListingRepository
                            .findAll(Specification.where(searchSpec), pageable).getContent();
                    return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class);
                }
                // admin
                if (JwtAuthToken.getTokenAttributes().containsKey("groups")
                        && JwtAuthToken.getTokenAttributes().get("groups").toString().contains("admin")) {
                    Pageable pageable = PageRequest.of(0, adminResultsLimit, sort);
                    List<PropertyListing> propertyListing = this.propertyListingRepository
                            .findAll(Specification.where(searchSpec), pageable).getContent();
                    return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class);
                } else { // authenticated
                    Pageable pageable = PageRequest.of(0, authorisedResultsLimit, sort);
                    List<PropertyListing> propertyListing = this.propertyListingRepository
                            .findAll(Specification.where(searchSpec), pageable).getContent();
                    return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class);
                }
            } else {
                // unauthenticated
                Pageable pageable = PageRequest.of(0, unauthorisedResultsLimit, sort);
                List<PropertyListing> propertyListing = this.propertyListingRepository
                        .findAll(Specification.where(searchSpec), pageable).getContent();
                return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class);
            }
        } catch (IllegalArgumentException ae) {
            log.error("IllegalArgumentException: ", ae);
            throw new ResourceNotFoundException("Malformed search query");
        } catch (PropertyReferenceException pe) {
            log.error("IllegalArgumentException: ", pe);
            throw new ResourceNotFoundException("Malformed search query");
        } catch (Exception e) {
            log.error("Exception: ", e);
            throw new ResourceNotFoundException("Error retrieving results");
        }
    }

    public PropertyListing getPropertyListingById(Integer id) {
        Objects.requireNonNull(id);
        return this.propertyListingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing " + id + " not found"));
    }

    public List<PropertyListingDTO> getPropertyListingsByNotificationsId(JwtAuthenticationToken JwtAuthToken, UUID id,
            Sort sort) {
        Objects.requireNonNull(JwtAuthToken);
        Objects.requireNonNull(id);
        Notifications notifications = this.notificationsService.getNotificationsById(id);
        String token = SpecificationUtil.createSpecificationString(notifications);
        Specification<PropertyListing> specification = new SpecificationsBuilder<PropertyListing>().withSearch(token)
                .build();
        return (this.getPropertyListingBySearch(JwtAuthToken, specification, sort));
    }

    public List<PropertyListingDTO> getPropertyListingsByNotifications(JwtAuthenticationToken JwtAuthToken,
            Notifications notifications, Sort sort) {
        // Users can search without being logged in
        // Objects.requireNonNull(JwtAuthToken);
        // Passing in a null notification will just return all
        // Objects.requireNonNull(notifications);
        String token = SpecificationUtil.createSpecificationString(notifications);
        Specification<PropertyListing> specification = new SpecificationsBuilder<PropertyListing>().withSearch(token)
                .build();
        return (this.getPropertyListingBySearch(JwtAuthToken, specification, sort));
    }

    public List<PropertyListingDTO> findAllLocationsWithin(Double latitude, Double longitude) {
        if (latitude == null || longitude == null) {
            Pageable pageable = PageRequest.of(0, authorisedResultsLimit, Sort.by(Sort.Direction.ASC, "id"));
            List<PropertyListing> propertyListing = this.propertyListingRepository.findWithinDefault(pageable);
            return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class); 
        } else {
            String geoStringBoundingBox = "POLYGON((" + (latitude-0.5) + " " + (longitude+0.5) + ", " + 
                                                (latitude-0.5) + " " + (longitude-0.5) + ", " + 
                                                (latitude+0.5) + " " + (longitude-0.5) + ", " + 
                                                (latitude+0.5) + " " + (longitude+0.5) + ", " +
                                                (latitude-0.5) + " " + (longitude+0.5) + "))"; 
            try {
                Geometry geometryBoundingBox = new WKTReader().read(geoStringBoundingBox);
                String sort = "distance(l.geometry, 'POINT("+ latitude + " " + longitude + ")')";
                Pageable pageable = PageRequest.of(0, authorisedResultsLimit, JpaSort.unsafe(Sort.Direction.ASC, sort));
                List<PropertyListing> propertyListing = this.propertyListingRepository.findWithin(geometryBoundingBox, pageable);
                return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class); 
            } catch (ParseException e) {
                log.error("ParseException: ", e);
                return null;
            }
        }
    }

}
