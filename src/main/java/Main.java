import ratpack.server.RatpackServer;
import ratpack.service.Service;
import ratpack.service.StartEvent;
import java.util.Timer;
import java.util.TimerTask;


public class Main {
  
  static class RecordingService implements Service {
    public void onStart(StartEvent event) {
      System.out.println("Hey, I started");

      try {
        Timer t = new Timer();
        MyTask mTask = new MyTask();
        t.scheduleAtFixedRate(mTask, 0L, 3600000L);
      } catch (Exception e) {
        System.out.println("Exception");
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
        System.out.println("Hi see you after 60 minutes");
        MainTest mainTest = new MainTest();
        mainTest.getListings();
        System.out.println("Run finished");
      } catch (Exception e){
        System.out.println("Exception");
      }
    }
 }

  public static void main(String... args) throws Exception {
    RecordingService service = new RecordingService();
    
    MyTask mTask = new MyTask();
    RatpackServer server = RatpackServer.of(s -> s
      .registryOf(r -> r.add(service))
      .handler(r -> ctx -> ctx.render("ok"))
    );
    server.start();

  }

}