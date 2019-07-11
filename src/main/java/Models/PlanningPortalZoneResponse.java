package Models;

import com.google.gson.annotations.SerializedName;

public class PlanningPortalZoneResponse {
    public String id;
    public String layerName;
    public Results results[];

    public static class Results {
        @SerializedName("EPI Name") public String EPI_Name;
        @SerializedName("LGA Name") public String LGA_Name;
        @SerializedName("EPI Type") public String EPI_Type;
        public String title;
        @SerializedName("Land Use") public String Land_Use;
        public String Zone;
        @SerializedName("Floor Space Ratio") public String Floor_Space_Ratio;
    }
}
