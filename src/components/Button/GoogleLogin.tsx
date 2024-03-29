import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from './Button';

export function GoogleLogin() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col">
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          Not signed in <br />
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </div>
  );
}
