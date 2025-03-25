#!/bin/bash

CLUSTER_NAME="hyundai-sales-cluster"

kind delete cluster --name $CLUSTER_NAME
kind create cluster --name $CLUSTER_NAME --config kind-config.yaml

# Install the NGINX Ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml