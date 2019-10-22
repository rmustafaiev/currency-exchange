## Specification, Terms

****Following DOC explains business requirements  
for particular case of the Currency Rate Application****  
  
####Glossary 

 - Currency - A currency of particular country/region, mostly used in a
   form of abbreviation like `USD` 'EUR' ...
 - Code - currency abbr like USD\UAH (US dollar | Ukrainian Hryvna)
   etc..
 - Base - currency where all other currencies rates based on BASE = UAH,
   USD = 25.97 UAH, EUR = 29.78 UAH ...
 - Rate - an coefficient of the base currency to the target currency e.g
   1 USD = 24.98 UAH ...
 - Currency rate - the rate of source currency to the target currency it
   involves
 - Cross course - the coefficient between target and source currencies
   like 1 USD = 0.9 EUR  involving no base currency rather calculated on information provide by chosen data source  
 - Data source - is the reference source of the currency rates got from since we do not provide responsibility of finance markets or government
 - CRUD - create read update delete operations
 - API Error - An error thrown if path not found
 - bl error - An error thrown if query doesnt fit business rules eg. validation/date range/datasource etc ...  
 - server error - Any error thrown by server  
  
  
####Goals 
    The app should provide an initial but still sufficient API to work with  
    Currency rate 'terms' like local currency rate among to other world currencies  
    based on the source currency to the target currency. Also it should  
    show cross rates between current or referred currency and target currency.  
    It should provide historical currency rate values by the query specified by consumer.  
    It should allow editing in order consumer can modify currency rates  
    by their own discretion but limited to the consumer data source.  


####API Restrictions and rules 
 - One should not and have no ability to modify rates, provided by external data sources (from the world)
 - consumer have ability to CRUD only 'local' data source which is UDS - user defined data source
 - By default API queries can omit dataSource parameter and it will be considered as UDS  

####Data by default
Provided, by application migration scripts.
Available, Data 2019-09-01 till 2019-10-20
except  between '2019-10-07' and '2019-10-15'

####API server
> baseUrl = http://host:port/api 
>port 8088 by config 

####API Endpoints
****Brief****
```
    api/rates/historical/from/:start/to/:end?currency='USD'
    api/rates/:date?currency='EUR'
    api/rates
    api/rates/convert/:date/:currencyCode?currency='GBP'
    api/rates/convert/:date/:sourceCode/to/:targetCode
```

****Get currency rates****

Returns currency rates by date, and currency if specified.
otherwise returns list a of all available.

```
curl -X GET \
  'http://localhost:8088/api/rates/2019-10-05?currency=USD' \
  -H 'Postman-Token: 2145e00f-96c6-454d-a085-0bdb13df9e48' \
  -H 'cache-control: no-cache'

method: GET

params:
    date - in format YYYY-MM-DD, eg '2019-10-20'

query params: 
    currency - optional, one of available currency codes .. 'USD', 'GBP' ...

response:
{
    "base": "UAH",
    "dataSource": "UDS",
    "ecxhangeDate": "2019-10-04T21:00:00.000Z",
    "rates": [
        {
            "id": 138,
            "code": "USD",
            "rate": "24.877"
        }
        ...
    ]
}
```


--------------
****Get historical/range currency rates****

Returns currency rates in a range based on starting date and end date.
Optional filters Are:
currency code = USD - will return only rates per currency
limit - number of records to show
offset - shift from the beginning of over count ...

```
curl -X GET \
  'http://localhost:8088/api/rates/historical/from/2019-10-01/to/2019-10-20?currency=USD' \
  -H 'Postman-Token: 1ced9171-3b08-4b1f-8fa6-b2a870afd99d' \
  -H 'cache-control: no-cache'

method: GET

params:
    start - search begin from date, in format YYYY-MM-DD, eg '2019-10-20'
    end - end date, search till date,  format YYYY-MM-DD, eg '2019-10-20'

query params: 
    currency - optional, one of available currency codes .. 'USD', 'GBP' ...
    limit - optional
    offset - optinal 

response:
[
    {
        "id": 198,
        "code": "USD",
        "ds_name": "UDS",
        "rate": "24.734",
        "exchange_date": "2019-10-19T21:00:00.000Z",
        "modified": "2019-10-20T18:45:25.020Z"
    },
    {
        "id": 194,
        "code": "USD",
        "ds_name": "UDS",
        "rate": "24.734",
        "exchange_date": "2019-10-18T21:00:00.000Z",
        "modified": "2019-10-20T18:45:25.020Z"
    },
    ...
]
```
---------- 
****Convert currency rates****

