
import { useState, useEffect } from "react";
import { BrowserRouter,Routes,Route,useNavigate } from "react-router-dom";  
import { getAllJobs } from "./services/jobService";


import Register from "./Register";
import Login from "./Login";
import  JobDetails from "./JobDetails";
import ApplicationForm from "./ApplicationForm";
import MyApplications from "./MyApplications";

function JobListings() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const[minSalary,setMinSalary] = useState("");
  const[maxSalary,setMaxSalary] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
};

  // Fetch jobs whenever the page changes
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const data = await getAllJobs(page, limit,{search,location,minSalary,maxSalary});
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page,search,location,minSalary,maxSalary]);

  // Filter jobs based on search and location
  /*const filteredJobs = jobs.filter((job) => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const jobLocation = (job.location || "").toLowerCase();

    const matchesSearch =
      title.includes(search.toLowerCase()) ||
      company.includes(search.toLowerCase());

    const matchesLocation =
      jobLocation.includes(location.toLowerCase());

    return matchesSearch && matchesLocation;
  });*/

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
        <nav className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

            <h1 className="text-2xl font-bold text-blue-600">
              HireFlow
            </h1>

              <button
                  onClick={() => navigate("/applications")}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                  My Applications
              </button>

            <div className="flex items-center gap-6">

              <span className="text-sm font-medium text-gray-600">
                Find your next opportunity
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>

            </div>

          </div>
        </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          Explore Jobs
        </h2>

        <p className="mb-8 text-gray-600">
          Discover opportunities that match your skills.
        </p>

        {/* Search and Location Filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">

          <input
            type="text"
            placeholder="Search by job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <input
        type="number"
        placeholder="Minimum salary (₹)"
        value={minSalary}
        onChange={(e) => {
            setMinSalary(e.target.value);
            setPage(1);
        }}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
         <input
        type="number"
        placeholder="Maximum salary (₹)"
        value={maxSalary}
        onChange={(e) => {
            setMaxSalary(e.target.value);
            setPage(1);
        }}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-gray-600">
            Loading jobs...
          </p>
        ) : jobs.length === 0 ? (

          /* Empty State */
          <p className="rounded-lg bg-white p-6 text-gray-600 shadow-sm">
            No jobs match your search or filters.
          </p>

        ) : (

          <>
            {/* Jobs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {job.title}
                  </h3>

                  <p className="mb-3 font-medium text-blue-600">
                    {job.company}
                  </p>

                  <p className="mb-2 text-sm text-gray-500">
                    📍 {job.location}
                  </p>

                  <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                    <span className="font-semibold text-green-600">
                      {job.salary
                        ? `₹${job.salary.toLocaleString("en-IN")}`
                        : "Salary not specified"}
                    </span>

                    <button 
                    onClick={()=>navigate(`/jobs/${job.id}`)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                      View Details
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* Pagination - Outside the Grid */}
            <div className="mt-10 flex items-center justify-center gap-4">

              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Previous
              </button>

              <span className="font-medium text-gray-700">
                Page {page}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={jobs.length < limit}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Next
              </button>

            </div>
          </>

        )}

      </main>
    </div>
  );
}

function App(){
  return( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs/:id/apply" element={<ApplicationForm/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetails />} />     
        <Route path="/applications" element={<MyApplications />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App; 