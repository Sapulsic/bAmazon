DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES
("Xbox One X", "Electronics", 449.99, 3),
("PlayStation 4 Pro", "Electronics", 399.99, 6),
("iPhone X🅂", "Electronics", 1,099.00, 1),
("Spider-Man: Into The Spider-Verse", "Movies & TV", 22.95, 12),
("Hamilton: The Revolution", "Books", 31.49, 14),
("Infinite ", "Books", 24.99, 2),
("Kingdom Hearts III ", "Video Games", 59.99, 21);


SELECT * FROM products