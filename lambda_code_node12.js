'use strict';
console.log('Loading generate presigned URL function');

var AWS = require('aws-sdk');
//var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

var s3 = new AWS.S3({
 signatureVersion: 'v4',
});

exports.handler = (event, context, callback) => {
    
    const url = s3.getSignedUrl('getObject', {
    Bucket: 'your bucket name',
    Key: event.queryStringParameters.name,
    Expires: 1000 //expiry time in sec
  });
    var name ;
    var responseCode = 200;
        console.log("request: " + JSON.stringify(event));
        if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters.name !== undefined && event.queryStringParameters.name !== null && event.queryStringParameters.name !== "") {
            console.log("Received name: " + event.queryStringParameters.name);
            name = event.queryStringParameters.name;
        }
       
        if (event.queryStringParameters.httpStatus !== undefined && event.queryStringParameters.httpStatus !== null && event.queryStringParameters.httpStatus !== "") {
            console.log("Received http status: " + event.queryStringParameters.httpStatus);
            responseCode = event.queryStringParameters.httpStatus;
        }
    }
 
    var responseBody = {
        'oneTimeUploadUrl': url,
        'resultUrl':name
    };
    var response = {
        statusCode: responseCode,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))

  
    callback(null, response);
  
};