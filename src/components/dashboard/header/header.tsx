import ThemeToggle from '@/components/shared/theme-toggle';

function Header() {
  return (
    <header className='flex items-center justify-end gap-2 border-b bg-slate-100 p-4'>
      <ThemeToggle />
      <div>User</div>
    </header>
  );
}

export default Header;
