package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.Account;
import com.majoapps.propertyfinder.data.repository.AccountRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public ResponseEntity<?> deleteAccount(UUID accountID){

        return this.accountRepository.findById(accountID).map(account -> {
                    accountRepository.delete(account);
                    return ResponseEntity.ok().build();
                }
        ).orElseThrow(() -> new ResourceNotFoundException("Account [ID="+accountID+"] can't be found"));

    }


}
