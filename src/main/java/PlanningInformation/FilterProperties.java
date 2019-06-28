package PlanningInformation;

import Models.PropertyListing;
import Services.IFilterProperties;
import Tools.KeywordExists;
import Tools.PriceMethods;

import org.apache.commons.lang3.ArrayUtils;

public class FilterProperties implements IFilterProperties {

    @Override
    public PropertyListing[] filterProperties(PropertyListing[] propertyListings) {
        if (propertyListings.length > 0) {
            Integer priceInt;
            int pricePerArea;
            KeywordExists keywordExists = new KeywordExists();
            String[] keywords = new String[]{"2785", "2783", "2782", "2780", "2779", "2778", "2777",
                "2776", "2774", "2773"};
            try {
                for (int i = 0; i < propertyListings.length; i++) { //Iterate through all the listings
                    priceInt = PriceMethods.stringToInteger(propertyListings[i].price);
                    pricePerArea = priceInt/Math.round(propertyListings[i].area);

                    if ((propertyListings[i].zone.equals("R1")) &&
                            (propertyListings[i].area > 1350)) {
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.equals("R3")) &&
                            (propertyListings[i].area > 1350)) {
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.equals("R4")) &&
                            (propertyListings[i].area > 400)) {
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.contains("B")) &&
                            (propertyListings[i].area > 400)) {
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.contains("E4")) &&
                            (propertyListings[i].area > 4000) && (pricePerArea < 100) &&
                            (keywordExists.isKeywordPresent(propertyListings[i].postCode, keywords))){
                        System.out.println(propertyListings[i].zone + " keyword " + propertyListings[i].listingURL);
                    } else {
                        propertyListings = ArrayUtils.remove(propertyListings, i);
                        i--;
                    }                 

                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return propertyListings;
    }
}
