# Contents

- [For local dev](#for-local-dev)
- [API Definitions](#api-definitions)
  - [Get Component](#get-component)
  - [Create Component](#create-component)
  - [Update Component](#update-component)
  - [Get Classifications](#get-classifications)
  - [Get Controls](#get-classifications)
  - [Other APIs](#other-apis)
- [Instructions to initialize postgresql database](#instructions-to-initialize-postgresql-database)

# For local dev

- to run an instance of the postgres image as well as the backend rest-api service,
  cd to the backend directory and run `docker compose up`

# API Definitions

## Register A User

**POST /register**

```json
{
  "email": "test1@example.com",
  "password": "1234",
  "name": "test1",
  "access_type": "1"
}
```

**POST /login**

```json
{
  "email": "test1@example.com",
  "password": "1234",
}
```

**POST /logout**

```json
{
}
```

**GET /user**

**GET /components/{componentId}**

- Example: GET /components/1

```json
{
  "component": {
    "data": {
      "ID": 1,
      "CreatedAt": "2022-11-17T22:00:04.790248+08:00",
      "UpdatedAt": "2022-11-17T22:00:04.790248+08:00",
      "DeletedAt": null,
      "name": "nginx",
      "version": "1.10.2",
      "levelsPopulated": 6,
      "classification1": "Platform",
      "classification2": "Application",
      "classification3": "Content Management",
      "classification4": "Storage",
      "classification5": "Cloud Storage",
      "classification6": "Event-Based-Trigger",
      "classification7": "",
      "status": "componentDraft",
      "approved_by": "",
      "country": "SGP",
      "created_by": 1,
      "artifact": {
        "ID": 1,
        "CreatedAt": "2022-11-17T22:00:04.798025+08:00",
        "UpdatedAt": "2022-11-17T22:00:04.798025+08:00",
        "DeletedAt": null,
        "configs": [
          {
            "ID": 1,
            "CreatedAt": "2022-11-17T22:00:04.806076+08:00",
            "UpdatedAt": "2022-11-17T22:00:04.806076+08:00",
            "DeletedAt": null,
            "artifactId": 1,
            "label": "nginx config",
            "configLocation": "/etc/nginx/conf.d",
            "configFile": "server{}"
          }
        ],
        "componentId": 1,
        "testResultID": 0,
        "name": "nginx",
        "url": "http://nginx.org/download/nginx-1.23.1.tar.gz",
        "status": "CREATED",
        "taxonomy": "/software/webserver",
        "checksum": "W+Hsx5NfHdhWNdT+7a9mBZQDAlPMl8npyjgZ/+rDa2U=",
        "createdBy": 1,
        "approvedBy": 1
      }
    },
    "message": "Component found",
    "status": "Success"
  }
}
```

**GET /components?componentName={componentName}**

- Return all components with the specified name.
- Example: GET /components?componentName=nginx

```json
{
  "components": {
    "data": [
      {
        "ID": 1,
        "CreatedAt": "2022-11-17T22:00:04.790248+08:00",
        "UpdatedAt": "2022-11-17T22:00:04.790248+08:00",
        "DeletedAt": null,
        "name": "nginx",
        "version": "1.10.2",
        "levelsPopulated": 6,
        "classification1": "Platform",
        "classification2": "Application",
        "classification3": "Content Management",
        "classification4": "Storage",
        "classification5": "Cloud Storage",
        "classification6": "Event-Based-Trigger",
        "classification7": "",
        "status": "componentDraft",
        "approved_by": "",
        "country": "SGP",
        "created_by": 1,
        "artifact": {
          "ID": 1,
          "CreatedAt": "2022-11-17T22:00:04.798025+08:00",
          "UpdatedAt": "2022-11-17T22:00:04.798025+08:00",
          "DeletedAt": null,
          "configs": [
            {
              "ID": 1,
              "CreatedAt": "2022-11-17T22:00:04.806076+08:00",
              "UpdatedAt": "2022-11-17T22:00:04.806076+08:00",
              "DeletedAt": null,
              "artifactId": 1,
              "label": "nginx config",
              "configLocation": "/etc/nginx/conf.d",
              "configFile": "server{}"
            }
          ],
          "componentId": 1,
          "testResultID": 0,
          "name": "nginx",
          "url": "http://nginx.org/download/nginx-1.23.1.tar.gz",
          "status": "CREATED",
          "taxonomy": "/software/webserver",
          "checksum": "W+Hsx5NfHdhWNdT+7a9mBZQDAlPMl8npyjgZ/+rDa2U=",
          "createdBy": 1,
          "approvedBy": 1
        }
      }
    ],
    "message": "Component found",
    "status": "Success"
  }
}
```

## Create component

**POST /components/create**

- Create a new component with name and version.
- Note that this API only accepts name and version for a component.
- The status of the created component will always be set to `componentDraft`.
- Example request body:

```json
{
  "name": "kafka",
  "version": "3.3.1"
}
```

- Response body:

```json
{
  "component": {
    "data": {
      "ID": 3,
      "CreatedAt": "2022-11-17T22:06:32.1752361+08:00",
      "UpdatedAt": "2022-11-17T22:06:32.1752361+08:00",
      "DeletedAt": null,
      "name": "kafka",
      "version": "3.3.1",
      "levelsPopulated": 0,
      "classification1": "",
      "classification2": "",
      "classification3": "",
      "classification4": "",
      "classification5": "",
      "classification6": "",
      "classification7": "",
      "status": "componentDraft",
      "approved_by": "",
      "country": "",
      "created_by": 0,
      "artifact": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "configs": null,
        "componentId": 0,
        "testResultID": 0,
        "name": "",
        "url": "",
        "status": "",
        "taxonomy": "",
        "checksum": null,
        "createdBy": 0,
        "approvedBy": 0
      }
    },
    "message": "Successfully saved component",
    "status": "Success"
  }
}
```

## Update component

**PUT /components/{componentId}**

- Example: PUT /components/1
- Request body:

```json
{
  "version": "1.22.1"
}
```

- Response body:

```json
{
  "component": {
    "data": {
      "ID": 1,
      "CreatedAt": "2022-11-17T22:00:04.790248+08:00",
      "UpdatedAt": "2022-11-17T22:07:35.570354+08:00",
      "DeletedAt": null,
      "name": "nginx",
      "version": "1.22.1",
      "levelsPopulated": 6,
      "classification1": "Platform",
      "classification2": "Application",
      "classification3": "Content Management",
      "classification4": "Storage",
      "classification5": "Cloud Storage",
      "classification6": "Event-Based-Trigger",
      "classification7": "",
      "status": "componentDraft",
      "approved_by": "",
      "country": "SGP",
      "created_by": 1,
      "artifact": {
        "ID": 1,
        "CreatedAt": "2022-11-17T22:00:04.798025+08:00",
        "UpdatedAt": "2022-11-17T22:00:04.798025+08:00",
        "DeletedAt": null,
        "configs": [
          {
            "ID": 1,
            "CreatedAt": "2022-11-17T22:00:04.806076+08:00",
            "UpdatedAt": "2022-11-17T22:00:04.806076+08:00",
            "DeletedAt": null,
            "artifactId": 1,
            "label": "nginx config",
            "configLocation": "/etc/nginx/conf.d",
            "configFile": "server{}"
          }
        ],
        "componentId": 1,
        "testResultID": 0,
        "name": "nginx",
        "url": "http://nginx.org/download/nginx-1.23.1.tar.gz",
        "status": "CREATED",
        "taxonomy": "/software/webserver",
        "checksum": "W+Hsx5NfHdhWNdT+7a9mBZQDAlPMl8npyjgZ/+rDa2U=",
        "createdBy": 1,
        "approvedBy": 1
      }
    },
    "message": "Successfully updated component",
    "status": "Success"
  }
}
```

**PUT /components/{componentId}/classification?classificationLevel={level}&name={name}**

- For a component, update its classification at a given level.
- Example: PUT /components/1/classification?level=7&name=open source reverse proxies

```json
{
  "component": {
    "data": {
      "ID": 1,
      "CreatedAt": "2022-11-03T06:53:10.298894Z",
      "UpdatedAt": "2022-11-03T07:09:05.3654666Z",
      "DeletedAt": null,
      "name": "nginx",
      "version": "1.10.2",
      "levelsPopulated": 7,
      "classification1": "Platform",
      "classification2": "Application",
      "classification3": "Content Management",
      "classification4": "Storage",
      "classification5": "Cloud Storage",
      "classification6": "Event-Based-Trigger",
      "classification7": "open source reverse proxies",
      "status": "componentPendingApproval",
      "approved_by": "",
      "country": "SGP",
      "created_by": 1,
      "artifact": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "configs": null,
        "componentId": 0,
        "testResultID": 0,
        "name": "",
        "url": "",
        "status": "",
        "taxonomy": "",
        "checksum": null,
        "createdBy": 0,
        "approvedBy": 0
      }
    },
    "message": "Successfully updated component",
    "status": "Success"
  }
}
```

**PUT /components/{componentId}/status**

- For a component, update its status.
- Possible values for status:
  - `componentDraft`
  - `componentPendingApproval`
  - `componentApproved`
  - `componentRejected`
- Each value corresponds to a state in the [component state diagram](https://cldcvr.atlassian.net/wiki/spaces/CP/pages/18637455493/Component+Release+Service#Component-State-Machine). The diagram also displays all **allowed transitions** between states. For other transitions, the backend will return a 400 BadRequest.
- Example: PUT /components/2/status
- Request body:

```json
{
  "status": "componentRejected",
  "comment": ""
}
```

- Response body:

```json
{
  "component": {
    "data": {
      "ID": 2,
      "CreatedAt": "2022-11-17T22:45:20.718991+08:00",
      "UpdatedAt": "2022-11-17T22:50:25.9448051+08:00",
      "DeletedAt": null,
      "name": "cache",
      "version": "1.13.4",
      "levelsPopulated": 6,
      "classification1": "Platform",
      "classification2": "Application",
      "classification3": "Content Management",
      "classification4": "Storage",
      "classification5": "Cloud Storage",
      "classification6": "Event-Based-Trigger",
      "classification7": "",
      "status": "componentRejected",
      "approved_by": "",
      "country": "MYS",
      "created_by": 1,
      "artifact": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "configs": null,
        "componentId": 0,
        "testResultID": 0,
        "name": "",
        "url": "",
        "status": "",
        "taxonomy": "",
        "checksum": null,
        "createdBy": 0,
        "approvedBy": 0
      }
    },
    "message": "Successfully updated component",
    "status": "Success"
  }
}
```

**PUT /components/{componentId}/submit**

- Submit a component to external service. If succeed, the component status will be updated to `componentPendingApproval`
- A component can only be submitted if
  - the component status is `componentDraft`, and
  - the component has unique \<name, version, classification1, ..., classification7\> among the pending approval/approved components
- Example: PUT /components/1/submit

```json
{
  "component": {
    "data": {
      "ID": 1,
      "CreatedAt": "2022-11-17T22:45:20.714858+08:00",
      "UpdatedAt": "2022-11-17T22:52:18.5432171+08:00",
      "DeletedAt": null,
      "name": "nginx",
      "version": "1.10.2",
      "levelsPopulated": 6,
      "classification1": "Platform",
      "classification2": "Application",
      "classification3": "Content Management",
      "classification4": "Storage",
      "classification5": "Cloud Storage",
      "classification6": "Event-Based-Trigger",
      "classification7": "",
      "status": "componentPendingApproval",
      "approved_by": "",
      "country": "SGP",
      "created_by": 1,
      "artifact": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "configs": null,
        "componentId": 0,
        "testResultID": 0,
        "name": "",
        "url": "",
        "status": "",
        "taxonomy": "",
        "checksum": null,
        "createdBy": 0,
        "approvedBy": 0
      }
    },
    "message": "Successfully submitted component",
    "status": "Success"
  }
}
```

- Example response for a duplicate component:

```json
{
  "error": "The product, version & taxonomy already exist"
}
```

## Get Classifications

**GET /classifications/{classificationLevel}**

- Example: GET /classifications/1

```json
{
  "classifications": {
    "data": {
      "ID": 0,
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "DeletedAt": null,
      "classificationLevel": 1,
      "parentName": "Hardware",
      "classifications": ["Platform", "Infrastructure", "IT-System"]
    },
    "message": "Classifications found",
    "status": "Success"
  }
}
```

**GET /classifications/{classificationLevel}?parentName={parentName}**

- This will be based on the taxonomy hierarchy specified in [here](https://cldcvr.atlassian.net/wiki/spaces/CP/pages/18710659096/Technology+Deployables)
- Note that whitespace is encoded as + in the URL and the symbol & is encoded as %26.
- /classifications/4?parentName=communication & collaboration should be written as /classifications/4?parentName=communication+%26+collaboration
- Example: GET /classifications/2?parentName=platform

```json
{
  "classifications": {
    "data": {
      "ID": 0,
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "DeletedAt": null,
      "classificationLevel": 2,
      "parentName": "Hardware",
      "classifications": ["Platform", "Infrastructure", "IT-System"]
    },
    "message": "Classifications found",
    "status": "Success"
  }
}
```

## Get Control

- GET /controls/?classification_1=hardware&classification_2=application&classification_3=content-management
  Response (hard-coded for now) :

```json
{
  "controls": {
    "data": [
      {
        "controlID": 312321323,
        "controlName": "Australian ASM",
        "controlRequirement": "1551 - Guidelines for ICT Equipment - ICT equipment usage : An ICT equipment management policy is developed and implemented.",
        "standard": {
          "standardID": 34532678,
          "standardStatement": "0293 - Guidelines for ICT Equipment - ICT equipment usage : ICT equipment is classified based on the highest sensitivity or classification of data that it is approved for processing, storing or communicating."
        },
        "policy": {
          "policyID": 2374568,
          "policyStatement": "0297 - Guidelines for ICT Equipment - ICT equipment usage : The Australian Cyber Security Centre (ACSC)’s approval is sought before applying labels to external surfaces of high assurance ICT equipment."
        }
      },
      {
        "controlID": 312321311,
        "controlName": "Australian ASM",
        "controlRequirement": "0293 - Guidelines for ICT Equipment - ICT equipment usage : ICT equipment is classified based on the highest sensitivity or classification of data that it is approved for processing, storing or communicating.",
        "standard": {
          "standardID": 3987463,
          "standardStatement": "0293 - Guidelines for ICT Equipment - ICT equipment usage : ICT equipment is classified based on the highest sensitivity or classification of data that it is approved for processing, storing or communicating."
        },
        "policy": {
          "policyID": 9834642,
          "policyStatement": "0297 - Guidelines for ICT Equipment - ICT equipment usage : The Australian Cyber Security Centre (ACSC)’s approval is sought before applying labels to external surfaces of high assurance ICT equipment."
        }
      },
      {
        "controlID": 3123213142,
        "controlName": "Australian ASM",
        "controlRequirement": "0297 - Guidelines for ICT Equipment - ICT equipment usage : The Australian Cyber Security Centre (ACSC)’s approval is sought before applying labels to external surfaces of high assurance ICT equipment.",
        "standard": {
          "standardID": 56748392,
          "standardStatement": "0293 - Guidelines for ICT Equipment - ICT equipment usage : ICT equipment is classified based on the highest sensitivity or classification of data that it is approved for processing, storing or communicating."
        },
        "policy": {
          "policyID": 12948654,
          "policyStatement": "0297 - Guidelines for ICT Equipment - ICT equipment usage : The Australian Cyber Security Centre (ACSC)’s approval is sought before applying labels to external surfaces of high assurance ICT equipment."
        }
      }
    ],
    "message": "Successfully retrieve list of controls",
    "status": "Success"
  }
}
```

## Other APIs

**GET /components/{componentId}/artifact/**

- Example: GET /components/1/artifact/
- GET /classifications/1

```json
{
  "classifications": {
    "data": {
      "ID": 0,
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "DeletedAt": null,
      "classificationLevel": 1,
      "parentName": "Hardware",
      "classifications": ["Platform", "Infrastructure", "IT-System"]
    },
    "message": "Classifications found",
    "status": "Success"
  }
}
```

- GET /artifacts/

```json
{
  "artifacts": {
    "data": [
      {
        "ID": 1,
        "CreatedAt": "2022-10-03T11:10:37.756331Z",
        "UpdatedAt": "2022-10-03T11:10:37.756331Z",
        "DeletedAt": null,
        "configs": [
          {
            "ID": 1,
            "CreatedAt": "2022-10-03T11:10:37.759704Z",
            "UpdatedAt": "2022-10-03T11:10:37.759704Z",
            "DeletedAt": null,
            "artifactId": 1,
            "label": "nginx config",
            "configLocation": "/etc/nginx/conf.d",
            "configFile": "server{}"
          }
        ],
        "componentId": 1,
        "testResultID": 0,
        "name": "nginx",
        "url": "http://nginx.org/download/nginx-1.23.1.tar.gz",
        "status": "CREATED",
        "taxonomy": "/software/webserver",
        "checksum": "W+Hsx5NfHdhWNdT+7a9mBZQDAlPMl8npyjgZ/+rDa2U=",
        "createdBy": 1,
        "approvedBy": 1
      },
      {
        "ID": 2,
        "CreatedAt": "2022-10-03T11:10:37.758534Z",
        "UpdatedAt": "2022-10-03T11:10:37.758534Z",
        "DeletedAt": null,
        "configs": [],
        "componentId": 2,
        "testResultID": 0,
        "name": "redis",
        "url": "https://github.com/redis/redis/archive/7.0.4.tar.gz",
        "status": "CREATED",
        "taxonomy": "/software/cache",
        "checksum": "NPtGyEe7nfluUgWjnTgvZIpujc4eAUzYW0ymqI2I7QM=",
        "createdBy": 1,
        "approvedBy": 1
      }
    ],
    "message": "Successfully returned all artifacts",
    "status": "Success"
  }
}
```

- GET /artifacts/:artifactId/

```json
{
  "artifact": {
    "data": {
      "ID": 1,
      "CreatedAt": "2022-10-03T11:10:37.756331Z",
      "UpdatedAt": "2022-10-03T11:10:37.756331Z",
      "DeletedAt": null,
      "configs": [
        {
          "ID": 1,
          "CreatedAt": "2022-10-03T11:10:37.759704Z",
          "UpdatedAt": "2022-10-03T11:10:37.759704Z",
          "DeletedAt": null,
          "artifactId": 1,
          "label": "nginx config",
          "configLocation": "/etc/nginx/conf.d",
          "configFile": "server{}"
        }
      ],
      "componentId": 1,
      "testResultID": 0,
      "name": "nginx",
      "url": "http://nginx.org/download/nginx-1.23.1.tar.gz",
      "status": "CREATED",
      "taxonomy": "/software/webserver",
      "checksum": "W+Hsx5NfHdhWNdT+7a9mBZQDAlPMl8npyjgZ/+rDa2U=",
      "createdBy": 1,
      "approvedBy": 1
    },
    "message": "Artifact found",
    "status": "Success"
  }
}
```

- GET /artifacts/:artifactId/configs/

```json
{
  "configs": {
    "data": [
      {
        "ID": 1,
        "CreatedAt": "2022-10-03T11:10:37.759704Z",
        "UpdatedAt": "2022-10-03T11:10:37.759704Z",
        "DeletedAt": null,
        "artifactId": 1,
        "label": "nginx config",
        "configLocation": "/etc/nginx/conf.d",
        "configFile": "server{}"
      }
    ],
    "message": "Successfully returned configs",
    "status": "Success"
  }
}
```

- GET /configs/

```json
{
  "configs": {
    "data": [
      {
        "ID": 1,
        "CreatedAt": "2022-10-03T11:10:37.759704Z",
        "UpdatedAt": "2022-10-03T11:10:37.759704Z",
        "DeletedAt": null,
        "artifactId": 1,
        "label": "nginx config",
        "configLocation": "/etc/nginx/conf.d",
        "configFile": "server{}"
      }
    ],
    "message": "Successfully returned all configs",
    "status": "Success"
  }
}
```

- GET /testsets/

```json
{
  "testSets": {
    "data": [
      {
        "ID": 4,
        "CreatedAt": "2022-10-05T17:37:15.304587+08:00",
        "UpdatedAt": "2022-10-05T17:37:15.304587+08:00",
        "DeletedAt": null,
        "tests": [
          {
            "ID": 7,
            "CreatedAt": "2022-10-05T17:37:15.318236+08:00",
            "UpdatedAt": "2022-10-05T17:37:15.318236+08:00",
            "DeletedAt": null,
            "testSetId": 4,
            "controlId": "control",
            "name": "nginx_listenOnPort80_success",
            "script": "curl http://localhost:80",
            "createdBy": 1,
            "approvedBy": 0
          },
          {
            "ID": 8,
            "CreatedAt": "2022-10-05T17:37:15.330027+08:00",
            "UpdatedAt": "2022-10-05T17:37:15.330027+08:00",
            "DeletedAt": null,
            "testSetId": 4,
            "controlId": "control",
            "name": "nginx_serveStaticContent_success",
            "script": "curl http://localhost:80",
            "createdBy": 1,
            "approvedBy": 1
          }
        ],
        "taxonomy": "/software/webserver",
        "regulatoryDocument": "PDPA"
      }
    ],
    "message": "Successfully returned all test sets",
    "status": "Success"
  }
}
```

- GET /testsets/:testSetId

```json
{
  "testSet": {
    "data": {
      "ID": 4,
      "CreatedAt": "2022-10-05T17:37:15.304587+08:00",
      "UpdatedAt": "2022-10-05T17:37:15.304587+08:00",
      "DeletedAt": null,
      "tests": [
        {
          "ID": 7,
          "CreatedAt": "2022-10-05T17:37:15.318236+08:00",
          "UpdatedAt": "2022-10-05T17:37:15.318236+08:00",
          "DeletedAt": null,
          "testSetId": 4,
          "controlId": "control",
          "name": "nginx_listenOnPort80_success",
          "script": "curl http://localhost:80",
          "createdBy": 1,
          "approvedBy": 0
        },
        {
          "ID": 8,
          "CreatedAt": "2022-10-05T17:37:15.330027+08:00",
          "UpdatedAt": "2022-10-05T17:37:15.330027+08:00",
          "DeletedAt": null,
          "testSetId": 4,
          "controlId": "control",
          "name": "nginx_serveStaticContent_success",
          "script": "curl http://localhost:80",
          "createdBy": 1,
          "approvedBy": 1
        }
      ],
      "taxonomy": "/software/webserver",
      "regulatoryDocument": "PDPA"
    },
    "message": "Test set found",
    "status": "Success"
  }
}
```

- GET /testsets/:testSetId/tests

```json
{
  "tests": {
    "data": [
      {
        "ID": 7,
        "CreatedAt": "2022-10-05T17:37:15.318236+08:00",
        "UpdatedAt": "2022-10-05T17:37:15.318236+08:00",
        "DeletedAt": null,
        "testSetId": 4,
        "controlId": "control",
        "name": "nginx_listenOnPort80_success",
        "script": "curl http://localhost:80",
        "createdBy": 1,
        "approvedBy": 0
      },
      {
        "ID": 8,
        "CreatedAt": "2022-10-05T17:37:15.330027+08:00",
        "UpdatedAt": "2022-10-05T17:37:15.330027+08:00",
        "DeletedAt": null,
        "testSetId": 4,
        "controlId": "control",
        "name": "nginx_serveStaticContent_success",
        "script": "curl http://localhost:80",
        "createdBy": 1,
        "approvedBy": 1
      }
    ],
    "message": "Successfully returned tests",
    "status": "Success"
  }
}
```

- GET /tests/

```json
{
  "tests": {
    "data": [
      {
        "ID": 7,
        "CreatedAt": "2022-10-05T17:37:15.318236+08:00",
        "UpdatedAt": "2022-10-05T17:37:15.318236+08:00",
        "DeletedAt": null,
        "testSetId": 4,
        "controlId": "control",
        "name": "nginx_listenOnPort80_success",
        "script": "curl http://localhost:80",
        "createdBy": 1,
        "approvedBy": 0
      },
      {
        "ID": 8,
        "CreatedAt": "2022-10-05T17:37:15.330027+08:00",
        "UpdatedAt": "2022-10-05T17:37:15.330027+08:00",
        "DeletedAt": null,
        "testSetId": 4,
        "controlId": "control",
        "name": "nginx_serveStaticContent_success",
        "script": "curl http://localhost:80",
        "createdBy": 1,
        "approvedBy": 1
      }
    ],
    "message": "Successfully returned all tests",
    "status": "Success"
  }
}
```

- GET /tests/:testId

```json
{
    "test": {
        "data": {
            "ID": 7,
            "CreatedAt": "2022-10-05T17:37:15.318236+08:00",
            "UpdatedAt": "2022-10-05T17:37:15.318236+08:00",
            "DeletedAt": null,
            "testSetId": 4,
            "controlId": "control",
            "name": "nginx_listenOnPort80_success",
            "script": "curl http://localhost:80",
            "createdBy": 1,
            "approvedBy": 0
        },
        "message": "Test found",
        "status": "Success"
    }
}`
```

- GET /whitelists/

```json
{
  "whitelists": {
    "data": [
      {
        "ID": 4,
        "CreatedAt": "2022-10-05T19:41:56.624052+08:00",
        "UpdatedAt": "2022-10-05T19:41:56.624052+08:00",
        "DeletedAt": null,
        "url": "https://hub.docker.com/",
        "description": "docker hub",
        "createdBy": 1,
        "updatedBy": 1
      }
    ],
    "message": "Successfully returned all whitelists",
    "status": "Success"
  }
}
```

- GET /whitelists/:whitelistId

```json
{
  "whitelist": {
    "data": {
      "ID": 6,
      "CreatedAt": "2022-10-05T19:56:48.456191+08:00",
      "UpdatedAt": "2022-10-05T19:56:48.456191+08:00",
      "DeletedAt": null,
      "url": "https://hub.docker.com/",
      "description": "docker hub",
      "createdBy": 1,
      "updatedBy": 1
    },
    "message": "Whitelist found",
    "status": "Success"
  }
}
```

# Instructions to initialize postgresql database

To initialize the database, you can either:

- Use `psql` CLI to execute [init.sql](init.sql) on the database that psql is connected to, or
- Run docker command: `docker compose up` under the data directory. After the container is up, the database will be listening on localhost:5000 with

  - server: localhost
  - database name: dev
  - port: 5000
  - username: postgres
  - password: 123

  You can use PgAdmin to connect to the database.

# Instructions to initialize frontend

Instructions for mac

- open terminal
- yarn start

---

Instructions for windows
download node.js

- npm install -g yarn

- yarn add vite (delete yarn.lock if any issues, worked for me)
  yarn --version (check if yarn is successfully installed)

  1)Pull branch from overview-page

  2)open terminal (windows)

- yarn start (opens at localhost:8080)

- in overview page now
