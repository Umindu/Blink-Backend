const UserModal = require("../models/user.model");
const bcrypt = require('bcrypt');

function Login(req, res) {
    res.json({ message: 'Login success' });
}

async function Register(req, res) {
    try{
        const { name, dob, email, username, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 12);

        if(!email || !username || !passwordHash){
            res.status(400).json({ message: 'Please fill all fields' });
        }
        
        const dbRes = await UserModal.create({name, dob, email, username, password:passwordHash });
        console.log(dbRes);
        res.json({ message: 'Register success' });
    }catch(err){
        res.status(500).json({ message: 'Server side error, ' + err });
    }
}

module.exports = {Login, Register};