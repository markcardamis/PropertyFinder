package Tools;

public class StringCheck {
    public static String isNotNullOrEmpty(String str, String delimiter) {
        if(str != null && !str.isEmpty())
            return str + delimiter;
        return "";
    }

    public static boolean isNotNullOrEmpty(String str) {
        return(str != null && !str.isEmpty());
    }
}
