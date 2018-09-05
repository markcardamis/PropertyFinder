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
                    if ((propertyListings[i].zone.equals("R2")) && (propertyListings[i].area > 350) &&
                            (pricePerArea < 4500)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("DM")) &&
                            (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("R3")) &&
                            (propertyListings[i].area > 1350) && (pricePerArea < 450)) {
                        System.out.println(propertyListings[i]);
                    } else {
                        propertyListings = ArrayUtils.remove(propertyListings, i);
                        i--;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        PropertyListing pingAddress = new PropertyListing();
            pingAddress.listingURL = "https://www.majoapps.com";
            pingAddress.address = "Ping";
            pingAddress.area = 1f;
            pingAddress.price = "1";
            pingAddress.zone = "A1";
            pingAddress.planningPortalURL = "https://www.majoapps.com";

        propertyListings = ArrayUtils.insert(0, propertyListings, pingAddress);
        return propertyListings;
    }
}
