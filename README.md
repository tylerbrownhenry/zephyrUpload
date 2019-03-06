# Zephyr Upload

Script for connecting to Zephyr to upload files

## Getting Started

Install dependecies
```
npm install
```

### Generate your access keys in Jira

1. Go to: https://smartbear.atlassian.net/secure/Dashboard.jspa
2. From the sidebar, click 'tests'
3. From the sidebar, click 'API Keys'
4. Copy 'Access Key' and 'Secret Key'

### Create .env with the following

```
# secretKey from Jira
accessKey= 

# accessKey from Jira
secretKey=

# Jira username ie "yourfirstname.yourlastname"
userName=
```
### Run it

```
npm init
```