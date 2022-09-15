public with sharing class SyncLeadButtonController {
    
    @AuraEnabled(cacheable=true)
    public static void syncLead(Id recordId) {
        RecepientOrgTokens__c tokenAndInstance = [SELECT Token__c, Instance_URL__c FROM RecepientOrgTokens__c LIMIT 1];
        Lead leadInfo = [SELECT Salutation, FirstName, LastName, Company, Status FROM Lead LIMIT 1];

        String customLabel = System.Label.Second_part_for_recipient_org;
        String endpoint = tokenAndInstance.Instance_URL__c + customLabel;
        
        Map<String, String> headers = new Map<String, String>();
        headers.put('Authorization', 'Bearer ' + tokenAndInstance.Token__c);
        headers.put('Content-Type', 'application/json;charset=UTF-8');

        Map<String, String> body = new Map <String, String>();
        body.put('Salutation', leadInfo.Salutation);
        body.put('FirstName', leadInfo.FirstName);
        body.put('LastName', leadInfo.LastName);
        body.put('Company', leadInfo.Company);
        body.put('Status', leadInfo.Status);

        Http http = new Http();
        HttpRequest request = HttpCalloutManager.createRequest('POST', endpoint, JSON.serialize(body), headers);
        HTTPResponse response = http.send(request);
    }
}
