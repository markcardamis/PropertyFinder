package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.utils.CSVUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LandValueSearch implements ILandValueSearch
{

    private PropertyInformationService propertyInformationService;

    @Override
    public PropertyListing[] addLandValue(PropertyListing[] propertyListings) throws Exception {
        for (PropertyListing propertyListing : propertyListings) {
            try {
                Integer propertyId = Integer.valueOf(propertyListing.planningPortalPropId);
                PropertyInformation propertyInformationResponse = propertyInformationService.getPropertyInformation(propertyId);
                if (propertyInformationResponse.getLandValue1() == null) {
                    propertyListing.landValue = propertyInformationResponse.getLandValue1();
                }
            } catch (Exception e) {
                log.error("Exception: " + e);
            }
        }
        return propertyListings;
    }


    @Override
    public PropertyListing[] getLandValue(PropertyListing[] propertyListings) throws Exception {
        // Get Land Value info
        if (propertyListings.length > 0) {
            String root = System.getProperty("user.dir");
            String csvFile = root + "com/majoapps/propertyfinder/planningInformation/sydneyproperties.csv";
            CSVUtils csvUtils = new CSVUtils();
            for (int i = 0; i < propertyListings.length; i++){
                try {
                    String result = csvUtils.getPropertyField(csvFile, 0, propertyListings[i].planningPortalPropId, 1);
                    if (result != null && !result.isEmpty()) {
                        propertyListings[i].landValue = Integer.valueOf(result);
                        log.debug("landValue " + propertyListings[i].landValue + " " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
                    } else {
                        log.warn("Cannot find propertyID : {}", propertyListings[i].planningPortalPropId);
                        propertyListings[i].landValue = 0;
                    }
                } catch (Exception e) {
                    log.error("Exception: " + e);
                    propertyListings[i].landValue = 0;
                }
            }
        }
        return propertyListings;
    }

}
