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
    PropertySearchRequest searchJson;
    Integer domainKey = 0;
    Integer domainSearchCount = 0;
    String[] authKey = {
        System.getenv().get("DOMAIN_KEY_0"),
        System.getenv().get("DOMAIN_KEY_1"),
        System.getenv().get("DOMAIN_KEY_2"),
        System.getenv().get("DOMAIN_KEY_3"),
        System.getenv().get("DOMAIN_KEY_4"),
    };

    public void getListingsNSW(Integer key) throws Exception {
        if (key != null){
            domainKey = key;
        }
        PropertyListing[] propertyListings = null;
        PropertyListing[] propertyListingsComplete = null;
        Integer price;
        Integer priceStart = 100000;
        Integer priceIncrementAmount = 40000;
        Integer priceStop = 2500000;
        Integer minLandSize = 400;
        String[] propertyTypes = new String[]{"DevelopmentSite", "House", "VacantLand"};

        getDomainAuth(domainKey);
        System.out.println("Get Domain Key " + domainKey);

        PropertySearchRequest.Locations sydneyRegion = new PropertySearchRequest.Locations();
            sydneyRegion.state = "NSW";
            sydneyRegion.region = "Sydney Region";
        PropertySearchRequest.Locations illawarraSouthCoast = new PropertySearchRequest.Locations();
            illawarraSouthCoast.state = "NSW";
            illawarraSouthCoast.region = "Illawarra & South Coast";
        PropertySearchRequest.Locations hunterCentralNorthCoasts = new PropertySearchRequest.Locations();
            hunterCentralNorthCoasts.state = "NSW";
            hunterCentralNorthCoasts.region = "Hunter, Central & North Coasts";
        PropertySearchRequest.Locations regionalNSW = new PropertySearchRequest.Locations();
            regionalNSW.state = "NSW";
            regionalNSW.region = "Regional NSW";
        PropertySearchRequest.Locations[] locations = new PropertySearchRequest.Locations[]
                {sydneyRegion, illawarraSouthCoast, hunterCentralNorthCoasts};
                
        for (int k = 0; k < locations.length; k++) {
            PropertySearchRequest propertySearchRequest = new PropertySearchRequest();
            price = priceStart;
        
            while (price <= priceStop) {
                propertySearchRequest.minPrice = price;
                propertySearchRequest.maxPrice = price + priceIncrementAmount;
                propertySearchRequest.minLandArea = minLandSize;
                propertySearchRequest.propertyTypes = propertyTypes;
                propertySearchRequest.locations = new PropertySearchRequest.Locations[]{locations[k]};
                searchJson = new SearchLocations().NSW(propertySearchRequest);
                searchJson.page = 1;
                if (domainSearchCount <= 450) {
                    propertyListings = getDomainListing();
                } else {
                    domainKey++;
                    if (domainKey >= authKey.length){
                        domainKey = 1;
                    }
                    System.out.println("Domain Key " + domainKey);
                    getDomainAuth(domainKey);
                    domainSearchCount = 0;
                    propertyListings = getDomainListing();
                }
                System.out.println(price + " Pages 1 " + propertyListings.length);
                if (propertyListingsComplete == null) {
                    propertyListingsComplete = propertyListings;
                } else if (propertyListings.length > 0){
                    propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
                }
                int i = 1;
                while (propertyListings != null && propertyListings.length >= 200) {
                    i++;
                    searchJson.page = i;
                    propertyListings = getDomainListing();
                    if (propertyListings != null) {
                        System.out.println(price + " Pages " + i + " " + propertyListings.length);
                        propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
                    }
                }
                price += priceIncrementAmount;
            }
        }
        
        System.out.println("Property listings complete " + propertyListingsComplete.length);
        propertyListingsComplete = addPlanningPortalAddress(propertyListingsComplete);
        propertyListingsComplete = addPlanningPortalZone(propertyListingsComplete);
        System.out.println("Portal complete");
        propertyListingsComplete = filterProperties(propertyListingsComplete);
        System.out.println("Filter complete");
        saveDatabasePoint(propertyListingsComplete);
        System.out.println("Database complete");
        sendEmailNotifications(propertyListingsComplete);
        System.out.println("Email complete");
    }

    private void getDomainAuth(Integer key) throws Exception {
        DomainAuthentication domainAuthentication = new DomainAuthentication();
        DomainTokenAuthResponse domainTokenAuthResponse = domainAuthentication.getAuthToken(authKey[key]);
        authToken = domainTokenAuthResponse.access_token;
    }

    private PropertyListing[] getDomainListing() throws Exception {
        DomainListing domainListing = new DomainListing();
        domainSearchCount++;
        return (domainListing.getPropertyList(authToken, searchJson));
    }

    private PropertyListing[] addPlanningPortalAddress(PropertyListing[] pListings) throws Exception {
        PlanningPortalAddressSearch planningPortalAddressSearch = new PlanningPortalAddressSearch();
        return (planningPortalAddressSearch.getFormattedAddressMultiThreaded(pListings));
    }

    private PropertyListing[] addPlanningPortalZone(PropertyListing[] pListings) throws Exception {
        PlanningPortalZoneSearch planningPortalZoneSearch = new PlanningPortalZoneSearch();
        return (planningPortalZoneSearch.getPlanningZoneMultiThreaded(pListings));
    }

    private PropertyListing[] filterProperties(PropertyListing[] pListings) {
        FilterProperties filterProperties = new FilterProperties();
        return (filterProperties.filterProperties(pListings));
    }
    
    private void saveDatabasePoint(PropertyListing[] pListings) throws Exception {
        DatabaseStorage databaseStorageSave = new DatabaseStorage();
        databaseStorageSave.save(pListings);
    }

    private void sendEmailNotifications(PropertyListing[] pListings) throws Exception {
        EmailNotification emailNotification = new EmailNotification();
        emailNotification.sendEmailNotification(pListings);
    }

}
