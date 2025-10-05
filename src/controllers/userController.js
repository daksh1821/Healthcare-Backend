import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPassword});
        res.status(201).json({message:"User registered successfully", userId: user._id});
    } catch (error) {
        res.status(400).json({message:"Invalid Request"});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

