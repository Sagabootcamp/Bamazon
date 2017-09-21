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

	inquirer.prompt([

	{
		type: "list",
		name: "managerChoice",
		message: "Choose an option",
		choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
	}
	]). then(function(answer){

			switch(answer.managerChoice){

				case "View Products for Sale":
				showTable();
				break;

				case "View Low Inventory":
				viewLowInventory();
				break;

				case "Add to Inventory":
				addInventory();
				break;

				case "Add New Product":
				addProduct();
				break;

				default: 
				console.log("Chosen wrong choice");
			}

			//console.log(answer.managerChoice);
		});

	function displayTable(){

		connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err,results){

			if(err) throw err;

			var table = new Table({
				head: ["Item_id", "Product_Name", "Department", "Price", "Inventory"]
			});

			for(var i=0; i<results.length; i++){
				table.push(
					[results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
				);
			}

			console.log(table.toString());

		});

	}

	function showTable(){

		connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err,results){

			if(err) throw err;

			var table = new Table({
				head: ["Item_id", "Product_Name", "Price", "Inventory"]
			});

			for(var i=0; i<results.length; i++){
				table.push(
					[results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]
				);
			}

			console.log(table.toString());

		});

	}

	function viewLowInventory(){

		connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, results){

			if(err) throw err;

			var table = new Table({
				head: ["Item_id", "Product_Name", "Inventory"]
			});

			for(var i=0; i<results.length; i++){
				table.push(
					[results[i].item_id, results[i].product_name, results[i].stock_quantity]
				);
			}

			console.log(table.toString());

		});
	}

	function addInventory(){

		inquirer.prompt([
		{	
			type: "input",
			name: "Item_id",
			message: "Enter Item_id of the Item to add inventory"
		},	
		{
			type: "input",
			name: "Qty",
			message: "How much inventory you want to add? "
		}
		]).then(function(answer){

			connection.query("SELECT stock_quantity FROM products WHERE ?",
				{
					item_id: answer.Item_id
				}, function(err, results){

				if(err) throw err;

				connection.query("UPDATE products SET ? WHERE ?", 
					
					[
						{
							stock_quantity: (results[0].stock_quantity + parseInt(answer.Qty))
						},
						{
							item_id: answer.Item_id
						}
					], function(err){

					if(err) throw err;

					console.log("Added Sucessfully!");
					displayTable();
				});
			});	

		});
	}

	function addProduct(){

		inquirer.prompt([
		{
			type: "input",
			name: "Item_id",
			message:"Enter Item's id : "
		},

		{
			type: "input",
			name: "Item_name",
			message: "Enter Item's name : "
		},

		{
			type: "input",
			name: "Item_price",
			message: "Enter the price of the Item : " 
		},

		{
			type: "input",
			name: "Item_dept",
			message: "Enter the department name : "
		},
		
		{
			type: "input",
			name: "Item_inv",
			message: "Enter the amount of inventory to add : "
		}

		]).then(function(answer){

			connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES('"+
				answer.Item_id +"', '" + answer.Item_name +"','" + answer.Item_dept + "','" + answer.Item_price + "', '"+
				answer.Item_inv +"');", function(err){

					if(err) throw err;

			});

			console.log("New Item added Sucessfully!");
			displayTable();

		});
	}
		
	
	//}
	

});

