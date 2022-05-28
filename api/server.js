// Author: Alec Moldovan

const express = require('express')
const cors = require('cors')
const passport = require('passport')
const logger = require('morgan')
const config = require('./config/config.json')
const { MongoUnexpectedServerResponseError } = require('mongodb')

// Import environment variables
require('dotenv').config()

// Import the passport Azure AD Library
const BearerStrategy = require('passport-azure-ad').BearerStrategy

// Sets the Azure AD B2C options
const options = {
  identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
  clientID: config.credentials.clientID,
  audience: config.credentials.clientID,
  policyName: config.policies.policyName,
  isB2C: config.settings.isB2C,
  validateIssuer: config.settings.validateIssuer,
  loggingLevel: config.settings.loggingLevel,
  passReqToCallback: config.settings.passReqToCallback,
  scope: config.protectedRoutes.dashboard.scopes
}

// Instantiate the passport Azure AD library with the Azure AD B2C options
const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument.
  console.log('Verifying the User');
  console.log(`${token} was retrieved.`);
  findById(token.oid, function (err, user) {
    if (err){
      return done(err);
    }
    if (!user) {
      console.log('User was added automatically as they were new.');
      console.log("Their oid is: ", token.oid);
      
    }
  }

});

// Print to stdout the envionment and port that the app is running in.
console.log('ENV:::', process.env.ENVIRONMENT)
console.log('PORT:::', process.env.PORT)

const app = express()

app.use(logger('dev'))

app.use(passport.initialize())

passport.use(bearerStrategy)

app.use(express.json())

app.use(cors())

// CORS Settings
// Cross-origin Resource sharing is enables for all domains
// This is insecure
// TODO: In production, we need to modify this to allow only the domains
// that we designate.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Add EndPoints
// Anonymous endpoint
app.get('/public', (req, res) => res.send({ 'test-date': new Date() }))

// Protected Endpoint
// passport-azure-ad validates the token against the:
// issuer, scope, and audience claims (defined in BearerStrategy)
// Passport.authenticate Options:
// 'session: false' = If we don't want a persistent login session

app.get('/dashboard',
  passport.authenticate('oauth-bearer'),
  (req, res) => {
    console.log('Validated claims: ', req.authInfo)

    // Service relies on the name claim
    res.status(200).json({
      'name': req.authInfo['name'],
      'issued-by': req.authInfo['iss'],
      'issued-for': req.authInfo['aud'],
      'scope': req.authInfo['scp']
    });
  }
)

// Starts listenting on port 3080
const port = process.env.PORT || 3080

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`)
})

module.exports = app;
