import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

async function DashboardPage({ children }: { children: React.ReactNode }) {
  // Retrieve the current user information
  const user = await currentUser();

  // Checking role user
  if (user?.privateMetadata.role === 'USER') redirect('/');
  if (user?.privateMetadata.role === 'ADMIN') redirect('/dashboard/admin');
  if (user?.privateMetadata.role === 'SELLER') redirect('/dashboard/seller');

  return <>{children}</>;
}

export default DashboardPage;
