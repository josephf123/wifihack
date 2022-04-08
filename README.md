# wifihack

## wifi_logger:
This is a simple script made for a university project. The device in which this script runs is a raspberry
pi connected to a GPS module.

The script essentially gets wifi data from all the access points and clients nearby and combines this
information with the GPS data. It then logs this information into a csv file which can later be used
to analyse information about specific areas, mainly used as a wardriving tool.

## maps_display.html
A html file that contains the structure to place a map displaying all the csv details, this is using the google maps API

## load_csv_data.js
A file that maps_display.html calls in order to load the csv data (that has to be put on a server due to CORS restrictions). It
then uses a library called papaparse in order to parse the data into json data (since the API works with this info).

## map_create.js
A file that maps_display.html calls in order to render the map. This includes functions that create a table from the json data,
a function that separates the data based on what time they were gathered and one that creates the markers onto the page with
information.
