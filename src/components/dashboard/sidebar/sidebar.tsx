import { currentUser, User } from '@clerk/nextjs/server';
import Logo from '@/components/shared/logo';
import UserInfo from './user-info';

async function Sidebar() {
  const user: User | null = await currentUser();

  return (
    <aside className='row-[1/-1] flex flex-col border-r'>
      <Logo />
      <UserInfo user={user} />
    </aside>
  );
}

export default Sidebar;
