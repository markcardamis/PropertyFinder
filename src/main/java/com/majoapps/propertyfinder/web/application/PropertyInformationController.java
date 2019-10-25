package com.majoapps.propertyfinder.web.application;

import com.majoapps.propertyfinder.business.service.PropertyInformationService;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/propertyinformation")
public class PropertyInformationController {
    @Autowired
    private PropertyInformationService propertyInformationService;

    @Autowired
    public PropertyInformationController(PropertyInformationService propertyInformationService) {
        super();
        this.propertyInformationService = propertyInformationService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String getProperty(@RequestParam(value = "property_id") Integer id, Model model) {
        PropertyInformation getPropertyById = this.propertyInformationService.getProperty(id);
        model.addAttribute("properties", getPropertyById);
        return "properties";
    }

}
