const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const imageToBase64 = require('image-to-base64');


const app =express();

app.use(cors());
app.use('/images',express.static('images'));

app.get('/getscreenshot/:url/:screen',(req,res)=>{
    var url = req.params.url;
    var viewport = req.params.screen;
    console.log("url",url);
    console.log("viewport",viewport);

    switch(viewport){
        case "desktop":
            var viewportValue = {
                width : 1280,
                height : 950
            }
            break;
        case "Tab":
            var viewportValue = {
                width : 768,
                height : 1024
            }
            break;
        case "Mobile":
            var viewportValue = {
                width : 360,
                height : 640
            }
            break;
    }
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport(viewportValue);
        await page.screenshot({ path: './images/example.png' });
        await browser.close();
        res.send('/images/example.png')
        // imageToBase64(__dirname+'/example.png') // Path to the image
        //     .then(
        //         (response) => {
        //             res.set('Content-Type', 'image/png');
        //             res.send(response); // "cGF0aC90by9maWxlLmpwZw=="
        //         }
        //     )
        //     .catch(
        //         (error) => {
        //             res.send(error); // Logs an error if there was one
        //         }
        //     )
      })();
      
});

const port  = process.env.PORT || 4200;

app.listen(port,()=>{
    console.log("index is listening on port",port);
})



