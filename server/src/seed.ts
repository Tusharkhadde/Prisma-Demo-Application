import prisma from './prisma'

async function seed() {
    const count = await prisma.user.count()
    if (count === 0) {
        console.log('📝 Seeding initial data...')
        await prisma.user.create({
            data: {
                email: 'john@example.com',
                name: 'John Doe',
                posts: {
                    create: [
                        {
                            title: 'My First Post',
                            content: 'Hello from Prisma + NeonDB!',
                            published: true
                        }
                    ]
                }
            }
        })
        console.log('✅ Seeding complete')
    } else {
        console.log('ℹ️ Database already has data, skipping seed.')
    }
}

export default seed
