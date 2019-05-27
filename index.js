const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
const mail=require('./schema')
const nodemailer=require('nodemailer')

const app=express()

let port=process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/mails',{useNewUrlParser:true},(err)=>{
  if(err) console.log(err)

  console.log(`conecting to db`)
  app.listen(port,(err)=>{
      if(err) console.log(err)
      console.log(`http://localhost:${port}`)
  })
})




app.post('/mail',(req,res)=>{
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'hernag_09@hotmail.com',
      pass: 'Raptor09'
    },

    tls: {
      rejectUnauthorized: false
    }

  })

  let mailoptions = {
    from: 'hernan',
    to: 'hernag_09@hotmail.com',
    subject: 'heroku',
    text: 'mail' + req.body.mail,
    html: '<ul><li>' + req.body.mail + '</li></ul>'

  }

  transporter.sendMail(mailoptions, (error, info) => {
    if (error) console.log(`${error}`)
    else {
      console.log(info)
      res.redirect('/product')
    }
  })
})

app.get('/indexes',(req,res)=>{
  res.render('index')
})
app.get('/hello',(req,res)=>{
  res.render('hello')
})