const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'water',
		database : 'palette'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('it is working!!')
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// app.put('/palette', (req, res) => {
//   const { id } = req.body;
//   const { palette } = req.body;
//   db('users').where('id', '=', id)
//   .increment('entries', 1)
//   .returning('entries')
//   .then(entries => {
//     res.json(entries[0]);
//   })
//   .catch(err => res.status(400).json('unable to get entries'))
// })

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})

