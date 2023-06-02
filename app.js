const express=require("express");
const bodyParser=require("body-parser");
const path=__dirname;
const date=require(path+"/date.js");
// console.log(date.getDate());

const app=express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
const items=[];
const work=[];
app.get("/",function(req,res){
    let day=date.getDate();
    let dayeeeee=date.getDay();
    res.render("list", {listTitle:day,newListItem:items});
});
app.get('/work',function(req,res){
    res.render("list",{listTitle:"work List",newListItem:work})
});
app.post('/',function(req,res){
    item=req.body.newItem;
    console.log(req.body.list);
    // if(req.body.list)
    console.log(typeof(req.body.list));
    if(req.body.list==='work List'){
        if(item!=""){
            work.push(item);
        }
        res.redirect('/work');
    }
    else{
        if(item!=""){
            items.push(item);
        }
        res.redirect('/');
    }
});
app.listen(3000,function(){
    console.log("Server started on port 3000")
});