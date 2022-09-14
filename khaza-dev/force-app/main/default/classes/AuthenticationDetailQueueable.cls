public class AuthenticationDetailQueueable implements Queueable {
    public void execute(QueueableContext context) {

        RecepientOrg__c leadConfig = [SELECT Password__c, Username__c, Client_Id__c, Client_Secret__c FROM RecepientOrg__c LIMIT 1];
        String queryParams = '?grant_type=password&password=' + leadConfig.Password__c + '&username=' + leadConfig.Username__c +  '&client_id=' + leadConfig.Client_Id__c + '&client_secret=' + leadConfig.Client_Secret__c;
       
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setTimeout(120000);
        String customLabel = System.Label.RecepientOrg;
        request.setEndpoint(customLabel + queryParams); 
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        HTTPResponse response = http.send(request);
        
        Map<String, Object> responseBody = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
        String token = (String)responseBody.get('access_token');
        String instanceUrl = (String)responseBody.get('instance_url');
        
        RecepientOrgTokens__c recepientOrgToken = [SELECT Token__c, Instance_URL__c FROM RecepientOrgTokens__c LIMIT 1];
        recepientOrgToken.Token__c = token;
        recepientOrgToken.Instance_URL__c = instanceUrl;
        update recepientOrgToken;
    }
}