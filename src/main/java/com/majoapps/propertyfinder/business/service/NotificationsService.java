package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.repository.NotificationsRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class NotificationsService {
    private final NotificationsRepository notificationsRepository;
    private final AccountService accountService;

    @Autowired
    public NotificationsService(NotificationsRepository notificationsRepository, 
            AccountService accountService) {
        this.notificationsRepository = notificationsRepository;
        this.accountService = accountService;
    }

    public List<Notifications> getAllNotificationsForAccount(UUID account_id){
        return this.notificationsRepository.findByAccountId(account_id);
    }

    public Notifications getNotificationsById(UUID id) {
        Objects.requireNonNull(id);
        return this.notificationsRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(("Notifications " + id + " not found")));
    }

    public List<Notifications> getNotificationsByToken(JwtAuthenticationToken JwtAuthToken) {
        Objects.requireNonNull(JwtAuthToken);
        if (JwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
            if (token == null || token.isEmpty()) {
                throw new ResourceNotFoundException("uid is null in JWT ");
            } else {
            //return all Notifications for the logged in user
                List<Account> accountResponse = this.accountService.getAccountByUserId(token);
                if (accountResponse.size() == 0) {
                    //no account for user
                    throw new ResourceNotFoundException("Account " + token + " not found");
                } else {
                    // get account_id for logged in account
                    return getAllNotificationsForAccount(accountResponse.get(0).getId());
                }
            }
        } else {
            throw new ResourceNotFoundException("Cannot find uid Key in JWT ");
        }
    }

    public Notifications saveNotificationsByToken(JwtAuthenticationToken JwtAuthToken, 
            Notifications notifications) {
        Objects.requireNonNull(JwtAuthToken);
        Objects.requireNonNull(notifications);
        if (JwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
            if (token == null || token.isEmpty()) {
                throw new ResourceNotFoundException("uid is null in JWT ");
            } else {
            //return all Notifications for the logged in user
                List<Account> accountResponse = this.accountService.getAccountByUserId(token);
                if (accountResponse.size() == 0) {
                    //no account for user
                    throw new ResourceNotFoundException("Account " + token + " not found");
                } else {
                    // save notifications for logged in account
                    return saveNotifications(accountResponse.get(0).getId(), notifications);
                }
            }
        } else {
            throw new ResourceNotFoundException("Cannot find uid Key in JWT");
        }
    }


    public Notifications saveNotifications(UUID accountId, Notifications notifications) {
        Objects.requireNonNull(accountId);
        Objects.requireNonNull(notifications);
        Account account = accountService.getAccountById(accountId);
        notifications.setAccount(account);
        return notificationsRepository.save(notifications);
    }

    public ResponseEntity<Notifications> updateNotifications(UUID id, Notifications newNotifications) {
        return notificationsRepository.findById(id).map(notifications -> {
            notifications.setName(newNotifications.getName());
            notifications.setFrequency(newNotifications.getFrequency());
            notifications.setPropertyZone(newNotifications.getPropertyZone());
            notifications.setPropertyAreaMin(newNotifications.getPropertyAreaMin());
            notifications.setPropertyAreaMax(newNotifications.getPropertyAreaMax());
            notifications.setPropertyPriceMin(newNotifications.getPropertyPriceMin());
            notifications.setPropertyPriceMax(newNotifications.getPropertyPriceMax());
            notifications.setPropertyPricePSMMin(newNotifications.getPropertyPricePSMMin());
            notifications.setPropertyPricePSMMax(newNotifications.getPropertyPricePSMMax());
            notifications.setPropertyPostCode(newNotifications.getPropertyPostCode());
            notifications.setPropertyPriceToLandValueMin(newNotifications.getPropertyPriceToLandValueMin());
            notifications.setPropertyPriceToLandValueMax(newNotifications.getPropertyPriceToLandValueMax());
            notifications.setPropertyFloorSpaceRatioMin(newNotifications.getPropertyFloorSpaceRatioMin());
            notifications.setPropertyFloorSpaceRatioMax(newNotifications.getPropertyFloorSpaceRatioMax());
            notificationsRepository.save(notifications);
            return ResponseEntity.ok(notifications);
        }).orElseThrow(() -> new ResourceNotFoundException("Notifications " + id + " not found"));
    }

    public ResponseEntity<Notifications> partialUpdateNotifications(UUID id, Notifications newNotifications) {
        return notificationsRepository.findById(id).map(notifications -> {
            if (newNotifications.getName() != null) {
                notifications.setName(newNotifications.getName());
            }
            if (newNotifications.getFrequency() != null) {
                notifications.setFrequency(newNotifications.getFrequency());
            }
            if (newNotifications.getPropertyZone() != null) {
                notifications.setPropertyZone(newNotifications.getPropertyZone());
            }
            if (newNotifications.getPropertyAreaMin() != null && 
                    newNotifications.getPropertyAreaMin() != 0) {
                notifications.setPropertyAreaMin(newNotifications.getPropertyAreaMin());
            }
            if (newNotifications.getPropertyAreaMax() != null && 
                    newNotifications.getPropertyAreaMax() != 0) {
                notifications.setPropertyAreaMax(newNotifications.getPropertyAreaMax());
            }
            if (newNotifications.getPropertyPriceMin() != null && 
                    newNotifications.getPropertyPriceMin() != 0) {
                notifications.setPropertyPriceMin(newNotifications.getPropertyPriceMin());
            }
            if (newNotifications.getPropertyPriceMax() != null && 
                    newNotifications.getPropertyPriceMax() != 0) {
                notifications.setPropertyPriceMax(newNotifications.getPropertyPriceMax());
            }
            if (newNotifications.getPropertyPricePSMMin() != null && 
                    newNotifications.getPropertyPricePSMMin() != 0) {
                notifications.setPropertyPricePSMMin(newNotifications.getPropertyPricePSMMin());
            }
            if (newNotifications.getPropertyPricePSMMax() != null && 
                    newNotifications.getPropertyPricePSMMax() != 0) {
                notifications.setPropertyPricePSMMax(newNotifications.getPropertyPricePSMMax());
            }
            if (newNotifications.getPropertyPostCode() != null) {
                notifications.setPropertyPostCode(newNotifications.getPropertyPostCode());
            }
            if (newNotifications.getPropertyPriceToLandValueMin() != null) {
                notifications.setPropertyPriceToLandValueMin(newNotifications.getPropertyPriceToLandValueMin());
            }
            if (newNotifications.getPropertyPriceToLandValueMax() != null) {
                notifications.setPropertyPriceToLandValueMax(newNotifications.getPropertyPriceToLandValueMax());
            }
            if (newNotifications.getPropertyFloorSpaceRatioMin() != null) {
                notifications.setPropertyFloorSpaceRatioMin(newNotifications.getPropertyFloorSpaceRatioMin());
            }
            if (newNotifications.getPropertyFloorSpaceRatioMax() != null) {
                notifications.setPropertyFloorSpaceRatioMax(newNotifications.getPropertyFloorSpaceRatioMax());
            }
            notificationsRepository.save(notifications);
            return ResponseEntity.ok(notifications);
        }).orElseThrow(() -> new ResourceNotFoundException("Notifications " + id + " not found"));
    }

    public ResponseEntity<?> deleteNotifications(UUID id){
        return this.notificationsRepository.findById(id).map(notification -> {
                    notificationsRepository.delete(notification);
                    return ResponseEntity.ok().build();
                }
        ).orElseThrow(() -> new ResourceNotFoundException("Notifications " + id + " not found"));
    }

}
