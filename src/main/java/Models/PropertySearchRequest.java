package Models;

public class PropertySearchRequest {
    public String listingType;
    public String[] propertyTypes;
    public Integer minLandArea;
    public Integer maxLandArea;
    public Integer minPrice;
    public Integer maxPrice;
    public Integer page;
    public Integer pageSize;
    public String dateUpdated;
    public Locations[] locations;
    public String planningPortalURL;

    public static class Locations {
        public String state;
        public String region;
        public String area;
        public String suburb;
        public String postCode;
        public Boolean includeSurroundingSuburbs;
    }
}
