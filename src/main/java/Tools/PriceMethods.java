
package Tools;


public class PriceMethods
{
    public static Integer stringToInteger(String text) throws Exception {

        String errorNumber = "10000000";

        if(text.matches(".*\\d.*")) {
            int firstIndex = text.indexOf('$');
            if (firstIndex >= 0) { // found a $
                text = text.substring(firstIndex + 1);

                int secondIndex = text.indexOf('$');
                if (secondIndex > 0) {
                    text = text.substring(0, secondIndex);
                }
                if (text.length() < 6) {
                    if (text.contains("m") || text.contains("M")) {
                        text = text.replaceAll("[^0-9.]", "");
                        return ((int) (Double.parseDouble(text) * 1000000));
                    } else if (text.contains("k") || text.contains("K")) {
                        text = text.replaceAll("[^0-9.]", "");
                        return ((int) (Double.parseDouble(text) * 1000));
                    } else {
                        text = text.replaceAll("[^0-9.]", "");
                        return ((int) (Double.parseDouble(text) * 1000000));
                    }
                } else {
                    text = text.replaceAll("[^0-9.]", "");
                }
            } else {
                text = errorNumber;
            }
        } else {
            text = errorNumber;
        }

        return ((int) Double.parseDouble(text));
    }

}


