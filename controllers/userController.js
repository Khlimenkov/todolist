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
       const oneUser = await User.findById(req.params.id)
       res.json(oneUser);
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
        res.json(user);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    
}

exports.deleteUser = async (req,res) => {
    try{
        const id = req.params.id;
       const userById = await User.findByIdAndDelete(id);
       res.json(userById); 
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    
}

exports.updateUser = async (req,res) => {
    try{
        if(!req.body) return res.sendStatus(400);
        const {id, ...data} = req.body
        const userById = await User.findByIdAndUpdate(id, data, {new:true});
        res.json(userById);
    }
    catch (err){
        res.status(400).json({message: err.message});
    }
    
}