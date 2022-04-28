// Author: Alec Moldovan

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

console.log('environment    ', process.env.ENVIRONMENT)
console.log('PORT    ', process.env.PORT)
console.log('MONGO_CONNECTION_STRING    ', process.env.MONGO_CONNECTION_STRING)


// Custom Libraries
const accountController = require('./controller/account.controller');


const app = express();
const port = process.env.PORT || 3080;

app.use(express.static(path.join(__dirname, '../ui/build')));
app.use(bodyParser.json());

// CRUD: Routes
// CREATE: Registration: Basic User info
app.post('/api/auth/signup', (req, res) => {
    console.log(req.body);
    accountController.createAccount(req.body.account).then(data => res.json(data))
});

// READ: Get users
app.get('/api/accounts', (req, res) => {
    accountController.getAccounts().then(data => res.json(data));
});

// UPDATE: Edit user info (limited)

app.put('/api/account', (req, res) => {
    accountController.updateAccount(req.body.task).then(data => res.json(data));
});
// DELETE: Delete users
app.delete('/api/task/:id', (req, res) => {
    accountController.deleteAccount(req.params.id).then(data => res.json(data));
});


// PORT

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
});
