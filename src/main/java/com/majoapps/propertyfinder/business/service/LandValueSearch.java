package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.utils.CSVUtils;

public class LandValueSearch implements ILandValueSearch
{

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
                        System.out.println("landValue " + propertyListings[i].landValue + " " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
                    } else {
                        propertyListings[i].landValue = 0;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    propertyListings[i].landValue = 0;
                }
            }
        }
        return propertyListings;
    }

}
