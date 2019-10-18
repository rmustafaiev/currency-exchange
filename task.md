NodeJS Test task
Implement HTTP REST API to get/modify currency exchange.
Description:
The system has to support three currencies: USD EUR UAH. Each currency has daily rate to the national currency and rates between each other (calculated). Imagine that you national currency is not among these three.
Requirements:
API:
Get current rates for all currencies and rates for range of dates.
The same for specific currency.
Add new rates and update ones for specific currency and specific day.

List APIs have to be paginated.
Modify APIs have to be protected. As there is no user functionality you need  implement special API to get data for protected API.

There should be migration to create the schema and add init data to DB. Init data can be whatever, accuracy is not required. 

Also, the system has to log the incoming request to a file and track;
The request URL path
The time of the request in the format of MM/DD/YY HH:mm:ss
If the request was fulfilled successfully or if it failed to respond to the requestor.

While implementing the program think about
Code and file structure
Separation of concerns
Code reuse
Modularization
Readability
Testability

Code should be accessible via a public code repository like github.
Provide instructions for building and running the program locally.
Provide examples CURL commands for calling the REST API.
Advance requirements:
updating currency can be applied only in case if the currency has not been updated another user at the same time
handle the case when DB data doesn’t have all days from date range. How to avoid it. Response error for an user.
add tests


