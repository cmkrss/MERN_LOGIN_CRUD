const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const UserModel = require('./models/Users');


const app = express();
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));


mongoose.connect('mongodb://127.0.0.1:27017/employee');

const verifyUser = (req, res, next) =>{
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json("Token not available");
  } else {
    let a = token.split(" ")[1];
    jwt.verify(a, "jwt-secret-key", (err, decoded) => {
      if(err) return res.json("token is wrong")
        else
        next();
    })
  }
  console.log(token);
}

app.get('/home', verifyUser, (req, res) => {
    return res.json("success")
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
  .then((user) => {
    if (user) {
    bcrypt.compare(password, user.password, (err, response) => {
        if(response){
          const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn: "1d"})
            res.json({
              message: "Success",
              token
            });
        }else{
            res.status(400).send("password incorrect");
        }
    })    
    } else {
      res.status(404).send('no record found');
    }
  });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.get('/getUsers', verifyUser , (req, res) => {
  EmployeeModel.find()
  .then(users  => res.json(users))
  .catch(err => res.json(err)) 
})

app.put('/updateUser/:id', verifyUser, (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  EmployeeModel.findByIdAndUpdate(id, { name, email }, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(400).json(err));
});

app.delete('/deleteUser/:id', verifyUser, (req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.status(200).json({ message: 'User deleted successfully', result });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(3001, () => {
  console.log('serverr is running ....');
});