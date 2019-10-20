package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.utils.KeywordExists;
import com.majoapps.propertyfinder.utils.PriceMethods;
import com.majoapps.propertyfinder.utils.StringCheck;

//TODO remove static class and make dynamic load from database
public class FilterProperties implements IFilterProperties {

    @Override
    public PropertyListing[] filterProperties(PropertyListing[] propertyListings) {
        if (propertyListings.length > 0) {
            Integer priceInt;
            KeywordExists keywordExists = new KeywordExists();
            String[] postcodes = new String[]{"2785", "2784", "2783", "2782", "2780", "2779", "2778", "2777",
                "2776", "2774", "2773"};
            String[] keywords = new String[]{"urgent", "reduced", "divorce", "builder", "motivated"};
            //String[] keywords = new String[]{"urgent"};
            try {
                for (int i = 0; i < propertyListings.length; i++) { //Iterate through all the listings
                    priceInt = PriceMethods.stringToInteger(propertyListings[i].price);
                    propertyListings[i].priceInteger = priceInt;
                    propertyListings[i].pricePerSquareMeter = priceInt/Math.round(propertyListings[i].area);

                    if (propertyListings[i].address.equals(propertyListings[i].planningPortalAddress)) {
                        // Check if property price is smaller than landValue (if not null)
                        if ((propertyListings[i].landValue != null) && (priceInt.compareTo(propertyListings[i].landValue) < 0)) {
                            propertyListings[i].selectionReason =
                                    StringCheck.concatWhenNotNull(propertyListings[i].selectionReason,
                                            "Land Value " + propertyListings[i].landValue, ",\n");
                            System.out.println("Land Value " + propertyListings[i].landValue + " " +
                                    propertyListings[i].priceInteger + " " + propertyListings[i].listingURL);
                        }
                        if ((propertyListings[i].zone.equals("R1")) && (propertyListings[i].area > 1350)) {
                            propertyListings[i].selectionReason =
                                    StringCheck.concatWhenNotNull(propertyListings[i].selectionReason,
                                            "R1, >1350m", ",\n");
                            System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                        }
                        if ((propertyListings[i].zone.equals("R3")) && (propertyListings[i].area > 1350)) {
                            propertyListings[i].selectionReason =
                                    StringCheck.concatWhenNotNull(propertyListings[i].selectionReason,
                                            "R3, >1350m", ",\n");
                            System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                        }
                        if ((propertyListings[i].zone.equals("R4")) && (propertyListings[i].area > 400)) {
                            propertyListings[i].selectionReason =
                                    StringCheck.concatWhenNotNull(propertyListings[i].selectionReason,
                                            "R4, >400m", ",\n");
                            System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                        }
                        if ((propertyListings[i].zone.contains("B")) && (propertyListings[i].area > 400)) {
                            propertyListings[i].selectionReason =
                                    StringCheck.concatWhenNotNull(propertyListings[i].selectionReason,
                                            "B, >400m", ",\n");
                            System.out.println(propertyListings[i].zone + " " + propertyListings[i].listingURL);
                        }
                        if ((keywordExists.isKeywordPresent(propertyListings[i].summaryDescription, keywords)) &&
                                (keywordExists.isKeywordPresent(propertyListings[i].postCode, postcodes))) {
                            propertyListings[i].selectionReason =
                                    StringCheck.concatWhenNotNull(propertyListings[i].selectionReason,
                                            "Keyword found: " + keywordExists.keywordPresent(propertyListings[i].summaryDescription, keywords),
                                            ",\n");
                            System.out.println("Keyword found: " + propertyListings[i].listingURL);
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return propertyListings;
    }
}
