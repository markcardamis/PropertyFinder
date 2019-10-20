package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.Account;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AccountRepository extends CrudRepository<Account, UUID> {
}