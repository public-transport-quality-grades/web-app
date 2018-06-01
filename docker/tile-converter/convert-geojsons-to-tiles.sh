#!/bin/bash

GEOJSON_DIR=/generator-results
OUTPUT_DIR=/tile-data
TILESERVER_CONFIG_TEMPLATE=/scripts/tileserver-config-template.json

MAX_ZOOM=17
LAYER_NAME=oevgk

echo "Start generating MBTiles"
tileserver_entries=""

shopt -s nullglob # ensure that loop isn't entered when there are no files
for geojson_file in $GEOJSON_DIR/*.geojson; do
    filename=`basename "$geojson_file"`
    base_filename=${filename%.geojson}
    mbtiles_filename=${base_filename}.mbtiles

    if [[ -f $OUTPUT_DIR/${mbtiles_filename} ]]; then
        echo "MBTiles file ${mbtiles_filename} already exists, skipping"
    else
        if [[ $base_filename = *"stops"* ]]; then
            options="-Z14 -B14 -b20"
        elif [[ $base_filename = *"ARE"* ]]; then
            options="-B17 -pi"
        else
            options="-pi -drop-densest-as-needed"
        fi
        echo "Creating MBTiles for ${filename} with options ${options}"
        tippecanoe -f -l $LAYER_NAME -o $OUTPUT_DIR/$mbtiles_filename -z${MAX_ZOOM} $options $geojson_file
    fi

    tileserver_entries+="\"${base_filename}\": {\"mbtiles\": \"${mbtiles_filename}\"}," 
done

echo "Writing tileserver config"
sed -e "s/@insert_config/${tileserver_entries::-1}/g" $TILESERVER_CONFIG_TEMPLATE > $OUTPUT_DIR/tileserver-config.json