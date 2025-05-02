'use client';

import * as z from 'zod';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubCategoryFormSchema } from '@/lib/schemas';
import { Category, SubCategory } from '@/generated/prisma/client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import ImageUpload from '../shared/image-upload';

import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { upsertSubCategory } from '@/queries/subCategory';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SubCategoryDetailsProps {
  data?: SubCategory;
  categories: Category[];
  cloudinaryKey: string;
}

function SubCategoryDetails({
  data,
  categories,
  cloudinaryKey,
}: SubCategoryDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SubCategoryFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: {
      name: data?.name,
      image: data?.image ? [{ url: data?.image }] : [],
      url: data?.url,
      featured: data?.featured,
      categoryId: data?.categoryId || '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name || '',
        image: data?.image ? [{ url: data?.image }] : [],
        url: data?.url || '',
        featured: data?.featured || false,
        categoryId: data.categoryId || '',
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof SubCategoryFormSchema>) => {
    try {
      const subCategory = await upsertSubCategory({
        id: data?.id ? data.id : uuidv4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        categoryId: values.categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast({
        title: data?.id
          ? 'SubCategory has been updated.'
          : `"${subCategory?.name}" Congratulations! is now officially created.`,
      });

      if (data?.id || pathname === '/dashboard/admin/subCategories') {
        router.refresh();
      } else {
        router.push('/dashboard/admin/subCategories');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: error.message,
      });
    }
  };

  const onError = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SubCategory Information</CardTitle>
        <CardDescription>
          {data?.id
            ? `Update ${data.name} SubCategory information.`
            : 'Let create a SubCategory. You can edit SubCategory later from the SubCategories table or the Sub-Categories page.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    onChange={(url) => {
                      field.onChange([{ url }]);
                    }}
                    onRemove={(url) => {
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ]);
                    }}
                    disabled={isSubmitting}
                    cloudinaryKey={cloudinaryKey}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SubCategory Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SubCategory URL</FormLabel>
                  <FormControl>
                    <Input placeholder='/category-url' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='featured'
              render={({ field }) => (
                <FormItem className='flex space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This SubCategory will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : data?.id ? (
                'Save SubCategory Information'
              ) : (
                'Create SubCategory'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SubCategoryDetails;
