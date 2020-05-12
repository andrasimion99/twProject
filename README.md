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

```

## /api/states

### POST

Post a document into states db.

**Request body**

```JSON

```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3001/api/states`

**Returned data example**:

```JSON

```

## /api/states?id

### PATCH

Modify a document into states db.

**Query parameters**:

-   id - The id of the object you want to modify.

**Request body**

```JSON

```

**Return codes**:

-   200 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3001/api/states`

**Returned data example**:

```JSON

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