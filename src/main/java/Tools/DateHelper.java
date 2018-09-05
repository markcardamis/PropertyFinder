package Tools;

import java.util.Calendar;
import java.util.TimeZone;

public class DateHelper {
    public boolean isBusinessDay(){
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Australia/Sydney"));

        // check if weekend
        if(cal.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY){
            return false;
        } else if ((cal.get(Calendar.HOUR_OF_DAY) < 9) || (cal.get(Calendar.HOUR_OF_DAY) > 18)){
            return false;
        }
        // IF NOTHING ELSE, IT'S A BUSINESS DAY
        return true;
    }
}
