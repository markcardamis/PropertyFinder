package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import java.util.List;

import javax.persistence.TypedQuery;

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
    
    @Query("SELECT l FROM #{#entityName} l WHERE within(l.geometry, :filter) = TRUE")
    List<PropertyListing> findWithin(@Param("filter") Geometry filter, Pageable pageable);

    @Query("SELECT l FROM #{#entityName} l")
    List<PropertyListing> findWithinDefault(Pageable pageable);
}
