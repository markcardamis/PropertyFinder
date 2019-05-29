package Services;

import com.google.gson.Gson;
import Models.PlanningPortalZoneResponse;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;
import Tools.UrlExtensionMethods;

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

            for (int i = 0; i < propertyListings.length; i++){
                try {
                    propertyListings[i].zone = "0"; // set default values as address is not always found
                    propertyListings[i].lgaName = "0";
                    propertyListings[i].fsr = 0f;

                    if (propertyListings[i].address.toLowerCase().contains("lot")) { // lot numbers don't always get correct zone
                        propertyListings[i].zone = "NA";
                    } else {
                        String address = "https://api.apps1.nsw.gov.au/planning/viewersf/V1/ePlanningApi/layerintersect";
                        address = UrlExtensionMethods.appendParameter(address, "type", "property");
                        address = UrlExtensionMethods.appendParameter(address, "id", propertyListings[i].planningPortalPropId);
                        address = UrlExtensionMethods.appendParameter(address, "layers", "epi");

                        String responseJson = mServiceHelper.callHTTPService(address,
                                HttpMethod.GET, "", false, "");
                        Gson gson = new Gson();
                        PlanningPortalZoneResponse[] planningPortalZoneResponse = gson.fromJson(responseJson, PlanningPortalZoneResponse[].class);
                        for (int j = 0; j < planningPortalZoneResponse.length; j++) {
                            if (planningPortalZoneResponse[j].id.equals("18")) {
                                propertyListings[i].zone = planningPortalZoneResponse[j].results[0].Zone;
                                propertyListings[i].lgaName =
                                        planningPortalZoneResponse[j].results[0].LGA_Name;
                            } else if (planningPortalZoneResponse[j].id.equals("11")){
                                propertyListings[i].fsr =
                                        Float.valueOf(planningPortalZoneResponse[j].results[0].Floor_Space_Ratio);
                            }
                        }
                    }
                } catch (Exception e) {
                    e.getMessage();
                }
                System.out.println("PlanningPortalZone " + propertyListings[i].zone + " " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
            }
        }
        return propertyListings;
    }

}
