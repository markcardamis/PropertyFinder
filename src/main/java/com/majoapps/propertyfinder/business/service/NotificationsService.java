package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.repository.AccountRepository;
import com.majoapps.propertyfinder.data.repository.NotificationsRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<?> deleteNotifications(UUID notificationId){

        return this.notificationsRepository.findById(notificationId).map(notification -> {
                    notificationsRepository.delete(notification);
                    return ResponseEntity.ok().build();
                }
        ).orElseThrow(() -> new ResourceNotFoundException("Notifications [ID="+notificationId+"] can't be found"));

    }

}
