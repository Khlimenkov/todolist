const User = require("../models/user.js");
exports.getUsers = async (req, res) =>{
    try {
        const users = await User.find({});
        res.json(users)
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
}

exports.getUser = async (req,res) => {
    try{
       await User.findById(req.params.id, (err, oneUser) => {
            if (err) return res.sendStatus(400);
            res.json(oneUser);
        })
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
    
}

exports.postUser = async (req,res) => {
    try {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age
        })
        await user.save();
        res.send(user);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    
}

exports.deleteUser = async (req,res) => {
    try{
        const id = req.params.id;
        await User.findByIdAndDelete(id, (err, oneUser)=>{
            if (err) return res.sendStatus(400);
            res.send(oneUser);
        }) 
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    
}

exports.updateUser = async (req,res) => {
    try{
        if(!req.body) return res.sendStatus(400);
        const {id, ...data} = req.body
     await User.findByIdAndUpdate(id, data, {new:true}, (err,doc)=> {
        if(err) console.log(err);
        res.send(doc);
     });
   
    
    }
    catch (err){
        res.status(400).json({message: err.message});
    }
    
}