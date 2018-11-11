var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 4500,

    user: "root",

    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId + "\n");
    begin();
});

function begin() {
    connection.query("SELECT name FROM products", function(err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}

