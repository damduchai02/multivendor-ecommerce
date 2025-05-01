'use server';

import { Category } from '@/generated/prisma';
import { db } from '@/lib/db';

import { currentUser } from '@clerk/nextjs/server';

export const upsertCategory = async (category: Category) => {
  try {
    const user = await currentUser();

    if (!user) throw new Error('Unauthenticated');

    if (user.privateMetadata.role !== 'ADMIN')
      throw new Error(
        'Unauthorized Access: Admin Privileges Required for Entry',
      );

    if (!category) throw new Error('Please provide category data');

    const existingCategory = await db.category.findFirst({
      where: {
        AND: [
          {
            NOT: {
              id: category.id,
            },
          },
          {
            OR: [{ name: category.name, url: category.url }],
          },
        ],
      },
    });

    if (existingCategory) {
      let errorMessage = '';
      if (existingCategory.name === category.name) {
        errorMessage = 'A category with same name already exists';
      }
      if (existingCategory.url === category.url) {
        errorMessage = 'A category with the same URL already exists';
      }
      throw new Error(errorMessage);
    }

    const categoryDetails = await db.category.upsert({
      where: {
        id: category.id,
      },
      create: category,
      update: category,
    });

    return categoryDetails;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return categories;
};

export const getCategory = async (categoryId: string) => {
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category;
};

export const deleteCategory = async (categoryId: string) => {
  const user = await currentUser();

  if (!user) throw new Error('Unauthenticated');

  if (user.privateMetadata.role !== 'ADMIN')
    throw new Error('Unauthorized Access: Admin Privileges Required for Entry');

  if (!categoryId) throw new Error('Please provide category ID');

  const category = await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  return category;
};
