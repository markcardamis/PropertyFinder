package Services;

import Models.PropertyListing;

import org.apache.commons.lang3.ArrayUtils;

public class FilterProperties implements IFilterProperties {

    @Override
    public PropertyListing[] filterProperties(PropertyListing[] propertyListings) {
        if (propertyListings.length > 0) {
            try {
                for (int i = 0; i < propertyListings.length; i++) {
                    if ((propertyListings[i].zone.equals("R1")) && (propertyListings[i].area > 1350)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("DM")) && (propertyListings[i].area > 1350)) {
                        System.out.println(propertyListings[i]);
                    } else if ((propertyListings[i].zone.equals("R3")) && (propertyListings[i].area > 1350)) {
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
        return propertyListings;
    }
}
