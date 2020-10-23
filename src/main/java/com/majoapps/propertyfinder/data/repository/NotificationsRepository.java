package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.Notifications;
import java.util.List;
import java.util.UUID;
import javax.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepository extends CrudRepository <Notifications, UUID> {
    List<Notifications> findByAccountIdOrderByCreatedAtAsc(@NotNull UUID accountId);
    List<Notifications> findByAccountIdAndPropertyIdIsNullOrderByCreatedAtAsc(@NotNull UUID accountId);
    List<Notifications> findByAccountIdAndPropertyIdIsNotNullOrderByCreatedAtAsc(@NotNull UUID accountId);
    Long countByPropertyId(@NotNull Integer propertyId);
    List<Notifications> findByAccountIdAndPropertyId(@NotNull UUID accountId, @NotNull Integer propertyId);
}
