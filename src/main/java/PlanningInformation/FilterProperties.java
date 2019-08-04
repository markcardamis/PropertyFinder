package PlanningInformation;

import Models.PropertyListing;
import Services.IFilterProperties;
import Tools.KeywordExists;
import Tools.PriceMethods;

public class FilterProperties implements IFilterProperties {

    @Override
    public PropertyListing[] filterProperties(PropertyListing[] propertyListings) {
        if (propertyListings.length > 0) {
            Integer priceInt;
            KeywordExists keywordExists = new KeywordExists();
            String[] postcodes = new String[]{"2785", "2784", "2783", "2782", "2780", "2779", "2778", "2777",
                "2776", "2774", "2773"};
            String[] keywords = new String[]{"urgent", "reduced", "divorce", "builder", "motivated"};
            try {
                for (int i = 0; i < propertyListings.length; i++) { //Iterate through all the listings
                    priceInt = PriceMethods.stringToInteger(propertyListings[i].price);
                    propertyListings[i].priceInteger = priceInt;
                    propertyListings[i].pricePerSquareMeter = priceInt/Math.round(propertyListings[i].area);

                    if ((propertyListings[i].zone.equals("R1")) && (propertyListings[i].area > 1350)) {
                        propertyListings[i].selectionReason = "R1, >1350m";
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.equals("R3")) && (propertyListings[i].area > 1350)) {
                        propertyListings[i].selectionReason = "R3, >1350m";
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.equals("R4")) && (propertyListings[i].area > 400)) {
                        propertyListings[i].selectionReason = "R4, >400m";
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((propertyListings[i].zone.contains("B")) && (propertyListings[i].area > 400)) {
                        propertyListings[i].selectionReason = "B, >400m";
                        System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                    } else if ((keywordExists.isKeywordPresent(propertyListings[i].summaryDescription, keywords)) &&
                    (keywordExists.isKeywordPresent(propertyListings[i].postCode, postcodes))){
                        propertyListings[i].selectionReason = "Keyword found: " + keywordExists.keywordPresent(propertyListings[i].summaryDescription, keywords);
                        System.out.println("Keyword found: " + propertyListings[i].listingURL);
                    }            

                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return propertyListings;
    }
}
