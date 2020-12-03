const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

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

    // // Load hash from your password DB.
    // bcrypt.compare("bacon", '$2a$10$xAiGiB2zJvYEZnaCTVJBz.gE8np8lnbDjKFqPXxOsVMfMzSDosO0W', function(err, res) {
    //     console.log('first try', res)
    // });
    // bcrypt.compare("apples", '$2a$10$xAiGiB2zJvYEZnaCTVJBz.gE8np8lnbDjKFqPXxOsVMfMzSDosO0W', function(err, res) {
    //     console.log('2nd try', res)
    // });

    if(req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password) {
           res.json('username and password are OK')
       } else {
           res.status(400).json('there is a problem')
       }
});

app.post('/register', (req, res)=>{
    const{email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
});
    db('users').insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(console.log)
    res.json(database.users[database.users.length-1])
})

app.get("/profile/:id", (req,res) => {
        const{id} = req.params;
    let found = false;
    database.users.forEach(user => {
        // if users from our upper local DB(database array) is === to the id recived from params(i guess is postman)
        if(user.id === id){
            return res.json(user);
        }
});
    if(!found) {
        res.status(400).json("ain't no user with this name")
    }
})

app.put('/image', (req, res)=>{
        const{id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
})
    if(!found) {
        res.status(400).json("ain't no user with this name")
    }
})









app.listen(3000, () => {
    console.log('app is running on port 3000')
})
