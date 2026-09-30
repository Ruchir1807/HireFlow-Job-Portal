import {useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {getJobById} from "./services/jobService";

function JobDetails(){
    const{id} = useParams();
    const navigate  = useNavigate();

    const[job,setJob] = useState(null);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState("");

    useEffect(() => {
        const fetchJob = async()=>{
            setLoading(true);
            setError("");
        
        try{
            const data = await getJobById(id);
            setJob(data);
            }
        catch(error){
            console.error("Error fetching job.",error);
            setError("Could not find this job.")
            }
        finally{
            setLoading(false);
            }
        };

        fetchJob();
        },[id]);

        if(loading){
            return(
                  <div className="min-h-screen bg-gray-100 p-10">
                        <p className="text-gray-600">Loading job details...</p>
                    </div>
            );
        }
        if(error||!job){
            return(
                  <div className="min-h-screen bg-gray-100 p-10">
                    <p className="mb-6 text-red-600">
                    {error || "Job not found."}
                    </p>

                    <button 
                    onClick={()=>navigate("/jobs")}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                        Back to Jobs
                        </button>
                        
                    </div>            
            );
        }

        return(
            <div className="min-h-screen bg-gray-100">
                {/*Navbar*/}
                <nav className ="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <h1
                            onClick={()=>navigate("/jobs")}
                            className="cursor-pointer text-2xl font-bold text-blue-600"
                        >
                            HireFlow
                        </h1>
                        
                        <button
                        onClick={()=>navigate("/jobs")}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600"
                        >
                            Back To Jobs
                        </button>
                    </div>
                </nav>

                <main className="mx-auto max-w-4xl px-6 py-10">

                    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-3 text-3xl font-bold text-gray-900">
                            {job.title}
                        </h2>

                        <p className="mb-6 text-lg font-medium text-blue-600">
                            {job.company}
                        </p>

                        <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📍 {job.location}</span>
                                <span  className="font-semibold text-green-600">
                                    {job.salary?`₹${job.salary.toLocaleString("en-IN")}`
                                      :"Salary not specified"  }
                            </span>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                Job Description
                            </h3>

                            <p className="whitespace-pre-line leading-7 text-gray-600">
                                {job.description || "No description available."}
                            </p>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <button
                                onClick={()=>navigate(`/jobs/${id}/apply`)}
                              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                            Apply Now
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
}
export default JobDetails;