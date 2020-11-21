package com.majoapps.propertyfinder.web.util;

import com.majoapps.propertyfinder.business.domain.PropertyInformationSearchDTO;
import com.majoapps.propertyfinder.data.entity.Notifications;
import com.majoapps.propertyfinder.data.entity.PropertyInformation;
import com.majoapps.propertyfinder.data.entity.PropertyListing;
import com.majoapps.propertyfinder.web.util.InputUtil;
import org.jetbrains.annotations.NotNull;
import javax.persistence.TypedQuery;

public class SpecificationUtil {

    public static String createSpecificationString(Notifications notifications) {
        StringBuilder sb = new StringBuilder("id>0");
        if (notifications != null) {
            if (notifications.getPropertyId() != null && notifications.getPropertyId() != 0) {
                sb.append(" AND propertyId:");
                sb.append(notifications.getPropertyId());
            }
            if (notifications.getPropertyZone() != null) {
                sb.append(" AND zone:");
                sb.append(notifications.getPropertyZone());
            }
            if (notifications.getPropertyAreaMin() != null && notifications.getPropertyAreaMin() != 0) {
                sb.append(" AND area>");
                sb.append(notifications.getPropertyAreaMin());
            }
            if (notifications.getPropertyAreaMax() != null && notifications.getPropertyAreaMax() != 0) {
                sb.append(" AND area<");
                sb.append(notifications.getPropertyAreaMax());
            }
            if (notifications.getPropertyPriceMin() != null && notifications.getPropertyPriceMin() != 0) {
                sb.append(" AND priceInt>");
                sb.append(notifications.getPropertyPriceMin());
            }
            if (notifications.getPropertyPriceMax() != null && notifications.getPropertyPriceMax() != 0) {
                sb.append(" AND priceInt<");
                sb.append(notifications.getPropertyPriceMax());
            }
            if (notifications.getPropertyPricePSMMin() != null && notifications.getPropertyPricePSMMin() != 0) {
                sb.append(" AND pricePSM>");
                sb.append(notifications.getPropertyPricePSMMin());
            }
            if (notifications.getPropertyPricePSMMax() != null && notifications.getPropertyPricePSMMax() != 0) {
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
            if (notifications.getLandOnly() != null && notifications.getLandOnly()) {
                sb.append(" AND propertyType:VacantLand");
            }
        }
        return sb.toString();
    }

    public static String createQueryString(Notifications notifications, Double latitude, Double longitude) {
        StringBuilder sb = new StringBuilder("SELECT l FROM PropertyListing l WHERE l.id>0");
        if (notifications != null) {
            sb.append(" AND ( :propertyId IS NULL OR l.propertyId = :propertyId)");
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
            sb.append(" AND ( :landOnly IS NULL OR :landOnly IS FALSE OR ( :landOnly IS TRUE AND l.propertyType LIKE '%Land%') )");
        }
        return appendOrderBy(latitude, longitude, sb);
    }

    public static TypedQuery<PropertyListing> queryBuilder(
            TypedQuery<PropertyListing> query,
            Notifications notifications) {
        if (notifications != null) {
            query.setParameter("propertyId", notifications.getPropertyId());
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
            query.setParameter("landOnly", notifications.getLandOnly());
        }
        return query;
    }

    public static String createQueryString(
            PropertyInformationSearchDTO propertyInformation, Double latitude, Double longitude) {
        StringBuilder sb = new StringBuilder("SELECT l FROM PropertyInformation l WHERE l.propertyId>0");
        if (propertyInformation != null) {
            sb.append(" AND ( :zoneCode IS NULL OR l.zoneCode = :zoneCode)");
            sb.append(" AND ( :postCode IS NULL OR l.postCode = :postCode)");
            sb.append(" AND ( :areaMin IS NULL OR l.area > :areaMin)");
            sb.append(" AND ( :areaMax IS NULL OR l.area < :areaMax)");
            sb.append(" AND ( :landValueMin IS NULL OR l.landValue0 > :landValueMin)");
            sb.append(" AND ( :landValueMax IS NULL OR l.landValue0 < :landValueMax)");
            sb.append(" AND ( :buildingHeightMin IS NULL OR l.buildingHeight > :buildingHeightMin)");
            sb.append(" AND ( :buildingHeightMax IS NULL OR l.buildingHeight < :buildingHeightMax)");
            sb.append(" AND ( :floorSpaceRatioMin IS NULL OR l.floorSpaceRatio > :floorSpaceRatioMin)");
            sb.append(" AND ( :floorSpaceRatioMax IS NULL OR l.floorSpaceRatio < :floorSpaceRatioMax)");
        }
        return appendOrderBy(latitude, longitude, sb);
    }

    public static TypedQuery<PropertyInformation> queryBuilder(
            TypedQuery<PropertyInformation> query,
            PropertyInformationSearchDTO propertyInformation) {
        if (propertyInformation != null) {
            query.setParameter("zoneCode", InputUtil.returnStringOrNull(propertyInformation.getZoneCode()));
            query.setParameter("postCode", InputUtil.returnStringOrNull(propertyInformation.getPostCode()));
            query.setParameter("areaMin", propertyInformation.getAreaMin());
            query.setParameter("areaMax", propertyInformation.getAreaMax());
            query.setParameter("landValueMin", propertyInformation.getLandValueMin());
            query.setParameter("landValueMax", propertyInformation.getLandValueMax());
            query.setParameter("buildingHeightMin", propertyInformation.getBuildingHeightMin());
            query.setParameter("buildingHeightMax", propertyInformation.getBuildingHeightMax());
            query.setParameter("floorSpaceRatioMin", propertyInformation.getFloorSpaceRatioMin());
            query.setParameter("floorSpaceRatioMax", propertyInformation.getFloorSpaceRatioMax());
        }
        return query;
    }

    @NotNull
    private static String appendOrderBy(Double latitude, Double longitude, StringBuilder sb) {
        if (latitude != null && longitude != null) {
            sb.append(" ORDER BY distance(l.geometry, 'SRID=4326;Point(");
            sb.append(longitude);
            sb.append(" ");
            sb.append(latitude);
            sb.append(")')");
        }
        return sb.toString();
    }

    public static String to_tsquery (String address) {
        String sanitisedAddress = sanitiseAddressInputString(address.toUpperCase());
        String fullAddress = addRoadAbbreviation(sanitisedAddress); // add 'Rd' from 'Road' in address search
        String queryAddress = String.join(" & ", fullAddress.split("\\s+"));
        if (!queryAddress.endsWith(")")){
            queryAddress = queryAddress.concat(":*");
        }
        return queryAddress;
    }

    private static String sanitiseAddressInputString (String search) {
        // Sanitize search string
        StringBuilder sb = new StringBuilder(search.length());
        for (int i = 0; i < search.length(); ++i) {
            char ch = search.charAt(i);
            if (Character.isLetterOrDigit(ch) || ch == ' ' || ch == '\'') {
                sb.append(ch);
            } else if (ch == '/') {
                sb.append(' '); // use space as street number prefix
            } else {
                sb.append(' '); // use space as the default character as extra spaces are removed later
            }
        }
        return sb.toString();
    }

    private static String addRoadAbbreviation (String roadString) {
        String[] returnRoadString = roadString.split("\\s+");

        for (int i = 0; i < returnRoadString.length; i++) {
            String tempString = returnRoadString[i];
            tempString = tempString.replaceAll("\\bACCESS\\b", "(ACCESS|ACCS)");
            tempString = tempString.replaceAll("\\bALLEY\\b", "(ALLEY|ALLY)");
            tempString = tempString.replaceAll("\\bAMBLE\\b", "(AMBLE|AMBL)");
            tempString = tempString.replaceAll("\\bAPPROACH\\b", "(APPROACH|APP)");
            tempString = tempString.replaceAll("\\bARCADE\\b", "(ARCADE|ARC)");
            tempString = tempString.replaceAll("\\bARTERY\\b", "(ARTERY|ARTL)");
            tempString = tempString.replaceAll("\\bAVENUE\\b", "(AVENUE|AVE)");
            tempString = tempString.replaceAll("\\bBANAN\\b", "(BANAN|BA)");
            tempString = tempString.replaceAll("\\bBEACH\\b", "(BEACH|BCH)");
            tempString = tempString.replaceAll("\\bBROADWAY\\b", "(BROADWAY|BDWY)");
            tempString = tempString.replaceAll("\\bBOWL\\b", "(BOWL|BOWL)");
            tempString = tempString.replaceAll("\\bBRAE\\b", "(BRAE|BRAE)");
            tempString = tempString.replaceAll("\\bBRACE\\b", "(BRACE|BRCE)");
            tempString = tempString.replaceAll("\\bBREAK\\b", "(BREAK|BRK)");
            tempString = tempString.replaceAll("\\bBUSWAY\\b", "(BUSWAY|BSWY)");
            tempString = tempString.replaceAll("\\bBOULEVARD\\b", "(BOULEVARD|BVD)");
            tempString = tempString.replaceAll("\\bBOARDWALK\\b", "(BOARDWALK|BWLK)");
            tempString = tempString.replaceAll("\\bBYPASS\\b", "(BYPASS|BYPA)");
            tempString = tempString.replaceAll("\\bCAUSEWAY\\b", "(CAUSEWAY|CAUS)");
            tempString = tempString.replaceAll("\\bCIRCUIT\\b", "(CIRCUIT|CCT)");
            tempString = tempString.replaceAll("\\bCUL-DE-SAC\\b", "CDS");
            tempString = tempString.replaceAll("\\bCHASE\\b", "(CHASE|CH)");
            tempString = tempString.replaceAll("\\bCIRCLE\\b", "(CIRCLE|CIR)");
            tempString = tempString.replaceAll("\\bCLOSE\\b", "(CLOSE|CL)");
            tempString = tempString.replaceAll("\\bCLUSTER\\b", "(CLUSTER|CLR)");
            tempString = tempString.replaceAll("\\bCOMMON\\b", "(COMMON|CMMN)");
            tempString = tempString.replaceAll("\\bCOMMONS\\b", "(COMMONS|CMMNS)");
            tempString = tempString.replaceAll("\\bCONCORD\\b", "(CONCORD|CNCD)");
            tempString = tempString.replaceAll("\\bCORNER\\b", "(CORNER|CNR)");
            tempString = tempString.replaceAll("\\bCONNECTION\\b", "(CONNECTION|CNTN)");
            tempString = tempString.replaceAll("\\bCENTREWAY\\b", "(CENTREWAY|CNWY)");
            tempString = tempString.replaceAll("\\bCONCOURSE\\b", "(CONCOURSE|CON)");
            tempString = tempString.replaceAll("\\bCOPSE\\b", "(COPSE|CPS)");
            tempString = tempString.replaceAll("\\bCIRCUS\\b", "(CIRCUS|CRCS)");
            tempString = tempString.replaceAll("\\bCRESCENT\\b", "(CRESCENT|CRES)");
            tempString = tempString.replaceAll("\\bCRIEF\\b", "(CRIEF|CRF)");
            tempString = tempString.replaceAll("\\bCOURSE\\b", "(COURSE|CRSE)");
            tempString = tempString.replaceAll("\\bCROSSING\\b", "(CROSSING|CRSG)");
            tempString = tempString.replaceAll("\\bCROSS\\b", "(CROSS|CRSS)");
            tempString = tempString.replaceAll("\\bCREST\\b", "(CREST|CRST)");
            tempString = tempString.replaceAll("\\bCORSO\\b", "(CORSO|CSO)");
            tempString = tempString.replaceAll("\\bCOURT\\b", "(COURT|CT)");
            tempString = tempString.replaceAll("\\bCENTRE\\b", "(CENTRE|CTR)");
            tempString = tempString.replaceAll("\\bCUTTING\\b", "(CUTTING|CTTG)");
            tempString = tempString.replaceAll("\\bCOURTYARD\\b", "(COURTYARD|CTYD)");
            tempString = tempString.replaceAll("\\bCRUISEWAY\\b", "(CRUISEWAY|CUWY)");
            tempString = tempString.replaceAll("\\bDEVIATION\\b", "(DEVIATION|DEVN)");
            tempString = tempString.replaceAll("\\bDIVIDE\\b", "(DIVIDE|DIV)");
            tempString = tempString.replaceAll("\\bDOMAIN\\b", "(DOMAIN|DOM)");
            tempString = tempString.replaceAll("\\bDRIVE\\b", "(DRIVE|DR)");
            tempString = tempString.replaceAll("\\bDRIVEWAY\\b", "(DRIVEWAY|DRWY)");
            tempString = tempString.replaceAll("\\bDISTRIBUTOR\\b", "(DISTRIBUTOR|DSTR)");
            tempString = tempString.replaceAll("\\bELBOW\\b", "(ELBOW|ELB)");
            tempString = tempString.replaceAll("\\bENTRANCE\\b", "(ENTRANCE|ENT)");
            tempString = tempString.replaceAll("\\bEASEMENT\\b", "(EASEMENT|ESMT)");
            tempString = tempString.replaceAll("\\bESPLANADE\\b", "(ESPLANADE|ESP)");
            tempString = tempString.replaceAll("\\bESTATE\\b", "(ESTATE|EST)");
            tempString = tempString.replaceAll("\\bEXPRESSWAY\\b", "(EXPRESSWAY|EXP)");
            tempString = tempString.replaceAll("\\bFAIRWAY\\b", "(FAIRWAY|FAWY)");
            tempString = tempString.replaceAll("\\bFIRETRAIL\\b", "(FIRETRAIL|FITR)");
            tempString = tempString.replaceAll("\\bFIRELINE\\b", "(FIRELINE|FLNE)");
            tempString = tempString.replaceAll("\\bFOLLOW\\b", "(FOLLOW|FOLW)");
            tempString = tempString.replaceAll("\\bFRONTAGE\\b", "(FRONTAGE|FRTG)");
            tempString = tempString.replaceAll("\\bFORESHORE\\b", "(FORESHORE|FSHR)");
            tempString = tempString.replaceAll("\\bFREEWAY\\b", "(FREEWAY|FWY)");
            tempString = tempString.replaceAll("\\bGARDEN\\b", "(GARDEN|GDN)");
            tempString = tempString.replaceAll("\\bGARDENS\\b", "(GARDENS|GDNS)");
            tempString = tempString.replaceAll("\\bGLADE\\b", "(GLADE|GLD)");
            tempString = tempString.replaceAll("\\bGLEN\\b", "(GLEN|GLEN)");
            tempString = tempString.replaceAll("\\bGULLY\\b", "(GULLY|GLY)");
            tempString = tempString.replaceAll("\\bGROVE\\b", "(GROVE|GR)");
            tempString = tempString.replaceAll("\\bGRANGE\\b", "(GRANGE|GRA)");
            tempString = tempString.replaceAll("\\bGREEN\\b", "(GREEN|GRN)");
            tempString = tempString.replaceAll("\\bGATE\\b", "(GATE|GTE)");
            tempString = tempString.replaceAll("\\bGATEWAY\\b", "(GATEWAY|GWY)");
            tempString = tempString.replaceAll("\\bHOLLOW\\b", "(HOLLOW|HLLW)");
            tempString = tempString.replaceAll("\\bHARBOUR\\b", "(HARBOUR|HRBR)");
            tempString = tempString.replaceAll("\\bHEATH\\b", "(HEATH|HTH)");
            tempString = tempString.replaceAll("\\bHEIGHTS\\b", "(HEIGHTS|HTS)");
            tempString = tempString.replaceAll("\\bHAVEN\\b", "(HAVEN|HVN)");
            tempString = tempString.replaceAll("\\bHIGHWAY\\b", "(HIGHWAY|HWY)");
            tempString = tempString.replaceAll("\\bISLAND\\b", "(ISLAND|ID)");
            tempString = tempString.replaceAll("\\bJUNCTION\\b", "(JUNCTION|JNC)");
            tempString = tempString.replaceAll("\\bLANDING\\b", "(LANDING|LDG)");
            tempString = tempString.replaceAll("\\bLOOKOUT\\b", "(LOOKOUT|LKT)");
            tempString = tempString.replaceAll("\\bLANEWAY\\b", "(LANEWAY|LNWY)");
            tempString = tempString.replaceAll("\\bLYNNE\\b", "(LYNNE|LYNN)");
            tempString = tempString.replaceAll("\\bMANOR\\b", "(MANOR|MANR)");
            tempString = tempString.replaceAll("\\bMEAD\\b", "(MEAD|MEAD)");
            tempString = tempString.replaceAll("\\bMEANDER\\b", "(MEANDER|MNDR)");
            tempString = tempString.replaceAll("\\bMOTORWAY\\b", "(MOTORWAY|MWY)");
            tempString = tempString.replaceAll("\\bOUTLOOK\\b", "(OUTLOOK|OTLK)");
            tempString = tempString.replaceAll("\\bOUTLET\\b", "(OUTLET|OTLT)");
            tempString = tempString.replaceAll("\\bPARADE\\b", "(PARADE|PDE)");
            tempString = tempString.replaceAll("\\bPATHWAY\\b", "(PATHWAY|PHWY)");
            tempString = tempString.replaceAll("\\bPOCKET\\b", "(POCKET|PKT)");
            tempString = tempString.replaceAll("\\bPARKWAY\\b", "(PARKWAY|PKWY)");
            tempString = tempString.replaceAll("\\bPLACE\\b", "(PLACE|PL)");
            tempString = tempString.replaceAll("\\bPLAZA\\b", "(PLAZA|PLZA)");
            tempString = tempString.replaceAll("\\bPOINT\\b", "(POINT|PNT)");
            tempString = tempString.replaceAll("\\bPRECINCT\\b", "(PRECINCT|PREC)");
            tempString = tempString.replaceAll("\\bPROMENADE\\b", "(PROMENADE|PROM)");
            tempString = tempString.replaceAll("\\bPURSUIT\\b", "(PURSUIT|PRST)");
            tempString = tempString.replaceAll("\\bPASSAGE\\b", "(PASSAGE|PSGE)");
            tempString = tempString.replaceAll("\\bQUADRANT\\b", "(QUADRANT|QDRT)");
            tempString = tempString.replaceAll("\\bQUAY\\b", "(QUAY|QY)");
            tempString = tempString.replaceAll("\\bQUAYS\\b", "(QUAYS|QYS)");
            tempString = tempString.replaceAll("\\bRAMP\\b", "(RAMP|RAMP)");
            tempString = tempString.replaceAll("\\bREACH\\b", "(REACH|RCH)");
            tempString = tempString.replaceAll("\\bROAD\\b", "(ROAD|RD)");
            tempString = tempString.replaceAll("\\bRIDGE\\b", "(RIDGE|RDGE)");
            tempString = tempString.replaceAll("\\bROADS\\b", "(ROADS|RDS)");
            tempString = tempString.replaceAll("\\bROADWAY\\b", "(ROADWAY|RDWY)");
            tempString = tempString.replaceAll("\\bRESERVE\\b", "(RESERVE|RES)");
            tempString = tempString.replaceAll("\\bRAMBLE\\b", "(RAMBLE|RMBL)");
            tempString = tempString.replaceAll("\\bROUND\\b", "(ROUND|RND)");
            tempString = tempString.replaceAll("\\bRISING\\b", "(RISING|RSNG)");
            tempString = tempString.replaceAll("\\bROUTE\\b", "(ROUTE|RTE)");
            tempString = tempString.replaceAll("\\bRETURN\\b", "(RETURN|RTN)");
            tempString = tempString.replaceAll("\\bRETREAT\\b", "(RETREAT|RTT)");
            tempString = tempString.replaceAll("\\bRIVER\\b", "(RIVER|RVR)");
            tempString = tempString.replaceAll("\\bSUBWAY\\b", "(SUBWAY|SBWY)");
            tempString = tempString.replaceAll("\\bSKYLINE\\b", "(SKYLINE|SKLN)");
            tempString = tempString.replaceAll("\\bSLOPE\\b", "(SLOPE|SLPE)");
            tempString = tempString.replaceAll("\\bSPUR\\b", "(SPUR|SPUR)");
            tempString = tempString.replaceAll("\\bSQUARE\\b", "(SQUARE|SQ)");
            tempString = tempString.replaceAll("\\bSTREET\\b", "(STREET|ST)");
            tempString = tempString.replaceAll("\\bSTRAIT\\b", "(STRAIT|STAI)");
            tempString = tempString.replaceAll("\\bSTEPS\\b", "(STEPS|STPS)");
            tempString = tempString.replaceAll("\\bSTRIP\\b", "(STRIP|STRP)");
            tempString = tempString.replaceAll("\\bSTRAIGHT\\b", "(STRAIGHT|STRT)");
            tempString = tempString.replaceAll("\\bTERRACE\\b", "(TERRACE|TCE)");
            tempString = tempString.replaceAll("\\bTHROUGHWAY\\b", "(THROUGHWAY|THRU)");
            tempString = tempString.replaceAll("\\bTRUNKWAY\\b", "(TRUNKWAY|TKWY)");
            tempString = tempString.replaceAll("\\bTRACK\\b", "(TRACK|TRK)");
            tempString = tempString.replaceAll("\\bTRAIL\\b", "(TRAIL|TRL)");
            tempString = tempString.replaceAll("\\bVILLA\\b", "(VILLA|VLLA)");
            tempString = tempString.replaceAll("\\bVALLEY\\b", "(VALLEY|VLLY)");
            tempString = tempString.replaceAll("\\bVISTA\\b", "(VISTA|VSTA)");
            tempString = tempString.replaceAll("\\bVIEWS\\b", "(VIEWS|VWS)");
            tempString = tempString.replaceAll("\\bWOODS\\b", "(WOODS|WDS)");
            tempString = tempString.replaceAll("\\bWHARF\\b", "(WHARF|WHRF)");
            tempString = tempString.replaceAll("\\bWALKWAY\\b", "(WALKWAY|WKWY)");
            tempString = tempString.replaceAll("\\bWATERS\\b", "(WATERS|WTRS)");
            tempString = tempString.replaceAll("\\bWATERWAY\\b", "(WATERWAY|WTWY)");
            returnRoadString[i] = tempString;
        }
        return String.join(" ", returnRoadString);
    }
}