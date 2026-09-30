const prisma = require("../config/prisma");

const getAllJobs =async(page,limit,filters={}) =>{
    const skip = (page-1)*limit;

    const {search,location,minSalary,maxSalary} = filters;

    const where = {};

    if(search){
            where.OR = [
                {
                title:{
                    contains:search,
                    mode:"insensitive"
                }
            },
            {
                company:{
                    contains:search,
                    mode:"insensitive"
                }
            }
        ];
    }

    //filter by location
    if(location){
        where.location={
            contains:location,
            mode:"insensitive"
        };
    }

    if(minSalary||maxSalary){
        where.salary = {};

        if(minSalary){
            where.salary.gte =  Number(minSalary);
        }
        if(maxSalary){
            where.salary.lte =  Number(maxSalary);
        }

    }
    return await prisma.job.findMany({
        where:where,
        skip:skip,
        take:limit,
        orderBy:{
            createdAt:"desc"
        }
    });
};

const getJobById = async(id) =>{
    return await prisma.job.findUnique({
        where:{
            id:Number(id)    
        }

    });
};

const createJob = async(jobData) =>{
    return await prisma.job.create({
        data:jobData
    });
};

const updateJob = async(id,jobData) =>{

    const existingJob = await prisma.job.findUnique({
        where:{
            id:Number(id)
        }
    }); 
    if(!existingJob){
        return null;
    }
    return await prisma.job.update({
        where:{
            id:Number(id)
        },
        data:jobData
    });
};
    
const deleteJob = async(id)=>{

        const existingJob = await prisma.job.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!existingJob) {
        return null;
    }


    return await prisma.job.delete({
        where:{
            id:Number(id)
        },
    });
};



module.exports = {getAllJobs,getJobById,createJob,updateJob,deleteJob};