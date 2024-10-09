const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Statik dosyaları sunmak için

mongoose.connect('mongodb://localhost/socialNetwork');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  online: Boolean
});

const User = mongoose.model('User', userSchema);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
  if (existingUser) {
    return res.status(400).send('Username or email already exists');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, email, online: false });
  
  await newUser.save();
  res.send('Registration successful');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }
    
    user.online = true;
    await user.save();
    
    res.send('Login successful');
});

app.get('/users', async (req, res) => {
  const users = await User.find().sort({ username: 1 });
  res.json(users);
});

app.post('/message', async (req, res) => {
  const { sender, receiver, message } = req.body;
  // Here we would handle message storing logic
  res.send('Message sent');
});
