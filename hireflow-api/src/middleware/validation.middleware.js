const validateJob = (req,res,next) => {
    const{title,description,company, location,salary} = req.body;

    if(!title||!description||!company||!location||!salary){
        return res.status(400).json({
            message:"Title,description,company, location and salary are required"
        })
    }
    next();
};

const validateJobUpdate = (req,res,next) => {
    const{title,description,company,location,salary} = req.body;
    if(title === undefined &&description === undefined &&company === undefined &&title === location &&salary === undefined){
        return res.status(400).json({
            message:"At least one field is required to update"
        });
    }
    next();
};

module.exports = {validateJob,validateJobUpdate};



