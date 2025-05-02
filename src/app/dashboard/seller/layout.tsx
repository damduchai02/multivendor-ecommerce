import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

async function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (user?.privateMetadata.role !== 'SELLER') redirect('/');

  return <div>{children}</div>;
}

export default SellerDashboardLayout;
