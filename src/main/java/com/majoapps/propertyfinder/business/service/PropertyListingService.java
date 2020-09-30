package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListingDTO;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.majoapps.propertyfinder.data.enums.AccountType;
import com.majoapps.propertyfinder.data.repository.PropertyListingRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import com.majoapps.propertyfinder.security.JwtAuthenticationHelper;
import com.majoapps.propertyfinder.web.util.ObjectMapperUtils;
import com.majoapps.propertyfinder.web.util.SpecificationUtil;
import com.sipios.springsearch.SpecificationsBuilder;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PropertyListingService {

    @PersistenceContext
    private EntityManager em;

    private final PropertyListingRepository propertyListingRepository;
    private final NotificationsService notificationsService;

    @Autowired
    public PropertyListingService(PropertyListingRepository propertyListingRepository,
            NotificationsService notificationsService) {
        this.propertyListingRepository = propertyListingRepository;
        this.notificationsService = notificationsService;
    }

    // return different amount of listings based on account priority
    public List<PropertyListingDTO> getPropertyListingBySearch(
            JwtAuthenticationToken jwtAuthToken,
            Specification<PropertyListing> searchSpec,
            Sort sort) {
        try {
            AccountType accountType = JwtAuthenticationHelper.getAccountTypeByToken(jwtAuthToken);
            Pageable pageable = PageRequest.of(0, accountType.getLimit(), sort); // set page length
            List<PropertyListing> propertyListing = this.propertyListingRepository
                    .findAll(Specification.where(searchSpec), pageable).getContent();
            return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class);
        } catch (IllegalArgumentException ae) {
            log.error("IllegalArgumentException: ", ae);
            throw new ResourceNotFoundException("Malformed search query");
        } catch (PropertyReferenceException pe) {
            log.error("PropertyReferenceException: ", pe);
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

    public List<PropertyListingDTO> getPropertyListingsByNotificationsId(
            JwtAuthenticationToken jwtAuthToken,
            UUID id,
            Sort sort) {
        Objects.requireNonNull(id);
        Notifications notifications = this.notificationsService.getNotificationsById(id);
        String token = SpecificationUtil.createSpecificationString(notifications);
        Specification<PropertyListing> specification = new SpecificationsBuilder<PropertyListing>()
                .withSearch(token).build();
        return (this.getPropertyListingBySearch(jwtAuthToken, specification, sort));
    }

    public List<PropertyListingDTO> getPropertyListingsByNotifications(
            JwtAuthenticationToken jwtAuthToken,
            Notifications notifications,
            Sort sort) {
        String token = SpecificationUtil.createSpecificationString(notifications);
        Specification<PropertyListing> specification = new SpecificationsBuilder<PropertyListing>()
                .withSearch(token).build();
        return (this.getPropertyListingBySearch(jwtAuthToken, specification, sort));
    }

    public List<PropertyListingDTO> queryHQL(
            JwtAuthenticationToken jwtAuthToken,
            Notifications notifications, 
            Double latitude, 
            Double longitude) {
        try {
            String queryString = SpecificationUtil.createQueryString(notifications, latitude, longitude);
            TypedQuery<PropertyListing> query = em.createQuery(queryString, PropertyListing.class);
            query = SpecificationUtil.queryBuilder(query, notifications);
            return this.getPropertyListingByQuery(jwtAuthToken, query);
        } catch (Exception ex) {
            log.error("Exception: ", ex);
            throw new ResourceNotFoundException("Error retrieving results");
        }
    }

    // return different amount of listings based on account priority
    public List<PropertyListingDTO> getPropertyListingByQuery(
            JwtAuthenticationToken jwtAuthToken,
            TypedQuery<PropertyListing> query) {
        try {
            AccountType accountType = JwtAuthenticationHelper.getAccountTypeByToken(jwtAuthToken);
            query.setMaxResults(accountType.getLimit());
            List<PropertyListing> propertyListing = query.getResultList();
            return ObjectMapperUtils.mapAll(propertyListing, PropertyListingDTO.class);
        } catch (IllegalArgumentException ae) {
            log.error("IllegalArgumentException: ", ae);
            throw new ResourceNotFoundException("Illegal argument in search query");
        } catch (PropertyReferenceException pe) {
            log.error("PropertyReferenceException: ", pe);
            throw new ResourceNotFoundException("Malformed search query");
        } catch (Exception e) {
            log.error("Exception: ", e);
            throw new ResourceNotFoundException("Error retrieving results");
        }
    }

}
