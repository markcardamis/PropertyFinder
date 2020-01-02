package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyListingRepository extends JpaRepository<PropertyListing, Integer>, 
        JpaSpecificationExecutor<PropertyListing> {
    List<PropertyListing> findByDomainListingId(Integer domainListingId);
    List<PropertyListing> findByPlanningPortalPropId(String planningPortalPropId);
    
    // @Query("SELECT l FROM location AS l WHERE l.id.user = :user AND within(l.geometry, :filter) = TRUE")
    @Query(value = "SELECT * FROM listing WHERE ST_DWithin( geometry, :location\\:\\:geometry, 100000) LIMIT 100", nativeQuery = true)
    List<PropertyListing> findWithin(@Param("location") String location);

    @Query(value = "SELECT * FROM listing WHERE ST\\_DWithin(geometry, ST\\_Point(-33.865143, 151.209900)\\:\\:geometry, 1000000) LIMIT 100", nativeQuery = true)
    List<PropertyListing> findWithinDefault();
}
