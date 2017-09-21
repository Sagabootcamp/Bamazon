var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,
	user: "root",
	password: "sangam0503",
	database: "Bamazon"
});

connection.connect(function(err){

	if (err) throw err;

	else{

		showTable();
	}

});

function showTable(){

	connection.query("SELECT item_id, product_name, price FROM products", function(err, results){

		if (err) throw err;
		else
		var table = new Table({
			head: ["Item_id", "Product_Name", "Price"]
		});

		for(var i=0; i<results.length; i++){
			table.push(
				[results[i].item_id, results[i].product_name, results[i].price]
			);
		}

		console.log(table.toString());

		purchase();
			
	});
}

function purchase(){

	inquirer.prompt([
	{
		name: "id",
		type: "input",
		message: "Enter the item id you would to buy : "
	},

	{
		name: "units",
		type: "input",
		message: "Enter the count of the selected item : "
	}

	]).then(function(answer){

		connection.query("SELECT * from products WHERE ?",

		{
			item_id: answer.id
		},
			function(error, results){

				if (error) throw error;
				
				if(results[0].stock_quantity > parseInt(answer.units)) {

					connection.query("UPDATE products SET ? WHERE ?",
					[{
						stock_quantity: results[0].stock_quantity - parseInt(answer.units)
					},
					{	
						item_id: answer.id
					}], function(err){
						if(err) throw err;
					});
						
				}	
				
				else{

						console.log("Insufficient stock");
					}

				console.log("Your total to pay is " + (answer.units * results[0].price));

			}
			
		);
		
	});
}
