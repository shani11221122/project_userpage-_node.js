const express = require('express');
const app = express();
const Path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname,'public')));
app.set('view engine', 'ejs');

const userModel = require('./model/user');
const { name } = require('ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/read', async(req, res) => {
    let users = await userModel.find();
    if (users.length === 0) {
        return res.send('No users found');
    }
  res.render('read' ,{users});
});

app.get('/delete/:id', async(req, res) => {
    let users = await userModel.findOneAndDelete({ _id: req.params.id });
  
  res.redirect('/read');
});

app.post('/create', async (req, res) => {
  let { name, email, image } = req.body;

  let createuser = await userModel.create({ name, email, image });

  res.redirect('/read'); // Redirect to the users list after creating
});


app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});
