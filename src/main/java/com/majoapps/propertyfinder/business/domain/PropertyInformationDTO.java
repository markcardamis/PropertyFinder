package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.*;
import com.majoapps.propertyfinder.data.entity.PropertySales;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PropertyInformationDTO implements Serializable {
    private static final long serialVersionUID = 9045863543269746292L;

    @JsonProperty("district_code") private short districtCode;
    @JsonProperty("district_name") private String districtName;
    @JsonProperty("property_id") private Integer propertyId;
    @JsonProperty("property_type") private String propertyType;
    @JsonProperty("property_name") private String propertyName;
    @JsonProperty("unit_number") private String unitNumber;
    @JsonProperty("house_number") private String houseNumber;
    @JsonProperty("street_name") private String streetName;
    @JsonProperty("suburb_name") private String suburbName;
    @JsonProperty("post_code") private String postCode;
    @JsonProperty("zone_code") private String zoneCode;
    @JsonProperty("area") private BigDecimal area;
    @JsonProperty("area_type") private String areaType;
    @JsonProperty("base_date_0") private Date baseDate0;
    @JsonProperty("land_value_0") private Integer landValue0;
    @JsonProperty("authority_0") private String authority0;
    @JsonProperty("basis_0") private String basis0;
    @JsonProperty("base_date_1") private Date baseDate1;
    @JsonProperty("land_value_1") private Integer landValue1;
    @JsonProperty("authority_1") private String authority1;
    @JsonProperty("basis_1") private String basis1;
    @JsonProperty("base_date_2") private Date baseDate2;
    @JsonProperty("land_value_2") private Integer landValue2;
    @JsonProperty("authority_2") private String authority2;
    @JsonProperty("basis_2") private String basis2;
    @JsonProperty("base_date_3") private Date baseDate3;
    @JsonProperty("land_value_3") private Integer landValue3;
    @JsonProperty("authority_3") private String authority3;
    @JsonProperty("basis_3") private String basis3;
    @JsonProperty("base_date_4") private Date baseDate4;
    @JsonProperty("land_value_4") private Integer landValue4;
    @JsonProperty("authority_4") private String authority4;
    @JsonProperty("basis_4") private String basis4;
    @JsonProperty("base_date_5") private Date baseDate5;
    @JsonProperty("land_value_5") private Integer landValue5;
    @JsonProperty("authority_5") private String authority5;
    @JsonProperty("basis_5") private String basis5;
    @JsonProperty("floor_space_ratio") private BigDecimal floorSpaceRatio;
    @JsonProperty("minimum_lot_size") private String minimumLotSize;
    @JsonProperty("building_height") private BigDecimal buildingHeight;



    @JsonIgnoreProperties({"id", "districtCode", "propertyId", "saleCounter", "downloadDateTime",
            "propertyName", "unitNumber","houseNumber","streetName","suburbName","postCode","area",
            "areaType","contractDate","zone","natureOfProperty","primaryPurpose","strataLotNumber","componentCode",
            "saleCode","percentInterestOfSale","dealingNumber"})
    @JsonProperty("property_sales") private List<PropertySales> propertySales;
}

