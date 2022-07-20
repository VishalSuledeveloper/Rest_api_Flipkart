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





// connection with db
MongoClient.connect(mongoUrl,(err,client) =>{
    if(err) console.log(`Error While Connecting`);
    db = client.db('internfeb');
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    })
})