CREATE TYPE currency_code AS ENUM('AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD','BTN','BWP','BYR','BZD','CAD','CDF','CHF','CLP','CNY','COP','CRC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','IQD','IRR','ISK','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','SVC','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VEF','VND','VUV','WST','XAF','XCD','XDR','XOF','XPF','YER','ZAR','ZMW','ZWL');

CREATE TABLE IF NOT EXISTS currencies(
   id SERIAL PRIMARY KEY,
   code VARCHAR(3) NOT NULL UNIQUE,
   num NUMERIC(5) NOT NULL,
   name VARCHAR(100),
   region VARCHAR (250)
);

CREATE TABLE IF NOT EXISTS data_sources(
   base currency_code NOT NULL,
   name VARCHAR(3) NOT NULL UNIQUE,
   description VARCHAR (100),
   PRIMARY KEY (base, name)
);

CREATE TABLE IF NOT EXISTS exchange_rates(
   id SERIAL PRIMARY KEY,
   code currency_code NOT NULL,
   data_sources_name VARCHAR(3),
   rate NUMERIC (5,3),
   modified DATE NOT NULL DEFAULT CURRENT_DATE,
   FOREIGN KEY (data_sources_name) REFERENCES data_sources (name)
);