"use client";

import { login, register } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
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
    const response = await register(data);
    console.log(response);
    if (!response.success) {
      alert(response.message);
      return;
    }
    const { email, password } = data;
    const loginData = { email, password };
    login(loginData);
    router.push("/");
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
          <Button className="w-full mt-4" type="submit">
            Register
          </Button>
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
