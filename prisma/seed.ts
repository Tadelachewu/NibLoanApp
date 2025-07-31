import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      name: 'Admin User',
      password: 'admin@123', // In a real app, hash this password
      role: 'ADMIN',
    },
  })

  const loanOfficer = await prisma.user.create({
    data: {
      email: 'officer@gmail.com',
      name: 'Loan Officer',
      password: 'officer@123', // In a real app, hash this password
      role: 'LOAN_OFFICER',
    },
  })

  const customer = await prisma.user.create({
    data: {
      email: 'user@gmail.com',
      name: 'Customer User',
      password: 'user@123', // In a real app, hash this password
      role: 'CUSTOMER',
    },
  })

  console.log('Seeding finished.')
  console.log({ admin, loanOfficer, customer })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
