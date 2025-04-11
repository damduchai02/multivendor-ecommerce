import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
  return (
    <div className='grid h-screen place-content-center'>
      <SignUp />
    </div>
  );
}

export default SignUpPage;
