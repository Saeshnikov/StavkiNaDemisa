# StavkiNaDemisa
****
/user

GET:

    input:  '{ "secret_code" }'
    output: '{ "secret_code", "balance" (after bd con) }'

Get user's balance

****
/event

POST:

    input:  '{ "sname" , "sdescription" }'
    output: '{ "sname" , "sdescription" }'

Make new event

PUT:

    input:  '{ "id" , "result" }'
    output: '{ "id" , "result" }'

Close event

GET:

    input:  '{ "is_open" }'
    output: '{ "is_open" }'

Get open/all events

****
/bet

POST:

    input:  '{ "sid" , "secret_code" , "prediction" , "size" }'
    output: '{ "sid" , "secret_code" , "prediction" , "size" }'

Place a bet

GET:

    input:  '{ "secret_code" }'
    output: '{ "sid" , "secret_code" , "prediction" , "size" }'

Get user's bets
