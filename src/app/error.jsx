"use client";

import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();

  const redirect = () => {
    router.replace("/");
    window.location.reload();
  };

  return (
    <div className="flex rounded-lg flex-col justify-center items-center h-[70%] bg-gray-100 text-center p-4">
      <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Something went wrong!</h1>
        <p className="mt-4 text-lg">
          We encountered an unexpected error. Please try again later
        </p>
      </div>
      <button className="underline mt-4 text-blue-600" onClick={redirect}>
        Return to homepage
      </button>
    </div>
  );
};

export default Error;
