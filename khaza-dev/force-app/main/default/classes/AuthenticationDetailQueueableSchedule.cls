public with sharing class AuthenticationDetailQueueableSchedule implements Schedulable {
    public void execute(SchedulableContext sc) {   
        System.enqueueJob(new AuthenticationDetailQueueable());
    }
}