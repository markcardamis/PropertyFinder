package PlanningInformation;

import Models.PropertySearchRequest;

import org.apache.commons.lang3.ArrayUtils;

import java.time.LocalDate;
import java.util.Optional;

public class SearchLocations {

    public PropertySearchRequest Katoomba() {
        PropertySearchRequest searchJson = new PropertySearchRequest();
        searchJson.listingType = "Sale";
        searchJson.propertyTypes = new String[]{"DevelopmentSite","House", "VacantLand"};
        searchJson.minLandArea = 1350;
        searchJson.minPrice = 150000;
        searchJson.maxPrice = 500000;
        searchJson.page = 1;
        searchJson.pageSize = 200;
        searchJson.dateUpdated = LocalDate.now().toString();

        PropertySearchRequest.Locations locations = new PropertySearchRequest.Locations();
            locations.state = "NSW";
            locations.region = "Sydney Region";
            locations.area = "Blue Mountains & Surrounds";
            locations.suburb = "Katoomba";
            locations.postCode = "2780";
            locations.includeSurroundingSuburbs = true;

        searchJson.locations = new PropertySearchRequest.Locations[]{locations};
        return searchJson;
    }


    public PropertySearchRequest NSW(Integer suburbID) {
        PropertySearchRequest searchJson = new PropertySearchRequest();
        searchJson.listingType = "Sale";
        searchJson.propertyTypes = new String[]{"DevelopmentSite","VacantLand"};
        searchJson.minLandArea = 720;
        searchJson.minPrice = 200000;
        searchJson.maxPrice = 250000;
        searchJson.page = 1;
        searchJson.pageSize = 200;
        searchJson.dateUpdated = LocalDate.now().toString();

        PropertySearchRequest.Locations locations = new PropertySearchRequest.Locations();
        locations.state = "NSW";
        locations.postCode = String.valueOf(NSWSuburbsList.NSWList[suburbID]); // Saved as Int array
        searchJson.locations = new PropertySearchRequest.Locations[]{locations};
        return searchJson;
    }

    public PropertySearchRequest NSW(PropertySearchRequest propertySearchRequest) {
        PropertySearchRequest searchJson = new PropertySearchRequest();
        searchJson.listingType =  Optional.ofNullable(propertySearchRequest.listingType).orElse("Sale");
        searchJson.propertyTypes = Optional.ofNullable(propertySearchRequest.propertyTypes).orElse(new String[]{"DevelopmentSite","VacantLand"});
        searchJson.minLandArea = Optional.ofNullable(propertySearchRequest.minLandArea).orElse(720);
        searchJson.minPrice = Optional.ofNullable(propertySearchRequest.minPrice).orElse(200000);
        searchJson.maxPrice = Optional.ofNullable(propertySearchRequest.maxPrice).orElse(250000);
        searchJson.page = Optional.ofNullable(propertySearchRequest.page).orElse(1);
        searchJson.pageSize = Optional.ofNullable(propertySearchRequest.pageSize).orElse(200);
        searchJson.dateUpdated = Optional.ofNullable(propertySearchRequest.dateUpdated).orElse(LocalDate.now().toString());

        PropertySearchRequest.Locations locations = new PropertySearchRequest.Locations();
        locations.state = "NSW"; // default value

        if (propertySearchRequest.locations == null) {
            searchJson.locations = new PropertySearchRequest.Locations[]{locations};
        } else {
            PropertySearchRequest.Locations[] locationsArray = {locations};
            for (int i = 0; i < propertySearchRequest.locations.length; i++){
                locations.state = Optional.ofNullable(propertySearchRequest.locations[i].state).orElse("NSW");
                locations.region = Optional.ofNullable(propertySearchRequest.locations[i].region).orElse("");
                locations.area = Optional.ofNullable(propertySearchRequest.locations[i].area).orElse("");
                locations.suburb = Optional.ofNullable(propertySearchRequest.locations[i].suburb).orElse("");
                locations.postCode = Optional.ofNullable(propertySearchRequest.locations[i].postCode).orElse("");
                locations.includeSurroundingSuburbs = Optional.ofNullable(propertySearchRequest.locations[i].includeSurroundingSuburbs).orElse(false);
                locationsArray = ArrayUtils.insert(0, locationsArray, locations);
            }
            searchJson.locations = locationsArray;
        }

        return searchJson;
    }

}
