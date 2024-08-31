import Link from "next/link";
import MainContainer from "./features/main-container";
import Image from "next/image";

export default function notFound() {
  const title = "Not Found";
  const breadcrumbs = [
    { label: 'Home', href: '/' },
  ];
  return <div>
    <div>
      <MainContainer title={title} breadcrumbs={breadcrumbs} />
    </div>
    <div className="flex flex-col items-center justify-center 2xl:h-[calc(100vh-700px)] min-h-[400px] text-center bg-[url('../public/images/notFound.jpeg')] bg-cover bg-center">
      <div className="container flex flex-col items-start">
        <h1 className="text-6xl font-bold bg-gray-500 text-white p-4">There is nothing behind this door</h1>
        <p className="text-xl bg-gray-600 text-white p-4 text-left mt-4">404 NOT FOUND It&apos;s possible that the page has been moved, you typed the address incorrectly, or that the page no longer exists. We apologize and suggest you try searching for the content you are looking for or go the the home page.</p>
        <Link href="/"
          className="mt-6 text-blue-500 hover:underline text-lg bg-slate-50 py-3 px-6">Go back to Home
        </Link>
      </div>
    </div>
  </div >
}