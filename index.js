const express=require('express');
const mongoose=require('mongoose');  // mongoose server add
const app=express(); //apps create
const port =5000;  // localhost port 
//load model
const Todo=require('./model/todo');

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todolistDb",{
   useNewUrlParser:true,  useUnifiedTopology:true
  })
  .then(() => {
    console.log("connection done");
  })
  .catch(() => {
    console.log("connection fail");
  });




//middelware কোন কিছু ব্যবহার করতে 
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))


//index route 
app.get('/', async(req,res)=>{
    //get todos  
    const todos= await Todo.find({}).sort('-date');
     res.render("index",{todos});
});

// todos item delete part
app.get("/:id/delete", async (req, res) => {
  //get todo
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


//about route 
app.get("/about", (req, res) => {
  res.render("about");
});

//handle form post 
app.post('/', async(req,res)=>{
    const text=req.body.text.trim(" ");
    if (text==='') {
      return res.redirect('/')  
    }
    let newTodo= new Todo({
        text
    });
    await newTodo.save();
    res.redirect('/')
})



app.listen(port,()=>{  //callback f ===========es6 arrow f
    console.log("server is run",port)
})