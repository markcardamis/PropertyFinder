
import Models.DomainTokenAuthResponse;
import Models.PropertyListing;
import Services.DomainAuthentication;
import Services.DomainListing;
import Services.EmailNotification;
import Services.FilterProperties;
import Services.PlanningPortalAddressSearch;
import Services.PlanningPortalAreaSearch;
import Services.PlanningPortalZoneSearch;
import java.time.LocalDate;

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


    public void getListings(){
        try {
            getDomainAuth();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Get Domain Auth Exception" + e.getMessage());
        }
        try {
            getDomainListing();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Get Domain Listing Exception" + e.getMessage());
        }
        try {
            addPlanningPortalAddress();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Planning Portal Address Exception " + e.getMessage());
        }
        try {
            addPlanningPortalZone();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Planning Portal Zone Exception " + e.getMessage());
        }
        try {
            addPlanningPortalArea();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Planning Portal Area Exception " + e.getMessage());
        }
        filterProperties();
        try {
            sendEmailNotifications();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Email Exception " + e.getMessage());
        }
    }

    private void getDomainAuth() throws Exception {
        String authKey = System.getenv().get("authKey");
        //     if (authKey == null) {
        //         authKey = Variables.authKey;
        // }
        System.out.println("Auth Key " + authKey);

        DomainAuthentication domainAuthentication = new DomainAuthentication();
        DomainTokenAuthResponse domainTokenAuthResponse = domainAuthentication.getAuthToken(authKey);
        authToken = domainTokenAuthResponse.access_token;
    }

    private void getDomainListing() throws Exception {
        localDate = LocalDate.now();
        System.out.println("Local Date " + localDate);

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
