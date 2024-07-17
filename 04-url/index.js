const url = require('url')
const adr = 'https://www.geeksforgeeks.org/node-js-url-method/'
const q = url.parse(adr, true)

console.log(q.host);
console.log(q.pathname);
console.log(q.search);