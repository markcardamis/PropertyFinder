package com.majoapps.propertyfinder.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

@Entity
@Data
@Table(name= "property_sales")
public class PropertySales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Integer id;
    @Column(name = "district_code")
    private short districtCode;
    @Column(name="property_id")
    private Integer propertyId;
    @Column(name = "sale_counter")
    private String saleCounter;
    @Column(name = "download_date_time")
    private String downloadDateTime;
    @Column(name = "property_name")
    private String propertyName;
    @Column(name="unit_number")
    private String unitNumber;
    @Column(name="house_number")
    private String houseNumber;
    @Column(name="street_name")
    private String streetName;
    @Column(name = "property_locality")
    private String suburbName;
    @Column(name="post_code", columnDefinition = "NUMERIC(4,0)")
    private Integer postCode;
    @Column(name="area")
    private BigDecimal area;
    @Column(name="area_type")
    private String areaType;
    @Temporal(TemporalType.DATE)
    @Column(name="contract_date")
    private Date contractDate;
    @Temporal(TemporalType.DATE)
    @Column(name="settlement_date")
    private Date settlementDate;
    @Column(name="purchase_price")
    private BigDecimal purchasePrice;
    @Column(name="zoning")
    private String zone;
    @Column(name="nature_of_property")
    private String natureOfProperty;
    @Column(name="primary_purpose")
    private String primaryPurpose;
    @Column(name="strata_lot_number")
    private String strataLotNumber;
    @Column(name="component_code")
    private String componentCode;
    @Column(name="sale_code")
    private String saleCode;
    @Column(name="percent_interest_of_sale")
    private String percentInterestOfSale;
    @Column(name="dealing_number")
    private String dealingNumber;
}