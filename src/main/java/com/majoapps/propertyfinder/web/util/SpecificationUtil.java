package com.majoapps.propertyfinder.web.util;

import com.majoapps.propertyfinder.data.entity.Notifications;

public class SpecificationUtil {

    public static String ConvertNotificationsToPropertyListingSpecification (Notifications notifications) {
        StringBuilder sb = new StringBuilder("id>0");
        if (notifications == null) {
            return sb.toString();
        } else {
            if (notifications.getPropertyZone() != null)
                sb.append(" AND zone:").append(notifications.getPropertyZone());
            if (notifications.getPropertyAreaMin() != null && notifications.getPropertyAreaMin() != 0)
                sb.append(" AND area>").append(notifications.getPropertyAreaMin());
            if (notifications.getPropertyAreaMax() != null && notifications.getPropertyAreaMax() != 0) 
                sb.append(" AND area<").append(notifications.getPropertyAreaMax());
            if (notifications.getPropertyPriceMin() != null && notifications.getPropertyPriceMin() != 0)
                sb.append(" AND priceInt>").append(notifications.getPropertyPriceMin());
            if (notifications.getPropertyPriceMax() != null && notifications.getPropertyPriceMax() != 0)
                sb.append(" AND priceInt<").append(notifications.getPropertyPriceMax());
            if (notifications.getPropertyPricePSMMin() != null && notifications.getPropertyPricePSMMin() != 0)
                sb.append(" AND pricePSM>").append(notifications.getPropertyPricePSMMin());
            if (notifications.getPropertyPricePSMMax() != null && notifications.getPropertyPricePSMMax() != 0)
                sb.append(" AND pricePSM<").append(notifications.getPropertyPricePSMMax());
            if (notifications.getPropertyPostCode() != null)
                sb.append(" AND postCode:").append(notifications.getPropertyPostCode());
            if (notifications.getPropertyPriceToLandValueMin() != null)
                sb.append(" AND priceToLandValue>").append(notifications.getPropertyPriceToLandValueMin());
            if (notifications.getPropertyPriceToLandValueMax() != null)
                sb.append(" AND priceToLandValue<").append(notifications.getPropertyPriceToLandValueMax());
            if (notifications.getPropertyFloorSpaceRatioMin() != null)
                sb.append(" AND floorSpaceRatio>").append(notifications.getPropertyFloorSpaceRatioMin());
            if (notifications.getPropertyFloorSpaceRatioMax() != null)
                sb.append(" AND floorSpaceRatio<").append(notifications.getPropertyFloorSpaceRatioMax());
            return sb.toString();
        }
    }
}