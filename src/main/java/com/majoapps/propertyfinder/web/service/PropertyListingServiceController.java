package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.service.PropertyListingService;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.SortDefault;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value="/api/listing")
public class PropertyListingServiceController {

    @Autowired
    private PropertyListingService propertyListingService;

    @RequestMapping(method= RequestMethod.GET)
    public List<PropertyListing> getListingsBySearch(JwtAuthenticationToken JwtAuthToken, @SearchSpec Specification<PropertyListing> searchSpec, @SortDefault(sort="Id",direction = Sort.Direction.ASC) Sort sort) {
        return this.propertyListingService.getPropertyListingBySearch(JwtAuthToken, searchSpec, sort);
    }

    @RequestMapping(value="{id}", method= RequestMethod.GET)
    public PropertyListing getListingById(@PathVariable(value="id") Integer id) {
        return this.propertyListingService.getPropertyListingById(id);
    }

    @RequestMapping(value="/notifications/{notifications_id}",method= RequestMethod.GET)
    public List<PropertyListing> getListingsFilteringByNotificationsId(JwtAuthenticationToken JwtAuthToken, @PathVariable(value="notifications_id") UUID notificationsId) {
        return this.propertyListingService.getPropertyListingsByNotificationsId(JwtAuthToken, notificationsId);
    }

    @RequestMapping(value="/notifications",method= RequestMethod.POST)
    public List<PropertyListing> getListingsFilteringByNotifications(JwtAuthenticationToken JwtAuthToken, @RequestBody(required = false) Notifications notifications ) {
        return this.propertyListingService.getPropertyListingsByNotifications(JwtAuthToken, notifications);
    }

}
