"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Validation schema
const signUpSchema = z.object({
  name: z.string().nonempty('Name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email address'),
  location: z.string().nonempty('Location is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm({ onSubmit, loading }: { onSubmit: (data: SignUpValues) => void; loading?: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', lastName: '', email: '', location: '', password: '' },
  });

  return (
    <div className="w-full max-w-sm bg-black/70 backdrop-blur-md rounded-xl p-8 space-y-6 text-white shadow-lg">
      <h2 className="text-3xl font-bold text-center">Create Account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-200">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    className="h-10 px-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-600"
                  />
                </FormControl>
                <FormMessage className="text-blue-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-200">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="h-10 px-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-600"
                  />
                </FormControl>
                <FormMessage className="text-blue-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-200">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="h-10 px-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-600"
                  />
                </FormControl>
                <FormMessage className="text-blue-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-200">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Location"
                    {...field}
                    className="h-10 px-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-600"
                  />
                </FormControl>
                <FormMessage className="text-blue-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-200">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      {...field}
                      className="h-10 pl-10 pr-10 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-blue-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold rounded"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-300">
        Already have an account?{' '}
        <Link href="/login" className="text-white font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
