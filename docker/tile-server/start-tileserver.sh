#!/bin/bash

CONFIG_FILE=/data/tileserver-config.json

while [[ ! -f $CONFIG_FILE ]]; do
    echo "Config file doesn't exist yet, wait 10 seconds..."
    sleep 10
done

exec "$@"
    