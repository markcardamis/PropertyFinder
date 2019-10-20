package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.DomainTokenAuthResponse;
import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.business.domain.PropertySearchCommercialRequest;
import com.majoapps.propertyfinder.business.domain.PropertySearchRequest;
import com.majoapps.propertyfinder.data.repository.DatabaseStorage;
import com.majoapps.propertyfinder.utils.DateHelper;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Component
public class DailyPropertyScan {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    private static final DateHelper dateHelper = new DateHelper();

    private String authToken = "";
    private PropertyListing[] propertyListings = null;
    private PropertyListing[] propertyListingsComplete = null;
    private PropertySearchRequest searchJson;
    private PropertySearchCommercialRequest searchJsonCommercial;
    private Integer domainKey = 0;
    private Integer domainSearchCount = 0;
    private String[] authKey = {
            System.getenv().get("DOMAIN_KEY_0"),
            System.getenv().get("DOMAIN_KEY_1"),
            System.getenv().get("DOMAIN_KEY_2"),
            System.getenv().get("DOMAIN_KEY_3"),
            System.getenv().get("DOMAIN_KEY_4"),
            System.getenv().get("DOMAIN_KEY_5")
    };

    @Scheduled(fixedRate = 3600000L) // Run every hour
    public void getListingsNSW() throws Exception {

        log.info("The time is now {}", dateFormat.format(new Date()));
        if (dateHelper.isBusinessDay()) {
            domainKey = 0;
            getListingsResidentialNSW();
            getListingsCommercialNSW();
            propertyListingsComplete = addPlanningPortalAddress(propertyListingsComplete);
            propertyListingsComplete = addPlanningPortalZone(propertyListingsComplete);
            propertyListingsComplete = addLandValue(propertyListingsComplete);
            propertyListingsComplete = filterProperties(propertyListingsComplete);
            saveDatabasePoint(propertyListingsComplete);
            sendEmailNotifications(propertyListingsComplete);
        }
    }

    private void getListingsResidentialNSW() throws Exception {
        Integer price;
        Integer priceStart = 100000;
        Integer priceIncrementAmount;
        Integer priceIncrementAmountSmall = 40000;
        Integer priceIncrementAmountSmallSydney = 100000;
        Integer priceIncrementAmountSmallRegional = 20000;
        Integer priceIncrementAmountMedium = 200000;
        Integer priceIncrementAmountLarge = 1000000;
        Integer priceStop = 5000000;
        Integer minLandSize = 400;
        String[] propertyTypes = new String[]{"DevelopmentSite", "House", "NewLand", "VacantLand"};

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
                {sydneyRegion};

        for (int k = 0; k < locations.length; k++) {
            System.out.println("Location " + locations[k].region);
            PropertySearchRequest propertySearchRequest = new PropertySearchRequest();
            price = priceStart;

            while (price <= priceStop) {
                if (price < 1000000 && locations[k].region.equals(regionalNSW.region)) {
                    priceIncrementAmount = priceIncrementAmountSmallRegional;
                } else if (price < 1000000 && locations[k].region.equals(sydneyRegion.region)) {
                    priceIncrementAmount = priceIncrementAmountSmallSydney;
                } else if (price < 1000000) {
                    priceIncrementAmount = priceIncrementAmountSmall;
                } else if (price < 2000000){
                    priceIncrementAmount = priceIncrementAmountMedium;
                } else {
                    priceIncrementAmount = priceIncrementAmountLarge;
                }
                propertySearchRequest.minPrice = price;
                propertySearchRequest.maxPrice = price + priceIncrementAmount;
                propertySearchRequest.minLandArea = minLandSize;
                propertySearchRequest.propertyTypes = propertyTypes;
                propertySearchRequest.locations = new PropertySearchRequest.Locations[]{locations[k]};
                propertySearchRequest.page = 1;
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

                if (propertyListingsComplete == null && propertyListings != null) {
                    System.out.println(price + " Pages 1 " + propertyListings.length);
                    propertyListingsComplete = propertyListings;
                } else if (propertyListings != null && propertyListings.length > 0){
                    System.out.println(price + " Pages 1 " + propertyListings.length);
                    propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
                }
                int i = 1;
                while (propertyListings != null && propertyListings.length >= 200) {
                    i++;
                    propertySearchRequest.page = i;
                    propertyListings = getDomainListing();
                    if (propertyListings != null) {
                        System.out.println(price + " Pages " + i + " " + propertyListings.length);
                        propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
                    }
                }
                price += priceIncrementAmount;
            }
        }

        if (propertyListingsComplete != null) {
            System.out.println("Residential property listings complete " + propertyListingsComplete.length);
        }
    }

