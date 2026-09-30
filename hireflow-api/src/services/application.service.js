const prisma = require("../config/prisma");

const createApplication = async (userId, data) => {
    return await prisma.application.create({
        data: {
            userId: userId,
            jobId: Number(data.jobId),
            name: data.name,
            skills: data.skills,
            address: data.address,
            resumeUrl: data.resumeUrl,
            coverLetter: data.coverLetter
        }
    });
};

const getMyApplications = async (userId) => {
    return await prisma.application.findMany({
        where: {
            userId: userId
        },
        include: {
            job: true
        },
        orderBy: {
            appliedAt: "desc"
        }
    });
};

module.exports = {
    createApplication,
    getMyApplications
};