import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "./services/applicationService";

function MyApplications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getMyApplications();

                console.log("My applications:", data);

                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <h2 className="p-10 text-xl">Loading applications...</h2>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">
                    My Applications
                </h1>

                <button
                    onClick={() => navigate("/jobs")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    Back to Jobs
                </button>
            </div>

            {applications.length === 0 ? (
                <p className="text-gray-600">
                    You haven't applied for any jobs yet.
                </p>
            ) : (
                <div className="space-y-5">

                    {applications.map((application) => (
                        <div
                            key={application.id}
                            className="bg-white p-6 rounded-xl shadow"
                        >
                            <h2 className="text-xl font-bold">
                                {application.job.title}
                            </h2>

                            <p className="text-gray-600 mt-1">
                                {application.job.company}
                            </p>

                            <p className="text-gray-600">
                                {application.job.location}
                            </p>

                            <div className="mt-4">
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {application.name}
                                </p>

                                <p>
                                    <strong>Skills:</strong>{" "}
                                    {application.skills}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {application.status}
                                </p>

                                <p>
                                    <strong>Applied:</strong>{" "}
                                    {new Date(
                                        application.appliedAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default MyApplications;