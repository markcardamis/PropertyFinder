
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


    public void getListings() throws Exception{
        getDomainAuth();
        // getDomainListing();
        // addPlanningPortalAddress();
        // addPlanningPortalZone();
        // addPlanningPortalArea();
        // filterProperties();
        // sendEmailNotifications();
    }

    private void getDomainAuth() throws Exception {
        String authKey = System.getenv().get("authKey");
        DomainAuthentication domainAuthentication = new DomainAuthentication();
        DomainTokenAuthResponse domainTokenAuthResponse = domainAuthentication.getAuthToken(authKey);
        authToken = domainTokenAuthResponse.access_token;
        System.out.println("authToken " + authToken);
    }

    private void getDomainListing() throws Exception {
        localDate = LocalDate.now();
        DomainListing domainListing = new DomainListing();
        propertyListings = domainListing.getPropertyList(authToken, searchJson);
        System.out.println("propertyListings " + propertyListings.toString());
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
