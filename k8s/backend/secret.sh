#!/bin/bash

kubectl create secret generic hyundai-sales-backend-secret \
    --from-literal=mysql-user=user \
    --from-literal=mysql-password=password