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


    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "  Product Name: " + res[i].product_name + "  Price: " + res[i].price);
        }

        console.log(" ");
        decision(res.length);


        function decision(idCount) {

            inquirer.prompt([

                {
                    name: "item",
                    type: "input",
                    message:"Choose the ID you'd like to purchase: ",
                    validate: function(choice) {
                        if (isNaN(choice) === false && value > 0 && choice <= idCount) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like? ",
                    validate: function(choice) {
                        if (isNaN(choice) === false && value > 0) {
                            return true;
                        }
                        return false;
                    }
                },

            ]).then(function (answer) {
                var item = answer.item;
                var amount = answer.amount;
                var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
                connection.query(query, { item_id: item }, function (err, res) {
                    if (err) throw err;
                        if ( amount > res[0].stock_quantity) {

                        }
                        else {
                            var newAmount = res[0].stock_quantity - amount;
                            var productName = res[0].product_name;
                            var price = res[0].price;
                            var total = res[0].price * amount;
                            var query = "UPDATE products SET ? WHERE ?";
                            connection.query(query, [{stock_quantity: newAmount}, {item_id: item}], function(err, res) {
                                console.log("You've just bought " + amount + " of " + productName + "\nThanks for shopping with us!");
                                connection.end();
                            });
                        }
                });
            }
        )};




















        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });


}

