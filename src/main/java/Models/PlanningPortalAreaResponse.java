package Models;

public class PlanningPortalAreaResponse {
    public String type;
    public Data data;

    public static class Data {
        public Float area;
        public String plan;
        public String address;
        public String council_name;
        public String[] layer_ids;
        public String lot;
        public String lpi;
    }

}
