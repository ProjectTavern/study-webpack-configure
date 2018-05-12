var http = require('http');
var fs = require('fs');
var number = 0;
http.createServer( (req, res) => {

   fs.readFile('fakelog.txt', (err, data) => {
       /* http 호출이 있을 때마다 어펜드 파일이 동작하면서 로그가 붙게됨, 파일이 없을 경우 자동 생성 */
       fs.appendFile('fakeLogFileAutomatic.txt', "[" + number + "]" + data, err => {
           if (err) throw err;
           number++;
           console.log('saved', data);
       });
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.write(data);
       res.end();
   });

}).listen(8800);