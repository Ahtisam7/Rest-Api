const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();


mongoose.connect("mongodb://localhost:27017/Sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected with mongoose")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json())


const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const Product = new mongoose.model("Product",productSchema)

app.post("http://localhost:4500/api/v1/product/new",async(req,res)=>{
    
   const product = await Product.create(req.body);
   res.status(200).json({
    sucess:true,
    product
   })


})

app.listen(4500,()=>{
    console.log("server is working http://localhost:4500")
})