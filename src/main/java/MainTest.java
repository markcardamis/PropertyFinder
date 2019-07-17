
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import Models.PropertySearchRequest;
import PlanningInformation.FilterProperties;
import PlanningInformation.SearchLocations;
import Models.DomainTokenAuthResponse;
import Models.PropertyListing;
import Services.DatabaseStorage;
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
        propertySearchRequest.minPrice = 150000;
        propertySearchRequest.maxPrice = 2500000;
        propertySearchRequest.minLandArea = 400;
        propertySearchRequest.propertyTypes = new String[]{"DevelopmentSite", "House", "VacantLand"};
        PropertySearchRequest.Locations locations = new PropertySearchRequest.Locations();
            locations.state = "NSW";
            locations.region = "Sydney Region";
            locations.area = "Blue Mountains & Surrounds";
        propertySearchRequest.locations = new PropertySearchRequest.Locations[]{locations};
        searchJson = new SearchLocations().NSW(propertySearchRequest);
        searchJson.page = 1;
        getDomainAuth();
        getDomainListing();
        addPlanningPortalAddress();
        addPlanningPortalZone();
        propertyListingsComplete = propertyListings;
        int i = 1;
        while (propertyListings != null && propertyListings.length >= 200) {
            i++;
            searchJson.page = i;
            getDomainListing();
            if (propertyListings != null) {
                propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
            }        
        }
        addPlanningPortalAddress();
        addPlanningPortalZone();
        filterProperties();
        saveDatabasePoint();
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
        propertyListingsComplete = planningPortalAddressSearch.getFormattedAddress(propertyListingsComplete);
    }

    private void addPlanningPortalZone() throws Exception {
        PlanningPortalZoneSearch planningPortalZoneSearch = new PlanningPortalZoneSearch();
        propertyListingsComplete = planningPortalZoneSearch.getPlanningZone(propertyListingsComplete);
    }

    private void filterProperties() {
        FilterProperties filterProperties = new FilterProperties();
        propertyListingsComplete = filterProperties.filterProperties(propertyListingsComplete);
    }
    
    private void saveDatabasePoint() throws Exception {
        DatabaseStorage databaseStorageSave = new DatabaseStorage();
        databaseStorageSave.save(propertyListingsComplete);
    }

    private void sendEmailNotifications() throws Exception {
        EmailNotification emailNotification = new EmailNotification();
        emailNotification.sendEmailNotification(propertyListingsComplete);
    }
}
