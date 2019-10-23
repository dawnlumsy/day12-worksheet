//Load express
const express = require("express");
const exprhb = require("express-handlebars");
const path = require("path");
const fs = require("fs");

//Create an install of express application
const app = express();
const APP_PORT = process.env.PORT | 3000;

app.engine('hbs',exprhb());
app.set ('view engine', 'hbs');

//Serve files from public directory
//__dirname is the absolute path of 
// the application directory
app.use(express.static(path.join(__dirname, 'public')));
finalImageDir = path.join(__dirname, 'views','images');

// ---- THIS IS THE IMPT STEP ELSE THE PAGE FROM /image would not render ----
app.use(express.static(finalImageDir));
// ---- THIS IS THE IMPT STEP ELSE THE PAGE FROM /image would not render ----


// img tag
const randomImagesArr = [];
// physical path
const randomImagesArrwithPath = [];

//console.info(finalImageDir);

fs.readdir(finalImageDir, function(err, items) {
    if (err) {
        return;
    }
    //console.info(items);
    for (var i=0; i<items.length; i++) {
        randomImagesArr.push(items[i]);
        randomImagesArrwithPath.push(finalImageDir + '\\' + items[i]);
    }
    
    /*
    items.forEach(function(filename) {
        randomImagesArr.push(filename);
        randomImagesArrwithPath.push(path.join(finalImageDir, filename))
    });
    //console.log("Start: randomImagesArr " + randomImagesArr);
    //console.log("Start: randomImagesArrwithPath " + randomImagesArrwithPath);
    */

    //console.info("No. of Files: " + randomImagesArr.length);
    //let randomInt = getRandomInt(randomImagesArr.length);
    //console.info(`<img src="${randomImagesArr[randomInt]}"></img>`);
    //console.info(`<img src="${randomImagesArrwithPath[randomInt]}"></img>`);
});

function getRandomInt(max) {
    return Math.floor(Math.random()* Math.floor(max));
}

// endpoint which return html structure
app.get('/image',(req, res, next) => {
    res.status(200);
    res.type('text/html');
    let randomInt = getRandomInt(randomImagesArr.length);
    //res.send(`<img src="dog1.jpg" alt="image of dog">`)
    //res.send(`<img src="${randomImagesArr[randomInt]}"></img>`);
    res.send(`<h2>Via Html Route</h2><img src="${randomImagesArr[randomInt]}"></img>`);
});

// endpoint uses hbs instead of returning html structure
app.get('/image2', (req, res, next) => {
    let randomInt = getRandomInt(randomImagesArr.length);
    res.render('randomimage',{randomImageURL: randomImagesArr[randomInt]});
});

// randomize from the file system.
app.get('/random-image',(req, res, next) => {
    let randomInt = getRandomInt(randomImagesArr.length);
    res.sendFile(randomImagesArrwithPath[randomInt]);
});

app.listen(APP_PORT ,() => {
    console.info(`"Webserver started on port ${APP_PORT}`);
});


//If the requested file is not found, then
//use the following function to handle it
app.use((req,res,next) => {
    //redirect the request to the file not found page
    //Also in public directory
    res.redirect("/error.html");
})