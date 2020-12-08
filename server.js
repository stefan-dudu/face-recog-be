const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Stefan',
    password : '',
    database : 'smart-brain'
  }
});

db.select ('*').from('users').then(data => {
    console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users:[
        {
            id:'123',
            name:'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
                {
            id:'124',
            name:'Sally',
            email: 'sally@gmail.com',
            password: 'kahoot',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password) {
           res.json('username and password are OK')
       } else {
           res.status(400).json('there is a problem')
       }
});

app.post('/register', (req, res)=>{
    const{email, name, password} = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
    })
        .then(user => {
            res.json(user[0])
    }) // in case of an error, we catch it in this way
        .catch(err => res.status(400).json('unable to join'))
    
})

app.get("/profile/:id", (req,res) => {
        const{id} = req.params;
    db.select('*').from('users').where({id})
    .then (user => {
            if(user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('not found')
            }
            
    })
    .catch(err => res.status(400).json('there been an error getting the user'))

})

app.put('/image', (req, res)=>{
    const{id} = req.body;
    knex('books')
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})
