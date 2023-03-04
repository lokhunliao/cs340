/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9065;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
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
        let query1 = "SELECT * FROM Items;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows});
        })
    });


app.post('/add-item-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let description = parseInt(data['input-description']);
    if (isNaN(description))
    {
        homeworld = 'NULL'
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
            res.redirect('/');
        }
    })
})

app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined)
    {
        query1 = "SELECT * FROM Items;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Items WHERE name LIKE "${req.query.name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let items = rows;

        return res.render('index', {data: items});
    })
});


app.post('/update-item', function (req, res) {
	let data = req.body;
	let query1 = `UPDATE Items SET name = '${data.update_name}', price = '${data.update_price}', description = '${data.update_description}' WHERE item_id = '${data.item_id}'`;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
	});

	res.redirect('/');
});


app.delete('/delete-item', function (req, res) {
	let data = req.body;
	let query1 = `DELETE FROM Items WHERE item_id = '${data.id}' `;

	db.pool.query(query1, function (error, rows, fields) {
		if (error) {
			console.log(error);
			res.sendStatus(400);
		}
	});
	res.redirect('/');
});

// app.delete('/delete-item', function (req, res) {
// 	let data = req.body;
// 	let query1 = `UPDATE Items SET name = '${data.update_name}', price = '${data.update_price}', description = '${data.update_description}' WHERE item_id = '${data.item_id}'`;

// 	db.pool.query(query1, function (error, rows, fields) {
// 		if (error) {
// 			console.log(error);
// 			res.sendStatus(400);
// 		}
// 	});

// 	res.redirect('/');
// });

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
