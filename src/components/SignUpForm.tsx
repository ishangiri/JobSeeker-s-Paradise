"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "./ui/input";
import Link from "next/link";


interface SignUpFormProps {
    onSubmit: (data: { 
      name : string;
      lastName : string;
      email: string;
      password: string
      location : string;
         }) => void;
    loading?: boolean;
}

// Define schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  name: z.string().nonempty("Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  location: z.string().nonempty("Location is required"),
});

export function SignUpForm({ onSubmit, loading }: SignUpFormProps) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name : "",
      lastName : "",
      email: "",
      location: "",
      password: "",
    },
  });



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-900 p-4">
      <div className="w-full max-w-lg">
      <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
    <div className="space-y-2 text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
        Create Account
      </h2>
      <p className="text-gray-500 text-sm">
        Join us today and get started to find your dream job
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">
              Name
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Your Name"
                {...field}
                className="h-11 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Last Name"
                        {...field}
                        className="h-11 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      {...field}
                      className="h-11 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Location"
                      {...field}
                      className="h-11 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a strong password"
                      type="password"
                      {...field}
                      className="h-11 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-slate-300 to-slate-900 text-white font-medium rounded-lg hover:from-slate-700 hover:to-slate-950 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading? "Creating Your Account...." : "Create Your Account"}
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-slate-600 hover:text-blue-950 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}