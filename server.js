import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './src/routes/userRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;
app.use(express.json());

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
connectDB();
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use('/api/auth',userRoute);
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;
