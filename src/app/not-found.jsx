import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-4">
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="mt-4 text-lg">
          The page you are looking for does not exist
        </p>
      </div>
      <Link href="/">
        <a className="mt-6 inline-block px-6 py-3 text-white underline bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          Return Home
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
