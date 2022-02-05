//import html module
const http = require('http');
//import file system module
const fs = require('fs');
// const kill = require("kill-port");
// kill(3000, "tcp");

// console.log('test');

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    

    //define path to html file based on url entered
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'Login.html';
            req.statusCode = 200; //Everything is OK
            break;
        case '/login':
            //redirect
            //req.statusCode = 301; //Redirect
            // res.setHeader('Location','/');
            // res.end();
            res.writeHead(302, {
                'Location': '/'
                //add other headers here...
              });
              res.end();
            break;
        default:
            path +='404.html';
            req.statusCode = 404; //Page not found
            break;
    }


    //send an html file
    //console.log(path);
    //read a file, take 2 parameters, err == if error, data =  main html text
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            res.end();
        }else {
            //no need for wrtie, just send data to end
            //res.write();
            res.end(data);
        }
    })


});

// server.listen(3000, 'localhost',()=>{
//     console.log('listening for requests on port 3000')

// });

