package com.majoapps.propertyfinder.utils;

import java.util.Calendar;
import java.util.TimeZone;

@Slf4j
public class DateHelper {
    public boolean isBusinessDay(){
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Australia/Sydney"));
        Integer hours = (cal.get(Calendar.HOUR_OF_DAY));

        // check if weekend
        if(cal.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY){
            return false;
        } else if (( hours < 9) || (hours > 18)){
            return false;
        }
        // IF NOTHING ELSE, IT'S A BUSINESS DAY
        return true;
    }
}
