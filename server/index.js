const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    // console.log(req.url);
    //
    // res.write('<h1>Hello server</h1>');
    // res.write('<h2>Hello server</h2>');
    // res.write('<h3>Hello server</h3>');
    // res.end('TEST');

    if(req.method === 'GET'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        if(req.url === '/'){
            fs.readFile(path.join(__dirname, 'views', 'index.hbs'), 'utf-8', (err, content) => {
                if(err) throw err;
                res.end(content);
            })
        }
        else if(req.url === '/about'){
            fs.readFile(path.join(__dirname, 'views', 'about.hbs'), 'utf-8', (err, content) => {
                if(err) throw err;
                res.end(content);
            })
        }
        else if(req.url === '/api/users'){
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            const users = [{name: 'Test1', age: 25}, {name: 'Test 2', age: 26}];
            res.end(JSON.stringify(users));
        }
    } else if( req.method === 'POST'){
        const body = [];
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        req.on('data', data => {
            body.push(Buffer.from(data, "utf8"));
        });

        req.on('end', () => {
           console.log(body);
           const msg = body.toString().split('=')[1];

            res.end(`
            <h1>Your message: ${msg}</h1>
        `)
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running');
});
