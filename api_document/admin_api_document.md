# API Docs

## Admin related API

### Sign in API

API URL: /api/admin/signin

Method: POST

response response type: application/json

Input Format
```
{
    account: string,
    password: string,
}
```

Response Format 
```
{
    token: JWT
}
```

# stadium related API


### available API

API URL: /api/admin/stadium/available

Method: POST

response type: application/json

Input Format
```
{
    name: string,
    type : string,
    people : int,
    location: string,
    intro : string,
    rule: string,
    bathroom: bool,
    air_condition: bool,
    vending: bool,
    water: bool
    
}
```

Response Format 
```
{
    stadium_id : int
}
```

### list stadium API

API URL: /api/admin/stadium/available

Method: POST

response type: application/json

Input Format
```
{
    name: string,
    type : string,
    people : int,
    location: string,
    intro : string,
    rule: string,
    picture: file
    bathroom: bool,
    air_condition: bool,
    vending: bool,
    water: bool
    
}
```

Response Format 
```
{
    stadium_id : int
}
```

### list API

API URL: /api/admin/stadium/list

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


# Feedback API


API URL: /api/admin/feedback/:feedback_id

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
    feedback: string
}

```


# Event 

### Get event
API URL: /api/admin/event/

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
            feedback_id: int
            stadium_id: int,
            activity_id: int
            is_read: int,
            message : string
        }, ...
    ]
}
```

### Read event

API URL: /api/admin/event/:feedback_id/read

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
    feedback_id: int
}
```

