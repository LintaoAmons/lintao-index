// const myModule = require('./my-module')
// console.log(myModule)
const express = require('express')
// const { readFile } = require('fs')
const { readFile } = require('fs').promises

var app = express()
// app.get("/", (req, res) => {
//   readFile('./home.html', 'utf8', (err, html) => {
//     if (err) {
//       res.status(500)
//     }
//     res.send(html)
//   })
// })
//

app.get("/", async (req, res) => {
  res.send(await readFile("./home.html", "utf8"))
})

app.listen(process.env.PORT || 3001, () => console.log(`Aap available on http://localhost:3001`))
