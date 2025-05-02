'use server';

import { SubCategory } from '@/generated/prisma';
import { db } from '@/lib/db';

import { currentUser } from '@clerk/nextjs/server';

export const upsertSubCategory = async (subCategory: SubCategory) => {
  try {
    const user = await currentUser();

    if (!user) throw new Error('Unauthenticated');

    if (user.privateMetadata.role !== 'ADMIN')
      throw new Error(
        'Unauthorized Access: Admin Privileges Required for Entry',
      );

    if (!subCategory) throw new Error('Please provide subCategory data');

    const existingSubCategory = await db.subCategory.findFirst({
      where: {
        AND: [
          {
            NOT: {
              id: subCategory.id,
            },
          },
          {
            OR: [{ name: subCategory.name }, { url: subCategory.url }],
          },
        ],
      },
    });

    if (existingSubCategory) {
      let errorMessage = '';
      if (existingSubCategory.name === subCategory.name) {
        errorMessage = 'A subCategory with same name already exists';
      }
      if (existingSubCategory.url === subCategory.url) {
        errorMessage = 'A subCategory with the same URL already exists';
      }
      throw new Error(errorMessage);
    }

    const subCategoryDetails = await db.subCategory.upsert({
      where: {
        id: subCategory.id,
      },
      create: subCategory,
      update: subCategory,
    });

    return subCategoryDetails;
  } catch (error) {
    throw error;
  }
};

export const getAllSubCategories = async () => {
  const subCategories = await db.subCategory.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return subCategories;
};

export const getSubCategory = async (subCategoryId: string) => {
  const subCategory = await db.subCategory.findUnique({
    where: {
      id: subCategoryId,
    },
  });

  return subCategory;
};

export const deleteSubCategory = async (subCategoryId: string) => {
  const user = await currentUser();

  if (!user) throw new Error('Unauthenticated');

  if (user.privateMetadata.role !== 'ADMIN')
    throw new Error('Unauthorized Access: Admin Privileges Required for Entry');

  if (!subCategoryId) throw new Error('Please provide subCategory ID');

  const subCategory = await db.subCategory.delete({
    where: {
      id: subCategoryId,
    },
  });

  return subCategory;
};