Converts all the available currencies to the 
new base currency as per Requested
E.g we have Base currency in UAH
If we set param to be USD, all the currency rates will
be recalculated

```
curl -X GET \
  'http://localhost:8088/api/rates/convert/2019-10-20/USD?amount=100' \
  -H 'Postman-Token: ae94ea5e-a761-4bb0-a366-c78382aeb12e' \
  -H 'cache-control: no-cache'

method: GET

params:
    date - in format YYYY-MM-DD, eg '2019-10-20'
query params: 
    amount - it will add amount of converted rate
    eg. 100 GBP = 127 USD ...
response:
{
    "base": "USD",
    "exchangeDate": "2019-10-19T21:00:00.000Z",
    "rates": [
        {
            "descr": "100 GBP = 127.96959650683269 USD",
            "rate": 0.781435612283584,
            "amount": 78.14356122835841,
            "code": "GBP"
        },
        ...
    ]
}
```
------- 
****Convert currency rate****

Converts one currency to another, aka cross course
E.g EUR/to/USD or what ever which is supported.

```
curl -X GET \
  'http://localhost:8088/api/rates/convert/2019-10-02/EUR/to/USD?amount=100' \
  -H 'Postman-Token: 7f364ddb-0f5a-464b-a35c-d86bb47f03d6' \
  -H 'cache-control: no-cache'

method: GET

params:
    date - in format YYYY-MM-DD, eg '2019-10-20'
query params: 
    amount - it will add amount of converted rate
    eg. 100 GBP = 127 USD ...

response:
{
    "exchangeDate": "2019-10-01T21:00:00.000Z",
    "base": "EUR",
    "descr": "100 USD = 91.76008968609864 EUR",
    "rate": 1.0897984117287722,
    "amount": 108.97984117287723,
    "code": "USD"
}

```
------- 
****Create currency rate****
Creates currency rate for particular date

```
curl -X POST \
  http://localhost:8088/api/rates \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0a62fd0d-d358-48e8-8276-efb0b49b6f4e' \
  -H 'cache-control: no-cache' \
  -d '{
    "code": "PLN",
    "ds_name": "UDS",
    "rate": "6.414",
    "exchange_date": "2019-10-22"
}'

method: POST

query params: - none

params: - none

body: {
    "code": "PLN",
    "ds_name": "UDS",
    "rate": "6.414",
    "exchange_date": "2019-10-22"
}

response: 
    {
        "id": 205
    }
```

****Modify currency rate****
Modifies currency rate for particular date and currency

```
curl -X PUT \
  http://localhost:8088/api/rates \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 5c9039b6-f110-4ee0-a914-c79738163ac0' \
  -H 'cache-control: no-cache' \
  -d '{
	"id":205,
    "code": "PLN",
    "ds_name": "UDS",
    "rate": "6.40004",
    "exchange_date": "2019-10-22"
}'

method: PUT

query params: - none

params: - none

body: {
	"id":205,
    "code": "PLN",
    "ds_name": "UDS",
    "rate": "6.40004",
    "exchange_date": "2019-10-22"
}

response: 
    id - an id of an updated rate.
    {
        "id": 205
    }

```


****Remove currency rate****
Removes currency rate for particular date
by id
```
curl -X DELETE \
  http://localhost:8088/api/rates/223 \
  -H 'Postman-Token: 172cf745-1720-44b0-8fe3-3d1fd1042f4c' \
  -H 'cache-control: no-cache'

method: DEELETE

query params: - none
params:
    id - an id of rate currency id.

response: 
    {
        "count": 0
    }

```
