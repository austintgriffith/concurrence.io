// this is for hosting a public node (non-drafts)
var express = require('express')
var app = express()
app.use(express.static('public'))
app.listen(3000);
console.log("hosting 'public' content on port 3000");
