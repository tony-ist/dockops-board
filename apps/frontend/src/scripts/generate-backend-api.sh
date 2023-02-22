#!/usr/bin/env bash

openapi-generator-cli generate -i $VITE_BACKEND_URL/documentation/json -o src/generated-sources/backend-api -g typescript-fetch