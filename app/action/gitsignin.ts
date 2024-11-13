'use server';

import { signIn } from '@/auth';

export async function handleSignIn() {
  // This would initiate the sign-in flow with the GitHub provider
  return await signIn('github');
}
