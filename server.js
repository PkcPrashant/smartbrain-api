const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DATABASE_URL = 'postgres://dnaoyqagsuqaej:64074ca1270dbc0dbfb13cb4f6a1460f3d022c75788fcfd7132d254bf9d6826f@ec2-174-129-247-1.compute-1.amazonaws.com:5432/ddluf4itpps0gn
';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl : true
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('It is working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
