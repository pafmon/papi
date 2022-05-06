import express from "express";

const PORT = process.env.PORT || 1607;

const app = express();

app.use("/",express.static("./public"));

app.get("/hello",(req,res)=>{
    res.send("Hello World!");
});


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
}).on("error",(err)=>{
    console.log(`ERROR launching server on port ${PORT}: ${err}`);
});
