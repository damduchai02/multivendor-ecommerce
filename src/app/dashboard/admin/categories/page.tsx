import { Plus } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';

import { getAllCategories } from '@/queries/category';
import CategoryDetails from '@/components/dashboard/forms/category-details';
import { columns } from './columns';

async function AdminCategoriesPage() {
  const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
  const categories = await getAllCategories();

  if (!cloudinaryKey || !categories) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} /> Create category
        </>
      }
      newTabLink='/dashboard/admin/categories/new'
      modalChildren={<CategoryDetails cloudinaryKey={cloudinaryKey} />}
      filterValue='name'
      data={categories}
      searchPlaceholder='Search category name...'
      columns={columns}
    />
  );
}

export default AdminCategoriesPage;
