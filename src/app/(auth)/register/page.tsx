"use client";

import { register } from "@/actions/auth/auth";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    console.log(data);
    const response = await register(data);
    if (!response.success) {
      alert(response.message);
      return;
    }
    router.push("/");
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-md p-3 m-auto rounded-xl mt-8">
        <header className="mb-6">
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="text-sm text-gray-500"> Create your account here.</p>
        </header>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="username">
              Full Name
            </label>
            <input
              {...form.register("name")}
              className="w-full p-2 mb-6 border-b-2 outline-none bg-gray-300 focus:bg-gray-300"
              type="text"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="username">
              Email
            </label>
            <input
              {...form.register("email")}
              className="w-full p-2 mb-6 border-b-2 outline-none bg-gray-300 focus:bg-gray-300"
              type="text"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              {...form.register("password")}
              className="w-full p-2 mb-6 border-b-2  bg-gray-300 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <input
              className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
            />
          </div>
        </form>
        <footer>
          <Link
            className="text-sm float-right hover:text-gray-600"
            href="/register"
          >
            Already have an account?
          </Link>
        </footer>
      </div>
    </>
  );
}
