import CategoryDetails from '@/components/dashboard/forms/category-details';

function AdminNewCategoryPage() {
  const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

  if (!cloudinaryKey) return null;

  return (
    <>
      <CategoryDetails cloudinaryKey={cloudinaryKey} />
    </>
  );
}

export default AdminNewCategoryPage;
