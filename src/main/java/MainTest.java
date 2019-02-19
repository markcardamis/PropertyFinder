
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import Models.PropertySearchRequest;
import PlanningInformation.FilterProperties;
import PlanningInformation.SearchLocations;
import Models.DomainTokenAuthResponse;
import Models.PropertyListing;
import Services.DomainAuthentication;
import Services.DomainListing;
import Services.EmailNotification;
import Services.PlanningPortalAddressSearch;
import Services.PlanningPortalZoneSearch;
import org.apache.commons.lang3.ArrayUtils;

public class MainTest {

    String authToken = "";
    PropertyListing[] propertyListings;
    PropertyListing[] propertyListingsComplete = null;
    PropertySearchRequest searchJson;


    public void getListings() throws Exception{
        PropertySearchRequest propertySearchRequest = new PropertySearchRequest();
        propertySearchRequest.minPrice = 300000;
        propertySearchRequest.maxPrice = 1500000;
        propertySearchRequest.minLandArea = 1350;
        PropertySearchRequest.Locations locations = new PropertySearchRequest.Locations();
            locations.state = "NSW";
            locations.region = "Sydney Region";
        propertySearchRequest.locations = new PropertySearchRequest.Locations[]{locations};
        searchJson = new SearchLocations().NSW(propertySearchRequest);
        getDomainAuth();
        getDomainListing();
        addPlanningPortalAddress();
        addPlanningPortalZone();
        propertyListingsComplete = propertyListings;
        int i = 1;
        while (propertyListings.length >= 200) {
            i++;
            System.out.println("Pages " + String.valueOf(i));
            searchJson.page = i;
            getDomainListing();
            addPlanningPortalAddress();
            addPlanningPortalZone();
            propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
        }
        filterProperties();
        sendEmailNotifications();
    }

    private void getDomainAuth() throws Exception {
        String username = System.getenv().get("DOMAIN_USERNAME");
        String password = System.getenv().get("DOMAIN_PASSWORD");
        String encoded = Base64.getEncoder().encodeToString((username+":"+password).getBytes(StandardCharsets.UTF_8));  //Java 8
        DomainAuthentication domainAuthentication = new DomainAuthentication();
        DomainTokenAuthResponse domainTokenAuthResponse = domainAuthentication.getAuthToken(encoded);
        authToken = domainTokenAuthResponse.access_token;
    }

    private void getDomainListing() throws Exception {
        DomainListing domainListing = new DomainListing();
        propertyListings = domainListing.getPropertyList(authToken, searchJson);
    }

    private void addPlanningPortalAddress() throws Exception {
        PlanningPortalAddressSearch planningPortalAddressSearch = new PlanningPortalAddressSearch();
        propertyListings = planningPortalAddressSearch.getFormattedAddress(propertyListings);
    }

    private void addPlanningPortalZone() throws Exception {
        PlanningPortalZoneSearch planningPortalZoneSearch = new PlanningPortalZoneSearch();
        propertyListings = planningPortalZoneSearch.getPlanningZone(propertyListings);
    }

    private void filterProperties() {
        FilterProperties filterProperties = new FilterProperties();
        propertyListings = filterProperties.filterProperties(propertyListings);
    }

    private void sendEmailNotifications() throws Exception {
        EmailNotification emailNotification = new EmailNotification();
        emailNotification.sendEmailNotification(propertyListings);
    }
}
