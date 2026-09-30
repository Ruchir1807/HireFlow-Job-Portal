const prisma = require("./src/config/prisma");
const bcrypt = require("bcrypt");

const resetPassword = async () => {
    const email = "ruchir.test@example.com";
    const newPassword = "Hireflow@123";

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the existing user
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    console.log("Password reset successfully:", user);
};

resetPassword()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });