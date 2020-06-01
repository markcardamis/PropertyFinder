package com.majoapps.propertyfinder.web.application;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.MediaType;

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

    @RequestMapping(value="/robots.txt", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    public String getRobots() {
        return "robots.txt";
    }

    @RequestMapping(value = "/**/{path:[^\\.]*}", method = RequestMethod.GET)
    public String forward() {
        return "forward:/";
    }
}
