const user = require('../models/user');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required.'
            });
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            success: true,
            message: 'Registration successful.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed.',
            error: error.message
        });
    }
};
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Email"
            });
        }
        const ispasswordCorrect=await bcrypt.compare(
            password,
            user.password
        );
         if (!isPasswordcorrect) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email or password.'
            });
        }
  const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,{ expiresIn: '1d' }
        );
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
    res.status(500).json({
        success:false,
        message:"Login Failed",
        error:error.message
        
    });
}
};
module.exports={registerUser,loginUser};
