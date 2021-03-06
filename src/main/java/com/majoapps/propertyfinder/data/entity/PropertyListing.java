package com.majoapps.propertyfinder.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

@Entity
@Data
@Table(name="LISTING")
public class PropertyListing {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @JsonIgnore
    @Column(name="time_date")
    private String timeDate;
    @JsonIgnore
    @Column(name="domain_listing_id")
    private Integer domainListingId;
    @Column(name="price")
    private String price;
    @JsonIgnore
    @Column(name="price_int")
    private Integer priceInt;
    @Column(name="listing_url")
    private String listingURL;
    @Column(name="listing_photo")
    private String listingPhoto;
    @Column(name="address")
    private String address;
    @Column(name="unit_number")
    private String unitNumber;
    @Column(name="house_number")
    private String houseNumber;
    @Column(name="street_name")
    private String streetName;
    @Column(name = "suburb_name")
    private String suburbName;
    @Column(name="post_code")
    private String postCode;
    @Column(name="area")
    private Integer area;
    @Column(name="bathrooms")
    private Double bathrooms;
    @Column(name="bedrooms")
    private Double bedrooms;
    @Column(name="carspaces")
    private Integer carspaces;
    @Column(name="latitude")
    private Double latitude;
    @Column(name="longitude")
    private Double longitude;
    @Column(name="summary_description")
    private String summaryDescription;
    @JsonIgnore
    @Column(name="property_id")
    private Integer propertyId;
    @JsonIgnore
    @Column(name="planning_portal_address")
    private String planningPortalAddress;
    @Column(name="zone")
    private String zone;
    @Column(name="floor_space_ratio")
    private BigDecimal floorSpaceRatio;
    @Column(name="minimum_lot_size")
    private String minimumLotSize;
    @Column(name="land_value")
    private Integer landValue;
    @Column(name="price_psm")
    private Integer pricePSM;
    @Column(name="price_to_land_value")
    private BigDecimal priceToLandValue;
    @JsonIgnore
    @Column(name="geometry")
    private Geometry geometry;
    @Column(name="property_type")
    private String propertyType;
    @Column(name="street_frontage")
    private BigDecimal streetFrontage;
}