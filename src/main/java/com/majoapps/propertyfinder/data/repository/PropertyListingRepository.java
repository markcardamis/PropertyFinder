package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import java.util.List;

import org.locationtech.jts.geom.Geometry;
import org.springframework.data.domain.Pageable;
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
    
    //@Query(value = "SELECT * FROM listing WHERE ST_DWithin(geometry, :location\\:\\:geometry, 100000) ORDER BY ST_Distance(:location\\:\\:geometry, geometry) LIMIT 100", nativeQuery = true)
    // List<PropertyListing> findWithin(@Param("location") Geometry location);
    
    @Query("SELECT l FROM #{#entityName} l WHERE within(l.geometry, :filter) = TRUE ORDER BY distance(l.geometry, :filter) ASC")
    List<PropertyListing> findWithin(@Param("filter") Geometry filter, Pageable pageable);

    @Query(value = "SELECT * FROM listing WHERE ST\\_DWithin(geometry, ST\\_Point(-33.865143, 151.209900)\\:\\:geometry, 1000000) LIMIT 100", nativeQuery = true)
    List<PropertyListing> findWithinDefault(Pageable pageable);
}
