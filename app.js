const express=require("express");
const bodyParser=require("body-parser");
const path=__dirname;
const date=require(path+"/date.js");
const mongoose=require("mongoose");
// console.log(date.getDate());

const app=express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{ useNewUrlParser: true, useUnifiedTopology: true });
const itemsSchema={
    name:String
};
const Item=mongoose.model("Item",itemsSchema);

const todo1=new Item({
    name:"LeetCode"
});
const todo2=new Item({
    name:"Potd"
});
const defualtItems=[todo1,todo2];
// Item.insertMany(defualtItems)
//     .then(msg => {
//         console.log(msg);
//     })
//     .catch(err => {
//         console.log(err);
//     });

app.get("/",function(req,res){
    let day=date.getDate();
    let dayeeeee=date.getDay();
    Item.find().select('name')
        .then(msg => {
            // console.log(msg[1]['name']);
            res.render("list", {listTitle:day,newListItem:msg});
            console.log("Succesully find");
        })
        .catch(err => {
            console.log(err);
        });
});
// app.get('/work',function(req,res){
//     res.render("list",{listTitle:"work List",newListItem:work})
// });
app.post('/',function(req,res){
    item=req.body.newItem;
    console.log(req.body.list);
    // if(req.body.list)
    const addel=new Item({
        name:item
    });
    addel.save();
    res.redirect('/');
});

app.post('/delete',function(req,res){
    console.log(req.body.checkbox);
    const id=req.body.checkbox;
    Item.deleteOne({_id:id})
        .then(msg =>{
            console.log("Hurra")
            console.log(msg);
            res.redirect('/');
        })
        .catch(err =>{
            console.log(err);
        });
});
app.get('/:para',function(req,res){
    const customListNmae=req.params;
    res.send(req.params.para);
});

app.listen(3000,function(){
    console.log("Server started on port 3000")
});