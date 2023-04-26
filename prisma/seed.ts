import singers_seeds from "./seed_data/singers";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main() {
  const admin = await prisma.users.upsert({
    where: { username: 'Admin' },
    update: {},
    create: {
      name: 'Ali',
      username: 'Admin',
      password: await bcrypt.hash('123', 12)
    },
  });

  const singers = await prisma.singer.createMany({
    data: singers_seeds.map(x=>({
      name: x.name,
      gender: x.gender,
      birthday: new Date(x.birthdate)
    })),
    skipDuplicates: true
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
