#!/bin/bash

rm -rf src/generated-sources/backend-api
openapi-generator-cli generate -i $VITE_BACKEND_URL/documentation/json -o src/generated-sources/backend-api -g typescript-fetch
