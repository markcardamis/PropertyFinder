package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.data.entity.PropertySales;
import com.majoapps.propertyfinder.data.repository.PropertySalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PropertySalesService {

    private final PropertySalesRepository propertySalesRepository;

    @Autowired
    public PropertySalesService(PropertySalesRepository propertySalesRepository) {
        this.propertySalesRepository = propertySalesRepository;
    }

    public List<PropertySales> getPropertySales(Integer propertyId) {
        Objects.requireNonNull(propertyId);
        List<PropertySales> propertySalesArrayList = new ArrayList<>();
        Iterable<PropertySales> results = this.propertySalesRepository.findByPropertyId(propertyId);
        results.forEach(propertySalesArrayList::add);
        return propertySalesArrayList;
    }

}
