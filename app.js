var express = require('express');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contact');
var app = express();
var port = 80;

//define mongoose stuff
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    thoughts: String
  });

var Contact = mongoose.model('Contact', contactSchema);  

//Express specific stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

//end points
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
 })

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
 })

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
       res.send('data has been saved to database');
    }).catch(()=>{
       res.status(400).send('data is not saved to database');
    })
    // res.status(200).render('contact.pug');
 })

 //start the server
app.listen(port,()=>{
    console.log(`application started successfully on port ${port}`);
})