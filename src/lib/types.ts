import { Category, SubCategory } from '@/generated/prisma/client';

export interface DashboardSidebarMenuInterface {
  label: string;
  icon: string;
  link: string;
}

export type SubCategoryWithCategoryType = SubCategory & {
  Category: Category;
};
