public with sharing class SyncListController {

    @AuraEnabled(cacheable=false)
    public static RecepientOrg__c saveButton(String username, String clientId, String password, String clientSecret) {
        System.debug('!!!!!!' + username);

        RecepientOrg__c config = [SELECT Username__c, Client_Id__c, Password__c, Client_Secret__c FROM RecepientOrg__c LIMIT 1];
        config.Username__c = username;
        config.Client_Id__c = clientId;
        config.Password__c = password;
        config.Client_Secret__c = clientSecret;

        update config;

        return config;
    }
}
