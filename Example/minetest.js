var request = require('request');
var fs = require('fs');

const cheerio = require('cheerio')



console.log("Testing out a simple request miner...")
/*
let url = "http://cloud.cocorahs.org/wys/2015-2016/CO/CO-BN-8-wys-2015-2016.html"

console.log(url)

request(url, function (error, response, body) {

  console.log(body)

  fs.writeFileSync("data.html",body)
*/
  let cachedBody = fs.readFileSync("data.html").toString()

  const $ = cheerio.load(cachedBody)
//.children().last().text()
console.log($('#content-wyo').children(2))
//})
