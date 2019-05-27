const mongose=require('mongoose')

const Schema=mongose.Schema


let mail=new Schema({
  email:{type:String}
})

module.exports=mongose.model('mail',mail);