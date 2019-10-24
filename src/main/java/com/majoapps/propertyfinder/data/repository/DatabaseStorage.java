package com.majoapps.propertyfinder.data.repository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.majoapps.propertyfinder.business.domain.PropertyListing;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SuppressWarnings("unused")
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
                    .setDatabaseUrl(System.getenv().get("FIREBASE_DATABASE_URL"))
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
                        log.warn("Data could not be saved {} ", databaseError.getMessage());
                        databaseComplete = true;
                    } else {
                        log.info("Data saved successfully.");
                        databaseComplete = true;
                    }
                }
            });

            long eTime = System.currentTimeMillis() - sTime;

            while ((eTime < DATABASE_SAVE_TIMEOUT) && (!databaseComplete)){
                eTime = System.currentTimeMillis() - sTime;
                Thread.sleep(1);
            }

            log.debug("Firebase Exit");
        }
    }

    @Override
    public Map<String, PropertyListing> retrieve() throws Exception {
        databaseComplete = false;
        final Map<String, PropertyListing> propertiesRetrieved = new HashMap<>();

        String jsonString = System.getenv().get("FIREBASE_AUTH");
        byte[] decoded = Base64.getDecoder().decode(jsonString);
        InputStream serviceAccount =  new ByteArrayInputStream(decoded);

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl(System.getenv().get("FIREBASE_DATABASE_URL"))
                .build();

        // Initialize the default app
        FirebaseApp defaultApp = FirebaseApp.initializeApp(options);

        mDatabaseReference = FirebaseDatabase.getInstance().getReference("propertyListings");

        long sTime = System.currentTimeMillis();

        mDatabaseReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    PropertyListing data = snapshot.getValue(PropertyListing.class);
                    propertiesRetrieved.put(snapshot.getKey(), data);
                }
                log.info("Data retrieved successfully.");
                databaseComplete = true;
            }

            @Override
            public void onCancelled(DatabaseError error) {
                log.error("Data could not be retrieved {} ", error.getMessage());
                databaseComplete = true;
            }
        });

        long eTime = System.currentTimeMillis() - sTime;

        while ((eTime < DATABASE_SAVE_TIMEOUT) && (!databaseComplete)){
            eTime = System.currentTimeMillis() - sTime;
            Thread.sleep(1);
        }

        log.info("Firebase Exit");

        return propertiesRetrieved;
    }


}