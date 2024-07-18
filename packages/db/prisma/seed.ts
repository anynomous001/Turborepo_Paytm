import { PrismaClient, OnRampStatus } from '@prisma/client';
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();

async function main() {
    // Create demo users

    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);
    const user1 = await prisma.user.create({
        data: {
            email: 'demo7777@example.com',
            name: 'Demo 1',
            number: '147258369',
            password: hashedPassword1,
            Balance: {
                create: {
                    amount: 1000,
                    locked: 100,
                },
            },
            OnRampTransaction: {
                create: [
                    {
                        status: OnRampStatus.Success,
                        token: 'token3',
                        provider: 'provider1',
                        amount: 500,
                        startTime: new Date(),
                    },
                ],
            },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'demo258528@example.com',
            name: 'Demo2',
            number: '741852963',
            password: hashedPassword2,
            Balance: {
                create: {
                    amount: 2000,
                    locked: 200,
                },
            },
            OnRampTransaction: {
                create: [
                    {
                        status: OnRampStatus.Processing,
                        token: 'token4',
                        provider: 'provider2',
                        amount: 1000,
                        startTime: new Date(),
                    },
                ],
            },
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
