package com.majoapps.propertyfinder.web.util;

import com.majoapps.propertyfinder.data.entity.Notifications;

public class SpecificationUtil {

    public static String createSpecificationString (Notifications notifications) {
        StringBuilder sb = new StringBuilder("id>0");
        if (notifications != null) {
            if (notifications.getPropertyZone() != null) {
                sb.append(" AND zone:");
                sb.append(notifications.getPropertyZone());
            }
            if (notifications.getPropertyAreaMin() != null && 
                    notifications.getPropertyAreaMin() != 0) {
                sb.append(" AND area>");
                sb.append(notifications.getPropertyAreaMin());
            }
            if (notifications.getPropertyAreaMax() != null && 
                    notifications.getPropertyAreaMax() != 0) {
                sb.append(" AND area<");
                sb.append(notifications.getPropertyAreaMax());
            }
            if (notifications.getPropertyPriceMin() != null && 
                    notifications.getPropertyPriceMin() != 0) {
                sb.append(" AND priceInt>");
                sb.append(notifications.getPropertyPriceMin());
            }
            if (notifications.getPropertyPriceMax() != null && 
                    notifications.getPropertyPriceMax() != 0) {
                sb.append(" AND priceInt<");
                sb.append(notifications.getPropertyPriceMax());
            }
            if (notifications.getPropertyPricePSMMin() != null && 
                    notifications.getPropertyPricePSMMin() != 0) {
                sb.append(" AND pricePSM>");
                sb.append(notifications.getPropertyPricePSMMin());
            }
            if (notifications.getPropertyPricePSMMax() != null && 
                    notifications.getPropertyPricePSMMax() != 0) {
                sb.append(" AND pricePSM<");
                sb.append(notifications.getPropertyPricePSMMax());
            }
            if (notifications.getPropertyPostCode() != null) {
                sb.append(" AND postCode:");
                sb.append(notifications.getPropertyPostCode());
            }
            if (notifications.getPropertyPriceToLandValueMin() != null) {
                sb.append(" AND priceToLandValue>");
                sb.append(notifications.getPropertyPriceToLandValueMin());
            }
            if (notifications.getPropertyPriceToLandValueMax() != null) {
                sb.append(" AND priceToLandValue<");
                sb.append(notifications.getPropertyPriceToLandValueMax());
            }
            if (notifications.getPropertyFloorSpaceRatioMin() != null) {
                sb.append(" AND floorSpaceRatio>");
                sb.append(notifications.getPropertyFloorSpaceRatioMin());
            }
            if (notifications.getPropertyFloorSpaceRatioMax() != null) {
                sb.append(" AND floorSpaceRatio<");
                sb.append(notifications.getPropertyFloorSpaceRatioMax());
            }
        }
        return sb.toString();
    }

    public static String createQueryString (
            Notifications notifications, 
            Double latitude, 
            Double longitude) {
        StringBuilder sb = new StringBuilder("SELECT l FROM PropertyListing l WHERE l.id>0");
        if (notifications != null) {
            if (notifications.getPropertyZone() != null) {
                sb.append(" AND l.zone = :zone");
            }
            if (notifications.getPropertyAreaMin() != null) {
                sb.append(" AND l.area > :areaMin");
            }
            if (notifications.getPropertyAreaMax() != null ) {
                sb.append(" AND l.area < :areaMax");
            }
            if (notifications.getPropertyPriceMin() != null) {
                sb.append(" AND l.priceInt > :priceIntMin");
            }
            if (notifications.getPropertyPriceMax() != null) {
                sb.append(" AND  l.priceInt < :priceIntMax");
            }
            if (notifications.getPropertyPricePSMMin() != null) {
                sb.append(" AND l.pricePSM > :pricePSMMin");
            }
            if (notifications.getPropertyPricePSMMax() != null) {
                sb.append(" AND l.pricePSM < :pricePSMMax");
            }
            if (notifications.getPropertyPostCode() != null) {
                sb.append(" AND l.postCode = :postCode");
            }
            if (notifications.getPropertyPriceToLandValueMin() != null) {
                sb.append(" AND l.priceToLandValue > :priceToLandValueMin");
            }
            if (notifications.getPropertyPriceToLandValueMax() != null) {
                sb.append(" AND l.priceToLandValue < :priceToLandValueMax");
            }
            if (notifications.getPropertyFloorSpaceRatioMin() != null) {
                sb.append(" AND l.floorSpaceRatio > :floorSpaceRatioMin");
            }
            if (notifications.getPropertyFloorSpaceRatioMax() != null) {
                sb.append(" AND l.floorSpaceRatio < :floorSpaceRatioMax");
            }
        }
        if (latitude != null && longitude != null) {
            sb.append(" ORDER BY distance(l.geometry, 'POINT("+ latitude + " " + longitude + ")')");
        }
        System.out.println(sb.toString());
        return sb.toString();
    }
}