const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')

app.get('/', (req, res) => {
  res.render('index', {user: {
      foo: 'hello'
  }})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
