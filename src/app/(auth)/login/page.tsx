"use client";

import { login } from "@/actions/auth/auth";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    console.log(data);
    const response = await login(data);
    console.log(response);
    if (!response.success) {
      alert(response.message);
      return;
    }
    router.push("/");
  }

  return (
    <div className="flex flex-col w-full max-w-md p-3 m-auto rounded-xl mt-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-sm text-gray-500">Login to your account</p>
      </header>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            {...form.register("email")}
            className="w-full p-2 mb-6 border-b-2 outline-none bg-gray-300 focus:bg-gray-300"
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
          <input
            {...form.register("password")}
            className="w-full p-2 mb-6 border-b-2 bg-gray-300 outline-none focus:bg-gray-300"
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
          <button
            className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mb-6 rounded cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <footer>
        <Link
          className="text-sm float-right hover:text-gray-600"
          href="/register"
        >
          Create Account?
        </Link>
      </footer>
    </div>
  );
}
