const express=require("express")
const bodyParser=require("body-parser")

const app=express()
app.set('view engine', 'ejs');
const path=__dirname;
app.use(bodyParser.urlencoded({ extended: true }));
var items=[];
app.get("/",function(req,res){
    // res.send("Hello");
    var today=new Date();
    // var currentDay=today.getDay();
    // list=["Sunday","Monday","TuesDay","Wednessday","Thurday","Friday","Saturday"];
    // day=list[currentDay];
    var options={
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    };
    var day=today.toLocaleDateString('en-us',options);
    res.render("list", {kindOfDay:day,newListItem:items});
});
app.post('/',function(req,res){
    item=req.body.newItem;
    if(item!=""){
        items.push(item);
    }
    console.log(req.body.newItem);
    res.redirect('/');
});
app.listen(3000,function(){
    console.log("Server started on port 3000")
});