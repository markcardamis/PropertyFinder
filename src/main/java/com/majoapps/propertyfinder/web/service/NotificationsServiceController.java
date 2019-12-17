package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.service.NotificationsService;
import com.majoapps.propertyfinder.data.entity.Notifications;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/notifications")
public class NotificationsServiceController {

    @Autowired
    private NotificationsService notificationsService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Notifications> getNotificationsByToken(JwtAuthenticationToken JwtAuthToken) {
        return this.notificationsService.getNotificationsByToken(JwtAuthToken);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(code = HttpStatus.CREATED)
    public Notifications saveNotificationsByToken(
            JwtAuthenticationToken JwtAuthToken, 
            @RequestBody Notifications notifications) {
        return this.notificationsService.saveNotificationsByToken(JwtAuthToken, notifications);
    }

    @RequestMapping(value = "/account/{account_id}", method = RequestMethod.GET)
    public Iterable<Notifications> getAllNotitifications(
            @PathVariable(value="account_id") UUID accountId) {
        return notificationsService.getAllNotificationsForAccount(accountId);
    }

    @RequestMapping(value = "/account/{account_id}", method = RequestMethod.POST)
    @ResponseStatus(code = HttpStatus.CREATED)
    public Notifications saveNotifications(
            @PathVariable (value="account_id") UUID accountId, 
            @RequestBody Notifications notifications) {
        return notificationsService.saveNotifications(accountId, notifications);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Notifications getNotificationsById(
            @PathVariable(value="id") UUID notificationsId) {
        return notificationsService.getNotificationsById(notificationsId);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public ResponseEntity<Notifications> updateNotifications(
            @PathVariable UUID id, 
            @RequestBody Notifications notifications){
        return notificationsService.updateNotifications(id, notifications);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Notifications> partialUpdateNotifications(
            @PathVariable UUID id, 
            @RequestBody Notifications notifications){
        return notificationsService.partialUpdateNotifications(id, notifications);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteNotifications(@PathVariable UUID id){
        return notificationsService.deleteNotifications(id);
    }

}
