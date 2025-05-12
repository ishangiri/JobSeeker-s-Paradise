import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';

interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) =>  void;
    loading: boolean;
}

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});
//passing the onsubmit function as a prop
const SignInForm = ({onSubmit, loading} : LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

    const { handleSubmit } = form;

   

    return (
      <div className="w-full max-w-sm bg-black/70 backdrop-blur-md rounded-xl p-8 space-y-6 text-white shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
  
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-gray-300">Remember me</span>
              </label>
              <Link href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>
  
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-semibold rounded"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
  
        <p className="text-center text-sm text-gray-300">
          New to the platform?{' '}
          <Link href="/signup" className="text-white font-medium hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    );
  
};

export default SignInForm;