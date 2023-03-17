/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9066;

var express = require('express');
var router = express.Router();


// Set up templating engine
const exphbs = require('express-handlebars');

// Setup an instance of engine
const dateFormat = require('handlebars-dateformat');
const hbs = exphbs.create({
  // Register helper functions for engine
  helpers: {
    dateHelper: (d) => {
      return d === null ? '' : dateFormat(d, 'YYYY-MM-DD');
    },
    booleanHelper: (b) => {
      return b === 1 ? "Yes" : "No";
    }
  },
  extname: '.hbs'
});


// Database
var db = require('./database/db-connector');

// Handlebars
const { query } = require('express');
app.engine('.hbs', exphbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

/*
    ROUTES
*/

app.get('/', function(req, res)
    {
        res.render('index');
    });


app.get('/item', function(req, res)
    {
        let query1 = "SELECT * FROM Items;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('item', {data: rows});
        })
    });


app.post('/add-item-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let description = parseInt(data['input-description']);
    if (isNaN(description))
    {
        description = 'NULL'
    }

    // Create the query and run it on the database
    let query1 = `INSERT INTO Items (name, price, description) VALUES ('${data['input-name']}', '${data['input-price']}', ${description})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/item');
        }
    })
})


app.post('/update-item', function (req, res) {
	let data = req.body;
	let query1 = `UPDATE Items SET name = '${data.update_name}', price = '${data.update_price}', description = '${data.update_description}' WHERE item_id = '${data.item_id}'`;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}else{
            res.redirect('/item');
        }
	});
});


app.delete('/delete-item', function (req, res) {
	let data = req.body;
	let query1 = `DELETE FROM Items WHERE item_id = '${data.id}' `;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}else{
            res.sendStatus(204);
            // res.redirect('/');
        }
	});

});



/*
    employee
*/


app.get('/employee', function(req, res)
    {
        let query1 = "SELECT * FROM Employees;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('employee', {data: rows});
        })
    });


app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let description = parseInt(data['input-description']);
    // if (isNaN(description))
    // {
    //     homeworld = 'NULL'
    // }

    // Create the query and run it on the database
    let query1 = `INSERT INTO Employees (first_name, last_name, job_title, days_available, salary) VALUES ('${data['input-first_name']}','${data['input-last_name']}', '${data['input-job_title']}', '${data['input-days_available']}', '${data['input-salary']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/employee');
        }
    })
})


app.post('/update-employee', function (req, res) {
	let data = req.body;
	let query1 = `UPDATE Employees SET first_name='${data.update_first_name}',last_name='${data.update_last_name}', job_title ='${data.update_job_title}', days_available ='${data.update_days_available}', salary ='${data.update_salary}' WHERE employee_id ='${data.employee_id}'`;
    
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
	});

	res.redirect('/employee');
});


app.delete('/delete-employee', function (req, res) {
	let data = req.body;
	let query1 = `DELETE FROM Employees WHERE employee_id = '${data.id}' `;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}else{
            res.sendStatus(204);
        }
	});
});



/*
    orders
*/

app.get('/order', function(req, res)
    {
        let query1 = "SELECT * FROM Orders;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('order', {data: rows});
        })
    });


