package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.repository.AccountRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAllAccounts() {
        List<Account> accounts = new ArrayList<>();
        Iterable<Account> results = this.accountRepository.findAll();
        results.forEach(accounts::add);
        return accounts;
    }

    public List<Account> getAccount(UUID id) {
        List<Account> accounts = new ArrayList<>();
        Optional<Account> accountResponse = this.accountRepository.findById(id);
        if (accountResponse.isPresent()) {
            Account account = accountResponse.get();
            accounts.add(account);
        }
        return accounts;
    }

    public List<Account> getAccountByUserId(String userId) {
        List<Account> accountResponse = this.accountRepository.findByUserId(userId);
        Account account;
        if (accountResponse.size() == 0) {
            //add new account
            account = new Account();
            account.setUserId(userId);
            account.setLastLogin(Date.from(Instant.now()));
        } else {
            //edit existing event
            account = accountResponse.get(0); //there will only ever be one because we update it if it exists already
            account.setLastLogin(Date.from(Instant.now()));
        }
        accountRepository.save(account);
        return accountResponse;
    }

    public List<Account> getAccountByToken(JwtAuthenticationToken JwtAuthToken) {
        if (JwtAuthToken.getTokenAttributes().containsKey("uid")) {
            String token = JwtAuthToken.getTokenAttributes().get("uid").toString();
            if (token == null || token.isEmpty()) {
                throw new ResourceNotFoundException("uid is null in JWT ");
            }
            //return all Accounts if the user is an admin
            if (JwtAuthToken.getTokenAttributes().containsKey("groups") && 
                JwtAuthToken.getTokenAttributes().get("groups").toString().contains("admin")) {
                return getAllAccounts();
            } else {
                return getAccountByUserId(token);
            }
        } else {
            throw new ResourceNotFoundException("Cannot find uid Key in JWT ");
        }
    }

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public ResponseEntity<Account> updateAccount(UUID id, Account newAccount){
        return accountRepository.findById(id).map(customer -> {
            customer.setFirstName(newAccount.getFirstName());
            customer.setLastName(newAccount.getLastName());
            customer.setEmailAddress(newAccount.getEmailAddress());
            customer.setPhoneNumber(newAccount.getPhoneNumber());
            accountRepository.save(customer);
            return ResponseEntity.ok(customer);
        }).orElseThrow(() -> new ResourceNotFoundException("Account [ID="+id+"] can't be found"));
    }

    public ResponseEntity<Account> partialUpdateAccount(UUID id, Account newAccount){
        return accountRepository.findById(id).map(customer -> {
            if (newAccount.getFirstName() != null) customer.setFirstName(newAccount.getFirstName());
            if (newAccount.getLastName() != null) customer.setLastName(newAccount.getLastName());
            if (newAccount.getEmailAddress() != null) customer.setEmailAddress(newAccount.getEmailAddress());
            if (newAccount.getPhoneNumber() != null) customer.setPhoneNumber(newAccount.getPhoneNumber());
            accountRepository.save(customer);
            return ResponseEntity.ok(customer);
        }).orElseThrow(() -> new ResourceNotFoundException("Account [ID="+id+"] can't be found"));
    }

    public ResponseEntity<?> deleteAccount(UUID accountID){
        return this.accountRepository.findById(accountID).map(account -> {
                    accountRepository.delete(account);
                    return ResponseEntity.ok().build();
                }
        ).orElseThrow(() -> new ResourceNotFoundException("Account [ID="+accountID+"] can't be found"));
    }

}
