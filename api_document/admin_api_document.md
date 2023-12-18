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
    user_id: int,
    admin: bool
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
    category : string,
    max_capacity : int,
    address: string,
    rule: string,
    price: int,
    available: bool,
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
            name : string,
            address: string,
            price: int,
            available: int,
            picture : string,
            rule: string,
            category: string
        },
        {
            id: int,
            name : string,
            address: string,
            price: int,
            available: int,
            picture : string,
            rule: string,
            category: string
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

