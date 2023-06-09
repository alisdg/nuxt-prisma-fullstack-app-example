import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import {PrismaClient} from '@prisma/client'
// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  callbacks: {
    jwt: ({ token, account, user }) => {
      if (account && user) {
        token.accessToken = account.access_token
        const {password, ...rest} =  user
        token.user = rest
      }

      return token
    },

    // Session retuned by useSession and getSession
    session: ({ token, session}) => {
      if (token) {
        session.user = token.user
        session.accessToken = token.accessToken
      }

      return session
    },
  },
  pages: {
    signIn: '/login'
  },
  // TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        let user = null;
        try {
          user = await prisma.users.findUniqueOrThrow({where: {username: credentials?.username}})
        } catch (e) {
          throw Error('User not found')
        }
        if (credentials?.username === user.username && await bcrypt.compare(credentials?.password, user.password)) {
          return user;
        } else {
          throw Error('password is wrong')
        }
      }
    })
  ]
})
