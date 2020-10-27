package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PropertyInformationResponseDTO implements Serializable {
    private static final long serialVersionUID = 9045861543269746202L;

    @JsonProperty("property_id") private Integer propertyId;
}

