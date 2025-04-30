import { Category } from '@/generated/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const upsertCategory = async (category: Category) => {
  try {
    // Get current user
    const user = await currentUser();

    if (!user) throw new Error('Unauthenticated.');
  } catch (error) {}
};
