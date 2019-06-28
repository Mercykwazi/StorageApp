 require("dotenv").config();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const pg = require("pg");
const bcrypt = require("bcrypt");
const connectionString =process.env.CONNECTION_STRING
const client = new pg.Client(connectionString);
client.connect();
const jwt = require("jsonwebtoken");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async function(email, password, cb) {
      var customerDetails = await client.query(
        "SELECT * FROM customer WHERE contact_email = $1;",
        [email]
      );
      if (customerDetails.rowCount > 0) {
        var passwordsMatch = await bcrypt.compare(
          password,
          customerDetails.rows[0].password
        );
        if (passwordsMatch) {
          return cb(null, customerDetails.rows[0], {
            message: "Logged In Successfully"
          });
        }
      }
      return cb(null, false, { message: "Incorrect email or password." });
    }
  )
);
passport.use(
  "businessLogIn",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async function(email, password, cb) {
      var businessDetails = await client.query(
        "SELECT * FROM business_owner WHERE contact_email = $1;",
        [email]
      );
      if (businessDetails.rowCount > 0) {
        var passwordsMatch = await bcrypt.compare(
          password,
          businessDetails.rows[0].password
        );
        if (passwordsMatch) {
          return cb(null, businessDetails.rows[0], {
            message: "Logged In Successfully"
          });
        }
      }
      return cb(null, false, { message: "Incorrect email or password." });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromHeader("authorization"),
      secretOrKey: "mercy"
    },
    async function(jwt_payload, done) {
      var availableCustomer = await client.query(
        "SELECT contact_name,contact_email FROM customer WHERE contact_name= $1 AND contact_email=$2",
        [jwt_payload.name, jwt_payload.email]
      );
      console.log("jwt_payload :", jwt_payload);
      var customer = availableCustomer.rows[0];
      var availableBusinessOwner = await client.query(
        "SELECT contact_name,contact_email FROM business_owner WHERE contact_name= $1 AND contact_email=$2",
        [jwt_payload.name, jwt_payload.email]
      );
      var businessOwners = availableBusinessOwner.rows[0];
      if (jwt_payload.authority === "customer") {
        try {
          if (
            customer.contact_name === jwt_payload.name &&
            customer.contact_email === jwt_payload.email
          ) {
            console.log("found customer", customer);
            return done(null, customer);
          } else {
            console.log("cannot find customer");
            return done(null, false);
          }
        } catch (e) {
          console.log("e", e);
        }
      } else if (jwt_payload.authority === "businessOwner") {
        try {
          if (
            businessOwners.contact_name === jwt_payload.name &&
            businessOwners.contact_email === jwt_payload.email
          ) {
            console.log("found the business Owner", businessOwners);
            return done(null, businessOwners);
          } else {
            console.log("business owner not found");
            return done(null, false);
          }
        } catch (e) {
          console.log("e", e);
        }
      }
    }
  )
);

function authMiddleware(req, res, next) {
  var token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
          console.log("eee", err);
          res
            .status(203)
            .json({ message: "Something went wrong!" })
            .end();
        } else {
          console.log("it went to else");
          req.decoded = decoded;
          next();
        }
      });
    } else {
      console.log("it all went bad");
      res.status(401).json({ message: "it went bad" });
    }
  } catch (error) {
    next({ message: "something went wrong!" });
  }
}

module.exports = { authMiddleware };