    public void getListingsCommercialNSW() throws Exception {

        searchJsonCommercial = new PropertySearchCommercialRequest();
        searchJsonCommercial.searchMode = "forSale";
        PropertySearchCommercialRequest.PriceSearch priceSearch = new PropertySearchCommercialRequest.PriceSearch();
        priceSearch.min = 100000;
        priceSearch.max = 5000000;
        priceSearch.type = "totalAmount";
        searchJsonCommercial.price = priceSearch;
        searchJsonCommercial.propertyTypes = new String[]{
                "blockOfUnits",
                "developmentLand",
                "developmentSite",
                "newLand",
                "propertyRealEstate",
                "vacantLand"
        };
        searchJsonCommercial.landAreaMin = 100;
        searchJsonCommercial.pageSize = 200;
        PropertySearchCommercialRequest.LocationSearch sydneyRegion = new PropertySearchCommercialRequest.LocationSearch();
        sydneyRegion.state = "NSW";
        sydneyRegion.region = "Sydney Region";
        PropertySearchCommercialRequest.LocationSearch regionalNSW = new PropertySearchCommercialRequest.LocationSearch();
        regionalNSW.state = "NSW";
        regionalNSW.region = "Regional NSW";
        PropertySearchCommercialRequest.LocationSearch illawarraSouthCoast = new PropertySearchCommercialRequest.LocationSearch();
        illawarraSouthCoast.state = "NSW";
        illawarraSouthCoast.region = "Illawarra & South Coast";
        PropertySearchCommercialRequest.LocationSearch hunterCentralNorthCoasts = new PropertySearchCommercialRequest.LocationSearch();
        hunterCentralNorthCoasts.state = "NSW";
        hunterCentralNorthCoasts.region = "Hunter, Central & North Coasts";
        PropertySearchCommercialRequest.LocationSearch[] locations = new PropertySearchCommercialRequest.LocationSearch[]
                {sydneyRegion};

        for (int k = 0; k < locations.length; k++) {
            System.out.println("Location " + locations[k].region);
            searchJsonCommercial.locations = new PropertySearchCommercialRequest.LocationSearch[]{locations[k]};
            searchJsonCommercial.page = 1;
            getDomainAuth(domainKey);
            getDomainListingCommercial();
            if (propertyListingsComplete == null && propertyListings != null) {
                propertyListingsComplete = propertyListings;
            } else if (propertyListings != null && propertyListings.length > 0) {
                propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);

            }
            int i = 1;
            while (propertyListings != null && propertyListings.length >= 200) {
                i++;
                searchJsonCommercial.page = i;
                getDomainListingCommercial();
                if (propertyListings != null && propertyListings.length > 0) {
                    propertyListingsComplete = ArrayUtils.insert(0, propertyListingsComplete, propertyListings);
                }
            }
        }

        if (propertyListingsComplete != null) {
            System.out.println("Commercial property listings complete " + propertyListingsComplete.length);
        }
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

    private void getDomainListingCommercial() throws Exception {
        DomainListing domainListing = new DomainListing();
        propertyListings = domainListing.getPropertyList(authToken, searchJsonCommercial);
        domainSearchCount++;
    }

    private PropertyListing[] addPlanningPortalAddress(PropertyListing[] pListings) throws Exception {
        PlanningPortalAddressSearch planningPortalAddressSearch = new PlanningPortalAddressSearch();
        return (planningPortalAddressSearch.getFormattedAddressMultiThreaded(pListings));
    }

    private PropertyListing[] addPlanningPortalZone(PropertyListing[] pListings) throws Exception {
        PlanningPortalZoneSearch planningPortalZoneSearch = new PlanningPortalZoneSearch();
        return (planningPortalZoneSearch.getPlanningZoneMultiThreaded(pListings));
    }

    private PropertyListing[] addLandValue(PropertyListing[] pListings) throws Exception {
        LandValueSearch landValueSearch = new LandValueSearch();
        return (landValueSearch.getLandValue(pListings));
    }

    private PropertyListing[] filterProperties(PropertyListing[] pListings) {
        FilterProperties filterProperties = new FilterProperties();
        return (filterProperties.filterProperties(pListings));
    }

    private void saveDatabasePoint(PropertyListing[] pListings) throws Exception {
        DatabaseStorage databaseStorageSave = new DatabaseStorage();
        databaseStorageSave.save(pListings);
    }

    private void sendEmailNotifications(PropertyListing[] pListings) throws Exception{
        EmailService emailService = new EmailService();
        emailService.sendEmailNotification(pListings);
    }

}