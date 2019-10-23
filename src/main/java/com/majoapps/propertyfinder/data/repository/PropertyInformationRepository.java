package com.majoapps.propertyfinder.data.repository;

import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyInformationRepository extends CrudRepository<PropertyInformation, Integer> {
}
