import { handleSignIn } from '@/app/action/gitsignin';

export default async function page() {
  return (
    <div>
      <form action={handleSignIn}>
        <button type='submit'> connect to github </button>
      </form>
    </div>
  );
}
