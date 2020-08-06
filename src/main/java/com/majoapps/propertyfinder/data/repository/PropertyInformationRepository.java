package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PropertyInformationRepository extends JpaRepository<PropertyInformation, Integer> {

        @Transactional(timeout = 2, readOnly = true)
        @Query(value = "SELECT concat_ws(',', property_id, concat_ws(' ', unit_number, house_number, street_name, suburb_name, post_code)) FROM property_information WHERE to_tsvector('simple', f_concat_ws(' ', unit_number, house_number, street_name, suburb_name, post_code)) @@ to_tsquery('simple', :address) LIMIT 5", nativeQuery = true)
        List<String> findByAddressString(@Param("address") String address);

}
