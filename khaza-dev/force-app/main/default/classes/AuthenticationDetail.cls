public with sharing class AuthenticationDetail {

    private final static Lead__c leadConfig = Lead__c.getInstance();
    private final static String queryParams = '?grant_type=password&password=' + leadConfig.Password__c + '&username=' + leadConfig.Username__c +  '&client_id=' + leadConfig.Client_Id__c + '&client_secret=' + leadConfig.Client_Secret__c;
    
    public static void getNewToken() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setTimeout(120000);
        request.setEndpoint('https://login.salesforce.com/services/oauth2/token' + queryParams); 
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        HTTPResponse response = http.send(request);
       
        Map<String, Object> responseBody = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
        String token = (String)responseBody.get('access_token');

        leadConfig.Token__c = token;
        update leadConfig;
    }
}