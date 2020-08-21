package com.majoapps.propertyfinder.business.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.majoapps.propertyfinder.data.projection.AddressListView;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AddressListDTO implements AddressListView, Serializable{
    private static final long serialVersionUID = -4553563060517937081L;

    @JsonProperty("propertyId") private Integer propertyId;
    @JsonProperty("address") private String address;

}
