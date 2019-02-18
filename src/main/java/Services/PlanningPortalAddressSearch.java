package Services;

import com.google.gson.Gson;
import Models.PlanningPortalAddressResponse;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;

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
            String urlPlanningPortal = "https://www.planningportal.nsw.gov.au/xvt-weave/address_poi?q=";
            for (int i = 0; i < propertyListings.length; i++){
                String address = URLEncoder.encode(propertyListings[i].address, "UTF-8");
                String responseJson = mServiceHelper.callHTTPService(urlPlanningPortal+address,
                        HttpMethod.GET, "", false, "");
                Gson gson = new Gson();
                PlanningPortalAddressResponse[] planningPortalAddressResponses = gson.fromJson(responseJson, PlanningPortalAddressResponse[].class);
                propertyListings[i].planningPortalURL = planningPortalAddressResponses[0].value;
                System.out.println("PlanningPortalAddress " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
            }
        }
        return propertyListings;
    }

}
