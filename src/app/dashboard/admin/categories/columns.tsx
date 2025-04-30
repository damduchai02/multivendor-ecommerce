'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CategoryDetails from '@/components/dashboard/forms/category-details';
import CustomModal from '@/components/dashboard/shared/custom-modal';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useModal } from '@/providers/modal-provider';

import {
  BadgeCheck,
  BadgeMinus,
  Edit,
  MoreHorizontal,
  Trash,
} from 'lucide-react';

import { deleteCategory, getCategory } from '@/queries/category';

import { ColumnDef } from '@tanstack/react-table';
import { Category } from '@/generated/prisma/client';
import { useToast } from '@/hooks/use-toast';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <div className='relative h-44 min-w-64 overflow-hidden rounded-xl'>
          <Image
            src={row.original.image}
            alt=''
            width={1000}
            height={1000}
            className='h-40 w-40 rounded-full object-cover shadow-2xl'
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <span className='text-lg font-extrabold capitalize'>
          {row.original.name}
        </span>
      );
    },
  },

  {
    accessorKey: 'url',
    header: 'URL',
    cell: ({ row }) => {
      return <span>/{row.original.url}</span>;
    },
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => {
      return (
        <span className='flex justify-center text-muted-foreground'>
          {row.original.featured ? (
            <BadgeCheck className='stroke-green-300' />
          ) : (
            <BadgeMinus />
          )}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original;

      return <CellActions rowData={rowData} />;
    },
  },
];

interface CellActionsProps {
  rowData: Category;
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const { setOpen, setClose } = useModal();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  if (!rowData || !rowData.id) return null;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className='flex gap-2'
            onClick={() => {
              setOpen(
                // Custom modal component
                <CustomModal>
                  {/* Store details component */}
                  <CategoryDetails
                    data={{ ...rowData }}
                    cloudinaryKey='gqmbvzdl'
                  />
                </CustomModal>,
                async () => {
                  return {
                    rowData: await getCategory(rowData?.id),
                  };
                },
              );
            }}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className='flex gap-2' onClick={() => {}}>
              <Trash size={15} /> Delete category
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className='max-w-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-left'>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-left'>
            This action cannot be undone. This will permanently delete the
            category and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex items-center'>
          <AlertDialogCancel className='mb-2'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className='mb-2 bg-destructive text-white hover:bg-destructive'
            onClick={async () => {
              setLoading(true);
              await deleteCategory(rowData.id);
              toast({
                title: 'Deleted category',
                description: 'The category has been deleted.',
              });
              setLoading(false);
              router.refresh();
              setClose();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
