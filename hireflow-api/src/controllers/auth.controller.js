const authService = require("../services/auth.service");

const register = async(req,res)=>{
    try{
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            message:"User registered successfully",
            user
        });
    }catch(error){
            console.error("Registration error:", error);

        if(error.message === "Email already registered"){
            return res.status(409).json({
                message:error.message
            });
        }

        res.status(500).json({
            message:"Registration failed"
        });
    }
};

const login = async(req,res) => {
    try{
        const result = await authService.loginUser(req.body);

        res.status(200).json({
            message:"Login successful",
            token:result.token,
            user:result.user
        });
    }
    catch(error){
        if(error.message === "Invalid email or password"){
            return res.status(401).json({
                message:error.message
            });
        }
    
        console.error("Login error",error);

        res.status(500).json({
            message:"Login failed"
        });
    }
}
module.exports = {register,login};