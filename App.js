let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let cors = require('cors')
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser')
let mongoUrl = process.env.MongoLocalUrl;
let db;

app.use(morgan('common'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hiii From Express')
})

//products
app.get('/product',(req,res) => {
    db.collection('product').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//brand
app.get('/brand',(req,res) => {
    let id =req.query.category_id
    db.collection('brand').find({category_id:Number(id)}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//quickSearch
app.get('/ProductType',(req,res) => {
    db.collection('Product_Type').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


// app.get('/brand/:id',(req,res) => {
//     let id=req.params.id;
//     db.collection('brand').find({category_id:Number(id)}).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })





// connection with db
MongoClient.connect(mongoUrl,(err,client) =>{
    if(err) console.log(`Error While Connecting`);
    db = client.db('Flipkart');
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    })
})