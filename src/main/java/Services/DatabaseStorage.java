package Services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import Models.PropertyListing;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;

public class DatabaseStorage implements IDatabaseStorage {

    private DatabaseReference mDatabaseReference; // Firebase database reference

    @Override
    public void save(PropertyListing[] propertyListings) throws Exception {
        if (propertyListings != null && propertyListings.length > 0) {
            System.out.println(System.getenv().get("GOOGLE_APPLICATION_CREDENTIALS"));
            FileInputStream serviceAccount =
                    new FileInputStream(System.getenv().get("GOOGLE_APPLICATION_CREDENTIALS"));
                    
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://propertyfinder-d2752.firebaseio.com")
                    .build();

            // Initialize the default app
            FirebaseApp defaultApp = FirebaseApp.initializeApp(options);

            mDatabaseReference = FirebaseDatabase.getInstance().getReference("propertyListings");
            Map<String, PropertyListing> properties = new HashMap<>();
            for (int i = 0; i < propertyListings.length; i++) {
                properties.put(propertyListings[i].planningPortalPropId, propertyListings[i]);
            }
            mDatabaseReference.setValue(properties, new DatabaseReference.CompletionListener() {
                @Override
                public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                    if (databaseError != null) {
                        System.out.println("Data could not be saved " + databaseError.getMessage());
                    } else {
                        System.out.println("Data saved successfully.");
                    }
                }
            });
            Thread.sleep(5000);
            System.out.println("Firebase Exit");
        }
    }

}