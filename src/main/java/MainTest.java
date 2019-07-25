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
    Integer domainKey = 3;
    Integer domainSearchCount = 0;
    String[] authKey = {
        System.getenv().get("DOMAIN_KEY_0"),
        System.getenv().get("DOMAIN_KEY_1"),
        System.getenv().get("DOMAIN_KEY_2"),
        System.getenv().get("DOMAIN_KEY_3"),
        System.getenv().get("DOMAIN_KEY_4"),
    };

    public void getListingsNSW() throws Exception {
        Integer price = 100000;
        Integer priceIncrementAmount = 10000;
        Integer priceStop = 2000000;
        getDomainAuth(domainKey);
        PropertySearchRequest propertySearchRequest = new PropertySearchRequest();
        while (price < priceStop) {
            propertySearchRequest.minPrice = price;
            propertySearchRequest.maxPrice = price + priceIncrementAmount;
            propertySearchRequest.minLandArea = 400;
            propertySearchRequest.propertyTypes = new String[]{"DevelopmentSite", "House", "VacantLand"};
            PropertySearchRequest.Locations locations = new PropertySearchRequest.Locations();
            locations.state = "NSW";
            propertySearchRequest.locations = new PropertySearchRequest.Locations[]{locations};
            searchJson = new SearchLocations().NSW(propertySearchRequest);
            searchJson.page = 1;
            if (domainSearchCount <= 450) {
                getDomainListing();
            } else {
                domainKey++;
                if (domainKey >= authKey.length){
                    domainKey = 1;
                }
                System.out.println("Domain Key " + domainKey);
                getDomainAuth(domainKey);
                domainSearchCount = 0;
                getDomainListing();
            }
            System.out.println(price + " Pages 1 " + propertyListings.length);
            if (propertyListingsComplete == null) {
                propertyListingsComplete = propertyListings;
            } else {
                propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
            }
            int i = 1;
            while (propertyListings != null && propertyListings.length >= 200) {
                i++;
                searchJson.page = i;
                getDomainListing();
                if (propertyListings != null) {
                    System.out.println(price + " Pages " + i + " " + propertyListings.length);
                    propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
                }
            }
            price += priceIncrementAmount;
        }

        addPlanningPortalAddress();
        addPlanningPortalZone();
        filterProperties();
        saveDatabasePoint();
        sendEmailCompletion();
    }


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
        getDomainAuth(0);
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
        System.out.println("Portal complete");
        filterProperties();
        System.out.println("Filter complete");
        saveDatabasePoint();
        System.out.println("Database complete");
        sendEmailNotifications();
        System.out.println("Email complete");

    }

    private void getDomainAuth(Integer key) throws Exception {
        DomainAuthentication domainAuthentication = new DomainAuthentication();
        DomainTokenAuthResponse domainTokenAuthResponse = domainAuthentication.getAuthToken(authKey[key]);
        authToken = domainTokenAuthResponse.access_token;
    }

    private void getDomainListing() throws Exception {
        DomainListing domainListing = new DomainListing();
        propertyListings = domainListing.getPropertyList(authToken, searchJson);
        domainSearchCount++;
        System.out.println(domainSearchCount);
    }

    private void addPlanningPortalAddress() throws Exception {
        PlanningPortalAddressSearch planningPortalAddressSearch = new PlanningPortalAddressSearch();
        propertyListingsComplete = planningPortalAddressSearch.getFormattedAddressMultiThreaded(propertyListingsComplete);
    }

    private void addPlanningPortalZone() throws Exception {
        PlanningPortalZoneSearch planningPortalZoneSearch = new PlanningPortalZoneSearch();
        propertyListingsComplete = planningPortalZoneSearch.getPlanningZoneMultiThreaded(propertyListingsComplete);
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

    private void sendEmailCompletion() throws Exception {
        PropertyListing completePropertyListing = new PropertyListing();
            completePropertyListing.domainListingId = 12345;
            completePropertyListing.listingURL = "https://www.majoapps.com";
            completePropertyListing.address = "Finished NSW search";
            completePropertyListing.area = 1;
            completePropertyListing.price = "1";
            completePropertyListing.zone = "A1";
            completePropertyListing.lgaName = "TestCouncil";
            completePropertyListing.fsr = 0f;
            completePropertyListing.planningPortalPropId = "12345";
            completePropertyListing.planningPortalAddress = "https://www.majoapps.com";
            completePropertyListing.summaryDescription = "Finished NSW search";
            completePropertyListing.selectionReason = "Finished NSW search";

        EmailNotification emailNotification = new EmailNotification();
        emailNotification.sendEmailNotification(new PropertyListing[]{completePropertyListing});
    }
}
