const express = require("express");
const fs = require('fs');

const PORT = process.env.PORT || 1607;

const app = express();

app.use("/",express.static("./public"));

app.get("/hello",(req,res)=>{
    res.send("Hello World!");
});

app.get("/ww/poems",(req,res)=>{
    
    fs.readFile('./ww/index', function(err, poemsIndex) {
        if(err) 
            console.error(`Error Opening Index: ${err}`)

        const poemsIndexArray = poemsIndex.toString().replace(/\r\n/g,'\n').split('\n');
        const poems =  poemsIndexArray.map((poemInfo)=>{
            const poemInfoArray = poemInfo.split(" ");
            return poemInfoArray[3];
        });
        
        res.send(JSON.stringify(poems,null,2));

    });
});

var poemsIndexArray = [];
fs.readFile('./ww/index', function(err, poemsIndex) {
    if(err) 
        console.error(`Error Opening WW Index: ${err}`)

    poemsIndexArray = poemsIndex.toString().replace(/\r\n/g,'\n').split('\n');
});

var poemsDataArray = [];
fs.readFile('./ww/poems', function(err, poemsData) {
    if(err) 
        console.error(`Error Opening WW PoemsData: ${err}`)
    
    poemsDataArray = poemsData.toString().replace(/\r\n/g,'\n').split('\n');
    console.log(`Loaded ${poemsIndexArray.length} WW poems.`);
});



app.get("/ww/poems/:poemId",(req,res)=>{
    
    const poemId = req.params.poemId;
    var response = {
        index : null,
        title : null,
        text : null
    };

    const poemInfo =  
        poemsIndexArray
        .filter((poemInfo)=>{
            const poemInfoArray = poemInfo.split(" ");
            return (poemInfoArray[3] == poemId);
        }).map((poemInfo)=>{
            const poemInfoArray = poemInfo.split(" ");
            return poemInfoArray;
        })[0];
        
    if(!poemInfo){
        res.sendStatus(404);
        return;
    }else{
    
        const titleLineNo = parseInt(poemInfo[0]);
        const poemBeginLineNo = parseInt(poemInfo[1]);
        const poemEndLineNo = parseInt(poemInfo[2]);

        response.index = poemInfo[3];
        response.title = poemsDataArray[titleLineNo-1];
        response.text = "";

        for(var i= (poemBeginLineNo-1); i < poemEndLineNo; i++){
            response.text += poemsDataArray[i] + "\n";
        }

        res.json(response);
    }

});


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
}).on("error",(err)=>{
    console.log(`ERROR launching server on port ${PORT}: ${err}`);
});
