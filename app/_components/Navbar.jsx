import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  const menu = [
    {
      itemName: "Product",
      link: "/product",
    },
    {
      itemName: "Pricing",
      link: "/pricing",
    },
    {
      itemName: "Contact",
      link: "/contact",
    },
    {
      itemName: "About",
      link: "/about",
    },
  ];

  return (
    <div className="p-6 border-b flex items-center justify-between px-10">
      <div>
        <Link href={"/"}>
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
        </Link>
      </div>
      <div>
        <ul className="hidden md:flex md:gap-x-12">
          {menu.map((item, index) => (
            <li key={index} className="hover:text-primary/60 cursor-pointer">
              <Link href={item.link}>{item.itemName}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-x-2">
        <Button variant="ghost">Log In</Button>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

export default Navbar;
