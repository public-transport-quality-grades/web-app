FROM klokantech/tippecanoe 

COPY ./convert-geojsons-to-tiles.sh /scripts/
COPY ./tileserver-config-template.json /scripts/

ENTRYPOINT ["/bin/bash", "/scripts/convert-geojsons-to-tiles.sh"]


