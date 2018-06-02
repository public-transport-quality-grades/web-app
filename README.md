# Public Transport Quality Grades Web App

[![Build Status](https://travis-ci.org/public-transport-quality-grades/web-app.svg?branch=master)](https://travis-ci.org/public-transport-quality-grades/web-app)

## Integrating public transport quality grades from ARE

The raw data for the current transport quality from ARE (Bundesamt für Raumentwicklung) is available here: <https://data.geo.admin.ch/ch.are.gueteklassen_oev/>

To use the data in this application, the data has to be converted from Shapefile to GeoJSON.
Use the following ogr2ogr command:

```bash
ogr2ogr -f GeoJSON -select "KLASSE" -sql "SELECT * FROM Oev_Gueteklassen_ARE ORDER BY KLASSE DESC" Oev_Gueteklassen_ARE.geojson Oev_Gueteklassen_ARE.shp -lco RFC7946=YES
```

The resulting file should be copied to `data/Oev_Gueteklassen_ARE.json`.