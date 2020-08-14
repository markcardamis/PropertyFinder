package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.*;
import com.majoapps.propertyfinder.data.entity.PropertySales;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PropertyInformationDTO implements Serializable {
    private static final long serialVersionUID = 9045863543269746292L;

    @JsonProperty("district_code")
    private short districtCode;
    @JsonProperty("district_name")
    private String districtName;
    @JsonProperty("property_id")
    private Integer propertyId;
    @JsonProperty("property_type")
    private String propertyType;
    @JsonProperty("property_name")
    private String propertyName;
    @JsonProperty("unit_number")
    private String unitNumber;
    @JsonProperty("house_number")
    private String houseNumber;
    @JsonProperty("street_name")
    private String streetName;
    @JsonProperty("suburb_name")
    private String suburbName;
    @JsonProperty("post_code")
    private String postCode;
    @JsonProperty("zone_code")
    private String zoneCode;
    @JsonProperty("area")
    private BigDecimal area;
    @JsonProperty("area_type")
    private String areaType;
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
    @JsonProperty("floor_space_ratio")
    private BigDecimal floorSpaceRatio;
    @JsonProperty("minimum_lot_size")
    private String minimumLotSize;
    @JsonProperty("building_height")
    private BigDecimal buildingHeight;

    @JsonIgnoreProperties({"id", "districtCode", "propertyId", "saleCounter", "downloadDateTime",
            "propertyName", "unitNumber", "houseNumber", "streetName", "suburbName", "postCode", "area",
            "areaType", "contractDate", "zone", "natureOfProperty", "primaryPurpose", "strataLotNumber", "componentCode",
            "saleCode", "percentInterestOfSale", "dealingNumber"})
    @JsonProperty("property_sales")
    private List<PropertySales> propertySales;

    private List<LandValue> landValues;

    public void setLandValues() {
        landValues = new ArrayList<>();
        if (baseDate0 != null && landValue0 != null && authority0 != null && basis0 != null) {
            landValues.add(new LandValue(baseDate0, landValue0, authority0, basis0));
        }
        if (baseDate1 != null && landValue1 != null && authority1 != null && basis1 != null) {
            landValues.add(new LandValue(baseDate1, landValue1, authority1, basis1));
        }
        if (baseDate2 != null && landValue2 != null && authority2 != null && basis2 != null) {
            landValues.add(new LandValue(baseDate2, landValue2, authority2, basis2));
        }
        if (baseDate3 != null && landValue3 != null && authority3 != null && basis3 != null) {
            landValues.add(new LandValue(baseDate3, landValue3, authority3, basis3));
        }
        if (baseDate4 != null && landValue4 != null && authority4 != null && basis4 != null) {
            landValues.add(new LandValue(baseDate4, landValue4, authority4, basis4));
        }
        if (baseDate5 != null && landValue5 != null && authority5 != null && basis5 != null) {
            landValues.add(new LandValue(baseDate5, landValue5, authority5, basis5));
        }
    }

    public static class LandValue {
        private Date baseDate;
        private Integer landValue;
        private String authority;
        private String basis;
        public LandValue (Date baseDate, Integer landValue,  String authority, String basis){
            this.baseDate = baseDate;
            this.landValue = landValue;
            this.authority = authority;
            this.basis = basis;
        }
    }
}

