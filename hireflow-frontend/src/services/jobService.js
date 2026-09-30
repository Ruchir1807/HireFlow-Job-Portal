import axios from "axios";

const API = axios.create({
    baseURL:"https://hireflow-job-portal-xoel.onrender.com/api/jobs"
});

export const getJobById = async(id)=>{
    const response = await API.get(`/${id}`);
    return response.data;
}

export const getAllJobs = async(page = 1,limit = 10,filters = {})=>{
    const response = await API.get("/",{
        params:{
            page,limit,search:filters.search,location:filters.location,minSalary:filters.minSalary,maxSalary:filters.maxSalary
        }
    });
    return response.data;
}