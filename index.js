const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
const mail=require('./schema')
const nodemailer=require('nodemailer')


const app=express()

let port=process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public/assets')));
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




app.post('/mailer',(req,res)=>{
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
    subject: 'Hernan Gomez',
    text: 'mail' + req.body.email,
    html: '<ul><li>' + req.body.email + '</li></ul>'

  }

  transporter.sendMail(mailoptions, (error, info) => {
    if (error) console.log(`${error}`)
    else {
      console.log(info)
      res.redirect('/index')
    }
  })
})

app.get('/index',(req,res)=>{
  res.render('index')
})
