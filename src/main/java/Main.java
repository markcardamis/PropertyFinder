import ratpack.server.BaseDir;
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
        t.scheduleAtFixedRate(mTask, 0, 3600000L); // Run every hour
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
        if (dateHelper.isBusinessDay())
        {
          new MainTest().getListingsNSW(0);
          System.out.println("Run finished");
        } else {
          System.out.println("Not business hours");
        }
      } catch (Exception e){
        System.out.println("Main.java " + e.getMessage());
      }
    }
 }

  public static void main(String... args) throws Exception {
    RecordingService service = new RecordingService();
    
    RatpackServer server = RatpackServer.of(s -> s
      .serverConfig(c -> c.baseDir(BaseDir.find()))
      .registryOf(r -> r.add(service))
      .handlers(chain -> chain
        .get(ctx -> { 
          ctx.render("Run Started");
          new MainTest().getListingsNSW(3); 
        })
        .files(f -> f.dir("public").indexFiles("index.html"))
      ));
    
    server.start();
  }

}