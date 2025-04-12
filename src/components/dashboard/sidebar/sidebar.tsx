import { currentUser } from '@clerk/nextjs/server';
import Logo from '@/components/shared/logo';
import UserInfo from './user-info';

async function Sidebar() {
  const user = await currentUser();

  return (
    <aside className='row-[1/-1] flex flex-col border-r'>
      <Logo />
      {user && <UserInfo user={user} />}
    </aside>
  );
}

export default Sidebar;
