const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updateAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('1234', 10);
        
        // First, try to find the admin user
        const adminUser = await prisma.user.findFirst({
            where: {
                isAdmin: true
            }
        });

        if (adminUser) {
            // Update existing admin
            const updatedUser = await prisma.user.update({
                where: {
                    id: adminUser.id
                },
                data: {
                    email: 'admin@admin.com',
                    password: hashedPassword
                }
            });
            console.log('Admin credentials updated successfully');
        } else {
            // Create new admin if none exists
            const newAdmin = await prisma.user.create({
                data: {
                    email: 'admin@admin.com',
                    password: hashedPassword,
                    isAdmin: true
                }
            });
            console.log('New admin user created successfully');
        }
    } catch (error) {
        console.error('Error updating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateAdmin();