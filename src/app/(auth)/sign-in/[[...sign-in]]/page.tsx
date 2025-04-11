import { SignIn } from '@clerk/nextjs';

function SignInPage() {
  return (
    <div className='grid h-screen place-content-center'>
      <SignIn />
    </div>
  );
}

export default SignInPage;
