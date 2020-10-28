package com.majoapps.propertyfinder.data.projection;

import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "AddressListView", types = { PropertyInformation.class })
public interface AddressListView {
        Integer getPropertyId();
        String getAddress();
        Double getLatitude();
        Double getLongitude();
}
