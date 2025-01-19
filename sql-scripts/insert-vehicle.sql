INSERT INTO vehicles (created_at, updated_at, color, discount, is_promotion, model, price, status, year)
VALUES
-- Row 1
(NOW(), NOW(), 'Red', 500.00, b'1', 'Hyundai Sonata', 25000.00, 'AVAILABLE', 2022),
-- Row 2
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Elantra', 22000.00, 'ORDERED', 2021),
-- Row 3
(NOW(), NOW(), 'Black', 750.00, b'1', 'Hyundai Tucson', 28000.00, 'SOLD', 2023),
-- Row 4
(NOW(), NOW(), 'White', NULL, b'0', 'Hyundai Kona', 27000.00, 'AVAILABLE', 2020),
-- Row 5
(NOW(), NOW(), 'Silver', 300.00, b'1', 'Hyundai Palisade', 33000.00, 'ORDERED', 2022),
-- Row 6
(NOW(), NOW(), 'Green', NULL, b'0', 'Hyundai Veloster', 23000.00, 'SOLD', 2021),
-- Row 7
(NOW(), NOW(), 'Yellow', 1000.00, b'1', 'Hyundai Venue', 19000.00, 'AVAILABLE', 2023),
-- Row 8
(NOW(), NOW(), 'Grey', NULL, b'0', 'Hyundai Santa Fe', 29000.00, 'ORDERED', 2022),
-- Row 9
(NOW(), NOW(), 'Red', 500.00, b'1', 'Hyundai Ioniq 5', 40000.00, 'SOLD', 2023),
-- Row 10
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Accent', 18000.00, 'AVAILABLE', 2020),
-- Row 11
(NOW(), NOW(), 'Black', 600.00, b'1', 'Hyundai Nexo', 62000.00, 'ORDERED', 2022),
-- Row 12
(NOW(), NOW(), 'White', NULL, b'0', 'Hyundai Genesis', 45000.00, 'SOLD', 2021),
-- Row 13
(NOW(), NOW(), 'Silver', 450.00, b'1', 'Hyundai Sonata Hybrid', 30000.00, 'AVAILABLE', 2023),
-- Row 14
(NOW(), NOW(), 'Green', NULL, b'0', 'Hyundai Elantra N', 26000.00, 'ORDERED', 2022),
-- Row 15
(NOW(), NOW(), 'Yellow', 700.00, b'1', 'Hyundai Kona Electric', 38000.00, 'SOLD', 2023),
-- Row 16
(NOW(), NOW(), 'Grey', NULL, b'0', 'Hyundai Tucson Hybrid', 32000.00, 'AVAILABLE', 2021),
-- Row 17
(NOW(), NOW(), 'Red', 800.00, b'1', 'Hyundai Ioniq', 22000.00, 'ORDERED', 2020),
-- Row 18
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Palisade Calligraphy', 50000.00, 'SOLD', 2022),
-- Row 19
(NOW(), NOW(), 'Black', 550.00, b'1', 'Hyundai Veloster N', 29000.00, 'AVAILABLE', 2021),
-- Row 20
(NOW(), NOW(), 'White', NULL, b'0', 'Hyundai Santa Cruz', 35000.00, 'ORDERED', 2023),
-- Row 21
(NOW(), NOW(), 'Silver', 900.00, b'1', 'Hyundai Genesis G70', 41000.00, 'SOLD', 2022),
-- Row 22
(NOW(), NOW(), 'Green', NULL, b'0', 'Hyundai Accent Hatchback', 16000.00, 'AVAILABLE', 2020),
-- Row 23
(NOW(), NOW(), 'Yellow', 850.00, b'1', 'Hyundai Venue Denim', 20000.00, 'ORDERED', 2023),
-- Row 24
(NOW(), NOW(), 'Grey', NULL, b'0', 'Hyundai Sonata N Line', 34000.00, 'SOLD', 2022),
-- Row 25
(NOW(), NOW(), 'Red', 1000.00, b'1', 'Hyundai Elantra GT', 25000.00, 'AVAILABLE', 2021),
-- Row 26
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Tucson Limited', 36000.00, 'ORDERED', 2023),
-- Row 27
(NOW(), NOW(), 'Black', 200.00, b'1', 'Hyundai Sonata SE', 27000.00, 'SOLD', 2022),
-- Row 28
(NOW(), NOW(), 'White', NULL, b'0', 'Hyundai Ioniq 6', 46000.00, 'AVAILABLE', 2023),
-- Row 29
(NOW(), NOW(), 'Silver', 650.00, b'1', 'Hyundai Venue SEL', 19000.00, 'ORDERED', 2021),
-- Row 30
(NOW(), NOW(), 'Green', NULL, b'0', 'Hyundai Tucson Plug-in Hybrid', 37000.00, 'SOLD', 2022),
-- Row 31
(NOW(), NOW(), 'Yellow', 300.00, b'1', 'Hyundai Santa Fe XRT', 42000.00, 'AVAILABLE', 2023),
-- Row 32
(NOW(), NOW(), 'Grey', NULL, b'0', 'Hyundai Elantra SEL', 24000.00, 'ORDERED', 2021),
-- Row 33
(NOW(), NOW(), 'Red', 550.00, b'1', 'Hyundai Sonata Limited', 28000.00, 'SOLD', 2023),
-- Row 34
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Palisade XRT', 49000.00, 'AVAILABLE', 2022),
-- Row 35
(NOW(), NOW(), 'Black', 400.00, b'1', 'Hyundai Veloster Turbo', 22000.00, 'ORDERED', 2021),
-- Row 36
(NOW(), NOW(), 'White', NULL, b'0', 'Hyundai Kona Limited', 27000.00, 'SOLD', 2023),
-- Row 37
(NOW(), NOW(), 'Silver', 750.00, b'1', 'Hyundai Tucson SE', 32000.00, 'AVAILABLE', 2022),
-- Row 38
(NOW(), NOW(), 'Green', NULL, b'0', 'Hyundai Elantra Limited', 26000.00, 'ORDERED', 2021),
-- Row 39
(NOW(), NOW(), 'Yellow', 900.00, b'1', 'Hyundai Santa Fe Limited', 35000.00, 'SOLD', 2023),
-- Row 40
(NOW(), NOW(), 'Grey', NULL, b'0', 'Hyundai Venue SEL', 20000.00, 'AVAILABLE', 2022),
-- Row 41
(NOW(), NOW(), 'Red', 400.00, b'1', 'Hyundai Genesis G80', 47000.00, 'ORDERED', 2021),
-- Row 42
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Ioniq Plug-in Hybrid', 30000.00, 'SOLD', 2023),
-- Row 43
(NOW(), NOW(), 'Black', 600.00, b'1', 'Hyundai Sonata GLS', 29000.00, 'AVAILABLE', 2022),
-- Row 44
(NOW(), NOW(), 'White', NULL, b'0', 'Hyundai Elantra GT', 22000.00, 'ORDERED', 2021),
-- Row 45
(NOW(), NOW(), 'Silver', 500.00, b'1', 'Hyundai Tucson GLS', 33000.00, 'SOLD', 2023),
-- Row 46
(NOW(), NOW(), 'Green', NULL, b'0', 'Hyundai Kona SEL', 25000.00, 'AVAILABLE', 2022),
-- Row 47
(NOW(), NOW(), 'Yellow', 800.00, b'1', 'Hyundai Palisade Calligraphy', 46000.00, 'ORDERED', 2021),
-- Row 48
(NOW(), NOW(), 'Grey', NULL, b'0', 'Hyundai Sonata Hybrid', 31000.00, 'SOLD', 2023),
-- Row 49
(NOW(), NOW(), 'Red', 300.00, b'1', 'Hyundai Kona SEL', 25000.00, 'AVAILABLE', 2023),
-- Row 50
(NOW(), NOW(), 'Blue', NULL, b'0', 'Hyundai Elantra Hybrid', 28000.00, 'ORDERED', 2021);
