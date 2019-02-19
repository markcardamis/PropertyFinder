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
            String[] keywords = null;
            try {
                for (int i = 0; i < propertyListings.length; i++) { //Iterate through all the listings
                    priceInt = PriceMethods.stringToInteger(propertyListings[i].price);
                    pricePerArea = priceInt/Math.round(propertyListings[i].area);

                    if (propertyListings[i].lgaCode == 900) { //BLUE MOUNTAINS
                        if ((propertyListings[i].zone.equals("R1")) &&
                                (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                            System.out.println(propertyListings[i].listingURL);
                        } else if ((propertyListings[i].zone.equals("DM")) &&
                                (propertyListings[i].area > 1200) && (pricePerArea < 300)) {
                            System.out.println(propertyListings[i].listingURL);
                        } else if ((propertyListings[i].zone.equals("R3")) &&
                                (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                            System.out.println(propertyListings[i].listingURL);
                        } else if ((propertyListings[i].zone.equals("R2")) &&
                                (propertyListings[i].area > 1200) && (priceInt < 300000)) {
                            System.out.println(propertyListings[i].listingURL);
                        } else if (keywordExists.isKeywordPresent(propertyListings[i].summaryDescription, keywords)) {
                            System.out.println("Property keyword " + propertyListings[i].listingURL);
                        } else {
                            propertyListings = ArrayUtils.remove(propertyListings, i);
                            i--;
                        }
                    } else { //generic response
                        if ((propertyListings[i].zone.equals("R1")) &&
                                (propertyListings[i].area > 1350) && (pricePerArea < 400)) {
                            System.out.println("R1 " + propertyListings[i].listingURL);
                        } else if ((propertyListings[i].zone.equals("R3")) &&
                                (propertyListings[i].area > 1350) && (pricePerArea < 400)) {
                            System.out.println("R3 " + propertyListings[i].listingURL);
                        } else if ((propertyListings[i].zone.equals("R4")) &&
                                (propertyListings[i].area > 1350)) {
                            System.out.println("R4 " + propertyListings[i].listingURL);
                        }
                        else {
                            propertyListings = ArrayUtils.remove(propertyListings, i);
                            i--;
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
