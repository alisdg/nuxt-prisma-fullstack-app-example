import {readBody} from "h3";
import {PrismaClient, Prisma} from '@prisma/client'
import {z, parseDataAs} from "@sidebase/nuxt-parse"
// @ts-ignore
import bcrypt from "bcrypt";


const numSaltRounds = 12;


const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = readBody(event)

  const parsedData = await parseDataAs(body, z.object({
    name: z.string().nullish(),
    username: z.string(),
    password: z.string()
  }));

  try {
    const {password, ...user} = await prisma.users.create({
      data: {
        username: parsedData.username,
        password: await bcrypt.hash(parsedData.password, numSaltRounds),
        name: parsedData.name
      }
    })
    return user;
  } catch (e: any) {
    if (e.message.indexOf('Unique') > -1) {
      throw createError({
        statusCode: 422,
        message: "نام کاربری تکراری است "
      })
    } else {
      throw createError({
        statusCode: 500,
        message: e.message
      })
    }
  }
})
