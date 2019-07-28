package Services;

import Models.PropertyListing;
import Tools.IServiceHelper;
import Tools.ServiceHelper;
import Tools.StringCheck;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import java.io.IOException;

public class EmailNotification implements IEmailNotification {
    private IServiceHelper mServiceHelper;// = new IServiceHelper();

    public EmailNotification() throws Exception {
        mServiceHelper = new ServiceHelper();
    }

    @Override
    public void sendEmailNotification(PropertyListing[] propertyListings) throws Exception{

        //Send to Send Grid
        if (propertyListings != null && propertyListings.length > 0) {

            for (int i = 0; i < propertyListings.length; i++) {
                if (propertyListings[i].selectionReason != null) {
                    String json = "Price: " + StringCheck.isNotNullOrEmpty(propertyListings[i].price, "") + "\n" +
                            "Zone: " + StringCheck.isNotNullOrEmpty(propertyListings[i].zone, "") + "\n" +
                            "FSR: " + propertyListings[i].fsr + "\n" +
                            "PricePerSquareMeter: " + propertyListings[i].pricePerSquareMeter + "\n" +
                            "PriceInteger: " + propertyListings[i].priceInteger + "\n" +
                            "Area: " + propertyListings[i].area + "\n" +
                            "Domain Listed Address: " + StringCheck.isNotNullOrEmpty(propertyListings[i].address, "") + "\n" +
                            "Planning Portal Address: " + StringCheck.isNotNullOrEmpty(propertyListings[i].planningPortalAddress, "") + "\n" +
                            "URL: " + StringCheck.isNotNullOrEmpty(propertyListings[i].listingURL, "") + "\n" +
                            "Selection Reason: " + StringCheck.isNotNullOrEmpty(propertyListings[i].selectionReason, "") + "\n" +
                            "Summary: " + StringCheck.isNotNullOrEmpty(propertyListings[i].summaryDescription, "");

                    Email from = new Email("noreply@majoapps.com");
                    String subject = "Domain Trigger " + propertyListings[i].address;
                    Email to = new Email("markncardamis@gmail.com");
                    Content content = new Content("text/plain", json);
                    Mail mail = new Mail(from, subject, to, content);

                    SendGrid sg = new SendGrid(System.getenv().get("SENDGRID_API"));
                    if (StringCheck.isNotNullOrEmpty(propertyListings[i].planningPortalPropId)) {
                        sg.addRequestHeader("References", propertyListings[i].planningPortalPropId);
                    }
                    Request request = new Request();

                    request.setMethod(Method.POST);
                    request.setEndpoint("mail/send");
                    request.setBody(mail.build());
                    Response response = sg.api(request);
                    System.out.println(response.getStatusCode());
                }
            }
        }
    }

}