app.post('/add-order-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let description = parseInt(data['input-description']);
    // if (isNaN(description))
    // {
    //     homeworld = 'NULL'
    // }

    // Create the query and run it on the database
    let query1 = `INSERT INTO Orders ( customer_id, date, take_out, total_price) VALUES ('${data['input-customer_id']}','${data['input-date']}', '${data['input-take_out']}', '${data['input-total_price']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/order');
        }
    })
})


app.post('/update-order', function (req, res) {
	let data = req.body;
	let query1 = `UPDATE Orders SET customer_id='${data.update_customer_id}',date='${data.update_date}', take_out ='${data.update_take_out}', total_price ='${data.update_total_price}'`;
    
	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
	});

	res.redirect('/order');
});


app.delete('/delete-order', function (req, res) {
	let data = req.body;
	let query1 = `DELETE FROM Orders WHERE order_id = '${data.id}' `;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}else{
            res.sendStatus(204);
        }
	});
});

/*
    order 
*/

// Customers
// app.get('/customer', function(req, res)
// {
//     let query1 = "SELECT * FROM Customers";
    
//     db.pool.query(query1, function(error, rows, fields){
        
//         let customers = rows;
//         res.render('customer', {data: customers});
//     })
// });

app.get('/customer', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.last_name === undefined)
    {
       query1 = "SELECT * FROM Customers";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Customers WHERE last_name LIKE "${req.query.last_name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let customer = rows;
        return res.render('customer', {data: customer});
    })
});


// Orders
app.get('/order', function(req, res)
{
    let query1 = "SELECT order_id, CONCAT (Customers.customer_id, '. ', Customers.first_name, ' ', Customers.last_name) AS customer_id, date, take_out, total_price FROM Orders JOIN Customers ON Orders.customer_id = Customers.customer_id";
    let query2 = "SELECT CONCAT(customer_id, '. ', first_name, ' ', last_name) as customer_id_name, customer_id FROM Customers"; 

    db.pool.query(query1, function(error, rows, fields){    // Populate table

        let orders = rows;

        db.pool.query(query2, (error, rows, fields) => {    // Populate customer dropdown in form

            let customers = rows;
            res.render('orders', {data: orders, customers: customers});                
        })                 
    })               
});

//     db.pool.query(query1, function(error, rows, fields){
//         let orders = rows;
//         res.render('orders', {data: orders});
//     })
// });

// Orders by Employee
app.get('/ordersbyemployee', function(req, res)
{
    let query1 = "SELECT order_employee_id, Orders.order_id, CONCAT (Employees.employee_id, '. ', Employees.first_name, ' ', Employees.last_name) AS employee_id FROM Orders_Employees JOIN Orders ON Orders_Employees.order_id = Orders.order_id JOIN Employees ON Orders_Employees.employee_id = Employees.employee_id";
    let query2 = "SELECT * FROM Orders";
    let query3 = "SELECT * FROM Employees";

    db.pool.query(query1, function(error, rows, fields){    // Populate table

        let ordersbyemployee = rows;

        db.pool.query(query2, (error, rows, fields) => {    // Populate order dropdown in form

            let orders = rows;

            db.pool.query(query3, (error, rows, fields) => {    // Populate employee dropdown in form
            
                let employees = rows;
                res.render('ordersbyemployee', {data: ordersbyemployee, orders: orders, employees: employees});        
            })        
        });                  
    })               
});


// POST ROUTES
// Customers


app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let address = parseInt(data['input-address']);
    if (isNaN(address))
    {
        address = 'NULL'
    }

    // Create the query and run it on the database
    // let query1 = `INSERT INTO Customers (first_name, last_name, address, phone_number) VALUES ('${data.first_name}', '${data.last_name}', '${data.address}', '${data.phone_number}')`;

    let query1 = `INSERT INTO Customers (first_name, last_name, address, phone_number) VALUES ('${data['input-first_name']}', '${data['input-first_name']}', '${address}', '${data['input-phone_number']}' )`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customer');
        }
    })
})





// app.post('/add-customer-ajax', function(req, res) 
// {
//     // Capture the incoming data and parse it back to a JS object
//     let data = req.body;

//     // Create the query and run it on the database
//     query1 = `INSERT INTO Customers (first_name, last_name, address, phone_number) VALUES ('${data.first_name}', '${data.last_name}', '${data.address}', '${data.phone_number}')`;
//     db.pool.query(query1, function(error, rows, fields){

//         // Check to see if there was an error
//         if (error) {

//             // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//             console.log(error)
//             res.sendStatus(400);
//         }
//         else
//         {
//             // If there was no error, perform a SELECT * on Customers
//             query2 = `SELECT * FROM Customers;`;
//             db.pool.query(query2, function(error, rows, fields){

//                 // If there was an error on the second query, send a 400
//                 if (error) {
                    
//                     // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//                     console.log(error);
//                     res.sendStatus(400);
//                 }
//                 // If all went well, send the results of the query back.
//                 else
//                 {
//                     res.redirect('/customer');
//                 }
//             })
//         }
//     })
// });

// Orders
app.post('/add-order-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let customer_id = parseInt(data['input-customer_id']);
    // if (isNaN(customer_id))
    // {
    //     customer_id = 'NULL'
    // }

    // let total_price = parseInt(data['input-total_price']);
    // if (isNaN(total_price))
    // {
    //     total_price = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (customer_id, date, take_out, total_price) VALUES ('${data['input-customer_id']}', '${data['input-date']}', ${data['input-take_out']}, ${data['input-total_price']})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/order');
        }
    })
})


// DELETE ROUTES
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customer_id = parseInt(data.id);
    let deleteOrders = `DELETE FROM Orders WHERE customer_id = ?`;
    let deleteCustomers= `DELETE FROM Customers WHERE customer_id = ?`;

        // Run the 1st query
        db.pool.query(deleteOrders, [customer_id], function(error, rows, fields){
            console.log('FIRST QUERY ATTEMPTED');
            if (error) {
                console.log(error);
                res.sendStatus(400);
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteCustomers, [customer_id], function(error, rows, fields) {
                    console.log('SECOND QUERY ATTEMPTED');
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
        })});

        
// UPDATE ROUTES
// app.post('/update-customer', function (req, res) {
// 	let data = req.body;
// 	let query1 = `UPDATE Customers SET first_name = '${data.update_first_name}', last_name = '${data.update_last_name}', address = '${data.update_address}', phone_number = '${data.update_phone_number}' WHERE customer_id = '${data.customer_id}'`;

// 	db.pool.query(query1, function (error, rows, fields) {
// 		if (error) {
// 			console.log(error);
// 			res.sendStatus(400);
// 		}
// 	});

// 	res.redirect('/customer');
// });


app.post('/update-customer', function (req, res) {
	let data = req.body;
	let query1 = `UPDATE Customers SET first_name = '${data.update_first_name}', last_name = '${data.update_last_name}', address = '${data.update_address}', phone_number = '${data.update_phone_number}' WHERE customer_id = '${data.customer_id}'`;


	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}else{
            res.redirect('/item');
        }
	});
});


// Order Details
app.post('/add-order-detail-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let customer_id = parseInt(data['input-customer_id']);
    // if (isNaN(customer_id))
    // {
    //     customer_id = 'NULL'
    // }

    // let total_price = parseInt(data['input-total_price']);
    // if (isNaN(total_price))
    // {
    //     total_price = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Order_Details (order_id, item_id, qty, line_total) VALUES ('${data['input-order_id']}', '${data['input-item_id']}', ${data['input-qty']}, ${data['input-line_total']})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/orderDetails');
        }
    })
})

// Orders by Employee
app.post('/add-order-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // // Capture NULL values
    // let homeworld = parseInt(data['input-homeworld']);
    // if (isNaN(homeworld))
    // {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data['input-age']);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders_Employees (order_id, employee_id) VALUES ('${data['input-order_id']}', '${data['input-employee_id']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/ordersbyemployee');
        }
    })
})


// Orders Details
app.get('/orderdetails', function(req, res)
{
    let query1 = "SELECT order_details_id, Orders.order_id, CONCAT (Items.item_id, '. ', Items.name) AS item_id, qty, line_total FROM Order_Details JOIN Orders ON Order_Details.order_id = Orders.order_id JOIN Items ON Order_Details.item_id = Items.item_id;";
    let query2 = "SELECT * FROM Orders";
    let query3 = "SELECT CONCAT(item_id, '. ', name) as item_id_name, item_id FROM Items";

    db.pool.query(query1, function(error, rows, fields){    // Populate table

        let orderdetails = rows;

        db.pool.query(query2, (error, rows, fields) => {    // Populate dropdown for order_id in form

            let orders = rows;

            db.pool.query(query3, (error, rows, fields) => {    // Populate dropdown for item_id in form
            
                let items = rows;
                res.render('orderdetails', {data: orderdetails, orders: orders, items: items});        
            })        
        });                  
    })               
});



/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
