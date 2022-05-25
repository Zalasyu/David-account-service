// Author: Alec Moldovan

const path = require('path')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const config = require('./config/config.json')

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
    passReqToCallback: config.settings.passReqToCallback
}

// Instantiate the passport Azure AD library with the Azure AD B2C options
const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument.
  done(null, { }, token)
})

// Print to stdout the envionment and port that the app is running in.
console.log('ENV:::', process.env.ENVIRONMENT)
console.log('PORT:::', process.env.PORT)

const app = express()

app.use(morgan('dev'))

app.use(passport.initialize())

passport.use(bearerStrategy)

// Connect frontend to backend 
// app.use(express.static(path.join(__dirname, '../ui')))

app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Add EndPoints
// Anonymous endpoint
app.get('/public', (req, res) => res.send({ 'test-date': new Date() }))

// Protected Endpoint
app.get('/dashboard',
  passport.authenticate('oauth-bearer', { session: false }),
  (req, res) => {
    console.log('Validated claims: ', req.authInfo)

    // Service relies on the name claim
    res.status(200).json({ 'test-name': req.authInfo['name'] })
  })

// Starts listenting on port 3080
const port = process.env.PORT || 3080

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`)
})
