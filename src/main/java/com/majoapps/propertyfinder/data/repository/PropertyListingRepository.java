package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyListing;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyListingRepository extends JpaRepository<PropertyListing, Integer> {
    List<PropertyListing> findTop100ByOrderByIdAsc();
    List<PropertyListing> findTop1000ByOrderByIdAsc();
    List<PropertyListing> findByDomainListingId(Integer domainListingId);
    List<PropertyListing> findByPlanningPortalPropId(String planningPortalPropId);
}
