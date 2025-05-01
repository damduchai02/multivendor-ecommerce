import { Plus } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';

import { getAllCategories } from '@/queries/category';
import CategoryDetails from '@/components/dashboard/forms/category-details';
import { columns } from './columns';

async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  if (!categories) return null;

  const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

  if (!cloudinaryKey) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} /> Create category
        </>
      }
      modalChildren={<CategoryDetails cloudinaryKey='gqmbvzdl' />}
      filterValue='name'
      data={categories}
      searchPlaceholder='Search category name...'
      columns={columns}
    />
  );
}

export default AdminCategoriesPage;
