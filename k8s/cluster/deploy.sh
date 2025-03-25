# Deploy the MySQL
kubectl apply -f ../mysql/secret.sh
kubectl apply -f ../mysql/config-map.yaml
kubectl apply -f ../mysql/headless.yaml
kubectl apply -f ../mysql/statefulset.yaml

# Deploy the backend
kubectl apply -f ../backend/config-map.yaml
kubectl apply -f ../backend/deployment.yaml
kubectl apply -f ../backend/service.yaml
kubectl apply -f ../backend/ingress.yaml

# Deploy the frontend
kubectl apply -f ../frontend/deployment.yaml
kubectl apply -f ../frontend/service.yaml
kubectl apply -f ../frontend/ingress.yaml

