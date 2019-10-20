package com.majoapps.propertyfinder.business.domain;

public class FilteringProperty {
    public String zone;
    public Integer area;
    public Integer pricePerArea;
    public Integer priceInt;

    public FilteringProperty (String zone, Integer area, Integer pricePerArea, Integer priceInt) {
        zone = this.zone;
        area = this.area;
        pricePerArea = this.pricePerArea;
        priceInt = this.priceInt;
    }
}
