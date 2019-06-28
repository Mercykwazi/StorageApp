var express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser');
var port =3003 
var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
require('./config/passport')
require('./routes/creat-token')
const businessRoutes = require('./routes/business/business')
const customerRoutes = require('./routes/customer/customer')
customerRoutes(app);
businessRoutes(app);
app.listen(port, () => {
  console.log("server running on localhost:3003 ");
});
