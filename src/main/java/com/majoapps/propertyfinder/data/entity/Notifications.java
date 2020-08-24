package com.majoapps.propertyfinder.data.entity;

import java.math.BigDecimal;
import javax.persistence.*;
import com.majoapps.propertyfinder.data.enums.Frequency;
import com.majoapps.propertyfinder.web.util.FrequencyEnumConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name="NOTIFICATIONS")
public class Notifications extends AuditModel {
    private static final long serialVersionUID = -4880020817874864117L;
    
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    @Column(name="title")
    private String title;
    @Convert(converter = FrequencyEnumConverter.class)
    @Column(name="frequency")
    private Frequency frequency;
    @Column(name="property_zone")
    private String propertyZone;
    @Column(name="property_area_min")
    private Integer propertyAreaMin;
    @Column(name="property_area_max")
    private Integer propertyAreaMax;
    @Column(name="property_price_min")
    private Integer propertyPriceMin;
    @Column(name="property_price_max")
    private Integer propertyPriceMax;
    @Column(name="property_price_psm_min")
    private Integer propertyPricePSMMin;
    @Column(name="property_price_psm_max")
    private Integer propertyPricePSMMax;
    @Column(name="property_post_code")
    private String propertyPostCode;
    @Column(name="property_price_to_land_value_min")
    private BigDecimal propertyPriceToLandValueMin;
    @Column(name="property_price_to_land_value_max")
    private BigDecimal propertyPriceToLandValueMax;
    @Column(name="property_floor_space_ratio_min")
    private BigDecimal propertyFloorSpaceRatioMin;
    @Column(name="property_floor_space_ratio_max")
    private BigDecimal propertyFloorSpaceRatioMax;
}

