import SubCategoryDetails from '@/components/dashboard/forms/subCategory-details';
import { DataTable } from '@/components/ui/data-table';
import { getAllSubCategories } from '@/queries/subCategory';
import { Plus } from 'lucide-react';

import { getAllCategories } from '@/queries/category';
import { columns } from './new/columns';

async function AdminSubCategoriesPage() {
  const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
  const subCategories = await getAllSubCategories();
  const categories = await getAllCategories();

  if (!cloudinaryKey || !subCategories || !categories) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} /> Create SubCategory
        </>
      }
      modalChildren={
        <SubCategoryDetails
          categories={categories}
          cloudinaryKey={cloudinaryKey}
        />
      }
      filterValue='name'
      data={subCategories}
      searchPlaceholder='Search subCategory name...'
      columns={columns}
    />
  );
}

export default AdminSubCategoriesPage;
