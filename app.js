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
const listSchema={
    name:String,
    items:[itemsSchema]
};
const List=mongoose.model("List",listSchema);

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
    Item.find()
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
    const nameofpage=req.body.list;
    List.findOne({name:nameofpage})
        .then(msg =>{
            if(msg===null){
                const addel=new Item({
                    name:item
                });
                addel.save();
                console.log(nameofpage);
                res.redirect('/');
            }
            else{
                // var arr=msg.items;
                const addel=new Item({
                    name:item
                });
                msg.items.push(addel)
                // console.log(arr);
                msg.save();
                res.redirect('/'+nameofpage);
                // or below can also do but above is nice and good way
                // List.updateOne({name:nameofpage}, {items:arr})
                //     .then(msg=>{
                //         console.log("ssa");
                //         res.redirect('/'+nameofpage);
                //     })
                //     .catch(err=>{
                //         console.log(err);
                //         res.send("S");
                //     });
                // const t=msg.name;
            }
        })
        .catch(err=>{
            console.log(err);
        });
});

app.post('/delete',function(req,res){
    const nameofpage=req.body.title;
    const id=req.body.checkbox;
    console.log(req.body);
    console.log("Id "+id);
    List.findOne({name:nameofpage})
        .then(msg =>{
            if(msg===null){
                Item.deleteOne({_id:id})
                    .then(msg =>{
                        console.log("deleted item");
                        res.redirect('/');
                    })
                    .catch(err =>{
                        console.log(err);
                    });
            }
            else{
                List.findOneAndUpdate({name:nameofpage},{$pull:{items:{_id:id}}})
                    .then(msg=>{
                        console.log("yes");
                        res.redirect('/'+nameofpage);
                    })
                    .catch(err=>{
                        console.log("Again error");
                    })

            }
        })
        .catch(err=>{
            console.log(err);
        });
    
});
app.get('/:customurl',function(req,res){
    const customListName=req.params.customurl;
    List.findOne({name:customListName})
        .then(msg =>{
            if(msg===null){
                console.log("nullee");
                const list=new List({
                    name:customListName,
                    items:defualtItems
                });
                list.save()
                    .then(msg=>{
                        res.redirect('/'+customListName);
                    })
                    .catch(err=>{
                        console.log("Error in saving of new file");
                    })
            }
            else{
                console.log(msg.name);
                // const t=msg.name;
                res.render("list", {listTitle:msg.name,newListItem:msg.items});
            }
        })
        .catch(err=>{
            console.log(err);
        });
});

app.listen(3000,function(){
    console.log("Server started on port 3000")
});