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
    private boolean databaseComplete = false;
    private static int DATABASE_SAVE_TIMEOUT = 60000;

    @Override
    public void save(PropertyListing[] propertyListings) throws Exception {
        databaseComplete = false;
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

            long sTime = System.currentTimeMillis();

            mDatabaseReference.setValue(properties, new DatabaseReference.CompletionListener() {
                @Override
                public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                    if (databaseError != null) {
                        System.out.println("Data could not be saved " + databaseError.getMessage());
                        databaseComplete = true;
                    } else {
                        System.out.println("Data saved successfully.");
                        databaseComplete = true;
                    }
                }
            });

            long eTime = System.currentTimeMillis() - sTime;

            while ((eTime < DATABASE_SAVE_TIMEOUT) && (!databaseComplete)){
                eTime = System.currentTimeMillis() - sTime;
            }
            
            System.out.println("Firebase Exit");
        }
    }

}