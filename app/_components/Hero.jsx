import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="grid grid-cols-2 mt-10">
      <div className="flex flex-col pl-24 pr-4 space-y-10 mt-10">
        <h1 className="text-6xl font-bold">Easy scheduling ahead</h1>
        <p className="text-xl">
          Calendary is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time — and so much more.
        </p>
        <div>
          <Button className="px-10 py-6 text-lg">Sign up with Google</Button>
        </div>
      </div>
      <div className="flex justify-center items-center pr-10">
        <Image
          src="/heroImage.png"
          width={600}
          height={500}
          alt="hero image"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default Hero;
