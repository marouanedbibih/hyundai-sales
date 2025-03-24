#!/bin/bash

kubectl create secret generic mysql-secret \
    --from-literal=root-password=root \
    --from-literal=user=user \
    --from-literal=password=password