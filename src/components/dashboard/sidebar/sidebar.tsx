import { currentUser } from '@clerk/nextjs/server';
import Logo from '@/components/shared/logo';
import UserInfo from './user-info';
import SidebarNavAdmin from './nav-admin';
import { adminDashboardSidebarOptions } from '@/constants/data';

async function Sidebar() {
  const user = await currentUser();

  return (
    <aside className='row-[1/-1] flex flex-col border-r'>
      <Logo />
      {user && <UserInfo user={user} />}
      <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />
    </aside>
  );
}

export default Sidebar;
