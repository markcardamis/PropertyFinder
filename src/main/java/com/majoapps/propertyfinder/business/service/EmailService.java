package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.PropertyListing;
import com.majoapps.propertyfinder.utils.KeywordExists;
import com.majoapps.propertyfinder.utils.StringCheck;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class EmailService implements IEmailService {

    @Override
    public void sendEmailNotification(PropertyListing[] propertyListings) throws Exception {

        //Send to Send Grid
        if (propertyListings != null && propertyListings.length > 0) {

            String[] postcodes = new String[]{"2785", "2784", "2783", "2782", "2780", "2779", "2778", "2777",
                    "2776", "2774", "2773"}; // Only email properties in Blue Mountains
            KeywordExists keywordExists = new KeywordExists();

            for (int i = 0; i < propertyListings.length; i++) {
                boolean blueMountains = (keywordExists.isKeywordPresent(propertyListings[i].postCode, postcodes));

                if (propertyListings[i].selectionReason != null && blueMountains) {
                    String json = "Price: " + StringCheck.isNotNullOrEmpty(propertyListings[i].price, "") + "\n" +
                            "Zone: " + StringCheck.isNotNullOrEmpty(propertyListings[i].zone, "") + "\n" +
                            "FSR: " + propertyListings[i].fsr + "\n" +
                            "PricePerSquareMeter: " + propertyListings[i].pricePerSquareMeter + "\n" +
                            "PriceInteger: " + propertyListings[i].priceInteger + "\n" +
                            "Area: " + propertyListings[i].area + "\n" +
                            "Domain Listed Address: " + StringCheck.isNotNullOrEmpty(propertyListings[i].address, "") + "\n" +
                            "Planning Portal Address: " + StringCheck.isNotNullOrEmpty(propertyListings[i].planningPortalAddress, "") + "\n" +
                            "Domain URL: " + StringCheck.isNotNullOrEmpty(propertyListings[i].listingURL, "") + "\n" +
                            "Land Checker URL: " + StringCheck.isNotNullOrEmpty(propertyListings[i].landCheckerURL, "") + "\n" +
                            "Price Checker URL: " + StringCheck.isNotNullOrEmpty(propertyListings[i].priceCheckerURL, "") + "\n" +
                            "Selection Reason: " + StringCheck.isNotNullOrEmpty(propertyListings[i].selectionReason, "") + "\n" +
                            "Summary: " + StringCheck.isNotNullOrEmpty(propertyListings[i].summaryDescription, "");

                    Email from = new Email("noreply@majoapps.com");
                    String subject = "Re: Domain Trigger " + propertyListings[i].address;
                    Email to = new Email("markncardamis@gmail.com");
                    Content content = new Content("text/plain", json);
                    Mail mail = new Mail(from, subject, to, content);

                    SendGrid sg = new SendGrid(System.getenv().get("SENDGRID_API"));
                    if (StringCheck.isNotNullOrEmpty(propertyListings[i].planningPortalPropId)) {
                        sg.addRequestHeader("In-Reply-To",propertyListings[i].planningPortalPropId);
                    }
                    Request request = new Request();

                    request.setMethod(Method.POST);
                    request.setEndpoint("mail/send");
                    request.setBody(mail.build());
                    Response response = sg.api(request);
                    log.info("Email send status code {}", response.getStatusCode());
                }
            }
        }
    }

}
