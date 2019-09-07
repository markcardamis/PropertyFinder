package Tools;

public class StringCheck {
    public static String isNotNullOrEmpty(String str, String delimiter) {
        if(str != null && !str.isEmpty() && delimiter != null) {
            return ((str.endsWith(delimiter)) ? str : str + delimiter); // don't double add delimiter
        }
        return "";
    }

    public static boolean isNotNullOrEmpty(String str) {
        return(str != null && !str.isEmpty());
    }
}
