package com.majoapps.propertyfinder.web.util;

public class InputUtil {
    public static boolean isNotNullOrEmpty(String str) {
        return(str != null && !str.isEmpty());
    }

    public static boolean isNotNullOrZero(Integer input) {
        return(input != null && input > 0);
    }
}