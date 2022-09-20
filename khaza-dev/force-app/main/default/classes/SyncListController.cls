public with sharing class SyncListController {

    @AuraEnabled(cacheable=false)
    public static RecepientOrg__c saveButton(String username, String clientID, String password, String clientSecret, String env) {
        System.debug('!!!!!!' + username);

        RecepientOrg__c config = [SELECT Username__c, Client_Id__c, Password__c, Client_Secret__c, BaseURL__c FROM RecepientOrg__c LIMIT 1];
        config.Username__c = username;
        config.Client_Id__c = clientID;
        config.Password__c = password;
        config.Client_Secret__c = clientSecret;
        if (env == 'Sandbox') {
            config.BaseURL__c = 'http://test.salesforce.com/';
        } else {
            config.BaseURL__c = 'http://login.salesforce.com/';
        }

        update config;

        return config;
    }
}
