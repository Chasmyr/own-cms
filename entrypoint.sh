#!/bin/bash

set -e

echo "----------------------------------"
echo "Server is starting..."
echo "----------------------------------"

npm run build
npm run start

echo "----------------------------------"
echo "Server started!"
echo "----------------------------------"