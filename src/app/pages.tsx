import { BentoGridSecondDemo } from "@/Components/bento";
import { FloatingDockDemo } from "@/Components/dock";
import { VortexDemo } from "@/Components/vortex";
import Image from "next/image";
import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className="relative flex min-h-screen bg-gray-900 text-white">
      <VortexDemo/>
    

      <div className=" [&_*]:text-[#FFFFFF]">
        <FloatingDockDemo />
      </div>
    </main>
  );
}
