package Services;

import Models.PropertyListing;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Base64;

public class DatabaseStorage implements IDatabaseStorage {

    private DatabaseReference mDatabaseReference; // Firebase database reference

    @Override
    public void save(PropertyListing[] propertyListings) throws Exception {
        if (propertyListings != null && propertyListings.length > 0) {

            String jsonString = System.getenv().get("FIREBASE_AUTH");
            byte[] decoded = Base64.getDecoder().decode(jsonString);
            InputStream serviceAccount =  new ByteArrayInputStream(decoded);

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(System.getenv().get("DATABASE_URL"))
                    .build();

            // Initialize the default app
            FirebaseApp firebaseApp = null;
            List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
            if(firebaseApps!=null && !firebaseApps.isEmpty()){
                for(FirebaseApp app : firebaseApps){
                    if(app.getName().equals(FirebaseApp.DEFAULT_APP_NAME))
                        firebaseApp = app;
                }
            }
            else {
                firebaseApp = FirebaseApp.initializeApp(options);
            }

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
            
            System.out.println("Firebase Exit");
        }
    }

}