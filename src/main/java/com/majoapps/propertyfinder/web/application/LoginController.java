package com.majoapps.propertyfinder.web.application;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/implicit/callback")
public class LoginController {

    @RequestMapping(method = RequestMethod.GET)
    public String getCallback() {
        return "index";
    }

}
