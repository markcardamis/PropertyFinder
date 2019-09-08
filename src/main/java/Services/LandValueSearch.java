package Services;

import java.io.FileInputStream;

import Models.PropertyListing;
import Tools.CSVUtils;

public class LandValueSearch implements ILandValueSearch
{
    
    @Override
    public PropertyListing[] getLandValue(PropertyListing[] propertyListings) throws Exception {
        // Get Land Value info
        if (propertyListings.length > 0) {
            String root = System.getProperty("user.dir");
            String csvFile = root + "/public/landvalues/bluemountains.csv";
            CSVUtils csvUtils = new CSVUtils();
            for (int i = 0; i < propertyListings.length; i++){
                try {
                    String result = csvUtils.getPropertyField(csvFile, 2, propertyListings[i].planningPortalPropId, 15);
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
