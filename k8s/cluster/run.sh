echo "Build the Kind Kubernetes cluster"
bash build.sh
echo "Deploy the Hyundai Sales application"
bash deploy.sh
echo "The Hyundai Sales application is ready"

kubectl get all 