"use client";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  return (
    <div>
      <Navbar LoginLink={LoginLink} />
      <Hero LoginLink={LoginLink} />
    </div>
  );
}

// This will be the landing page

// User can see the navbar
// Create navbar component

// User can see login, get started button
// Kinde Authentication

// user can see hero title, p, sign up buttons, image
// Build page
