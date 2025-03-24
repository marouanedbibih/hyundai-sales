# Deploy the MySQL
kubectl apply -f mysql/secret.sh
kubectl apply -f mysql/config-map.yaml
kubectl apply -f mysql/headless.yaml
kubectl apply -f mysql/statefulset.yaml

bash backend/secret.sh
kubectl apply -f backend/config-map.yaml
kubectl apply -f backend/deployment.yaml
kubectl apply -f backend/service.yaml

