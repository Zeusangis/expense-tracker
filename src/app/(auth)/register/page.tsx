import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="flex flex-col w-full max-w-md p-3 m-auto rounded-xl mt-8">
        <header className="mb-6">
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="text-sm text-gray-500"> Create your account here.</p>
        </header>
        <form>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="username">
              Full Name
            </label>
            <input
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
