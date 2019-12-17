package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.Account;
import java.util.List;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, UUID> {
    List<Account> findByUserId(String userId);
}
