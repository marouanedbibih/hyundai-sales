#!/bin/bash

kubectl create secret generic hyundai-sales-mysql-secret \
    --from-literal=mysql-root-password=root \
    --from-literal=mysql-user=user \
    --from-literal=mysql-password=password