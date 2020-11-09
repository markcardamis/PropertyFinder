package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.repository.NotificationsRepository;
import com.majoapps.propertyfinder.exception.MethodArgumentNotValidException;
import com.majoapps.propertyfinder.exception.PropertyAlreadyExistsException;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import com.majoapps.propertyfinder.security.JwtAuthenticationHelper;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

    public List<Notifications> getAllNotificationsForAccount(UUID account_id) {
        return this.notificationsRepository.findByAccountIdOrderByCreatedAtAsc(account_id);
    }

    public Notifications getNotificationsById(UUID id) {
        Objects.requireNonNull(id);
        return this.notificationsRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(("Notifications " + id + " not found")));
    }

    public List<Notifications> getNotificationsByToken(JwtAuthenticationToken jwtAuthToken, String type) {
        String userByToken = JwtAuthenticationHelper.getUserByToken(jwtAuthToken);
        // get accountId for the logged in user
        List<Account> accountResponse = this.accountService.getAccountByUserId(userByToken);
        if (accountResponse.size() == 0) {
            throw new ResourceNotFoundException("Account " + userByToken + " not found");
        }
        UUID account_id = accountResponse.get(0).getId();
        if (type.equals("filters")) {
            return notificationsRepository.findByAccountIdAndPropertyIdIsNullOrderByCreatedAtAsc(account_id);
        } else if (type.equals("watchlist")) {
            return notificationsRepository.findByAccountIdAndPropertyIdIsNotNullOrderByCreatedAtAsc(account_id);
        } else {
            // return all Notifications for the logged in user
            return getAllNotificationsForAccount(account_id);
        }
    }

    public Long countByPropertyId(Integer propertyId) {
        return notificationsRepository.countByPropertyId(propertyId);
    }

    public List<Notifications> getByAccountIdAndPropertyId(UUID account_id, Integer propertyId) {
        return notificationsRepository.findByAccountIdAndPropertyId(account_id, propertyId);
    }

    // all create/update methods use this method to catch duplicate propertyId constraints
    public Notifications saveNotifications(Notifications notifications) {
        Objects.requireNonNull(notifications);
        try {
            return notificationsRepository.save(notifications);
        } catch (DataIntegrityViolationException dataEx) {
            throw new PropertyAlreadyExistsException("Duplicate PropertyId: " + notifications.getPropertyId());
        } catch (Exception ex) {
            throw new MethodArgumentNotValidException(ex.getLocalizedMessage());
        }
    }

    public Notifications saveNotificationsByToken(JwtAuthenticationToken jwtAuthToken,
                                                  Notifications notifications) {
        Objects.requireNonNull(notifications);
        String userByToken = JwtAuthenticationHelper.getUserByToken(jwtAuthToken);
        // get accountId for the logged in user
        List<Account> accountResponse = this.accountService.getAccountByUserId(userByToken);
        if (accountResponse.size() == 0) {
            //no account for user
            throw new ResourceNotFoundException("Account " + userByToken + " not found");
        }
        // save notifications for logged in account
        return saveNotificationsByAccountId(accountResponse.get(0).getId(), notifications);
    }

    public Notifications saveNotificationsByAccountId(UUID accountId, Notifications notifications) {
        Objects.requireNonNull(accountId);
        Objects.requireNonNull(notifications);
        Account account = accountService.getAccountById(accountId);
        notifications.setAccount(account);
        return this.saveNotifications(notifications);
    }

    public ResponseEntity<Notifications> updateNotifications(UUID id, Notifications newNotifications) {
        return notificationsRepository.findById(id).map(notifications -> {
            notifications.setTitle(newNotifications.getTitle());
            notifications.setFrequency(newNotifications.getFrequency());
            notifications.setPropertyId(newNotifications.getPropertyId());
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
            this.saveNotifications(notifications);
            return ResponseEntity.ok(notifications);
        }).orElseThrow(() -> new ResourceNotFoundException("Notifications " + id + " not found"));
    }

    public ResponseEntity<Notifications> partialUpdateNotifications(UUID id, Notifications newNotifications) {
        return notificationsRepository.findById(id).map(notifications -> {
            if (newNotifications.getTitle() != null) {
                notifications.setTitle(newNotifications.getTitle());
            }
            if (newNotifications.getFrequency() != null) {
                notifications.setFrequency(newNotifications.getFrequency());
            }
            if (newNotifications.getPropertyId() != null &&
                    newNotifications.getPropertyId() != 0) {
                notifications.setPropertyId(newNotifications.getPropertyId());
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
            this.saveNotifications(notifications);
            return ResponseEntity.ok(notifications);
        }).orElseThrow(() -> new ResourceNotFoundException("Notifications " + id + " not found"));
    }

    public ResponseEntity<?> deleteNotifications(UUID id) {
        return this.notificationsRepository.findById(id).map(notification -> {
                    notificationsRepository.delete(notification);
                    return ResponseEntity.ok().build();
                }
        ).orElseThrow(() -> new ResourceNotFoundException("Notifications " + id + " not found"));
    }

}
