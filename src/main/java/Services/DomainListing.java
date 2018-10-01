package Services;

import com.google.gson.Gson;
import Models.PropertyListing;
import Models.PropertyListingResponse;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;

public class DomainListing implements IDomainListing
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public DomainListing() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public PropertyListing[] getPropertyList(String authToken, String searchJson) throws Exception{

        Integer propertyArrayLength = 0;
        PropertyListing[] propertyListings = null;

        //Get Listing Property
        String urlListings = "https://api.domain.com.au/v1/listings/residential/_search";
        String responseJson = mServiceHelper.callHTTPService(urlListings, HttpMethod.POST, searchJson, false, authToken);
        Gson gson = new Gson();
        PropertyListingResponse[] propertyListingResponse = gson.fromJson(responseJson, PropertyListingResponse[].class);
        propertyArrayLength = propertyListingResponse.length;
        if (propertyArrayLength > 0){
            propertyListings = new PropertyListing[propertyArrayLength];
            for (int i = 0; i < propertyArrayLength; i++){
                propertyListings[i] = new PropertyListing();
                propertyListings[i].address = propertyListingResponse[i].listing.propertyDetails.displayableAddress;
                propertyListings[i].area = propertyListingResponse[i].listing.propertyDetails.landArea;
                propertyListings[i].price = propertyListingResponse[i].listing.priceDetails.displayPrice;
                propertyListings[i].listingURL = "https://www.domain.com.au/" +
                            propertyListingResponse[i].listing.listingSlug;
            }
        }
        return propertyListings;
    }

}
