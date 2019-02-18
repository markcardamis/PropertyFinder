package Services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Models.PropertyListing;
import Tools.HttpMethod;
import Tools.IServiceHelper;
import Tools.ServiceHelper;

public class EmailNotification implements IEmailNotification {
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public EmailNotification() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public void sendEmailNotification(PropertyListing[] propertyListings) throws Exception{

        //Get Zapier Address
        if (propertyListings.length > 0){
            String urlZapier = "https://hooks.zapier.com/hooks/catch/2158632/q6uhmo/";
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(propertyListings);
            mServiceHelper.callHTTPService(urlZapier,
                        HttpMethod.POST, json, false, "");

        }
    }

}
