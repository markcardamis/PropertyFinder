package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.OktaUser;
import com.majoapps.propertyfinder.business.domain.OktaUserDTO;
import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.enums.AccountType;
import com.majoapps.propertyfinder.data.repository.AccountRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import com.majoapps.propertyfinder.security.JwtAuthenticationHelper;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final RestService restService;

    @Autowired
    public AccountService(AccountRepository accountRepository, RestService restService) {
        this.accountRepository = accountRepository;
        this.restService = restService;
    }

    public List<Account> getAllAccounts() {
        List<Account> accounts = new ArrayList<>();
        Iterable<Account> results = this.accountRepository.findAll();
        results.forEach(accounts::add);
        return accounts;
    }

    public Account getAccountById(UUID id) {
        Objects.requireNonNull(id);
        return this.accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account " + id + " not found"));
    }

    public List<Account> getAccountByUserId(String userId) {
        List<Account> accountResponse = this.accountRepository.findByUserId(userId);
        Account account;
        if (accountResponse.size() == 0) {
            // add new account
            account = new Account();
            account.setUserId(userId);
            account.setLastLogin(Date.from(Instant.now()));
            accountResponse.add(accountRepository.save(account));
        } else {
            // edit existing event
            account = accountResponse.get(0); // get first as there will only ever be one
            account.setLastLogin(Date.from(Instant.now()));
            accountRepository.save(account);
        }
        return accountResponse;
    }

    public List<Account> getAccountByToken(JwtAuthenticationToken jwtAuthToken) {
        if (JwtAuthenticationHelper.getAccountTypeByToken(jwtAuthToken) == AccountType.ADMIN) {
            return getAllAccounts();
        }
        return getAccountByUserId(JwtAuthenticationHelper.getUserByToken(jwtAuthToken));

    }

    public Account saveAccountwithCredentials(@NonNull OktaUserDTO oktaUserDTO) {
        OktaUser userCreated = restService.postNewUser(OktaUserDTO.convertToOktaUser(oktaUserDTO));
        Account accountCreated = new Account();
        accountCreated.setUserId(userCreated.getId());
        accountCreated.setFirstName(oktaUserDTO.getFirstName());
        return saveAccount(accountCreated);
    }

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public ResponseEntity<Account> updateAccount(UUID id, Account newAccount){
        return accountRepository.findById(id).map(customer -> {
            customer.setFirstName(newAccount.getFirstName());
            accountRepository.save(customer);
            return ResponseEntity.ok(customer);
        }).orElseThrow(() -> new ResourceNotFoundException("Account " + id + " not found"));
    }

    public ResponseEntity<Account> partialUpdateAccount(UUID id, Account newAccount){
        return accountRepository.findById(id).map(customer -> {
            if (newAccount.getFirstName() != null) {
                customer.setFirstName(newAccount.getFirstName());
            }
            accountRepository.save(customer);
            return ResponseEntity.ok(customer);
        }).orElseThrow(() -> new ResourceNotFoundException("Account " + id + " not found"));
    }

    public ResponseEntity<?> deleteAccount(UUID id){
        return this.accountRepository.findById(id).map(account -> {
                    accountRepository.delete(account);
                    return ResponseEntity.ok().build();     
        }).orElseThrow(() -> new ResourceNotFoundException("Account " + id + " not found"));
    }
}
