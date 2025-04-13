'use client';

import * as z from 'zod';
import { useEffect } from 'react';
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

function CategoryDetails({ data }: { data?: Category }) {
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

  const onSubmit = (values: z.infer<typeof CategoryFormSchema>) => {
    console.log(values);
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
