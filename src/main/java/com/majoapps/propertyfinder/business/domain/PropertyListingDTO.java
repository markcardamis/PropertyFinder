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
}

