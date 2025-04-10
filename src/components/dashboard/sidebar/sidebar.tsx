import Logo from '@/components/shared/logo';

import UserInfo from './user-info';

function Sidebar() {
  return (
    <aside className='row-[1/-1] border-r'>
      <Logo />
      <UserInfo />
    </aside>
  );
}

export default Sidebar;
