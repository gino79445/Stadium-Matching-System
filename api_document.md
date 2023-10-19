# API Docs

## User related API

### Sign Up API

API URL: /api/user/signup

Method: POST

response type: application/json

Input Format
```
{
    email: string,
    password: string,
    name: string
    age: int
    badminton : int,
    basketball: int,
    table_tennis: int
    baseball : int
    
    
}
```

Response Format 
```
{
    token: JWT
}
```

### Sign in API

API URL: /api/user/signin

Method: POST

response response type: application/json

Input Format
```
{
    email: string,
    password: string,
}
```

Response Format 
```
{
    token: JWT
}
```

### Personal Profile Update API

API URL: /api/user/profile

Method: PUT

response response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    name: string,
    self_intro: string
}
```

Response Format
```
{
    user_id: int
}
```

### Update User Profile Picture API

API URL: /api/user/profile/picture

Method: PUT

response response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Send as multipart/form-data

Input Format
```
{
    picture: file
}
```

Response Format
```
{
    picture : string
}
```

### Get User Profile API

API URL: /api/user/profile

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Query: user_id: int

Response Format
```
{
    user_id: int,
    name: string,
    email: string,
    picture: string,
    badminton : int,
    basketball: int,
    table_tennis: int
    baseball : int
}
```
# Home


API URL: /api

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
  
    activity : [
        {
            id: int
            stadium_id: int
        },
        {
            id: int  
            stadium_id: int
        },
        {
            id: int
            stadium_id: int
        }
        

    ]
}

```

# Stadium related API


### Get stadium list

API URL: /api/stadium/:catogory/

catogory: badminton, basketball, table_tennis, baseball

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{

    stadium:[
        {
            statium_id: int,
            name : string
        },
        {
            statium_id: int,
            name : string
        },
        ...
    ]
}

```

### Get activity list

API URL: /api/stadium/:catogory/activity

catogory: badminton, basketball, table_tennis, baseball

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{

    activity:[
        {
            id: int,
            name : string
        },
        {
            id: int,
            name : string
        },
        ...
    ]
}

```

### Get the stadium available time

API URL: /api/stadium/:catogory/activity/:stadium_id/:date

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    data: {
        times: {
            09:00: string,
            10:00: string,
            11:00: string,
                ...
            18:00: string
        },
        people: int,
        bathroom: bool,
        air_condition: bool,
        vending: bool,
        water: bool
    }
}
```




### Get the activity detail

API URL:/api/stadium/:catogory/activity/:activity_id

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    status: string,
    time: string,
    stadium : {
        name: string,
        fee: string,
        bathroom: bool,
        air_condition: bool,
        vending: bool,
        water: bool

    },    
    creator: {
        id: int,
        name: string,
        picture: string
    }

}
```



### create activity 

API URL: /api/stadium/:catogory/activity/:stadium_id/:date/:time

Method: POST

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    stadium_id: int,
    name: string,
    people: int
    level : int
    desciption: string
}
```


Response Format
```
{
    activity_id: int
}
```

### join activity

API URL: /api/stadium/:activity_id/join

Method: POST

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```


Response Format
```
{
    activity_id: int
}
```




# Event 

### Get event
API URL: /api/event/

Method: get

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```


Response Format
```
{
   
    event: [
        {
            event_id: int,
            stadium_id: int,
            activity_id: int
            name: string,
            is_read: int,
            message : string
        }, ...
    ]
}
```

### Read event

API URL: /api/event/:event_id/read

Method: POST

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    event_id: int
}
```
