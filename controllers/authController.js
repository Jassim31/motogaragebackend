import { generateToken } from "../lib/utils.js"
import users from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const register = async (req,res)=>{
    const {name, email, password} = req.body


try {
    if(!name || !email || !password){
        return res.status(400).send({message:"all fields are required"})
    }

    const existingUser = await users.findOne({email})
    if(existingUser){
        return res.status(406).send({message:"account already exists.... please login"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser =new users({
        name,
        email,
        password:hashedPassword
    })
    generateToken(newUser._id,res)
    newUser.save()
    res.status(201).send({
        _id:newUser._id,
        name:newUser.name,
        email:newUser,email
    })
}
    catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"})
    }
}

//login controller logic//

try{
export const login =async (req,res)=>{
    const { email , password } = req.body;

const existingUser = await users.findOne({ email });
if (!existingUser) {
return res.status(400).send({ message: "account not found"});
}
const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
);
if (isPasswordCorrect){
    generateToken(existingUser._id,res);
    res.status(200).send({
        _id:existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
    });
}
else {
res.status(401).send({ message:"incorrect email or password"});
}
}catch (error) {
    res.status(500).send({message:"internal server error"});
}
}

