const jobService = require("../services/job.service");

const getAllJobs = async(req,res)=>{

    const page = Number(req.query.page)||1;
    const limit = Number(req.query.limit)||10;

    const{search,location,minSalary,maxSalary} = req.query;

    const jobs = await jobService.getAllJobs(page,limit,{
        search,
        location,
        minSalary,
        maxSalary
    });

    res.json(jobs);
};

const getJobById = async(req,res)=>{
    const id = req.params.id;
    const job = await jobService.getJobById(id);
    
    if(!job){
        return res.status(404).json({
            message:"Job not found"
        });
    };

    res.json(job);
};  

const createJob = async(req,res)=>{
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
}
const updateJob = async(req,res)=>{
    const id=  req.params.id;   
    const job = await jobService.updateJob(id,req.body)
    if(!job){
        return res.status(404).json({
            message:"Job not found"
        });
    }
    res.json(job);
};

const deleteJob = async(req,res)=>{
    const id =req.params.id;
    const job = await jobService.deleteJob(id);
     if(!job){
        return res.status(404).json({
            message:"Job not found"
        });
    }
    res.json({message:"Job deleted successfully"});
};



module.exports = {getAllJobs,getJobById,createJob,updateJob,deleteJob};

