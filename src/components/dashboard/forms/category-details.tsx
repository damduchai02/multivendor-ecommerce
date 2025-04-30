'use client';

import * as z from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFormSchema } from '@/lib/schemas';
import { Category } from '@/generated/prisma/client';

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
import { upsertCategory } from '@/queries/category';

import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface CategoryDetailsProps {
  data?: Category;
  cloudinaryKey: string;
}

function CategoryDetails({ data, cloudinaryKey }: CategoryDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.name || '',
      image: data?.image ? [{ url: data?.image }] : [],
      url: data?.url || '',
      featured: data?.featured || false,
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
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    try {
      const res = (await upsertCategory({
        id: data?.id ? data.id : uuidv4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      })) as Category;

      toast({
        title: data?.id
          ? 'Category has been updated.'
          : `${res.name} Congratulations! is now officially created.`,
      });

      if (data?.id) {
        router.refresh();
      } else {
        router.push('/dashboard/admin/categories');
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Oops!',
      });
    }
  };

  const onError = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Information</CardTitle>
        <CardDescription>
          {data?.id
            ? `Update ${data.name} category information.`
            : 'Let create a category. You can edit category later from the categories table or the category page.'}
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
                  <FormLabel>Category Name</FormLabel>
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
                  <FormLabel>Category URL</FormLabel>
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
                      This category will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : data?.id ? (
                'Save Category Information'
              ) : (
                'Create Category'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CategoryDetails;
