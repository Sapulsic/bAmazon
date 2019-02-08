var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId + "\n");
    begin();
});

function begin() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity+"\n");
        }

        console.log(" ");
        decision(res);
    });
}

function decision(res) {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message:"Choose the ID you'd like to purchase: ",
        }
    ]).then(function (answer) {
        // var item = answer.item;
        // var amount = answer.amount;
        // var query = "SELECT _id, product_name, stock_quantity, price FROM products WHERE ?";
        // connection.query(query, { _id: item }, function (err, res) {
        //     if (err) throw err;
        //         if ( amount > res[0].stock_quantity) {
        //             console.log("Insufficient Amount!");
        //         }
        //         else {
        //             var newAmount = res[0].stock_quantity - amount;
        //             var productName = res[0].product_name;
        //             var price = res[0].price;
        //             var total = price * amount;
        //             var query = "UPDATE products SET ? WHERE ?";
        //             connection.query(query, [{ stock_quantity: newAmount }, { _id: item}], function(err, res) {
        //                 console.log("You've just bought " + amount + " of " + productName + "\nTotal Cost is: $" + total + "\nThanks for shopping with us!");
        //             });
        //             connection.end();
        //         }
        //     });
            var thisThat = false;
            if (answer.item.toUpperCase() == "Q") {
                process.exit();
            }
            for ( var i =0; i < res.length; i++) {
                if (res [i].product_name == answer.item) {
                    thisThat = true;
                    var product = answer.item;
                    var id = i;
                    inquirer.prompt({
                        type: "input",
                        name: "quantity",
                        message: "How many would you like to buy?",
                        validate: function (val) {
                            if(isNaN(val) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function (answer) {
                        if ((res[id].stock_quantity - answer.quantity) > 0) {
                            connection.query("UPDATE products SET stock_quantity = '" + (res[id].stock_quantity - answer.quantity) + "' WHERE product_name = '" + product + "'", function(err, res2) {
                                console.log("Product Bought!");
                                begin();
                            });
                        } else {
                            console.log("Not a Valid Selection!");
                            decision(res);
                        }
                    });
                }
            }
            if (i == res.length &&  thisThat == false) {
                console.log("Not a valid selection!");
                decision(res);
            }
        });
}