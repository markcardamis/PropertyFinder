package com.majoapps.propertyfinder.data.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name= "property_sales")
public class PropertySales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="property_id")
    private Integer propertyId;

    @Temporal(TemporalType.DATE)
    @Column(name="sale_date")
    private Date saleDate;

    @Column(name="sale_price")
    private Integer salePrice;

}