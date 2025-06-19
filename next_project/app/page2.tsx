import Image from "next/image";

import logo from "@/public/glogo1.svg"
import background from "@/public/bg.svg"

import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Image layout="fill" objectFit="cover" className="absolute -z-10 brightness-50" alt="" src={background} />
      <div className="flex flex-col h-screen mr-7 ml-4 lg:mx-45">
        <div className="flex w-full pt-5 ">
          <div className="flex justify-center pr-5 md:pr-25">
            <Image alt="" src={logo} height={70} />
          </div>
          <div className="flex flex-wrap items-end h-full w-full ">
            <div className="flex flex-wrap gap-5 lg:gap-35" >
                  <div className="flex gap-1 row items-center">
                  <p className="text-[13px] lg:text-xl">PROJECTS</p>
                  <ChevronDownIcon className="text-green-400"/>
                  </div>
                  <p className="text-[13px] lg:text-xl">RESUME</p>
                  <p className="text-[13px] lg:text-xl">BLOG</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="lg:h-[45%] h-[21.8%] w-full"></div>
          <div className="h-1/2 w-full">
          <h2 className="lg:text-[30px] text-[16px]">COMPUTING PROFESSIONAL</h2>
          <h1 className="lg:text-[40px] text-[18px]">Networking • Software • Sysadmin</h1>
          </div>
        </div>
      </div>
    </div>
  );
}