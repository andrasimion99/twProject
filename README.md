# TW PROJECT API

## Response structure

The structure of the API responses' body is as follows:

-   for successful responses, a JSON object containing the properties:
    -   `status`: `success`
    -   `data`: An object, structure detailed for each route below.
-   for unsuccessful responses, a JSON object containing the
    properties.
    -   `status`: `fail`
    -   `error`: An object containing a `message` property, and
        sometimes additional helpful properties.


## /api/states

### GET

Get the all the data from the db.
Data is represented by documents with the obesity percentage for the total population of each country, within the years 2011-2018.

**Query parameters**:

-   country - Select only the data for a specific country.
-   year - Select only the data for a specific year.

**Return codes**:

-   200 - OK
-   400 - There was a problem fetching data

**Usage example**:  
 `localhost:3001/api/states`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": [
      {
         "_id": "5e8c9f221f3c4c71f47a1ccd",
         "﻿ID": "21933",
         "Description": "2011",
         "LocationAbbr": "IL",
         "LocationDesc": "Illinois",
         "DataSource": "BRFSS",
         "Topic": "Obesity / Weight Status",
         "Data_Value": "27.1",
         "Sample_Size": "5",
         "Stratification1": "Total",
         "StratificationId1": "Total",
         "LocationDisplayOrder": "OVERALL"
      },
      {
         "_id": "5e8c9f221f3c4c71f47a1cc4",
         "﻿ID": "26780",
         "Description": "2011",
         "LocationAbbr": "CA",
         "LocationDesc": "California",
         "DataSource": "BRFSS",
         "Topic": "Obesity / Weight Status",
         "Data_Value": "23.8",
         "Sample_Size": "17",
         "Stratification1": "Total",
         "StratificationId1": "Total",
         "LocationDisplayOrder": "OVERALL"
      }
   ]
}
```

## /api/states

### POST

Post a document into states db.

**Request body**

```JSON
{
    "ID": "671",
    "Description": "2019",
    "LocationAbbr": "US",
    "LocationDesc": "National",
    "DataSource": "BRFSS",
    "Topic": "Obesity / Weight Status",
    "Data_Value": "27.4",
    "Sample_Size": "470",
    "Stratification1": "700",
    "StratificationId1": "Total",
    "LocationDisplayOrder": "OVERALL"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3001/api/states`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "ID": "671",
      "Description": "2019",
      "LocationAbbr": "US",
      "LocationDesc": "National",
      "DataSource": "BRFSS",
      "Topic": "Obesity / Weight Status",
      "Data_Value": "27.4",
      "Sample_Size": "470",
      "Stratification1": "700",
      "StratificationId1": "Total",
      "LocationDisplayOrder": "OVERALL"
   }
}
```

## /api/states?id

### PATCH

Modify a document into states db.

**Query parameters**:

-   id - The id of the object you want to modify.

**Request body**

```JSON
{
    "ID": "671",
    "Description": "2019",
    "LocationAbbr": "US",
    "LocationDesc": "National",
    "DataSource": "BRFSS",
    "Topic": "Obesity / Weight Status",
    "Data_Value": "27.4",
    "Sample_Size": "470",
    "Stratification1": "700",
    "StratificationId1": "Total",
    "LocationDisplayOrder": "OVERALL"
}
```

**Return codes**:

-   200 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3001/api/states?id=5ebd2b39eeb71e05e4fc5349`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "n": 1,
      "nModified": 1,
      "opTime": {
         "ts": "6826661366632284162",
         "t": 18
      },
      "electionId": "7fffffff0000000000000012",
      "ok": 1,
      "$clusterTime": {
         "clusterTime": "6826661366632284162",
         "signature": {
            "hash": "T44xuKftQy2O78t7gZ5lAhVfyyg=",
            "keyId": "6796929880727486466"
         }
      },
      "operationTime": "6826661366632284162"
   }
}
```

## /api/states

### DELETE

Delete the all the data from the states db.
Data is represented by documents with the obesity percentage for the total population of each country, within the years 2011-2018.

**Query parameters**:

-   country - Delete only the data for a specific country.
-   year - Delete only the data for a specific year.

**Return codes**:

-   204 - NO CONTENT
-   400 - There was a problem fetching data

**Usage example**:  
 `localhost:3001/api/states`

**Returned data example**:

```JSON

```