const UserModal = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;

async function Login(req, res) {
    try{
        const { username, password } = req.body;

        if(!username || !password){
            res.status(400).json({ message: 'Please fill all fields' });
            return;
        }

        const user = await UserModal.findOne({ username });
        if(!user){
            res.status(400).json({ message: 'User not exist' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        
        const token = jwt.sign({_id:user.id, username: user.username, email: user.email}, JWT_SECRET, { expiresIn: '48h' });
        res.json({ token});
        return;
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server side error, ' + err });
    }
}

async function Register(req, res) {
    try{
        const { name, dob, email, username, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 12);

        if(!email || !username || !passwordHash){
            res.status(400).json({ message: 'Please fill all fields' });
            return;
        }
        
        const dbRes = await UserModal.create({name, dob, email, username, password:passwordHash });
        console.log(dbRes);
        res.json({ message: 'Register success' });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server side error, ' + err });
    }
}

async function GetUserData(req, res) {
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({ message: 'Please login first' });
        }

        const _tokenData = token.split(" ")[1];
        const _decoded = jwt.verify(_tokenData, JWT_SECRET);
        const id = _decoded._id;
        const user = await UserModal.findById(id);

        const { password, ...rest } = user._doc;
        res.json({user : rest});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server side error, ' + err });
    }
}

module.exports = {Login, Register, GetUserData};