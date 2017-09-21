DROP DATABASE Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
item_id INT NOT NULL,
product_name VARCHAR(100),
department_name VARCHAR(50),
price INT,
stock_quantity INT,
PRIMARY KEY(item_id));

SELECT * FROM products;

UPDATE products SET stock_quantity = 4
WHERE item_id = 3290;

SELECT item_id, product_name, stock_quantity FROM products
WHERE stock_quantity < 5;


INSERT INTO products
VALUES ('3459','Laptops','Electronics','1200','15'),
('3290','Keyboards','Electronics','100','20'),
('5520','Figits','Toys','10','200'),
('5534','RaceCars','Toys','12','22'),
('5631','Soccer Ball','Toys','20','30'),
('2230','Sandles','Shoes','25','20'),
('2245','Sneakars','Shoes','60','25'),
('1234','Shirts','Clothing','20','20'),
('1290','Shorts','Clothing','25','22'),
('1287','Skirts','Clothing','22','10'),
('6789','Clorox Wipes','Cleaning','11','30'),
('4567','Granola Bars','Food','3','100'),
('4678','Chocolates','Food','5','220');


