public with sharing class HttpCalloutManager {
	public static HttpRequest createRequest(String method, String endpoint, String body, Map<String, String> headers) {
     
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod(method);
        request.setTimeout(120000); 
        for (String key : headers.keySet()) {
           request.setHeader(key, headers.get(key));
        }      

        if (method.toUpperCase() == 'POST') {
           request.setBody(body);
        }
        else if (method.toUpperCase() == 'PUT') {
          request.setBody(body);
       }
        
        return request;
}
}
