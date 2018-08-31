package Models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PlanningPortalZoneResponse {
    public String type;
    public Data data;

    public static class Data {
        public String id;
        public String label;
        public Result[] results;
        public Map<String, Object> additional_properties = new HashMap<String, Object>();
    }

    public static class Result {
        public String hidden_leg_link_path;
        public String display_css;
        public String display_content;
        public String display_value;
        public List<Attribute> attributes = null;
        public Map<String, Object> additional_properties = new HashMap<String, Object>();
    }

    public static class Attribute {
        public Integer id;
        public String field_label;
        public String field_name;
        public String field_value;
        public Map<String, Object> additional_properties = new HashMap<String, Object>();
    }
}
