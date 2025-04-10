import Header from '@/components/dashboard/header/header';
import Sidebar from '@/components/dashboard/sidebar/sidebar';

function DashboardPage({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid h-screen grid-cols-[300px_1fr] grid-rows-[auto_1fr]'>
      <Header />
      <Sidebar />
      <main>
        <div>Main</div>
        {children}
      </main>
    </div>
  );
}

export default DashboardPage;
