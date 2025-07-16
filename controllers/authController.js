import { generateToken } from "../lib/utils.js"
import users from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const register = async (req,res)=>{
    console.log("inside fn");
    
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
     await newUser.save()
    generateToken(newUser._id,res)
   
    res.status(201).send({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        role: newUser.role,
    })
}
    catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"})
    }
}

//login controller logic//

export const login =async (req,res)=>{
    const { email , password } = req.body;

    try{

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
        role: existingUser.role,

    });
}
else {
res.status(401).send({ message:"incorrect email or password"});
}
}catch (error) {
    res.status(500).send({message:"internal server error"});
}
}

// logout logic //

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge:0
        })
        res.status(200).send("Logged out successfully")
    } catch (error) {
        res.status(500).send({message:"internal server error"});
        console.log(error);
        
    }
}
// check authorization

export const checkAuth = async (req,res) => {
    try{
        res.status(200).send(req.user);
    }
    catch (error) {
        res.status(500).send({message:"internal server error"});
        console.log(error);
    }
}

export const googleSignIn = async(req,res)=>{
    const {email, name} = req.body
    try {
        if(!email || !name){
            res.status(400).send({message:"All fields are required"})
        }
        let user = await users.findOne({email})

        if(!user){
            user = new users({
                name,
                email,
                password:""
            })
        }
       generateToken(user._id,res);

        res.status(200).send({
        _id:user._id,
        name: user.name,
        email: user.email,
        role: user.role,

    });



    } catch (error) {
                console.log(error);

        res.status(500).send({message:"internal server error"});
    }
}
