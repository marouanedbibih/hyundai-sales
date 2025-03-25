#!/bin/bash

docker build -f Dockerfile.frontend -t marouanedbibih/hyundai-sales-frontend:k8s-v1 --build-arg NEXT_PUBLIC_API_URL=https://api.hyundai-sales.local ../

