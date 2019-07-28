package Services;

import static java.util.concurrent.Executors.newFixedThreadPool;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutorService;

import com.google.gson.Gson;
import Models.PlanningPortalAddressResponse;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;
import Tools.UrlExtensionMethods;

public class PlanningPortalAddressSearch implements IPlanningPortalAddressSearch
{
    private IServiceHelper mServiceHelper;// = new IServiceHelper();
    private List<PropertyListing> propertyListingArrayList = Collections.synchronizedList(new ArrayList<>());
    private Integer propertyListingLength = 0;
    private long startTime;

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

    @Override
    public PropertyListing[] getFormattedAddressMultiThreaded(PropertyListing[] propertyListings) throws Exception{

        ExecutorService executor = newFixedThreadPool(15);
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

            }
            System.out.println("\nFinished all planning portal address threads");

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
                String address = "https://api.apps1.nsw.gov.au/planning/viewersf/V1/ePlanningApi/address";
                address = UrlExtensionMethods.appendParameter(address, "a", propertyListing.address);
                String responseJson = mServiceHelper.callHTTPService(address,
                        HttpMethod.GET, "", false, "");
                Gson gson = new Gson();
                PlanningPortalAddressResponse[] planningPortalAddressResponses = gson.fromJson(responseJson, PlanningPortalAddressResponse[].class);
                propertyListing.planningPortalPropId = planningPortalAddressResponses[0].propId;
                propertyListing.planningPortalAddress = planningPortalAddressResponses[0].address;

                propertyListingArrayList.add(propertyListing);
                System.out.println("PlanningPortalAddress " + propertyListingArrayList.size() + "/" + propertyListingLength);
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
