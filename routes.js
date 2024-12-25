const fs = require('fs');

const requestHandler= (req, res) => {
    //url and method

    const url = req.url;
    const method = req.method;

    if (req.url === '/') {
        //form

        // fs.readFile("message.txt", {encoding:"utf-8"}, (err, data) => {
        //     if(err) {
        //         console.log(err);
        //     }
        //     console.log('data from file = ' + data);
        //     res.write("<html>");
        //     res.write('<head><title>Enter Message</title></head>');
        //     res.write(`<body>${data}</body>`);
        //     res.write(`<form  action="/message" method="POST">
        //     <label>Name:</label>
        //     <input type="text" name="username"></input>
        //     <button type="submit">Add</button>
        //     </form>`);
        //     res.write("</html>");
        //     res.end();
        // })

        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <form  action="/message" method="POST">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type="submit">Add</button>
            </form>`)
        
    } else {
        if (req.url === '/message' && method==="POST") {
            res.setHeader('Content-Type', 'text/html');
            //this event listeners act as a children waiting for chocolate
            let body = [];
            req.on('data', (chunks) => {
                //console.log(chunks);
                body.push(chunks);

            })
            req.on('end', () => {
                let buffer = Buffer.concat(body);
                console.log(buffer);
                let formData = buffer.toString();
                console.log(formData);
                const message = formData.split("=")[1];
                fs.writeFile('message.txt', message, (err) => {
                    res.statusCode = 302 //redirected
                    res.setHeader('Location', '/');
                    res.end();
                })
            })
        } else {
            if (req.url === '/read') {
                //read from the file
                fs.readFile('message.txt', (err, data) => {
                    console.log(data.toString());
                    res.end(`
                        <h1>${data.toString()}</h1>`);
                })
            }
        }
    }
}

const anotherFunction = () => {
    console.log("This is another Function");
}

// module.exports = {
//     handler:requestHandler,
//     testFunction:anotherFunction
// }

//or

// module.exports.handler=requestHandler;
// module.exports.testFunction=anotherFunction;

//or

exports.handler=requestHandler;
exports.testFunction=anotherFunction;