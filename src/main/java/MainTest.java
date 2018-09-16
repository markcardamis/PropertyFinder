
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Base64;

import Models.DomainTokenAuthResponse;
import Models.PropertyListing;
import Services.DomainAuthentication;
import Services.DomainListing;
import Services.EmailNotification;
import Services.FilterProperties;
import Services.PlanningPortalAddressSearch;
import Services.PlanningPortalAreaSearch;
import Services.PlanningPortalZoneSearch;

public class MainTest {

    String authToken = "";
    PropertyListing[] propertyListings;
    LocalDate localDate;

    String searchJson = "{" +
            "\"listingType\":\"Sale\"," +
            "\"propertyTypes\":[" +
                "\"DevelopmentSite\", " +
                "\"House\", " +
                "\"VacantLand\" ]," +
            "\"minLandArea\":720, " +
            "\"minPrice\":200000, " +
            "\"maxPrice\": 2000000, " +
            "\"updatedSince\": " + localDate + ", " +
            "\"locations\":[ " +
                "{" +
                "\"state\":\"NSW\", " +
                    "\"region\":\"Sydney Region\", " +
                    "\"area\":\"Blue Mountains & Surrounds\", " +
                    "\"suburb\":\"Katoomba\", " +
                    "\"postCode\":\"2780\", " +
                    "\"includeSurroundingSuburbs\":true " +
                "}" +
            "]}";


    public void getListings() throws Exception{
        getDomainAuth();
        getDomainListing();
        addPlanningPortalAddress();
        addPlanningPortalZone();
        addPlanningPortalArea();
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
        localDate = LocalDate.now();
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

    private void addPlanningPortalArea() throws Exception {
        PlanningPortalAreaSearch planningPortalAreaSearch = new PlanningPortalAreaSearch();
        propertyListings = planningPortalAreaSearch.getAddressArea(propertyListings);
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
