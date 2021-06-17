//Q1
console.log("Hello World");
//Q2
const os = require('os');
console.log('Arch ' + os.arch());
console.log('CPUs ' + os.cpus().length);
console.log('OS ' + os.platform());
//Q3
const fs = require('fs');
const fileName = __dirname + '/test.txt';
fs.readFile(fileName, (err,data)=> {
    if(err){
        console.log(err);
    }
    console.log(data.toString());
    //console.log(data);// outputs <Buffer 4e 6f 64 65 4a 53 20 69 73 20 61 77 65 73 6f 6d 65>
});
//Q3 f
const data = fs.readFileSync(fileName, "utf8");
console.log(data.toString());
//Q4
//const fileName = __dirname + '/test.txt';//already initialized earlier
const outFileName = __dirname + "/test-copy.txt";
//create read stream and write stream
const readStream = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(outFileName);
//pipe used to connect streams, here it copies
readStream.pipe(writeStream);
//optional
readStream.on('data',data=>{
    console.log(data.toString());
});
//Q5 - HTTP
const http = require('http');
http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.write('<h1>Hello World<h1>');
    //res.end();
    //Q5 d
    switch(req.method){
        case 'GET':
            res.write('<h1>Hello World<h1>');
            res.end();
            break;
        case 'POST':
            req.on('data',data=>{
                res.write('<h1>Hello '+data+'<h1>');
            res.end();
            });
            break;
    }
}).listen(3000, (err)=>{
    console.log('Server is listening to port 3000');
});


