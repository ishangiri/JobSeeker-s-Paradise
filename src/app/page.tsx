'use client'
import BackgroundImage from "@/components/BackgroundImage";
import HomePage from "@/components/HomePage";


export default function Home() {

  return (
    <div className="relative min-h-screen flex flex-col space-y-10 items-center justify-center overflow-hidden">
      <BackgroundImage />
      <HomePage />
    </div>
  );
}

