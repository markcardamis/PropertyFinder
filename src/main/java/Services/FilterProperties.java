package Services;

import org.apache.commons.lang3.ArrayUtils;

import Models.PropertyListing;
import Tools.PriceMethods;

public class FilterProperties implements IFilterProperties {

    @Override
    public PropertyListing[] filterProperties(PropertyListing[] propertyListings) {
        if (propertyListings.length > 0) {
            Integer priceInt;
            int pricePerArea;
            try {
                for (int i = 0; i < propertyListings.length; i++) {
                    priceInt = PriceMethods.stringToInteger(propertyListings[i].price);
                    pricePerArea = priceInt/Math.round(propertyListings[i].area);
                    if ((propertyListings[i].zone.equals("R1")) && 
                        (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("DM")) &&
                            (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("R3")) &&
                            (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("R2")) &&
                            (propertyListings[i].area > 1200) && (priceInt < 200000)) {
                        System.out.println(propertyListings[i]);
                    } else {
                        if ((propertyListings[i].zone.equals("R1")) || (propertyListings[i].zone.equals("R3"))){
                            System.out.println(propertyListings[i]);
                        }
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
