const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// function getId(){
//         const{id} = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         // if users from our upper local DB(database array) is === to the id recived from params(i guess is postman)
//         if(user.id === id){
//             return res.json(user);
//         }
// });

app.use(bodyParser.json());

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
    const{email, name, password} = req.body
    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date() 
    })
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
