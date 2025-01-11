#!/bin/bash

# Exit on any error
set -e

echo "Building server image..."
docker build -f Dockerfile.server -t micaelmc/winterrituals-server:latest .

echo "Building client image..."
docker build -f Dockerfile.client -t micaelmc/winterrituals-client:latest .

echo "Pushing server image..."
docker push micaelmc/winterrituals-server:latest

echo "Pushing client image..."
docker push micaelmc/winterrituals-client:latest

echo "Build and push completed successfully!"
