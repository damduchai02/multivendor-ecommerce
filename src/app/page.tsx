import ThemeToggle from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div>
      <h1>Hello</h1>
      <h1 className='font-barlow'>Hello</h1>
      <Button>Click me</Button>
      <ThemeToggle />
    </div>
  );
}

export default HomePage;
