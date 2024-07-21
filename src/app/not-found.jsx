"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const redirect = () => {
    router.replace("/");
    window.location.reload();
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-4">
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="mt-4 text-lg">
          The page you are looking for does not exist
        </p>
      </div>
      <button className="underline mt-4 text-blue-600" onClick={redirect}>
        Return to homepage
      </button>
    </div>
  );
};

export default NotFound;
