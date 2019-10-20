package com.majoapps.propertyfinder.data.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name="NOTIFICATIONS")
public class Notifications extends AuditModel {

    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    @Column(name="planning_zone")
    private String planningZone;
    @Column(name="property_area_min")
    private int propertyAreaMin;
    @Column(name="property_area_max")
    private int propertyAreaMax;
    @Column(name="property_price_min")
    private int propertyPriceMin;
    @Column(name="property_price_max")
    private int propertyPriceMax;
    @Column(name="property_psm_min")
    private int propertyPSMMin;
    @Column(name="property_psm_max")
    private int propertyPSMMax;
    @Column(name="property_post_code")
    private String propertyPostCode;
    @Column(name="property_price_to_land_value_min")
    private BigDecimal propertyPriceToLandValueMin;
    @Column(name="property_price_to_land_value_max")
    private BigDecimal propertyPriceToLandValueMax;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getPlanningZone() {
        return planningZone;
    }

    public void setPlanningZone(String planningZone) {
        this.planningZone = planningZone;
    }

    public int getPropertyAreaMin() {
        return propertyAreaMin;
    }

    public void setPropertyAreaMin(int propertyAreaMin) {
        this.propertyAreaMin = propertyAreaMin;
    }

    public int getPropertyAreaMax() {
        return propertyAreaMax;
    }

    public void setPropertyAreaMax(int propertyAreaMax) {
        this.propertyAreaMax = propertyAreaMax;
    }

    public int getPropertyPriceMin() {
        return propertyPriceMin;
    }

    public void setPropertyPriceMin(int propertyPriceMin) {
        this.propertyPriceMin = propertyPriceMin;
    }

    public int getPropertyPriceMax() {
        return propertyPriceMax;
    }

    public void setPropertyPriceMax(int propertyPriceMax) {
        this.propertyPriceMax = propertyPriceMax;
    }

    public int getPropertyPSMMin() {
        return propertyPSMMin;
    }

    public void setPropertyPSMMin(int propertyPSMMin) {
        this.propertyPSMMin = propertyPSMMin;
    }

    public int getPropertyPSMMax() {
        return propertyPSMMax;
    }

    public void setPropertyPSMMax(int propertyPSMMax) {
        this.propertyPSMMax = propertyPSMMax;
    }

    public String getPropertyPostCode() {
        return propertyPostCode;
    }

    public void setPropertyPostCode(String propertyPostCode) {
        this.propertyPostCode = propertyPostCode;
    }

    public BigDecimal getPropertyPriceToLandValueMin() {
        return propertyPriceToLandValueMin;
    }

    public void setPropertyPriceToLandValueMin(BigDecimal propertyPriceToLandValueMin) {
        this.propertyPriceToLandValueMin = propertyPriceToLandValueMin;
    }

    public BigDecimal getPropertyPriceToLandValueMax() {
        return propertyPriceToLandValueMax;
    }

    public void setPropertyPriceToLandValueMax(BigDecimal propertyPriceToLandValueMax) {
        this.propertyPriceToLandValueMax = propertyPriceToLandValueMax;
    }
}

