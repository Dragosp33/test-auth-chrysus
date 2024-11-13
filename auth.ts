import NextAuth, { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import authConfig from './auth.config';
import { NextRequest } from 'next/server';
import GitHub from 'next-auth/providers/github';

const getSiteUrl = (req?: NextRequest) => {
  console.log('GET SITE URL HAS BEEN CALLED!!!!!');
  if (!req) {
    return undefined;
  }

  const { headers } = req;
  const host = headers.get('X-Forwarded-Host'); // a tenant subdomain or tenant's own domain
  const proto = headers.get('X-Forwarded-Proto');

  return host && proto ? `https://${host}` : 'http://localhost:3000';
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(() => {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const host = headersList.get('host');
  const REDIRECT_URL =
    protocol && host
      ? `https://${host}/api/auth`
      : 'https://localhost:3000/api/auth';
  //console.log('NEXT AUTH : ', REDIRECT_URL, headersList);

  return {
    ...authConfig,
    trustHost: true,
    basePath: '/api/auth',
    baseUrl: (r: any) => getSiteUrl(r) ?? 'http://localhost:3000',
    events: {
      async signIn({ user, profile, account }) {
        console.log('SIGN IN EVENT: ', { user, profile, account });
      },
      async updateUser({ user }) {
        console.log('UPDATE USER: ', { user });
      },
      async linkAccount({ user, profile, account }) {
        console.log('FROM LINK ACCOUNT: ', { user, profile, account });
      },
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log('REDIRECT:  \n', baseUrl, '+', url);
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        return baseUrl;
      },
      async signIn({ user, account, profile, email, credentials }) {
        console.log(user, account, profile, email);
        return true;
      },
    },
  };
});
