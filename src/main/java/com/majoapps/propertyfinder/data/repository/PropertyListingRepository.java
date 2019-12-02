package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PropertyListingRepository extends JpaRepository<PropertyListing, Integer> {
    List<PropertyListing> findByDomainListingId(Integer domainListingId);
    List<PropertyListing> findByPlanningPortalPropId(String planningPortalPropId);
}
