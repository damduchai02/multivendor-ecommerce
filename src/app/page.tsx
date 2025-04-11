import ThemeToggle from '@/components/shared/theme-toggle';
import { UserButton } from '@clerk/nextjs';

function HomePage() {
  return (
    <div className='flex gap-x-5'>
      <UserButton />
      <ThemeToggle />
    </div>
  );
}

export default HomePage;
