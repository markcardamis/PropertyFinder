package Services;

import com.google.gson.Gson;
import Models.PropertyListing;
import Models.PropertyListingResponse;
import Models.PropertySearchRequest;
import Tools.HttpMethod;
import Tools.IServiceHelper;
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

        //Get Listing Property
        String urlListings = "https://api.domain.com.au/v1/listings/residential/_search";
        String requestData = new Gson().toJson(request);
        String responseJson = mServiceHelper.callHTTPService(urlListings, HttpMethod.POST, requestData, false, authToken);
        Gson gson = new Gson();
        PropertyListingResponse[] propertyListingResponse = gson.fromJson(responseJson, PropertyListingResponse[].class);
        if (propertyListingResponse.length > 0){
            propertyListings = new PropertyListing[propertyListingResponse.length];
            for (int i = 0; i < propertyListingResponse.length; i++){
                propertyListings[i] = new PropertyListing();
                if (propertyListingResponse[i].type.equals("PropertyListing")) {
                    propertyListings[i].displayableAddress = propertyListingResponse[i].listing.propertyDetails.displayableAddress;
                    propertyListings[i].address = StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.streetNumber, " ") +
                            StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.street, " ") +
                            StringCheck.isNotNullOrEmpty(propertyListingResponse[i].listing.propertyDetails.suburb, " ") +
                            propertyListingResponse[i].listing.propertyDetails.postcode;
                    propertyListings[i].area = propertyListingResponse[i].listing.propertyDetails.landArea;
                    propertyListings[i].postCode = propertyListingResponse[i].listing.propertyDetails.postcode;
                    propertyListings[i].price = propertyListingResponse[i].listing.priceDetails.displayPrice;
                    propertyListings[i].listingURL = "https://www.domain.com.au/" +
                                propertyListingResponse[i].listing.listingSlug;
                    propertyListings[i].summaryDescription = Jsoup.parse(propertyListingResponse[i].listing.summaryDescription.toLowerCase()).text();
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

}
