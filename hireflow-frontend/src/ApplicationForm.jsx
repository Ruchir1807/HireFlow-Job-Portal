import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitApplication } from "./services/applicationService";

function ApplicationForm() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [address, setAddress] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await submitApplication({
                jobId: Number(id),
                name,
                skills,
                address,
                resumeUrl,
                coverLetter
            });

            alert("Application submitted successfully!");

            navigate("/applications");

        } catch (error) {
            console.error("Application error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to submit application"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

                    <h1
                        onClick={() => navigate("/jobs")}
                        className="cursor-pointer text-2xl font-bold text-blue-600"
                    >
                        HireFlow
                    </h1>

                    <button
                        onClick={() => navigate("/jobs")}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600"
                    >
                        Back To Jobs
                    </button>

                </div>
            </nav>

            <main className="mx-auto max-w-3xl px-6 py-10">

                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Apply for this Job
                    </h2>

                    <p className="mb-8 text-gray-600">
                        Submit your application below.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Name */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-700">
                                Skills
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. React, Node.js, MongoDB"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Address */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-700">
                                Address
                            </label>

                            <textarea
                                rows="3"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Resume */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-700">
                                Resume URL
                            </label>

                            <input
                                type="text"
                                placeholder="https://example.com/resume.pdf"
                                value={resumeUrl}
                                onChange={(e) => setResumeUrl(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Cover Letter */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-700">
                                Cover Letter
                            </label>

                            <textarea
                                rows="6"
                                placeholder="Write your cover letter..."
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loading
                                ? "Submitting..."
                                : "Submit Application"}
                        </button>

                    </form>

                </div>

            </main>
        </div>
    );
}

export default ApplicationForm;