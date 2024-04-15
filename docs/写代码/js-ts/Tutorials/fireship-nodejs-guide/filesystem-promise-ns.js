const { readFile } = require('fs').promises

async function read() {
  const fileContent = await readFile('./hello.txt', 'utf8')
  console.log(fileContent)
}

read()
console.log("do this ASAP")
