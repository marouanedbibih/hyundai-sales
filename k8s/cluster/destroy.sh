#!/bin/bash

# Define cluster name
CLUSTER_NAME="hyundai-sales-cluster"

echo "Deleting the existing Kubernetes kind cluster (if any)..."
# Delete the existing cluster
kind delete cluster --name $CLUSTER_NAME

echo "Creating a new kind cluster with the name: $CLUSTER_NAME"
# Create a new kind cluster with custom configuration
cat <<EOF | kind create cluster --name $CLUSTER_NAME --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP
  - role: worker
  - role: worker
EOF

echo "Installing NGINX Ingress controller..."
# Apply the NGINX Ingress controller configuration
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

echo "Kind cluster setup is complete!"
