import React from "react";
import Link from 'next/link'
const NotFound = () => {
  return (
    <div className="w-screen h-screen items-center text-xl">
      <h2>Not Found</h2>
      <p>Could not find requested page.</p>
      <Link href="/" classname="text-green-600">Return Home</Link>
    </div>
  )
};

export default NotFound;