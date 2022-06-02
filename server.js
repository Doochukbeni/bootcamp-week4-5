//

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes.js');

const productRoutes = require('./routes/product-routes.js');
const res = require('express/lib/response');




const server = express();


server.use(bodyParser.urlencoded({ extended: false }));

server.use(cors());


server.use(bodyParser.json());

// Connect to MongoDB
const connectionString = "mongodb+srv://admin01:mrchurch2017@cluster0.0wnne.mongodb.net/astrolabs_backend?retryWrites=true&w=majority";

const connectionConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

mongoose
.connect( connectionString, connectionConfig )
.then(
    function() {
        console.log('DB is connected')
    }
)
.catch(
    function(dbError) {
        console.log('DB error', dbError)
    }
);

server.get(
    '/',
    function (req, res) {
        res.send("welcome");
    }
);



server.use(
    '/user', userRoutes
);

server.use(
    '/product', productRoutes
);

server.get(
    '/user/all',
    function (req,res) {

        UserModel
            
            .find()
            .then(
                function (document) {
                    res.send(document)
                }
            )
        
            .catch(
                function (dbError) {
                    console.log('Db error user create error', dbError)
                    
                    
                }
            );
        
    }
);


server.put(
    '/user/update',
    function (req, res) {

        // the search criteria
        const search = { _id: mongoose.Types.ObjectId(req.body._id) };

        // replacement document
        const updatedDocument = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        }
        
        // this will tell mongoDB to show the updated document
        const options = { new: true }
        
        UserModel
         .findOneAndUpdate(
            search,
            updatedDocument,
            options
            
        )
        .then(
            function (updatedDocument) {
                res.send(updatedDocument);
            }
        )
        .catch(
             function (error) {
            console.log('Error /user/update', error);
            }
        )
        
    }
);


server.listen(
    4001,
    function () {
        console.log("server is connected on http://localhost:4001")
    }
);