import ThemeToggle from '@/components/shared/theme-toggle';
import { UserButton } from '@clerk/nextjs';

function HomePage() {
  return (
    <div className='flex gap-x-5'>
      <ThemeToggle />
      <UserButton />
    </div>
  );
}

export default HomePage;
