package com.majoapps.propertyfinder.business.service;

import com.google.gson.Gson;
import com.majoapps.propertyfinder.business.domain.PlanningPortalZoneResponse;
import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.utils.HttpMethod;
import com.majoapps.propertyfinder.utils.IServiceHelper;
import com.majoapps.propertyfinder.utils.ServiceHelper;
import com.majoapps.propertyfinder.utils.UrlExtensionMethods;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class PlanningPortalZoneSearch implements IPlanningPortalZoneSearch
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();
    private List<PropertyListing> propertyListingArrayList = Collections.synchronizedList(new ArrayList<>());
    private Integer propertyListingLength = 0;
    private long startTime;

    public PlanningPortalZoneSearch() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public PropertyListing[] getPlanningZone(PropertyListing[] propertyListings) throws Exception{

        // Get Planning portal zone info
        if (propertyListings != null && propertyListings.length > 0){

            for (int i = 0; i < propertyListings.length; i++){
                try {
                    propertyListings[i].zone = "0"; // set default values as address is not always found
                    propertyListings[i].lgaName = "0";
                    propertyListings[i].fsr = 0f;

                    if (propertyListings[i].address.toLowerCase().contains("lot")) { // lot numbers don't always get correct zone
                        propertyListings[i].zone = "NA";
                    } else if (!propertyListings[i].displayableAddress.toLowerCase().matches(".*\\d.*")) { // agents don't always include address
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
                            if (planningPortalZoneResponse[j].layerName.equals("Land Zoning")) {
                                propertyListings[i].zone = planningPortalZoneResponse[j].results[0].Zone;
                                propertyListings[i].lgaName =
                                        planningPortalZoneResponse[j].results[0].LGA_Name;
                            } else if (planningPortalZoneResponse[j].layerName.equals("Floor Space Ratio (n:1)")){
                                propertyListings[i].fsr =
                                        Float.valueOf(planningPortalZoneResponse[j].results[0].Floor_Space_Ratio);
                            } else if (planningPortalZoneResponse[j].layerName.equals("Minimum Lot Size")){
                                propertyListings[i].minimumLotSize =
                                        planningPortalZoneResponse[j].results[0].title.replaceAll("\\D", "");
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                System.out.println("PlanningPortalZone " + propertyListings[i].zone + " " + String.valueOf(i+1) + "/" + String.valueOf(propertyListings.length));
            }
        }
        return propertyListings;
    }


    @Override
    public PropertyListing[] getPlanningZoneMultiThreaded(PropertyListing[] propertyListings) throws Exception{

        ExecutorService executor = Executors.newFixedThreadPool(15);
        startTime = System.currentTimeMillis();

        // Get Planning portal zone info
        if (propertyListings != null && propertyListings.length > 0){

            propertyListingLength = propertyListings.length;
            for (int j = 0; j < propertyListingLength; j++) {

                Runnable worker = new MyRunnable(propertyListings[j]);
                executor.execute(worker);
            }
            executor.shutdown();
            // Wait until all threads are finish
            while (!executor.isTerminated()) {
                //Thread.yield();
            }
            System.out.println("Finished all planning portal zone threads");

        }
        int arraySize = propertyListingArrayList.size();
        propertyListings = propertyListingArrayList.toArray(new PropertyListing[arraySize]);
        return propertyListings;
    }

    private class MyRunnable implements Runnable {
        private final PropertyListing propertyListing;

        MyRunnable(PropertyListing propertyListing) {
            this.propertyListing = propertyListing;
        }

        @Override
        public void run() {
            PlanningPortalZoneSearch planningPortalZoneSearch = null;
            try {
                long sTime = System.currentTimeMillis();
                propertyListing.zone = "0"; // set default values as address is not always found
                propertyListing.lgaName = "0";
                propertyListing.fsr = 0f;

                if (propertyListing.address.toLowerCase().contains("lot")) { // lot numbers don't always get correct zone
                    propertyListing.zone = "NA";
                } else if (!propertyListing.displayableAddress.toLowerCase().matches(".*\\d.*")) { // agents don't always include address
                    propertyListing.zone = "NA";
                } else {
                    String address = "https://api.apps1.nsw.gov.au/planning/viewersf/V1/ePlanningApi/layerintersect";
                    address = UrlExtensionMethods.appendParameter(address, "type", "property");
                    address = UrlExtensionMethods.appendParameter(address, "id", propertyListing.planningPortalPropId);
                    address = UrlExtensionMethods.appendParameter(address, "layers", "epi");

                    String responseJson = mServiceHelper.callHTTPService(address,
                            HttpMethod.GET, "", false, "");
                    Gson gson = new Gson();
                    PlanningPortalZoneResponse[] planningPortalZoneResponse = gson.fromJson(responseJson, PlanningPortalZoneResponse[].class);
                    for (int k = 0; k < planningPortalZoneResponse.length; k++) {
                        if (planningPortalZoneResponse[k].layerName.equals("Land Zoning")) {
                            propertyListing.zone = planningPortalZoneResponse[k].results[0].Zone;
                            propertyListing.lgaName =
                                    planningPortalZoneResponse[k].results[0].LGA_Name;
                        } else if (planningPortalZoneResponse[k].layerName.equals("Floor Space Ratio (n:1)")){
                            propertyListing.fsr =
                                    Float.valueOf(planningPortalZoneResponse[k].results[0].Floor_Space_Ratio);
                        } else if (planningPortalZoneResponse[k].layerName.equals("Minimum Lot Size")){
                            propertyListing.minimumLotSize =
                                    planningPortalZoneResponse[k].results[0].title.replaceAll("\\D", "");
                        }
                    }
                }
                propertyListingArrayList.add(propertyListing);

                System.out.println("PlanningPortalZone " + propertyListing.zone + " " + String.valueOf(propertyListingArrayList.size()) + "/" + String.valueOf(propertyListingLength));
                long endTime = System.currentTimeMillis() - startTime;
                long eTime = System.currentTimeMillis() - sTime;
                System.out.println("RPS " + propertyListingArrayList.size()/(endTime/1000f));
                if (eTime > 2000) {
                    eTime = 2000;
                }
                Thread.sleep(2000-eTime);

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

}
