import jwt from "jsonwebtoken"
import users from "../models/userModel.js";


export const protectRoute = async ( req ,res ,next ) => {
    try {
        const token = req.cookies.jwt;
        if (!token)
            {
                res.status(401).send({ message: "unauthorised...Please login..!" });
                        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if (!decoded){
            res.status(401).send({ message: "unauthorized...Please login.."});
        }
        const user =await users.findById(decoded.userId).select("-password");
        req.user = user;

        // console/log(user);

        next();
    }
    catch (error) {
    res.status(500).send({ message: "internal server error" });
    console.log(error);
    }
}