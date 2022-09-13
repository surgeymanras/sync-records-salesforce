public with sharing class AuthenticationDetailSchedule implements Schedulable {
    public void execute(SchedulableContext sc) {   
        AuthenticationDetail.getNewToken();
    }
}