package Services;

import com.google.gson.Gson;
import Models.PlanningPortalZoneResponse;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;

public class PlanningPortalZoneSearch implements IPlanningPortalZoneSearch
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public PlanningPortalZoneSearch() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public PropertyListing[] getPlanningZone(PropertyListing[] propertyListings) throws Exception{

        // Get Planning portal zone info
        if (propertyListings.length > 0){
            String urlPlanningPortal = "https://www.planningportal.nsw.gov.au/xvt-weave/cadastre/";
            for (int i = 0; i < propertyListings.length; i++){
                try {
                    String address = urlPlanningPortal + propertyListings[i].planningPortalURL + "/land_zoning";
                    String responseJson = mServiceHelper.callHTTPService(address,
                            HttpMethod.GET, "", false, "");
                    Gson gson = new Gson();
                    PlanningPortalZoneResponse planningPortalZoneResponse = gson.fromJson(responseJson, PlanningPortalZoneResponse.class);
                    propertyListings[i].zone = planningPortalZoneResponse.data.results[0].display_content;
                } catch (Exception e) {
                    e.printStackTrace();
                    propertyListings[i].zone = "0";
                }
            }
        }
        return propertyListings;
    }

}
