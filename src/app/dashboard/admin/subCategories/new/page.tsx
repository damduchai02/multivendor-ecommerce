import SubCategoryDetails from '@/components/dashboard/forms/subCategory-details';
import { getAllCategories } from '@/queries/category';

async function AdminNewSubCategoryPage() {
  const categories = await getAllCategories();
  const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

  if (!cloudinaryKey) return null;

  return (
    <>
      <SubCategoryDetails
        categories={categories}
        cloudinaryKey={cloudinaryKey}
      />
    </>
  );
}

export default AdminNewSubCategoryPage;
