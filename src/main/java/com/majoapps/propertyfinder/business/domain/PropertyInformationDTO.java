package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.web.util.InputUtil;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PropertyInformationDTO implements Serializable {
    private static final long serialVersionUID = 9045863543269746292L;

    @JsonProperty("property_id") private Integer propertyId;
    @JsonProperty("unit_number") private String unitNumber;
    @JsonProperty("house_number") private String houseNumber;
    @JsonProperty("street_name") private String streetName;
    @JsonProperty("suburb_name") private String suburbName;
    @JsonProperty("post_code") private String postCode;
    @JsonProperty("zone_code") private String zoneCode;
    @JsonProperty("land_value_1") private Integer landValue1;
    @JsonProperty("area") private BigDecimal area;
    @JsonProperty("area_type") private String areaType;
    @JsonProperty("floor_space_ratio") private BigDecimal floorSpaceRatio;
    @JsonProperty("minimum_lot_size") private String minimumLotSize;
    @JsonProperty("building_height") private BigDecimal buildingHeight;
    @JsonProperty("last_sold") private String lastSold;
    @JsonProperty("chart_data") private ChartData chartData;
    @JsonProperty("interested_people") private Long interestedPeople;
    @JsonProperty("interested_user") private boolean interestedUser;

    @Data
    public static class ChartData {
        @JsonProperty("property_sales") private List<PropertySalesDTO> propertySales;
        @JsonProperty("land_values") private List<LandValueDTO> landValues;

        public ChartData (List<PropertySalesDTO> propertySales, List<LandValueDTO> landValues) {
            this.propertySales = propertySales;
            this.landValues = landValues;
        }
    }

    @JsonIgnore
    public List<LandValueDTO> getLandValuesList(PropertyInformation propertyInformation) {
        List<LandValueDTO> landValueDTOList = new ArrayList<>();

        if (propertyInformation.getBaseDate1() != null && InputUtil.isNotNullOrZero(propertyInformation.getLandValue1())) {
            landValueDTOList.add(new LandValueDTO(propertyInformation.getBaseDate1(), propertyInformation.getLandValue1()));
        }
        if (propertyInformation.getBaseDate2() != null && InputUtil.isNotNullOrZero(propertyInformation.getLandValue2())) {
            landValueDTOList.add(new LandValueDTO(propertyInformation.getBaseDate2(), propertyInformation.getLandValue2()));
        }
        if (propertyInformation.getBaseDate3() != null && InputUtil.isNotNullOrZero(propertyInformation.getLandValue3())) {
            landValueDTOList.add(new LandValueDTO(propertyInformation.getBaseDate3(), propertyInformation.getLandValue3()));
        }
        if (propertyInformation.getBaseDate4() != null && InputUtil.isNotNullOrZero(propertyInformation.getLandValue4())) {
            landValueDTOList.add(new LandValueDTO(propertyInformation.getBaseDate4(), propertyInformation.getLandValue4()));
        }
        if (propertyInformation.getBaseDate5() != null && InputUtil.isNotNullOrZero(propertyInformation.getLandValue5())) {
            landValueDTOList.add(new LandValueDTO(propertyInformation.getBaseDate5(), propertyInformation.getLandValue5()));
        }
        return landValueDTOList;
    }

    @Data
    public static class LandValueDTO {
        @JsonProperty("date") private final Date baseDate;
        @JsonProperty("value") private final Integer landValue;
    }

    @Data
    public static class PropertySalesDTO {
        @JsonProperty("date") private Date settlementDate;
        @JsonProperty("value") private Integer purchasePrice;
    }
}

