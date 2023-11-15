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
    gender : string
    badminton : int,
    basketball: int,
    volleyball : int,
    self_intro : str 
    
}
```

Response Format 
```
{
    "user_id" : int
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
    user_id : int
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
    email : string
    self_intro: string 
    badminton : int,
    basketball: int,
    volleyball : int,
}
```

Response Format
```
{
    user_id: int
}
```



### Update User password API

API URL: /api/user/profile/password

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
   old_password: string,
   new_password: string
}
```

Response Format
```
{
    user_id : int
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
    volleyball : int,    rqcode: string
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
            picture : string
            stadium_id: int
        },
        {
            id: int  
            picture : string
            stadium_id: int
        },
        {
            id: int
            picture : string
            stadium_id: int
        }
        

    ]
}

```

# activity related API

### Get activity list

API URL: /api/activity

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
            picture : string
            name : string
        },
        {
            id: int,
            picture : string
            name : string
        },
        ...
    ]
}

```
### Get the activity detail

API URL:/api/activity/:activity_id

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
    status: bool,
    peoples : int
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
    },
    users :[
        {
            id: int,
            name: string,
            picture: string
        }, ...
    ]

}
```

### list my activities

API URL:/api/activity/list/:status

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
            picture: string

        },
        {
            id: int,
            name : string
            picture: string
        },
        ...
    ]
}
```

### leave activity
API URL: /api/activity/:activity/leave

Method: DELETE

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
            name : string,
            picture: string
        },
        {
            statium_id: int,
            name : string
            picture : string
        },
        ...
    ]
}

```


### Get the stadium available time

API URL: /api/stadium/:catogory/:stadium_id/:date

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

### get stadium detail

API URL:/api/stadium/:catogory/:stadium_id

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
    name: string,
    fee: string,
    bathroom: bool,
    air_condition: bool,
    vending: bool,
    water: bool
    rule: string

}
```


### create activity 

API URL: /api/stadium/:catogory/:stadium_id/:date/:time

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

API URL: /api/event/:activity_id/read

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


# Feedback

### stadium information 
API URL: /api/feedback/:stadium_id

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
    name: string,
    fee: string,
    bathroom: bool,
    air_condition: bool,
    vending: bool,
    water: bool
}
```

### summit feeback
API URL: /api/feedback/:stadium_id

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
    type: string 
    problem: string
   
}
```
Response Format
```
{
    feedback_id: int
}
```

