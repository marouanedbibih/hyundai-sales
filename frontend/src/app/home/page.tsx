"use client";

import Link from "next/link";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
    </div>
  );
};

export default HomePage;
