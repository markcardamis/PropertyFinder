package Tools;

public class PriceMethods
{
    public static Integer stringToInteger(String text) throws Exception{
        int firstIndex = text.indexOf('$');
        if (firstIndex >= 0) { // found a $
            text = text.substring(firstIndex+1);
            if (text.length() < 12) {
                text = text.replaceAll("[^0-9.]", "");
            } else {
                int secondIndex = text.indexOf('$');
                if (secondIndex > 0){ // found a second $
                    text = text.substring(0, secondIndex);
                    text = text.replaceAll("[^0-9.]", "");
                } else {
                    text = "10000000";
                }
            }
        } else {
            text = "10000000";
        }
        return (Integer.valueOf(text));
    }

}