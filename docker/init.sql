DROP DATABASE IF EXISTS hyundai_sales_db;
CREATE DATABASE IF NOT EXISTS hyundai_sales_db;

CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON hyundai_sales_db.* TO 'user'@'%';

FLUSH PRIVILEGES;