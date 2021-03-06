package com.majoapps.propertyfinder.web.util;

public class InputUtil {
    public static boolean isNotNullOrEmpty(String str) {
        return(str != null && !str.isEmpty());
    }

    public static boolean isNotNullOrZero(Integer input) {
        return(input != null && input > 0);
    }

    public static String returnStringOrNull(String str) {
        return(isNotNullOrEmpty(str) ? str : null);
    }
}