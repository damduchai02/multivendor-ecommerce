'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { icons } from '@/constants/icons';

import { DashboardSidebarMenuInterface } from '@/lib/types';

import { cn } from '@/lib/utils';

function SidebarNavAdmin({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  const pathname = usePathname();

  return (
    <nav className='relative grow'>
      <Command className='overflow-visible rounded-lg bg-transparent'>
        <CommandInput placeholder='Search...' />
        <CommandList className='overflow-visible py-2'>
          <CommandGroup className='relative overflow-visible pt-0'>
            {menuLinks.map((link, index) => {
              let icon;
              const iconSearch = icons.find((icon) => icon.value === link.icon);
              if (iconSearch) icon = <iconSearch.path />;

              return (
                <CommandItem
                  key={index}
                  className={cn('mt-1 h-12 w-full cursor-pointer', {
                    'bg-accent text-accent-foreground': link.link === pathname,
                  })}
                >
                  <Link
                    href={link.link}
                    className='flex w-full items-center gap-2 rounded-md transition-all hover:bg-transparent'
                  >
                    {icon}
                    <span>{link.label}</span>
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </nav>
  );
}

export default SidebarNavAdmin;
