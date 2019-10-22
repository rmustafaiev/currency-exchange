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
****Get currency rates****
Returns currency rates by date, and currency if specified.
otherwise returns list a of all available.

```
curl -X GET \
  'http://localhost:8088/api/rates/2019-10-05?currency=USD' \
  -H 'Postman-Token: 2145e00f-96c6-454d-a085-0bdb13df9e48' \
  -H 'cache-control: no-cache'

params:
    date - in format YYYY-MM-DD, eg '2019-10-20'

query params: 
    currency - one of available currency codes .. 'USD', 'GBP' ...

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
****Get histarical/range currency rates****
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

params:

query params: 

response:

```
--------------
****Convert currency rates****
Converts all the available currencies to the 
new base currecny as per Requested
E.g we have Base currency in UAH
If we set param to be USD, all the currency rates will
be recalculated

```
curl -X GET \
  'http://localhost:8088/api/rates/convert/2019-10-20/USD?amount=100' \
  -H 'Postman-Token: ae94ea5e-a761-4bb0-a366-c78382aeb12e' \
  -H 'cache-control: no-cache'
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
--------------
****Convert currency rate****
Converts one currency to another, aka cross course
E.g EUR/to/USD 

> http://localhost:8088/api/rates/2019-10-05

```
curl -X GET \
  'http://localhost:8088/api/rates/convert/2019-10-02/EUR/to/USD?amount=100' \
  -H 'Postman-Token: 7f364ddb-0f5a-464b-a35c-d86bb47f03d6' \
  -H 'cache-control: no-cache'

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
--------------
****Method****

> http://localhost:8088/api/rates/2019-10-05

```
curl -X GET 

params:

query params: 

response:

```
--------------
****Method****

> http://localhost:8088/api/rates/2019-10-05

```
curl -X GET 

params:

query params: 

response:

```
  
  
router.get('/rates/historical/from/:start/to/:end', getRatesByRange)
router.get('/rates/:date', getRates)
router.post('/rates', createRate)
router.put('/rates', updateRate)
router.delete('/rates/:rateId', deleteRate)
router.get('/rates/convert/:date/:currencyCode', convertRates)
router.get('/rates/convert/:date/:sourceCode/to/:targetCode', convertRate)




curl -X GET \
  http://localhost:8088/api/rates/2019-10-05 \
  -H 'Postman-Token: 47d44620-4497-4c59-b0b4-00eb6a3261ae' \
  -H 'cache-control: no-cache'
  


Data Sources  

    path: /api/currencies/datasources  
    method: GET  
    desc: Available data sources  
    params: None  
    returns:  
        [{  
            base: 'data source base currency',  
            name: 'data source abbr ( UDS, NBU ...)',  
            description: 'data source additional info (NBU = Natinal bank of Ukraine)'  
        }]  
    error:  
        {  
            status: Status code  
            code: error code  
            message: Error message  
        }  
  
    examples:  
        curl -X GET \  
          http://localhost:8088/api/datasource \  
          -H 'Postman-Token: 603b6ef5-6cc2-419b-ba0e-1ce3fdcc55b3' \  
          -H 'cache-control: no-cache'  
  
* Currencies  
    path: /api/currencies/:datasource  
    method: GET  
    desc:  Returns list of currencies available or per data source if specified  
    params:  
        dataSource - one of available data sources (optional query param)  
    returns:  
        [{  
            code: currency abbreviation code USD = United States Dollar  
            num : currency bank code numeric 980 - Ukrainian hrivna  
            name: full currency name descriptive  
            region: region eg. Great Britain  
        }]  
    error:  
        {  
            status: Status code  
            code: error code  
            message: Error message  
        }  
    examples:  
        curl -X GET \  
          'http://localhost:8088/api/currencies' \  
          -H 'Postman-Token: 16df0b10-3ecb-4adc-b005-a8cde0a2b979' \  
          -H 'cache-control: no-cache'  
  
        curl -X GET \  
          'http://localhost:8088/api/currencies?dataSource=NBU' \  
          -H 'Postman-Token: 16df0b10-3ecb-4adc-b005-a8cde0a2b979' \  
          -H 'cache-control: no-cache'  
  
* Historical rates  
    path: /api/rates/historical/:datasource/:date  
    path: /api/rates/historical/range/:datasource/:start/:end  
    method: GET  
    desc:  Returns historical rates for specified date and data source,  
    fallback as follows to current date and default data source if not specified.  
    if it is by range (see path params) and if no end date is specified returns from start till current date  
    params:  
        datasource - one of available  
        start - start data of range  
        end - end date of range  
    returns:  
        {  
            base: currency base  
            start: start date of the range (if no date or range start date than current date)  
            end: end date of range (if not range specified than current date for single date)  
            dataSource: data source  
            rates: [  
                {  
                    code: currency_code,  
                    rate: currency rate to the base currency,  
                    date: the date per rate  
                }  
            }  
  
        }]  
    error:  
        {  
            status: Status code  
            code: error code  
            message: Error message  
        }  
  
* Rates  
        path: /api/rates/:datasource  
        method: GET  
        desc: Returns the latest currency rates.  
        params:  
            datasource - one of available  
        returns:  
            {  
                base: currency base  
                date: always current date  
                dataSource: data source  
                rates: [  
                    {  
                        code: currency_code,  
                        rate: currency rate to the base currency  
                    }  
                ]  
        error:  
            {  
                status: Status code  
                code: error code  
                message: Error message  
            }  
  
  
        Create/Update  
        path: /api/rates/:date  
        method: POST|PUT  
        desc: Creates the currency rate for the date specified or modifies if the entry already exist,  
        if date is omit than current date is considered. Returns a status or an error.  
        params:  
            date - DD/MM/YYYY  
        body:  
        {  
            date: DD/MM/YYYY  
            rates: [  
                    {  
                        code: currency_code,  
                        rate: currency rate  
                    },  
                    ...  
            ]  
        }  
        returns:  
            {  
                status: success  
            }  
        error:  
            {  
                status: Status code  
                code: error code  
                message: Error message  
            }  
  
  
        Delete  
        path: /api/rates/:date  
        method: DELETE  
        desc: Removes the currency rate by the date specified,  
            if date is omit than current date is considered. Returns a status or an error.  
            params:  
                date - DD/MM/YYYY  
            returns:  
                {  
                    status: success  
                }  
            error:  
                {  
                    status: Status code  
                    code: error code  
                    message: Error message  
                }  
* Rates converter  
        path: /api/rates/convert/:datasource/:date/:source  
        method: GET  
        desc: Converts all the currency rates based on source currency  
        It more likely change the base.  
        params:  
            datasource - one of available  
            date - the date as a base conversion reference  
            source - the source currency  
        returns:  
            {  
                base: currency base  
                date: always current date  
                dataSource: data source  
                source: Source currency  
                target: Target currency  
                rate: the rate Source against Target  
            }  
        error:  
            {  
                status: Status code  
                code: error code  
                message: Error message  
            }  
  
        Convert one to another eg USD to UAH  
        path: /api/rates/convert/:datasource/:date/:source/:target  
        method: GET  
        desc: Converts the currency one to another.  
        params:  
            datasource - one of available  
            date - the date based upon conversion should be considered  
            source - the source currency  
        returns:  
            {  
                base: currency base  
                date: always current date  
                dataSource: data source  
                source: Source currency  
                target: Target currency  
                rate: the rate Source against Target  
            }  
        error:  
            {  
                status: Status code  
                code: error code  
                message: Error message  
            }
