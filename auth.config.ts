import type { NextAuthConfig } from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

const authConfig = {
  providers: [
    Google({
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      clientId: process.env.AUTH_GOOGLE_ID,
      allowDangerousEmailAccountLinking: true,
      //redirectProxyUrl: 'http://localhost:3000/api/auth',
    }),
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      authorization: {
        params: { scope: 'user:email' },
      },
      redirectProxyUrl: 'http://localhost:3000/api/auth',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  jwt: { maxAge: 60 * 60 * 24 },
  trustHost: true,
} satisfies NextAuthConfig;

export default authConfig;
