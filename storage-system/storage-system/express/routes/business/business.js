const dotenv = require('dotenv');
dotenv.config();
const pg = require('pg');
const connectionString = process.env.CONNECTION_STRING;
console.log('connectionString',connectionString)
const client = new pg.Client(connectionString);
const generateToken = require("../creat-token");
client.connect()
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var { authMiddleware } = require('../../config/passport')
const { jwtCheck } = require('../../config/jwt-check')

module.exports = function businessRoutes(app) {
    app.post('/business', async (req, res) => {
        const decodedValues = req.decoded
        const businessId = await client.query("SELECT id FROM public.business_owner")
        const businessOwnerId = businessId.rows[0].id
        const insertBusiness = 'INSERT INTO business ( business_name, contact_email,business_owner_id, contact_telephone)VALUES($1,$2,$3,$4)';
        const businessDetails = [req.body.businessName, req.body.email, businessOwnerId, req.body.phoneNumber];
        try {
            var result = await client.query(insertBusiness, businessDetails)
            res.send(result).status(200).end();
        } catch (err) {
            console.log("err", err)
            res.status(203).end();
        }
    });

    app.get('/business/:email', async (req, res) => {
        try {
            var businessDetails = await client.query('SELECT id, business_name FROM public.business where contact_email =$1', [req.params.email])
            res.send(businessDetails)
            res.status(201).end()
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    })

    app.post('/location', async (req, res) => {
        const businessId = await client.query('SELECT id FROM business WHERE business_name=$1', [req.body.business]);
        const insertLocations = 'INSERT INTO location(address1,address2,country,business_id)VALUES($1,$2,$3,$4)';
        const locationDetails = [req.body.address1, req.body.address2, req.body.country, businessId.rows[0].id]
        try {
            const Results = await client.query(insertLocations, locationDetails)
            
            res.status(201).end()
        } catch (err) {
            console.log(err);
            res.status(203).end()
        }
    })

    app.get('/location', async (req, res, info) => {
        var testing = await client.query(`select * from unit inner join block on unit.block_id=block.id 
        inner join location on block.location_id=location.id
         WHERE unit.id NOT IN (select unit_id from purchase_units)

        `)
        try {
            var allLocations = await client.query("SELECT * FROM location", (err, result) => {
                res.send(testing)
                res.status(200).end()
            })

        } catch (error) {
            console.log(error);
        }
    })

    app.post('/block', async (req, res) => {
        const businessId = await client.query('SELECT location.id FROM business INNER JOIN location on business.id = location.business_id WHERE business_name = $1;', [req.body.businessName]);
        const insertBlocks = 'INSERT INTO block(name,location_id)VALUES($1,$2)';
        const blocksDetails = [req.body.blockName, businessId.rows[0].id]
        try {
            const Results = await client.query(insertBlocks, blocksDetails)
            res.send(Results).status(201).end()
        } catch (err) {
            console.log(err);
        }
    })

    app.get('/block/:businessName', async (req, res) => {
        try {
            var blockDetails = await client.query('SELECT block.name FROM block INNER JOIN location ON block.location_id=location.id INNER JOIN business ON location.business_id=business.id  WHERE business.business_name=$1', [req.params.businessName])
            res.send(blockDetails.rows).status(201).end()
        } catch (error) {
            console.log("error", error);
            res.status(500).end();
        }
    })


    app.post('/unitType', async (req, res) => {
        const insertUnitTypes = 'INSERT INTO unit_type(name,length,width,height)VALUES($1,$2,$3,$4)'
        const unitTypeDetails = [req.body.storageType, req.body.length, req.body.width, req.body.height]
        try {
            var results = await client.query(insertUnitTypes, unitTypeDetails)
            res.send(results)
            res.status(200).end()
        } catch (err) {
            console.log(err);

        }
    })



    app.get('/unitType/', async (req, res) => {
        try {
            var unitTypeDetails = await client.query('select * from unit_type')
            res.send(unitTypeDetails).status(201).end()
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    })

    app.get('/units', authMiddleware, async (req, res) => {
        var unitsExcluded = await client.query('SELECT  * FROM public.unit WHERE unit.id NOT IN (SELECT purchase_units.unit_id FROM purchase_units inner join unit on purchase_units.unit_id = unit.id)')
        var unitsToDisplay = unitsExcluded.rows
        try {
            var unitsDetails = await client.query('SELECT * FROM unit')
            res.send(unitsToDisplay).status(201).end()
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    })

    app.post('/units', authMiddleware, async (req, res) => {
        var unitTypeId = req.body.foundObject.id
        var blockDetails = await client.query('SELECT block.id FROM business INNER JOIN location on business.id = location.business_id INNER JOIN block on location.id =block.id WHERE business.business_name = $1', [req.body.selectedBusiness])
        var insertUnits = 'INSERT INTO unit (name,block_id,unit_type_id) VALUES ($1,$2,$3)';
        var unitsDetails = [req.body.name, blockDetails.rows[0].id, unitTypeId];
        try {
            var results = await client.query(insertUnits, unitsDetails)
            res.send(results).status(201)
        } catch (err) {
            console.log(err)
            res.status(500).end()
        }
    })
    app.get('/selectLocation/:selectedLocation', async (req, res) => {
        var blockDetails = await client.query('SELECT unit_type.name,unit_type.length,unit_type.width,unit_type.height FROM unit_type INNER JOIN unit on unit_Type.id=unit.unit_Type_id INNER JOIN block on unit.block_id= block.id INNER JOIN location on block.location_id=location.id WHERE location.id=$1 and unit.id NOT IN (select unit_id from purchase_units)', [req.params.selectedLocation])
        var finalBlockDetails = blockDetails.rows
        try {
            res.send(finalBlockDetails).status(201).end()
        } catch (err) {
            console.log(err)
            res.status(500).end()
        }
    })
    app.post("/reserved", async (req, res) => {
        var customerDetails = await client.query('SELECT id  FROM customer where contact_email =$1', [req.body.decodedToken.email])
        var finalCustomerDetails = customerDetails.rows[0].id
        var reservedDetails = 'INSERT INTO purchase_units(customer_id,unit_id) VALUES($1,$2)';
        try {
            var results = await client.query(reservedDetails, [finalCustomerDetails, req.body.id])
            res.send(results).status(201)
        } catch (err) {
            console.log("err", err)
            res.status(500).end()
        }
    })

    app.get("/reserved/:decodedToken", async (req, res) => {
        var user = await client.query('SELECT id FROM public.customer where contact_email=$1', [req.params.decodedToken])
        var userDetails = user.rows[0].id
        var unitTypeDetail = await client.query('select location.address1,location.address2,location.country ,unit_type.name, unit_type.height , unit_type.length , unit_type.width  from location inner join  block on block.location_id = location.id inner join unit on unit.block_id = block.id inner join unit_type on unit_type.id = unit.unit_type_id inner join purchase_units on unit.id=purchase_units.unit_id where customer_id=$1', [userDetails])
        var finalUnitTypeDetails = unitTypeDetail.rows
        try {
            res.send(finalUnitTypeDetails).status(201)
        } catch (err) {
            console.log("err", err)
            res.status(500).end()
        }
    })

    app.get("/businessReservedRoom/:decodedToken", async (req, res) => {
        var user = await client.query('SELECT id FROM public.business_owner where contact_email=$1', [req.params.decodedToken])
        var userDetails = user.rows[0].id
        var businessReserved = await client.query(` select location.address1 , location.address2 , location.country ,
    unit.name ,unit_type.height , unit_type.width,
    unit_type.name  ,
    unit_type.length  , business.business_name 
    ,customer.contact_name , customer.contact_email from purchase_units   
    inner join  customer on purchase_units.customer_id = customer.id
    inner join  unit on purchase_units.unit_id = unit.id
    inner join  block on block.id = unit.block_id 
    inner join  location on location.id = block.location_id      
    inner join  business on business.id = location.business_id
    inner join  unit_type on  unit.unit_type_id = unit_type.id       
    where business.business_owner_id = $1;
      `, [userDetails])
        var finalReservedRooms = businessReserved.rows
        try {
            res.send(finalReservedRooms).status(200)
        } catch (err) {
            console.log("err", err)
            res.status(500).end()
        }

    })
    app.get('/available-units', async (req, res) => {
        var availableUnits = await client.query(`select location.address1,location.country,unit.name,unit.id  from unit inner join block on block_id=block.id inner join location on location_id=location.id  WHERE unit.id NOT IN
        (SELECT purchase_units.unit_id FROM purchase_units inner join unit on purchase_units.unit_id = unit.id);`
        )
        console.log("available", availableUnits)
        try {
            res.send(availableUnits)
        } catch (err) {
            console.log(err)
            res.status(500).end()
        }
    })
    app.get('/selectUnit/:selectedUnitType', async (req, res) => {
        var selectedUnitTypes = req.params.selectedUnitType.split(" ")
        var unitsDetails = await client.query(`SELECT  * FROM public.unit WHERE unit.id NOT IN 
        (SELECT purchase_units.unit_id FROM purchase_units inner join unit on purchase_units.unit_id = unit.id)`
        )
        var unitTypeDetails = await client.query('SELECT * FROM unit_type')
        var unitType = unitTypeDetails.rows
        var units = unitsDetails.rows;
        var results = unitType.find(item => {
            return item.name === selectedUnitTypes[0] && item.length === +selectedUnitTypes[1] && item.width === +selectedUnitTypes[2] && item.height === +selectedUnitTypes[3]
        })
        var allAvailableUnits = units.filter(unit => {
            var foundId = unit.unit_type_id

            if (foundId === results.id) {
                return unit.name
            }
        }).map(units => {
            return { name: units.name, id: units.id }
        })
        console.log("what am I sending",results)
        try {
            res.send(allAvailableUnits).status(201).end()

        } catch (error) {
            res.status(500).end()
        }
    })
    app.post('/registerBusiness', async (req, res) => {
        var hashedPassword;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                hashedPassword = hash
                const insertCustomerDetails = 'INSERT INTO business_owner(contact_name,contact_email,password) VALUES($1,$2,$3)';
                const customerDetails = [req.body.name, req.body.email, hashedPassword]
                try {
                    var results = await client.query(insertCustomerDetails, customerDetails);
                    var token = generateToken({ name: req.body.name, email: req.body.email }, "business_owner");
                    res.send(token).status(201).end()
                } catch (err) {
                    console.log(err);
                    res.status(500).end()

                }
            });
        });
    })

    app.post('/logIn', (req, res) => {
        var results = generateToken({ email: req.body.email }, "businessOwner")
        passport.authenticate('businessLogIn', { session: true }, (err, user, info) => {
            if (err) {
                console.log("it went to err", err)
                res.status(203).json(info).end();
            }
            if (user) {
                res.send(results)
            } else {
                res.status(203).json(info).end();
            }
        })(req, res);
    })
}








