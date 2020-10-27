package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PropertyInformationSearchDTO implements Serializable {
    private static final long serialVersionUID = 9045863543269746202L;

    @JsonProperty("zone_code") private String zoneCode;
    @JsonProperty("post_code") private String postCode;
    @JsonProperty("areaMin") private BigDecimal areaMin;
    @JsonProperty("areaMax") private BigDecimal areaMax;
    @JsonProperty("land_value_min") private Integer landValueMin;
    @JsonProperty("land_value_max") private Integer landValueMax;
    @JsonProperty("building_height_min") private BigDecimal buildingHeightMin;
    @JsonProperty("building_height_max") private BigDecimal buildingHeightMax;
    @JsonProperty("floor_space_ratio_min") private BigDecimal floorSpaceRatioMin;
    @JsonProperty("floor_space_ratio_max") private BigDecimal floorSpaceRatioMax;
}

