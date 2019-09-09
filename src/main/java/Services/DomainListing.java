package Services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import Models.PropertyListing;
import Models.PropertyListingCommercialResponse;
import Models.PropertyListingResponse;
import Models.PropertySearchCommercialRequest;
import Models.PropertySearchRequest;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.PriceMethods;
import Tools.ServiceHelper;
import Tools.StringCheck;
import org.jsoup.Jsoup;

public class DomainListing implements IDomainListing
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public DomainListing() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public PropertyListing[] getPropertyList(String authToken, PropertySearchRequest request) throws Exception{

        PropertyListing[] propertyListings = null;
        
        SimpleDateFormat ISO_8601_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:sss'Z'", new Locale("AU"));
        String timeDate = ISO_8601_FORMAT.format(new Date());
        
        //Get Listing Property
        String urlListings = "https://api.domain.com.au/v1/listings/residential/_search";
        Gson gsonRequest = new GsonBuilder().disableHtmlEscaping().create();
        String requestData = gsonRequest.toJson(request);
        String responseJson = mServiceHelper.callHTTPService(urlListings, HttpMethod.POST, requestData, false, authToken);
        Gson gson = new Gson();
        PropertyListingResponse[] propertyListingResponse = gson.fromJson(responseJson, PropertyListingResponse[].class);
        if (propertyListingResponse.length > 0){
            propertyListings = new PropertyListing[propertyListingResponse.length];
            for (int i = 0; i < propertyListingResponse.length; i++){
                propertyListings[i] = new PropertyListing();
                if (propertyListingResponse[i].type.equals("PropertyListing")) {
                    propertyListings[i].timeDate = timeDate;
                    propertyListings[i].domainListingId = propertyListingResponse[i].listing.id;
                    propertyListings[i].displayableAddress = propertyListingResponse[i].listing.propertyDetails.displayableAddress;
                    propertyListings[i].address = StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.streetNumber, " ") +
                            StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.street, " ").toUpperCase(Locale.ENGLISH) +
                            StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.suburb, " ").toUpperCase(Locale.ENGLISH) +
                            propertyListingResponse[i].listing.propertyDetails.postcode;
                    propertyListings[i].priceCheckerURL = StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.streetNumber, " ") +
                            StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.street, ", ") +
                            StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.suburb, "");
                    propertyListings[i].area = propertyListingResponse[i].listing.propertyDetails.landArea;
                    propertyListings[i].postCode = propertyListingResponse[i].listing.propertyDetails.postcode;
                    propertyListings[i].price = propertyListingResponse[i].listing.priceDetails.displayPrice;
                    propertyListings[i].listingURL = "https://www.domain.com.au/" +
                                propertyListingResponse[i].listing.listingSlug;
                    propertyListings[i].summaryDescription = Jsoup.parse(propertyListingResponse[i].listing.summaryDescription.toLowerCase()).text();
                    propertyListings[i].lat = propertyListingResponse[i].listing.propertyDetails.latitude;
                    propertyListings[i].lng = propertyListingResponse[i].listing.propertyDetails.longitude;
                } else {
                    propertyListings[i].displayableAddress = "1 Sydney St, Sydney NSW";
                    propertyListings[i].address = "1 Sydney St SYDNEY 2000";
                    propertyListings[i].area = 1;
                    propertyListings[i].postCode = "2000";
                    propertyListings[i].price = "$2000000";
                    propertyListings[i].listingURL = "https://www.domain.com.au/";
                    propertyListings[i].summaryDescription = "Fake Address";
                }
            }
        }
        return propertyListings;
    }

    @Override
    public PropertyListing[] getPropertyList(String authToken, PropertySearchCommercialRequest request) throws Exception{

        PropertyListing[] propertyListings = null;

        SimpleDateFormat ISO_8601_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:sss'Z'", new Locale("AU"));
        String timeDate = ISO_8601_FORMAT.format(new Date());

        //Get Listing Property
        String urlListings = "https://api.domain.com.au/v1/listings/commercial/_search";
        Gson gsonRequest = new GsonBuilder().disableHtmlEscaping().create();
        String requestData = gsonRequest.toJson(request);
        String responseJson = mServiceHelper.callHTTPService(urlListings, HttpMethod.POST, requestData, false, authToken);
        Gson gson = new Gson();
        PropertyListingCommercialResponse[] propertyListingResponse = gson.fromJson(responseJson, PropertyListingCommercialResponse[].class);
        if (propertyListingResponse.length > 0){
            propertyListings = new PropertyListing[propertyListingResponse.length];
            for (int i = 0; i < propertyListingResponse.length; i++){
                propertyListings[i] = new PropertyListing();
                propertyListings[i].timeDate = timeDate;
                propertyListings[i].domainListingId = propertyListingResponse[i].id;
                propertyListings[i].displayableAddress = propertyListingResponse[i].address;
                propertyListings[i].address = StringCheck.isNotNullOrEmpty(propertyListingResponse[i].metadata.addressComponents.streetNumber, " ") +
                        StringCheck.isNotNullOrEmpty(propertyListingResponse[i].metadata.addressComponents.street, " ").toUpperCase(Locale.ENGLISH) +
                        StringCheck.isNotNullOrEmpty(propertyListingResponse[i].metadata.addressComponents.suburb, " ").toUpperCase(Locale.ENGLISH) +
                        propertyListingResponse[i].metadata.addressComponents.postcode;
                propertyListings[i].priceCheckerURL = StringCheck.isNotNullOrEmpty(propertyListingResponse[i].metadata.addressComponents.streetNumber, " ") +
                        StringCheck.isNotNullOrEmpty(propertyListingResponse[i].metadata.addressComponents.street, ", ") +
                        StringCheck.isNotNullOrEmpty(propertyListingResponse[i].metadata.addressComponents.suburb, "");
                propertyListings[i].area = PriceMethods.convertStringToInteger(propertyListingResponse[i].propertyArea);
                propertyListings[i].postCode = propertyListingResponse[i].metadata.addressComponents.postcode;
                propertyListings[i].price = propertyListingResponse[i].price;
                propertyListings[i].listingURL = propertyListingResponse[i].ad.url;
                propertyListings[i].summaryDescription = propertyListingResponse[i].headline;
                propertyListings[i].lat = propertyListingResponse[i].geoLocation.latitude;
                propertyListings[i].lng = propertyListingResponse[i].geoLocation.longitude;
            }
        }
        return propertyListings;
    }

}
