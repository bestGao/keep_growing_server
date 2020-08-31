import express = require('express');
import mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gao'
});

connection.connect();
// connection.query('truncate table users', function() {})
connection.query('INSERT INTO users (name, age) VALUES ("我是你爸爸", 18)', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
});

// connection.query('ALTER TABLE users ADD COLUMN age int(10) DEFAULT NULL COMMENT "年龄"', function (error, results, fields) {
//     if (error) throw error;
//     // console.log('The solution is: ', results[0].solution);
// });

// connection.query('INSERT INTO users (age) VALUES (18)', function (error, results, fields) {
//     if (error) throw error;
//     // console.log('The solution is: ', results[0].solution);
// });

// Create a new express app instance
const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Hello World dsf!');
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(3000, function () {
    console.log(`App is listening on port 3000!`);
});