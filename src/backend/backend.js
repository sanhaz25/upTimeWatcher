const fs = require('fs');

const { startMonitoring } = require('./monitor');
startMonitoring();

const express = require('express');
    const app = express();
    app.use(express.json()) // Hey, if you get a request with a JSON body (like from Postman), please parse it and attach it to req.body so I can use it easily.

    // Array of URLs in JSON format
    let urls = require('./urls.json');
    // let urls2 = [
    //     {id: 1, caller: "url1", status: "", lastChecked: new Date().toLocaleString()},
    //     {id: 2, caller: "url2", status: "", lastChecked: new Date().toLocaleString()},
    //     {id: 3, caller: "url3", status: "", lastChecked: new Date().toLocaleString()}
    // ];

    // GET all urls
    app.get('/urls', (req, res) => {
        res.json(urls);
    });

    // GET one url
    app.get('/urls/:id', (req, res) => {
        const id = parseInt(req.params.id); // Parse ID from URL parameter
        const index = urls.findIndex(item => item.id === id);
        const _url = urls[index];
    
        // if url is not there
        if (index === -1) {
            return res.status(404).send("Url not found");
        }
    
        res.json(_url);
    });

    // POST 
    app.post('/addUrl', (req, res) => {
        const newUrl = req.body;
        newUrl.id = urls.length + 1;
            newUrl.status = "";
            newUrl.lastChecked = new Date().toLocaleString();
            newUrl.responseTime = "";
            urls.push(newUrl);
            fs.writeFileSync('urls.json', JSON.stringify(urls));
        res.json(newUrl);
    });

    // DELETE
    app.delete('/url/:id', (req, res) => {
        const id = parseInt(req.params.id); // Parse ID from URL parameter
        const index = urls.findIndex(item => item.id === id);
    
        // if url is not there
        if (index === -1) {
            return res.status(404).send("Url not found");
        }
    
        // Remove data from array
        urls.splice(index, 1); // splice(start number, delete count)
        fs.writeFileSync('urls.json', JSON.stringify(urls));
    
        res.json({ message: "Data deleted successfully" });
    });
    
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

