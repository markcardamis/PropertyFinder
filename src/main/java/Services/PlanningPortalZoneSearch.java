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
        if (propertyListings!= null && propertyListings.length > 0){
            String urlPlanningPortal = "https://www.planningportal.nsw.gov.au/xvt-weave/cadastre/";
            for (int i = 0; i < propertyListings.length; i++){
                try {
                    String address = urlPlanningPortal + propertyListings[i].planningPortalURL + "/land_zoning";
                    String responseJson = mServiceHelper.callHTTPService(address,
                            HttpMethod.GET, "", false, "");
                    Gson gson = new Gson();
                    PlanningPortalZoneResponse planningPortalZoneResponse = gson.fromJson(responseJson, PlanningPortalZoneResponse.class);
                    propertyListings[i].zone = planningPortalZoneResponse.data.results[0].display_content;
                    for (int j = 0; j < planningPortalZoneResponse.data.results[0].attributes.size(); j++) {
                        if (planningPortalZoneResponse.data.results[0].attributes.get(j).id == 10) {
                            propertyListings[i].lgaName =
                                    planningPortalZoneResponse.data.results[0].attributes.get(j).field_value;
                        } else if (planningPortalZoneResponse.data.results[0].attributes.get(j).id == 11 &&
                                planningPortalZoneResponse.data.results[0].attributes.get(j).field_value.matches("\\d+")) {
                            propertyListings[i].lgaCode =
                                    Integer.valueOf(planningPortalZoneResponse.data.results[0].attributes.get(j).field_value);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    propertyListings[i].zone = "0";
                    propertyListings[i].lgaName = "0";
                    propertyListings[i].lgaCode = 0;
                }
                System.out.println("PlanningPortalZone " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
            }
        }
        return propertyListings;
    }

}
