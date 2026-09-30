const prisma = require("../config/prisma");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const registerUser =async(userData)=>{
    const{name,email,password} = userData;

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    
    if(existingUser){
        throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const user  = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            createdAt:true
        }
    });

    return user;
};

const loginUser = async(userData)=>{
    const{email,password} = userData;

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(!user){
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(
        password,user.password
    );
    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    );
    return{
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }
}
module.exports = {registerUser,loginUser};