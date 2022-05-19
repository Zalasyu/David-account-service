// Author: Alec Moldovan

const path = require('path');
const express = require('express');
const cors = require('cors')

// TODO: Single-File Responsibility Principle Error
require('dotenv').config()

console.log('ENV:::', process.env.ENVIRONMENT)
console.log('PORT:::', process.env.PORT)


const app = express()
const port = process.env.PORT || 3080


app.use(express.static(path.join(__dirname, '../ui/build')))
app.use(express.json())
app.use(cors())


app.use('/', (req, res) => {
  res.json({
    message: "Testing backend: Hello developer."


  })

})

// PORT

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`)
})
