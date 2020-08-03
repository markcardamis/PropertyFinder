package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.service.PropertySalesService;
import com.majoapps.propertyfinder.data.entity.PropertySales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value="/api/propertysales")
public class PropertySalesServiceController {

    @Autowired
    private PropertySalesService propertySalesService;

    @RequestMapping(value = "{propertyId}", method = RequestMethod.GET)
    public List<PropertySales> getPropertySalesById(@PathVariable(value="propertyId") Integer id) {
        return propertySalesService.getPropertySales(id);
    }
}
