package com.majoapps.propertyfinder.web.application;

import com.majoapps.propertyfinder.business.service.AccountService;
import com.majoapps.propertyfinder.data.entity.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping(value="/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService){
        super();
        this.accountService = accountService;
    }

    @RequestMapping(method= RequestMethod.GET)
    public String getAccount(@RequestParam(value="account_id") UUID id, Model model){
        List<Account> getAccountById = this.accountService.getAccount(id);
        model.addAttribute("accounts", getAccountById);
        return "accounts";
    }

}
