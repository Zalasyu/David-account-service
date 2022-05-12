// Author: Alec Moldovan

const path = require('path')
const express = require('express')
const cosmoDbMongo = require('./config/db.config')
const routes = require('./routes/route')
const jwt = require('jsonwebtoken')

// TODO: Single-File Responsibility Principle Error
const User = require('./model/account.model')
require('dotenv').config()

console.log('ENV:::', process.env.ENVIRONMENT)
console.log('PORT:::', process.env.PORT)
console.log('MONGO_CONNECTION_STRING:::', process.env.MONGO_CONNECTION_STRING)


const app = express()
const port = process.env.PORT || 3080

// Connect to Azure Cosmo DB for Mongodb
cosmoDbMongo.connect()

app.use(express.static(path.join(__dirname, '../ui/build')))
app.use(express.json())
app.use(cors())

app.use(async (req, res, next) => {
  // Retrieves the x-access-token header
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token']

    // Uses the secret key used in the signing th token to verify
    // that the token has not been compromised
    const { userId, exp } = await jwt.verify(accessToken,
      process.env.JWT_SECRET)

    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error:
                'JWT token has expired, please login to obtain a new one'
      })
    }

    // User's ID is used to retrieve all info on user
    // The info can then be used by the next middleware.
    res.locals.loggedInUser = await User.findById(userId)
    next()
  } else {
    next()
  }
})

app.use('/', routes)

// PORT

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`)
})
