import ratpack.server.RatpackServer;
import ratpack.service.Service;
import ratpack.service.StartEvent;
import java.util.Timer;
import java.util.TimerTask;

import Tools.DateHelper;


public class Main {
  
  static class RecordingService implements Service {
    public void onStart(StartEvent event) {
      try {
        Timer t = new Timer();
        MyTask mTask = new MyTask();
        t.scheduleAtFixedRate(mTask, 0L, 3600000L); // Run every hour
      } catch (Exception e) {
        System.out.println("Scheduling Exception " + e.getMessage());
      }
    }
  }

  static class MyTask extends TimerTask{
    public MyTask(){
      //Some stuffs
    }
    @Override
    public void run() {
      try {
        DateHelper dateHelper = new DateHelper(); // Only run at 5pm
        if (true)
        {
          new MainTest().getListings();
          System.out.println("Run finished");
        } else {
          System.out.println("Not business hours");
        }
      } catch (Exception e){
        System.out.println("Main.java " + e.toString());
      }
    }
 }

  public static void main(String... args) throws Exception {
    RecordingService service = new RecordingService();
    
    RatpackServer server = RatpackServer.of(s -> s
      .registryOf(r -> r.add(service))
      .handler(r -> ctx -> ctx.render("ok"))
    );
    server.start();
  }

}