"use client";

import { login, register } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      const response = await register(data);
      if (response) {
        await login(data);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md p-3 m-auto rounded-xl mt-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold">Register</h1>
        <p className="text-sm text-gray-500">Create an account.</p>
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold" htmlFor="name">
            Name
          </label>
          <Input
            {...form.register("name")}
            className="w-full"
            type="text"
            id="name"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <Input
            {...form.register("email")}
            className="w-full"
            type="text"
            id="email"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="password">
            Password
          </label>
          <Input
            {...form.register("password")}
            className="w-full "
            type="password"
            id="password"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div>
          {isLoading ? (
            <Button className="w-full mt-4 bg-gray-700" disabled>
              Registering...
            </Button>
          ) : (
            <Button className="w-full mt-4" type="submit">
              Register
            </Button>
          )}
        </div>
      </form>
      <footer className="mt-4">
        <Link
          className="text-sm float-right hover:text-gray-600"
          href="/register"
        >
          Already have an account?
        </Link>
      </footer>
    </div>
  );
}
