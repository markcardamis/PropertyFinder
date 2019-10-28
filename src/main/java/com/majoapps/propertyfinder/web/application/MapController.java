package com.majoapps.propertyfinder.web.application;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/map")
public class MapController {

    @RequestMapping(method= RequestMethod.GET)
    public String getMap(){
        return "map";
    }

}
