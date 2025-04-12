import ThemeToggle from '@/components/shared/theme-toggle';
import { UserButton } from '@clerk/nextjs';

function Header() {
  return (
    <header className='flex items-center justify-end gap-2 border-b p-4'>
      <ThemeToggle />
      <UserButton />
    </header>
  );
}

export default Header;
