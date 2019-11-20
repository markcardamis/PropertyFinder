package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.repository.AccountRepository;
import com.majoapps.propertyfinder.data.repository.NotificationsRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;

@Service
public class NotificationsService {
    private final NotificationsRepository notificationsRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public NotificationsService(NotificationsRepository notificationsRepository, AccountRepository accountRepository){
        this.notificationsRepository = notificationsRepository;
        this.accountRepository = accountRepository;
    }

    public List<Notifications> getAllNotificationsForAccount(UUID account_id){
        return this.notificationsRepository.findByAccountId(account_id);
    }


    public List<Notifications> getNotifications(UUID id) {
        List<Notifications> notifications = new ArrayList<>();
        Optional<Notifications> notificationsResponse = this.notificationsRepository.findById(id);
        if (notificationsResponse.isPresent()) {
            Notifications notification = notificationsResponse.get();
            notifications.add(notification);
        }
        return notifications;
    }

    public List<Notifications> getNotificationsByToken(JwtAuthenticationToken JwtAuthToken) {
        if (JwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
            if (token == null || token.isEmpty()) {
                throw new ResourceNotFoundException("uid is null in JWT ");
            } else {
            //return all Notifications for the logged in user
                List<Account> accountResponse = this.accountRepository.findByUserId(token);
                if (accountResponse.size() == 0) {
                    //no account for user
                    throw new ResourceNotFoundException("Account [User ID="+token+"] can't be found");
                } else {
                    // get account_id for logged in account
                    return getAllNotificationsForAccount(accountResponse.get(0).getId());
                }
            }
        } else {
            throw new ResourceNotFoundException("Cannot find uid Key in JWT ");
        }
    }

    public Notifications saveNotificationsByToken(JwtAuthenticationToken JwtAuthToken, Notifications notifications) {
        if (JwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
            if (token == null || token.isEmpty()) {
                throw new ResourceNotFoundException("uid is null in JWT ");
            } else {
            //return all Notifications for the logged in user
                List<Account> accountResponse = this.accountRepository.findByUserId(token);
                if (accountResponse.size() == 0) {
                    //no account for user
                    throw new ResourceNotFoundException("Account [User ID="+token+"] can't be found");
                } else {
                    // save notifications for logged in account
                    return saveNotifications(accountResponse.get(0).getId(), notifications);
                }
            }
        } else {
            throw new ResourceNotFoundException("Cannot find uid Key in JWT ");
        }
    }


    public Notifications saveNotifications(UUID accountId, Notifications notifications) {
        Objects.requireNonNull(accountId);
        Objects.requireNonNull(notifications);
        Account account = accountRepository
                .findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException(accountId.toString()));
        notifications.setAccount(account);
        return notificationsRepository.save(notifications);
    }

    public ResponseEntity<Notifications> updateNotifications(UUID id, Notifications newNotifications){
        return notificationsRepository.findById(id).map(notifications -> {
            notifications.setPlanningZone(newNotifications.getPlanningZone());
            notifications.setPropertyAreaMin(newNotifications.getPropertyAreaMin());
            notifications.setPropertyAreaMax(newNotifications.getPropertyAreaMax());
            notifications.setPropertyPriceMin(newNotifications.getPropertyPriceMin());
            notifications.setPropertyPriceMax(newNotifications.getPropertyPriceMax());
            notifications.setPropertyPSMMin(newNotifications.getPropertyPSMMin());
            notifications.setPropertyPSMMax(newNotifications.getPropertyPSMMax());
            notifications.setPropertyPostCode(newNotifications.getPropertyPostCode());
            notifications.setPropertyPriceToLandValueMin(newNotifications.getPropertyPriceToLandValueMin());
            notifications.setPropertyPriceToLandValueMax(newNotifications.getPropertyPriceToLandValueMax());
            notificationsRepository.save(notifications);
            return ResponseEntity.ok(notifications);
        }).orElseThrow(() -> new ResourceNotFoundException("Notifications [ID="+id+"] can't be found"));
    }

    public ResponseEntity<Notifications> partialUpdateNotifications(UUID id, Notifications newNotifications){
        return notificationsRepository.findById(id).map(notifications -> {
            if (newNotifications.getPlanningZone() != null)
                notifications.setPlanningZone(newNotifications.getPlanningZone());
            if (newNotifications.getPropertyAreaMin() != 0)
                notifications.setPropertyAreaMin(newNotifications.getPropertyAreaMin());
            if (newNotifications.getPropertyAreaMax() != 0) 
                notifications.setPropertyAreaMax(newNotifications.getPropertyAreaMax());
            if (newNotifications.getPropertyPriceMin() != 0)
                notifications.setPropertyPriceMin(newNotifications.getPropertyPriceMin());
            if (newNotifications.getPropertyPriceMax() != 0)
                notifications.setPropertyPriceMax(newNotifications.getPropertyPriceMax());
            if (newNotifications.getPropertyPSMMin() != 0)
                notifications.setPropertyPSMMin(newNotifications.getPropertyPSMMin());
            if (newNotifications.getPropertyPSMMax() != 0)
                notifications.setPropertyPSMMax(newNotifications.getPropertyPSMMax());
            if (newNotifications.getPropertyPostCode() != null)
                notifications.setPropertyPostCode(newNotifications.getPropertyPostCode());
            if (newNotifications.getPropertyPriceToLandValueMin() != null)
                notifications.setPropertyPriceToLandValueMin(newNotifications.getPropertyPriceToLandValueMin());
            if (newNotifications.getPropertyPriceToLandValueMax() != null)
                notifications.setPropertyPriceToLandValueMax(newNotifications.getPropertyPriceToLandValueMax());
            notificationsRepository.save(notifications);
            return ResponseEntity.ok(notifications);
        }).orElseThrow(() -> new ResourceNotFoundException("Notifications [ID="+id+"] can't be found"));
    }

    public ResponseEntity<?> deleteNotifications(UUID notificationId){
        return this.notificationsRepository.findById(notificationId).map(notification -> {
                    notificationsRepository.delete(notification);
                    return ResponseEntity.ok().build();
                }
        ).orElseThrow(() -> new ResourceNotFoundException("Notifications [ID="+notificationId+"] can't be found"));
    }

}
