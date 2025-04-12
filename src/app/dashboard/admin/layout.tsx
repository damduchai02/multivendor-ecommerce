import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import Header from '@/components/dashboard/header/header';
import Sidebar from '@/components/dashboard/sidebar/sidebar';

async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (user?.privateMetadata.role !== 'ADMIN') redirect('/');

  return (
    <div className='grid h-screen grid-cols-[300px_1fr] grid-rows-[auto_1fr]'>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

export default AdminDashboardLayout;
