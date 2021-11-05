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

    @JsonProperty("zoneCode") private String zoneCode;
    @JsonProperty("zoneCode1") private String zoneCode1;
    @JsonProperty("zoneCode2") private String zoneCode2;
    @JsonProperty("zoneCode3") private String zoneCode3;
    @JsonProperty("zoneCode4") private String zoneCode4;
    @JsonProperty("zoneCode5") private String zoneCode5;
    @JsonProperty("postCode") private String postCode;
    @JsonProperty("areaMin") private BigDecimal areaMin;
    @JsonProperty("areaMax") private BigDecimal areaMax;
    @JsonProperty("landValueMin") private Integer landValueMin;
    @JsonProperty("landValueMax") private Integer landValueMax;
    @JsonProperty("buildingHeightMin") private BigDecimal buildingHeightMin;
    @JsonProperty("buildingHeightMax") private BigDecimal buildingHeightMax;
    @JsonProperty("floorSpaceRatioMin") private BigDecimal floorSpaceRatioMin;
    @JsonProperty("floorSpaceRatioMax") private BigDecimal floorSpaceRatioMax;
    @JsonProperty("streetFrontageMin") private BigDecimal streetFrontageMin;
    @JsonProperty("streetFrontageMax") private BigDecimal streetFrontageMax;
}

