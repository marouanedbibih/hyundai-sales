# Frontend TLS
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=hyundai-sales.local/O=hyundai-sales.local"

# Backend TLS
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=api.hyundai-sales.local/O=api.hyundai-sales.local"

