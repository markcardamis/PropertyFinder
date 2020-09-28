package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.Notifications;
import java.util.List;
import java.util.UUID;
import javax.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepository extends CrudRepository <Notifications, UUID> {
    List<Notifications> findByAccountId(@NotNull UUID accountId);
    Long countByPropertyId(@NotNull Integer propertyId);
}
