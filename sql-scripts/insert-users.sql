-- Insert 10 users into the users table
INSERT INTO users (created_at, updated_at, name, password, username, role)
VALUES
    -- Admin
    (NOW(), NOW(), 'Admin User', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'adminuser', 'ADMIN'),

    -- 6 Sellers
    (NOW(), NOW(), 'Seller User 1', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'seller1', 'SELLER'),
    (NOW(), NOW(), 'Seller User 2', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'seller2', 'SELLER'),
    (NOW(), NOW(), 'Seller User 3', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'seller3', 'SELLER'),
    (NOW(), NOW(), 'Seller User 4', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'seller4', 'SELLER'),
    (NOW(), NOW(), 'Seller User 5', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'seller5', 'SELLER'),
    (NOW(), NOW(), 'Seller User 6', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'seller6', 'SELLER'),

    -- 3 After-Sales Managers
    (NOW(), NOW(), 'After Sales Manager 1', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'aftersales1', 'AFFTER_SALES_MANAGER'),
    (NOW(), NOW(), 'After Sales Manager 2', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'aftersales2', 'AFFTER_SALES_MANAGER'),
    (NOW(), NOW(), 'After Sales Manager 3', '$2a$10$qLUYpN4Ne9jcZ4mL2c87sOzkXi3V8DgeAe.BSRNCSohzlgDbtSZ62', 'aftersales3', 'AFFTER_SALES_MANAGER');
