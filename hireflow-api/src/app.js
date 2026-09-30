const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/job.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const applicationRoutes = require("./routes/application.routes");

const app = express();


app.use(cors({
    origin:"http://localhost:5173"
}));

app.use(express.json());
app.use("/api/applications", applicationRoutes);

app.get("/",(req,res)=>{    
    res.json({message:"Hireflow API is running"});
    }   
);

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);


module.exports = app;