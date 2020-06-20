const http = require('http');
const path = require('path');
const fs  = require('fs');


// what we are doing is if user request the root page then give it home page in h1 
const server = http.createServer((req, res) => {
    // console.log(req.url)    // using this we can see wht browser is requesting

    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) =>{
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html'});       
    //         res.end(content);
    //     }) 
        
    // }
    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) =>{
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html'});       
    //         res.end(content);
    //     }) 
    // }

    // this above method is not efficient as we need same amount of if statement as much pages we have
    // so we going to build path

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let contentType = 'text/html';
    let extname = path.extname(filePath);
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';

    }

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT'){
                // page not found
                fs.readFile(path.join(__dirname, 'public', '404.html') , (err, content) => {
                    if(err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/html'});       
                    res.end(content, 'utf-8');
                }) 
            } else{
                //some server error
                res.writeHead(500)
                res.end(`Server Error : ${err.code}`);
            }
        }
        else{
            //no error at all success
            res.writeHead(200, { 'Content-Type': contentType});       
            res.end(content, 'utf-8')
        }
    });

});

// port will be what it ll b present in users env  or  5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));

// now everytime we going to change our content we have to restart server to avoid that we will use nodemon