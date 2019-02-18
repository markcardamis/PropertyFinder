package Tools;

public class KeywordExists {

    public Boolean isKeywordPresent(String inputString, String[] keywords) {
        if (inputString != null && inputString.length() > 0 && keywords != null && keywords.length > 0) {
            for (String keyword : keywords) {
                if ((keyword != null) && (inputString.contains(keyword))) {
                    System.out.println("Keyword found " + keyword);
                    return true;
                }
            }
        }
        return false;
    }
}
