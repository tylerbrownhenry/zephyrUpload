require('dotenv').load();
const request = require('request');
const jwt = require('atlassian-jwt');
const crypto = require("crypto");
const fs = require("fs");

const accessKey = process.env.accessKey;
const secretKey = process.env.secretKey;
const userName = process.env.userName;

if(!accessKey || !secretKey || !userName){
    return console.log('Create an .env file with accessKey, accessKey, and userName');
}

const contentType = 'multipart/form-data; charset=UTF-8';
const method = 'POST';
const baseURL = 'https://prod-api.zephyr4jiracloud.com/connect';

const apiURL = 'https://prod-api.zephyr4jiracloud.com/connect/public/rest/api/1.0';

const versionId = '-1';
const entityName = 'teststep';
const executionId = 'undefined';
const entityId = '91d71b3a-2c2f-410b-8294-bdfb675e0a4f';
const projectId = '11502';
const issueId = '1139144';
const cycleId = '1b625181-afe1-4dae-82e7-31997789fb3e';

function makeRequest(config){
    const { method, uri, contentType, accessKey, secretKey, userName, baseURL, apiURL } = config;
    const url = `${apiURL}${uri}`;

    const hash = crypto.createHash('sha256');
    const encodedQSH = hash.digest('hex');
    const iat = new Date().getTime();
    const exp = iat + 3600;
    
    const payload = {
        'sub': userName,
        'iss': accessKey,
        'iat': iat,
        'exp': exp,
        'qsh': '82706ffd3a0d43ccf4d8e90eacf113fbc8a5949104aa280b0b4f52399a8cbf05' || encodedQSH
    };

    const token = jwt.encode(payload, secretKey);
    
    const headers ={
        "Content-Type":contentType,
        'Authorization': 'JWT ' + token,
        "zapiAccessKey": accessKey
    };

    request.post({
      method,
      url,
      headers,
      formData:{
        my_file:fs.createReadStream(__dirname + '/exampleUpload/be50f1c9de71e9969a5e8b629fdb271e.png'),
      }
    }, function (error, response, body) {
        if(response.statusCode !== 200){
            console.log('Error', error);
        }
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
    });

}

function formUrl(config){
    const {entityId, projectId, issueId, cycleId, versionId, executionId, entityName} = config;
    url = `/attachment?entityId=${entityId}`;
    url += `&executionId=${executionId}`;
    url += `&entityName=${entityName}`;
    url += `&projectId=${projectId}`;
    url += `&issueId=${issueId}`;
    url += `&cycleId=${cycleId}`;
    url += `&versionId=${versionId}`;
    url += `&comment=`;
    return url;
}

const uri = formUrl({
    entityId,
    projectId,
    issueId,
    cycleId,
    versionId,
    entityName,
    executionId
});

makeRequest({
    uri,
    method,
    contentType,
    accessKey,
    secretKey,
    userName,
    baseURL,
    apiURL})
