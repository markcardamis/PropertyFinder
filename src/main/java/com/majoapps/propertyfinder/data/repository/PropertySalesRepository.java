package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertySales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PropertySalesRepository extends JpaRepository<PropertySales, Integer> {
    List<PropertySales> findByPropertyId(Integer propertyId);
    Optional<PropertySales> findFirstByPropertyIdOrderBySettlementDateDesc(Integer propertyId);
    List<PropertySales> findByPropertyIdAndSettlementDateGreaterThanOrderBySettlementDateDesc(
            Integer propertyId, Date settlementDate);
}
