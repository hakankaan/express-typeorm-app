#!/bin/bash

# Exit in case of error
set -e

# Install npm packages
npm i

# Build and run containers
docker-compose up -d

# Hack to wait for postgres container to be up before running seeders
sleep 5;

# Run seeders
docker-compose run --rm backend npm run seed:users
docker-compose run --rm backend npm run seed:products
docker-compose run --rm backend npm run seed:orders
