package com.majoapps.propertyfinder.web.util;

import javax.persistence.TypedQuery;

import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.entity.PropertyListing;

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
            sb.append(" AND ( :zone IS NULL OR l.zone = :zone)");
            sb.append(" AND ( :areaMin IS NULL OR l.area > :areaMin)");
            sb.append(" AND ( :areaMax IS NULL OR l.area < :areaMax)");
            sb.append(" AND ( :priceIntMin IS NULL OR l.priceInt > :priceIntMin)");
            sb.append(" AND ( :priceIntMax IS NULL OR l.priceInt < :priceIntMax)");
            sb.append(" AND ( :pricePSMMin IS NULL OR l.pricePSM > :pricePSMMin)");
            sb.append(" AND ( :pricePSMMax IS NULL OR l.pricePSM < :pricePSMMax)");
            sb.append(" AND ( :postCode IS NULL OR l.postCode = :postCode)");
            sb.append(" AND ( :priceToLandValueMin IS NULL OR l.priceToLandValue > :priceToLandValueMin)");
            sb.append(" AND ( :priceToLandValueMax IS NULL OR l.priceToLandValue < :priceToLandValueMax)");
            sb.append(" AND ( :floorSpaceRatioMin IS NULL OR l.floorSpaceRatio > :floorSpaceRatioMin)");
            sb.append(" AND ( :floorSpaceRatioMax IS NULL OR l.floorSpaceRatio < :floorSpaceRatioMax)");
        }
        if (latitude != null && longitude != null) {
            sb.append(" ORDER BY distance(l.geometry, 'SRID=4326;POINT("+ latitude + " " + longitude + ")')");
        }
        return sb.toString();
    }

    public static TypedQuery<PropertyListing> queryBuilder(
            TypedQuery<PropertyListing> query,
            Notifications notifications) {
        query.setParameter("zone", notifications.getPropertyZone());
        query.setParameter("areaMin", notifications.getPropertyAreaMin());
        query.setParameter("areaMax", notifications.getPropertyAreaMax());
        query.setParameter("priceIntMin", notifications.getPropertyPriceMin());
        query.setParameter("priceIntMax", notifications.getPropertyPriceMax());
        query.setParameter("pricePSMMin", notifications.getPropertyPricePSMMin());
        query.setParameter("pricePSMMax", notifications.getPropertyPricePSMMax());
        query.setParameter("postCode", notifications.getPropertyPostCode());
        query.setParameter("priceToLandValueMin", notifications.getPropertyPriceToLandValueMin());
        query.setParameter("priceToLandValueMax", notifications.getPropertyPriceToLandValueMax());
        query.setParameter("floorSpaceRatioMin", notifications.getPropertyFloorSpaceRatioMin());
        query.setParameter("floorSpaceRatioMax", notifications.getPropertyFloorSpaceRatioMax());
        return query;
    }
}