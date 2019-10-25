package com.majoapps.propertyfinder.web.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.business.service.PlanningPortalZoneSearch;
import com.majoapps.propertyfinder.business.service.PropertyInformationService;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping(value="/api/data")
public class DataServiceController {

    @Autowired
    private PropertyInformationService propertyInformationService;

    @RequestMapping(method= RequestMethod.GET)
    public List<PropertyInformation> getAllProperties() {
        PropertyInformation propertyInformation1 = null;
        for (int i = 0; i < 4233990; i++)  {
            try {
                propertyInformation1 = propertyInformationService.getPropertyInformation(i);
                PropertyListing propertyListing = new PropertyListing();
                PlanningPortalZoneSearch planningPortalZoneSearch = new PlanningPortalZoneSearch();
                propertyListing.planningPortalPropId = propertyInformation1.getPropertyId().toString();
                propertyListing = planningPortalZoneSearch.getSinglePlanningZone(propertyListing);
                PropertyInformation propertyInformationNew = new PropertyInformation();
                propertyInformationNew.setFloorSpaceRatio(new BigDecimal(Float.toString(propertyListing.fsr)));
                propertyInformationNew.setMinimumLotSize(propertyListing.minimumLotSize);
                propertyInformationService.partialUpdatePropertyInformation(propertyInformation1.getPropertyId(),propertyInformationNew);
                System.out.print(propertyListing.planningPortalPropId + " fsr " + Float.toString(propertyListing.fsr));
                System.out.println(" lot size " + propertyListing.minimumLotSize);
            } catch (Exception e) {
                //System.out.println(e.getMessage());
            }
        }
        return null;
    }
}
