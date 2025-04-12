import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@clerk/nextjs/server';

function UserInfo({ user }: { user: User | null }) {
  const role = user?.privateMetadata.role as string;

  return (
    <Button variant='ghost' className='py-10'>
      <Avatar>
        <AvatarImage
          src={user?.imageUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
        />
        <AvatarFallback className='bg-primary text-white'>
          {user?.firstName} {user?.lastName}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-y-1'>
        <span className='text-left'>
          {user?.firstName} {user?.lastName}
        </span>
        <span className='text-muted-foreground'>
          {user?.emailAddresses[0].emailAddress}
        </span>
        <span className='w-fit'>
          <Badge variant='secondary' className='capitalize'>
            {role.toLowerCase()} Dashboard
          </Badge>
        </span>
      </div>
    </Button>
  );
}

export default UserInfo;
