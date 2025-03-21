# Deploy the MySQL
kubectl apply -f mysql/secret.sh
kubectl apply -f mysql/config-map.yaml
kubectl apply -f mysql/headless.yaml
kubectl apply -f mysql/statefulset.yaml
