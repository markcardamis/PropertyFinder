package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PropertyListingDTO implements Serializable {  
    private static final long serialVersionUID = -4553563068517937081L;

    @JsonProperty("id") private Integer id;
    @JsonProperty("latitude") private Double latitude;
    @JsonProperty("longitude") private Double longitude;  
    @JsonProperty("price") private String price;
    @JsonProperty("listing_url") private String listingURL;
    @JsonProperty("listing_photo") private String listingPhoto;
    @JsonProperty("address") private String address;
    @JsonProperty("area") private Integer area;
    @JsonProperty("bathrooms") private Double bathrooms;
    @JsonProperty("bedrooms") private Double bedrooms;
    @JsonProperty("carspaces") private Integer carspaces;
    @JsonProperty("summary_description") private String summaryDescription;
    @JsonProperty("planning_portal_id") private String planningPortalPropId;
    @JsonProperty("zone") private String zone;
    @JsonProperty("floor_space_ratio") private BigDecimal floorSpaceRatio;
    @JsonProperty("minimum_lot_size") private String minimumLotSize;
    @JsonProperty("land_value") private Integer landValue;
    @JsonProperty("price_psm") private Integer pricePSM;
    @JsonProperty("price_to_land_value") private BigDecimal priceToLandValue;
}

