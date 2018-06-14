# Docker Setup

This manual describes how to run the complete web application for public transport quality grades generated with the [oevgk18-generator](https://github.com/public-transport-quality-grades/oevgk18-generator).

## Prerequisites

* [Docker](https://docs.docker.com/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* ogr2ogr from [GDAL](http://www.gdal.org/ogr2ogr.html)
* Public transport quality grades as a set of GeoJSON files generated with [oevgk18-generator](https://github.com/public-transport-quality-grades/oevgk18-generator)
    * If you want to use existing data, see the release page of [oevgk18-generator](https://github.com/public-transport-quality-grades/oevgk18-generator/releases) to download a precalculated set of public transport quality gradings.

## Preparation

To show the official public transport quality grades from the [ARE](https://www.are.admin.ch/are/en/home.html), we need to convert the data to GeoJSON:

1) [Download](https://data.geo.admin.ch/ch.are.gueteklassen_oev/) the data (as shapefiles) and unpack it.
2) Use GDAL to convert the shapefiles to GeoJSON:

```bash
$ cd LV95/
$ ogr2ogr -f GeoJSON -select "KLASSE" -sql "SELECT * FROM Oev_Gueteklassen_ARE ORDER BY KLASSE DESC" \
Oev_Gueteklassen_ARE.geojson Oev_Gueteklassen_ARE.shp -lco RFC7946=YES
```

3) Copy the file `Oev_Gueteklassen_ARE.geojson` to the `generator-results/` folder

## Setup

1) Copy the result data from the [oevgk18-generator](https://github.com/public-transport-quality-grades/oevgk18-generator) to `generator-results/`.

The directory should look something like this:

```bash
$ ll generator-results 
total 236M
 29M Jun  1 15:51 oevgk18_2018-11-10_Nacht.geojson
 62M Jun  1 15:51 oevgk18_2018-11-10_Tag.geojson
 52M Jun  1 15:51 oevgk18_2018-11-13_Abend.geojson
539K Jun  1 15:51 oevgk18_2018-11-13_Tag.geojson
 29M Jun  1 15:51 oevgk18_2018-11-18_Nacht.geojson
 54M Jun  1 15:51 oevgk18_2018-11-18_Tag.geojson
1.3K May 28 09:18 oevgk18_metadata.json
7.1M Jun  2 13:39 Oev_Gueteklassen_ARE.geojson
3.9M Jun  1 16:35 transport_stops.geojson
```

2) Start the application with `docker-compose`

```bash
$ docker-compose up
```

3) You will see the tile server continually to print out the message `Config file doesn't exist yet, wait 10 seconds...`. Meanwhile, the GeoJSON files are being converted to vector tiles. After a couple minutes, the message `Startup complete` should appear.

4) Access the application at <http://localhost:8080>