const applicationService = require("../services/application.service")

const createApplication = async(req,res)=>{
    try{
        const userId = req.user.id;

        const application  = await applicationService.createApplication(
            userId,
            req.body
        );

        res.status(201).json({
            message:"Application submitted successfully",
            application
        });

    }
    catch(error){
        console.error(error);

        if(error.code === "P2002"){
            return res.status(409).json({
                message:"You have already applied for this job"
            });
        }
        if(error.code === "P2003"){
            return res.status(404).json({
                message:"Job or user not found"
            });
        }
        res.status(500).json({
            message:"Failed to submit application"
        });
    }
};

const getMyApplications = async(req,res)=>{
    try{
        const userId = req.user.id;
        const applications = await applicationService.getMyApplications(userId);
        res.status(200).json(applications);
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Failed to submit application"
        });
    }
};

module.exports = {createApplication,getMyApplications};