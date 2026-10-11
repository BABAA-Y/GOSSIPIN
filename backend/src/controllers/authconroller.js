import { genrateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        if(!fullName, !email, !password){
            return res.status(400).json({message: "all fields are required"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "pass must be 6 characters"});
        }

        // check if emails valid: regex
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex. test(email)){
            return res.status(400).json({ message: "Invalid email format" })
        };

        const user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                message: "email alredy exist"
            })
        }

        // 123456 = $dnfdojbo_#^Hdfhidjbj
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName, 
            email,
            password: hashedPassword 
        })

        if(newUser){
            genrateToken(newUser._id, res)
            await newUser.save()
            
            res.status(201).json({
                id: newUser, 
                fullName: newUser.fullName,
                email:newUser.email,
                profilePic: newUser.profilePic
            })
        }
        // # send a welcome email to user
        
        else{
            res.status(400).json({
                message: "invalid user data"
            })
        }
    } catch (error) {
        console.error("error in signup controller", error);
        res.status(500).json({message: "internal server error"});
    }
}