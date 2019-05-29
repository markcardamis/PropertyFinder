package Services;

import com.google.gson.Gson;
import Models.PlanningPortalAddressResponse;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;
import Tools.UrlExtensionMethods;

import java.net.URLEncoder;

public class PlanningPortalAddressSearch implements IPlanningPortalAddressSearch
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public PlanningPortalAddressSearch() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public PropertyListing[] getFormattedAddress(PropertyListing[] propertyListings) throws Exception{

        //Get Planning Portal URL
        if (propertyListings!=null && propertyListings.length > 0){
            for (int i = 0; i < propertyListings.length; i++){
                String address = "https://api.apps1.nsw.gov.au/planning/viewersf/V1/ePlanningApi/address";
                address = UrlExtensionMethods.appendParameter(address, "a", propertyListings[i].address);
                String responseJson = mServiceHelper.callHTTPService(address,
                        HttpMethod.GET, "", false, "");
                Gson gson = new Gson();
                PlanningPortalAddressResponse[] planningPortalAddressResponses = gson.fromJson(responseJson, PlanningPortalAddressResponse[].class);
                propertyListings[i].planningPortalPropId = planningPortalAddressResponses[0].propId;
                propertyListings[i].planningPortalAddress = planningPortalAddressResponses[0].address;

                System.out.println("PlanningPortalAddress " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
            }
        }
        return propertyListings;
    }

}
