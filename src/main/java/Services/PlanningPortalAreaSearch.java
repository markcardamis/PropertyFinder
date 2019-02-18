package Services;

import com.google.gson.Gson;
import Models.PlanningPortalAreaResponse;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;

public class PlanningPortalAreaSearch implements IPlanningPortalAreaSearch
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public PlanningPortalAreaSearch() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public PropertyListing[] getAddressArea(PropertyListing[] propertyListings) throws Exception{

        // Get Planning portal zone info
        if (propertyListings.length > 0){
            String urlPlanningPortal = "https://www.planningportal.nsw.gov.au/xvt-weave/cadastre/";
            for (int i = 0; i < propertyListings.length; i++){
                try {
                    String address = urlPlanningPortal + propertyListings[i].planningPortalURL;
                    String responseJson = mServiceHelper.callHTTPService(address,
                            HttpMethod.GET, "", false, "");
                    Gson gson = new Gson();
                    PlanningPortalAreaResponse planningPortalAreaResponse = gson.fromJson(responseJson, PlanningPortalAreaResponse.class);
                    propertyListings[i].area = Math.round(planningPortalAreaResponse.data.area);
                } catch (Exception e) {
                    e.printStackTrace();
                    propertyListings[i].area = 0;
                }
            }
        }
        return propertyListings;
    }

}
