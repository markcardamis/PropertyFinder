package com.majoapps.propertyfinder.web.application;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {

    @RequestMapping(value="/implicit/callback", method = RequestMethod.GET)
    public String getCallback() {
        return "index";
    }

    @RequestMapping(value="/", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

}
