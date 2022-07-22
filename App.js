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
    let query={}
    let brandID=Number(req.params.brandID);
    let category_id =Number(req.params.category_id);
    if(brandID){
        query ={category_id:brandId}
    }else if(category_id){
        query={"Product_Type.category_id":category_id}
    }
    else{
        query={}
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/filter/:costID',(req,res)=>{
    let query={}
    let sort = {cost:1}
    let costID =Number(req.params.costID);
    let brandID =Number(req.params.brandID);
    let lcost=Number(req.params.lcost);
    let hcost =Number(req.params.hcost);
    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(brandID && lcost && hcost){
        query={
            "cost.costID":costID,
            "brand.brandID":brandID,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }

    else if(brandID){
        query={
            "cost.costID":costID,
            "brand.brandID":brandID
        }
    }else if(lcost && hcost){
        query={
            "cost.costID":costID,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }

    }
    else{
        query={
            "cost.costID":costID,
        }
    }
    db.collection('product').find(query).sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})

// //products
// app.get('/product',(req,res) => {
//     db.collection('product').find().toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })
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

//details of the products
app.get('/details/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('product').find({category_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/PType/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('Product_Type').find({category_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})




app.post('/productslist',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('product').find({category_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})



//Place Order 
app.post('/placeOrder',(req, res) =>{
    db.collection('orders').insert(req.body,(err,result) =>{
        if (err) throw err;
        res.send ("order Placed")
    })
})

//List of order Placed
app.get('/orders',(req, res) =>{
    let email =req.body.email;
    let query ={}
    if(email){
        query={email}
    }
    db.collection('orders').find(query).toArray((err,result) =>{
        if (err) throw err;
        res.send(result)
    })
})

app.put('/updateOrder/:id',(req,res)=>{
    let oid=Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date,
            }
        },(err,result) =>{
            if (err) throw err;
            res.send("order Updated")
        }
    )
})


//Delete order
app.delete('/deleteOrder/:id',(req,res)=>{
    let _id =mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) =>{
        if (err) throw err;
        res.send("order Deleted")

    })
})
// app.get('/details/:id',(req,res) => {
//     let id = mongo.ObjectId(req.params.id)
//     db.collection('product').find({_id:id}).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })

// })


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