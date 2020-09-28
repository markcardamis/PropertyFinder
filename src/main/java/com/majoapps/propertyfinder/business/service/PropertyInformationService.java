package com.majoapps.propertyfinder.business.service;

import com.majoapps.propertyfinder.business.domain.AddressListDTO;
import com.majoapps.propertyfinder.business.domain.PropertyInformationDTO;
import com.majoapps.propertyfinder.business.domain.PropertyInformationDTO.PropertySalesDTO;
import com.majoapps.propertyfinder.business.domain.PropertyInformationDTO.ChartData;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.entity.PropertySales;
import com.majoapps.propertyfinder.data.projection.AddressListView;
import com.majoapps.propertyfinder.data.repository.PropertyInformationRepository;
import com.majoapps.propertyfinder.data.repository.PropertySalesRepository;
import com.majoapps.propertyfinder.exception.ResourceNotFoundException;
import com.majoapps.propertyfinder.web.util.ObjectMapperUtils;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PropertyInformationService {

    private final PropertyInformationRepository propertyInformationRepository;
    private final PropertySalesRepository propertySalesRepository;
    public static final AddressListView NO_ADDRESS_FOUND = new AddressListDTO(0, "no address found",0.0,0.0);
    public static final AddressListView ADDRESS_SEARCH_TIMEOUT = new AddressListDTO(0, "keep typing",0.0,0.0);
    private static final Date yearsBeforeDate = Date.valueOf(LocalDate.now().plusYears(-6)); // last 6 years data

    @Autowired
    public PropertyInformationService(PropertyInformationRepository propertyInformationRepository,
                                      PropertySalesRepository propertySalesRepository) {
        this.propertyInformationRepository = propertyInformationRepository;
        this.propertySalesRepository = propertySalesRepository;
    }

    public List<PropertyInformation> getAllProperties() {
        List<PropertyInformation> properties = new ArrayList<>();
        Iterable<PropertyInformation> results = this.propertyInformationRepository.findAll();
        results.forEach(properties::add);
        return properties;
    }

    public PropertyInformationDTO getPropertyInformation(Integer id) {
        PropertyInformation propertyInformation = this.propertyInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property ID " + id + "not found"));
        PropertyInformationDTO propertyInformationDTO = ObjectMapperUtils.map(propertyInformation, PropertyInformationDTO.class);

        // Get the recent sales data
        List<PropertySales> recentPropertySales = propertySalesRepository.
                findByPropertyIdAndSettlementDateGreaterThanOrderBySettlementDateDesc(id,  yearsBeforeDate);

        // Set the sales and land value data into the ChartData field
        propertyInformationDTO.setChartData(new ChartData(
                ObjectMapperUtils.mapAll(recentPropertySales, PropertySalesDTO.class),
                propertyInformationDTO.getLandValuesList())
        );

        return propertyInformationDTO;
    }

    public List<AddressListView> getByElasticSearch(String address) {
        List<AddressListView> addressListView = new ArrayList<>();
        try {
            Iterable<AddressListView> addressListResults = this.propertyInformationRepository
                    .findByAddressString(address);
            addressListResults.forEach(addressListView::add);
            if (addressListView.size() == 0) {
                addressListView.add(NO_ADDRESS_FOUND);
            }
        } catch (Exception e) {
            addressListView.add(ADDRESS_SEARCH_TIMEOUT);
        }
        return addressListView;
    }

    public ResponseEntity<PropertyInformation> updatePropertyInformation(Integer id, 
            PropertyInformation newAccount) {
        return propertyInformationRepository.findById(id).map(propertyInformation -> {
            propertyInformation.setDistrictCode(newAccount.getDistrictCode());
            propertyInformation.setDistrictName(newAccount.getDistrictName());
            propertyInformation.setPropertyType(newAccount.getPropertyType());
            propertyInformation.setPropertyName(newAccount.getPropertyName());
            propertyInformation.setUnitNumber(newAccount.getUnitNumber());
            propertyInformation.setStreetName(newAccount.getStreetName());
            propertyInformation.setSuburbName(newAccount.getSuburbName());
            propertyInformation.setPostCode(newAccount.getPostCode());
            propertyInformation.setZoneCode(newAccount.getZoneCode());
            propertyInformation.setArea(newAccount.getArea());
            propertyInformation.setAreaType(newAccount.getAreaType());
            propertyInformation.setBaseDate0(newAccount.getBaseDate0());
            propertyInformation.setLandValue0(newAccount.getLandValue0());
            propertyInformation.setAuthority0(newAccount.getAuthority0());
            propertyInformation.setBasis0(newAccount.getBasis0());
            propertyInformation.setBaseDate1(newAccount.getBaseDate1());
            propertyInformation.setLandValue1(newAccount.getLandValue1());
            propertyInformation.setAuthority1(newAccount.getAuthority1());
            propertyInformation.setBasis1(newAccount.getBasis1());
            propertyInformation.setBaseDate2(newAccount.getBaseDate2());
            propertyInformation.setLandValue2(newAccount.getLandValue2());
            propertyInformation.setAuthority2(newAccount.getAuthority2());
            propertyInformation.setBasis2(newAccount.getBasis2());
            propertyInformation.setBaseDate3(newAccount.getBaseDate3());
            propertyInformation.setLandValue3(newAccount.getLandValue3());
            propertyInformation.setAuthority3(newAccount.getAuthority3());
            propertyInformation.setBasis3(newAccount.getBasis3());
            propertyInformation.setBaseDate4(newAccount.getBaseDate4());
            propertyInformation.setLandValue4(newAccount.getLandValue4());
            propertyInformation.setAuthority4(newAccount.getAuthority4());
            propertyInformation.setBasis4(newAccount.getBasis4());
            propertyInformation.setBaseDate5(newAccount.getBaseDate5());
            propertyInformation.setLandValue5(newAccount.getLandValue5());
            propertyInformation.setAuthority5(newAccount.getAuthority5());
            propertyInformation.setBasis5(newAccount.getBasis5());
            propertyInformation.setFloorSpaceRatio(newAccount.getFloorSpaceRatio());
            propertyInformation.setMinimumLotSize(newAccount.getMinimumLotSize());
            propertyInformation.setBuildingHeight(newAccount.getBuildingHeight());
            propertyInformation.setLatitude(newAccount.getLatitude());
            propertyInformation.setLongitude(newAccount.getLongitude());
            propertyInformationRepository.save(propertyInformation);
            return ResponseEntity.ok(propertyInformation);
        }).orElseThrow(() -> new ResourceNotFoundException("Account ID " + id + " not found"));
    }

    public ResponseEntity<PropertyInformation> partialUpdatePropertyInformation(Integer id, 
            PropertyInformation newAccount) {
        return propertyInformationRepository.findById(id).map(propertyInformation -> {
            if(newAccount.getDistrictCode() != 0) 
                propertyInformation.setDistrictCode(newAccount.getDistrictCode());
            if(newAccount.getDistrictName() != null) 
                propertyInformation.setDistrictName(newAccount.getDistrictName());
            if(newAccount.getPropertyType() != null) 
                propertyInformation.setPropertyType(newAccount.getPropertyType());
            if(newAccount.getPropertyName() != null) 
                propertyInformation.setPropertyName(newAccount.getPropertyName());
            if(newAccount.getUnitNumber() != null) 
                propertyInformation.setUnitNumber(newAccount.getUnitNumber());
            if(newAccount.getStreetName() != null) 
                propertyInformation.setStreetName(newAccount.getStreetName());
            if(newAccount.getSuburbName() != null) 
                propertyInformation.setSuburbName(newAccount.getSuburbName());
            if(newAccount.getPostCode() != null) 
                propertyInformation.setPostCode(newAccount.getPostCode());
            if(newAccount.getZoneCode() != null) 
                propertyInformation.setZoneCode(newAccount.getZoneCode());
            if(newAccount.getArea() != null) 
                propertyInformation.setArea(newAccount.getArea());
            if(newAccount.getAreaType() != null) 
                propertyInformation.setAreaType(newAccount.getAreaType());
            if(newAccount.getBaseDate0() != null) 
                propertyInformation.setBaseDate0(newAccount.getBaseDate0());
            if(newAccount.getLandValue0() != null) 
                propertyInformation.setLandValue0(newAccount.getLandValue0());
            if(newAccount.getAuthority0() != null) 
                propertyInformation.setAuthority0(newAccount.getAuthority0());
            if(newAccount.getBasis0() != null) 
                propertyInformation.setBasis0(newAccount.getBasis0());
            if(newAccount.getBaseDate1() != null) 
                propertyInformation.setBaseDate1(newAccount.getBaseDate1());
            if(newAccount.getLandValue1() != null) 
                propertyInformation.setLandValue1(newAccount.getLandValue1());
            if(newAccount.getAuthority1() != null) 
                propertyInformation.setAuthority1(newAccount.getAuthority1());
            if(newAccount.getBasis1() != null) 
                propertyInformation.setBasis1(newAccount.getBasis1());
            if(newAccount.getBaseDate2() != null) 
                propertyInformation.setBaseDate2(newAccount.getBaseDate2());
            if(newAccount.getLandValue2() != null) 
                propertyInformation.setLandValue2(newAccount.getLandValue2());
            if(newAccount.getAuthority2() != null) 
                propertyInformation.setAuthority2(newAccount.getAuthority2());
            if(newAccount.getBasis2() != null) 
                propertyInformation.setBasis2(newAccount.getBasis2());
            if(newAccount.getBaseDate3() != null) 
                propertyInformation.setBaseDate3(newAccount.getBaseDate3());
            if(newAccount.getLandValue3() != null) 
                propertyInformation.setLandValue3(newAccount.getLandValue3());
            if(newAccount.getAuthority3() != null) 
                propertyInformation.setAuthority3(newAccount.getAuthority3());
            if(newAccount.getBasis3() != null) 
                propertyInformation.setBasis3(newAccount.getBasis3());
            if(newAccount.getBaseDate4() != null) 
                propertyInformation.setBaseDate4(newAccount.getBaseDate4());
            if(newAccount.getLandValue4() != null) 
                propertyInformation.setLandValue4(newAccount.getLandValue4());
            if(newAccount.getAuthority4() != null) 
                propertyInformation.setAuthority4(newAccount.getAuthority4());
            if(newAccount.getBasis4() != null) 
                propertyInformation.setBasis4(newAccount.getBasis4());
            if(newAccount.getBaseDate5() != null) 
                propertyInformation.setBaseDate5(newAccount.getBaseDate5());
            if(newAccount.getLandValue5() != null) 
                propertyInformation.setLandValue5(newAccount.getLandValue5());
            if(newAccount.getAuthority5() != null) 
                propertyInformation.setAuthority5(newAccount.getAuthority5());
            if(newAccount.getBasis5() != null) 
                propertyInformation.setBasis5(newAccount.getBasis5());
            if(newAccount.getFloorSpaceRatio() != null) 
                propertyInformation.setFloorSpaceRatio(newAccount.getFloorSpaceRatio());
            if(newAccount.getMinimumLotSize() != null) 
                propertyInformation.setMinimumLotSize(newAccount.getMinimumLotSize());
            if(newAccount.getBuildingHeight() != null) 
                propertyInformation.setBuildingHeight(newAccount.getBuildingHeight());
            if(newAccount.getLatitude() != null)
                propertyInformation.setLatitude(newAccount.getLatitude());
            if(newAccount.getLongitude() != null)
                propertyInformation.setLongitude(newAccount.getLongitude());
            propertyInformationRepository.save(propertyInformation);
            return ResponseEntity.ok(propertyInformation);
        }).orElseThrow(() -> new ResourceNotFoundException("Account ID " + id + " not found"));
    }

}
