package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.service.AccountService;
import com.majoapps.propertyfinder.data.entity.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value="/api/account")
public class AccountServiceController {

    @Autowired
    private AccountService accountService;

    @PreAuthorize("hasAuthority('admins')")
    @RequestMapping(method= RequestMethod.GET)
    public Iterable<Account> getAccounts() {
        return this.accountService.getAllAccounts();
    }


    @RequestMapping(value="{id}", method= RequestMethod.GET)
    public List<Account> getAccountById(@PathVariable(value="id") UUID id) {
        return this.accountService.getAccount(id);
    }

    @RequestMapping(method= RequestMethod.POST)
    @ResponseStatus(code = HttpStatus.CREATED)
    public Account saveAccount(@RequestBody Account account) {
        return accountService.saveAccount(account);
    }

    @RequestMapping(value = "{id}", method= RequestMethod.PUT)
    public ResponseEntity<Account> updateAccount(@PathVariable(value="id") UUID id, @RequestBody Account newAccount){
        return accountService.updateAccount(id, newAccount);
    }

    @RequestMapping(value = "{id}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteAccount(@PathVariable(value="id") UUID id){
        return this.accountService.deleteAccount(id);
    }


}